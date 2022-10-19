const { Post, Likes } = require('../models');          //모델 데이터를 가져오고

//리포지토리는 그저 DB와의 상호작용들을 정의해 놓은 곳이다.
//포스트 전체 조회, 선택 조회, 작성, 수정, 삭제
class PostRepository {                              //포스트업무 수행을 위해 DB와 의사소통 하는 부분
    //포스트 전체 조회
    findAllPost = async () => {                     //모든 포스트를 찾는 함수, 딱히 받아올 파라미터가 없다.
        const post = await Post.findAll();
        return post;
    };
    
    findPostById = async (postId) => {              //아이디를 기반으로 포스트 찾기
        const post = await Post.findByPk(postId);
        return post;
    };

    //아래는 유저아이디를 받아와야 한다. 즉 로그인이 필요해 보인다.
    createPost = async (userId, title, content) => {    //포스트를 만든다. (닉네임, 비번, 제목, 내용)을 받아서,
        const createPostData = await Post.create({userId, title, content});
        return createPostData;
    };

    //포스트 수정
    updatePost = async (postId, title, content, userId) => {
        const post = await Post.findByPk(postId);
        const postau = post.userId
        if(userId === postau){   
            const updatePostData = await Post.update({title, content}, {where: {postId}})// 포스트아이디 일치하는 곳에다가 제목과 내용을 업데이트 한다.//#############
            return updatePostData
        }else{
            return;
        }
    };
    //포스트 삭제
    deletePost = async (postId)=>{
        const deletePostData = await Post.destroy( {where: {postId}})  //##왜 where가 작동하지 않는가...   //강의에선 여기도 deletePostData가 아니라 updatePostData로 했다. 의미가 있나???
        return deletePostData;
    }

    //좋아요

    likePost = async (res, postId, userId) => {
        try{
            const post = await Post.findOne({where: {postId}})
            if(!post){
                return res.status(400).send({errorMessage: "없는 게시글 입니다. Post->repo"});
            }
            const isLike = await Likes.findOne({where: { postId, userId: userId },});
            if (!isLike) {                                                                //좋아요를 안했다면 isLike값이 없을 것이다.
                await Likes.create({ postId, userId: userId });                      //Likes 데이터베이스에 게시글 아이디와 유저 아이디가 등록된다. 이로써 다음에 isLike를 찍으면 값이 나올 것이다.
                await Post.increment({ likecount: 1 }, { where: { postId } });           //post의 like 값이 1 증가한다.
                return res.status(201).send({ msg: "좋아요!!!" });
            } else {
                await Likes.destroy({ where: { postId, userId: userId } });        //로그인한 유저id와 가져온 postid가 일치하는 Likes 데이터를 없앤다.
                await Post.decrement({ likecount: 1 }, { where: { postId } });         //해당 post의 like 값을 하나 낮춘다.
                return res.status(200).send({ msg: "좋아요 취소" });
            }
        }catch(error) {
            return res.status(500).send({ errorMessage:error.message});
        }

    }


    likeGet = async (res, userId) => {
        try {
            const allPost = await Post.findAll({
                include: ["Likes"],
                order: [["likecount", "DESC"]],
            });
            const likesPost = await allPost.filter((v) => v.Likes.filter((v2) => v2.userId === userId).length > 0);
            return likesPost;
        } catch (err) {
            console.error(err);
            res.status(500).json({ errorMessage: err.message });
        }
    }


}

module.exports = PostRepository;
