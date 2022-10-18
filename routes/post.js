const express = require('express');
const jwt = require("jsonwebtoken")  
const { Op } = require("sequelize");   
const { User, Post, Comment, Likes } = require("../models");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
//====================================================게시글 작성

// 게시글 작성
//  /api/posts
router.post("/", authMiddleware, async (req, res) => {
    try{                                                  
      const user = res.locals.user                    
    }catch(error){
      return res.status(400).send({ errorMessage: "로그인하시기 바랍니다."}); 
    }
    const user = res.locals.user
    const userId = user.userId
    const { title, content } = req.body;    
    await Post.create({ title, content, userId });
    res.status(201).send({"message": "포스팅 저장 성공"});  
  });

  
//모든 게시글 조회
router.get("/", async (req, res) => {                     //게시글 조회할 때는 별다른 입력이 없다. 그러나 해당 게시글의 제목과 컨텐츠를 가져온다.
try{
    const allPost = await Post.findAll({});    //게시글 조회는 아무나 할 수 있음, 유저정보포함을 조건으로 넣긴했는데 필요한가???/*include: [Users],*/
    res.json(allPost)
}catch (error){
    console.error(error);
    res.status(400).json({ errorMessage: error.message });      //딱히 에러일게 있나??
}
});




//  /api/posts
// 좋아요 게시글 조회. 로그인 필요 => authMiddleware 경유
router.get("/like", authMiddleware, async (req, res) => {//get 메소드로 하면 먹통임
    try {
        const user = res.locals.user;           //로그인한 사람의 데이터를 가져옴
        const allPost = await Post.findAll({
            include: ["Likes"],
            order: [["likecount", "DESC"]],
        });
        const likesPost = await allPost.filter((v) => v.Likes.filter((v2) => v2.userId === user.userId).length > 0);
        return res.status(200).send(likesPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
});

//상세조회
router.get("/:postId", async (req, res) => {
    const { postId } =req.params;               //바로 위 경로에 있는 파람스 값을 가져온다.
    const existPosts = await Post.findOne({ where: {postId} }); //게시글 조회는 아무나 할 수 있음
    res.json(existPosts);
  });
//게시글 수정
router.put("/:postId", authMiddleware, async (req, res) => {//수정할때는 put을 사용, 미들웨어가 알아서 로그인 체크
    try{
        const { postId } =req.params;   
        const { title, content } = req.body;            //게시글을 수정할 때는 body로 부터 수정할 제목과 컨텐츠를 가져온다.
        const posts = await Post.findOne({ where: {postId} });   //포스트 자료를 전부 다 가져온다.
        if(!posts){
            res.status(400).send({errorMessage:"없는 게시글입니다!!"})
            return;          
        }
        const postuser = posts.userId                              //로그인 한 사람의 유저아이디 값을 가져옴
        const user = res.locals.user
        const userId = user.userId
        if(userId !== postuser){                                                //로그인한 사람과 작성자가 동일하지않으면 수정불가
            res.status(400).send({errorMessage:"수정권한이 없습니다.."})
            return;           
        }     
        await Post.update({ title, content }, { where: { postId } })  
        return res.status(200).json({ msg: '수정 완료' });
    }catch(error){
        console.error(error);
        res.status(500).json({ errorMessage: error.message });
    }
});
//게시글 삭제
router.delete("/:postId", authMiddleware, async (req, res) => {
    try{
        const { postId } = req.params;                     //일단 지우고자 하는 포스트의 아이디를 params로 가져온다.
        const posts = await Post.findOne({ where: {postId} });   //포스트 자료를 전부 다 가져온다.
        if(!posts){
            res.status(400).send({errorMessage:"없는 게시글입니다!!"})
            return; 
        }
        const postuser = posts.userId                              //로그인 한 사람의 유저아이디 값을 가져옴
        const user = res.locals.user
        const userId = user.userId
        if(postuser !== user.userId){                                                //로그인한 사람과 작성자가 동일하지않으면 수정불가
            res.status(400).send({errorMessage:"당신은 삭제할 수 없습니다."})
            return;           
        }    
        await Post.destroy({ where: { postId } })                               //업데이트는 그냥 update  
        return res.status(200).json({ msg: '삭제 완료' });
    }catch(error){
        console.error(error);
        res.status(500).json({ errorMessage: error.message });
    }
  });
// 좋아요 실행 및 취소 기능
router.post("/:postId/like", authMiddleware, async (req, res) => {
    try {
        const { postId } = req.params;
        console.log(postId);
        const post = await Post.findOne({ where: {postId} }); 
        if (!post) return res.status(400).send({ errorMessage: "없는 게시글입니다." });
        const user = res.locals.user
        const isLike = await Likes.findOne({where: { postId, userId: user.userId },});//postId와 userId를 가져온다(단, 로그인 한 사람과 일치하는 userId를 가져옴)
        if (!isLike) {                                                                //좋아요를 안했다면 isLike값이 없을 것이다.
            await Likes.create({ postId, userId: user.userId });                      //Likes 데이터베이스에 게시글 아이디와 유저 아이디가 등록된다. 이로써 다음에 isLike를 찍으면 값이 나올 것이다.
            await Post.increment({ likecount: 1 }, { where: { postId } });           //post의 like 값이 1 증가한다.
            return res.status(201).send({ msg: "좋아요!!!" });
        } else {
            await Likes.destroy({ where: { postId, userId: user.userId } });        //로그인한 유저id와 가져온 postid가 일치하는 Likes 데이터를 없앤다.
            await Post.decrement({ likecount: 1 }, { where: { postId } });         //해당 post의 like 값을 하나 낮춘다.
            return res.status(200).send({ msg: "좋아요 취소" });
        }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorMessage: err.message });
    }
  });


  module.exports = router;