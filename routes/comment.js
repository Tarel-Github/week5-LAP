// const express = require('express');
// const jwt = require("jsonwebtoken")  
// const { Op } = require("sequelize");   
// const { User, Post, Comment } = require("../models");
// const router = express.Router();
// const authMiddleware = require("../middlewares/auth-middleware");

// /// api/comments/
// //덧글 작성===============================================================
// router.post("/:postId", authMiddleware, async (req, res) => {//####로그인 필요, 작성에 필요한 조건 수정
//     const { postId } = req.params;                  //덧글을 작성할 PostId를 가져온다.
//     const { content } = req.body;                   //작성할 때는 덧글내용을 가져온다.
//     const ifPostId = await Post.findOne({ where: {postId} });   //포스트 가져옴
//     try{
//         if(!ifPostId){
//             res.status(400).send({errorMessage:"없는 게시글입니다!"})
//             return; 
//         }

//         if (!content){
//             res.status(400).send({errorMessage: '댓글 내용을 입력해주세요'});//덧글 내용이 없다면 덧글을 입력해달라는 메시지 출력
//             return;
//           } 
//         const user=res.locals.user;                     //로그인중인 유저의 정보를 가져온다.
//         if(!user){                                      //정보가 없다는건 로그인을 안했다는 뜻.
//             res.status(400).send({errorMessage:"로그인 하시기 바랍니다."})
//             return;  
//         }
//         const userId= user.userId                       //로그인 유저의 아이디를 가져옴
//         const post = await Post.findOne ({ where: {postId} })//post를 찾는다.
//         await Comment.create({ userId: user.userId, postId, content });//comment에 content 생성
//         res.status(201).send({"message": "덧글입력 성공!"});  
        
//     }catch(error){
//       return res.status(500).send({ errorMessage:error.message});
//     }
//   });
  
//   //덧글 열람===============================================================

//  router.get("/:postId", async (req, res) => {
//     try {
//       const { postId } = req.params;
//       const comments = await Comment.findAll({where: { postId },
//         include: [{model: User,attributes: ["nickname"],},],        //작성한 유저의 닉네임을 포함해서 가져온다!
//         order: [["createdAt", "DESC"]],
//       });
//       res.json({ result: comments });
//     } catch (error) {
//       console.error(error);
//       res.status(400).json({ errorMessage: error.message });
//     }
//   });

//   //덧글 수정===============================================================
//   router.put("/:commentId", authMiddleware, async (req, res) => {
//     try {
//         const { commentId } = req.params;
//         const { content } =req.body;            //body에 작성한 내용을 가져옴
//         const user=res.locals.user; //
//         const comment = await Comment.findOne({where: {commentId}});                //코멘트 아이디를 가져옴
//         if (!comment)
//             return res.status(400).send({ errorMessage: "존재하지 않는 댓글입니다." });//코멘트 값이 없으면 존재하지 않는 댓글
        
//         if (comment.userId !== user.userId)
//             return res.status(400).send({ errorMessage: "작성자 본인만 수정할 수 있습니다." });
//         await Comment.update({ content }, { where: { commentId } });
//         return res.status(200).send({ msg: "댓글이 수정되었습니다." });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ errorMessage: error.message });
//     }
//   });

//   //덧글 삭제===============================================================
//   router.delete("/:commentId", authMiddleware, async (req, res) => {
//     try {
//       const { commentId } = req.params;
//       const user=res.locals.user; 
//       const comment = await Comment.findOne({where: {commentId}});
//       if (!comment)
//         return res.status(400).send({ errorMessage: "없는 댓글입니다." });
//       if (comment.userId !== user.userId)
//         return res.status(400).send({ errorMessage: "삭제 권한이 없습니다." });
//       await Comment.destroy({ where: { commentId } });
//       return res.status(200).send({ msg: "댓글이 삭제되었습니다." });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ errorMessage: error.message });
//     }
//   });
  

// module.exports = router;