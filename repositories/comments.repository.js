const { User, Post, Comment } = require('../models');          //모델 데이터를 가져오고


class CommentRepository {
    findComment = async (postId) =>{
        const comments = await Comment.findAll({where: { postId },      //postId를 기반으로 포스트를 가져오고
            include: [{model: User,attributes: ["nickname"],},],        //작성한 유저의 닉네임을 포함해서 가져온다!
            order: [["createdAt", "DESC"]],
          });

        return comments;
    }

    // findAllPost = async () => {                     //모든 포스트를 찾는 함수, 딱히 받아올 파라미터가 없다.
    //     const post = await Post.findAll();
    //     return post;
    // };

    findPostById = async (postId) => {              //아이디를 기반으로 포스트 찾기
        console.log("코멘트 리포, 아이디로 포스트 찾기")
        const post = await Post.findByPk(postId);
        return post;
    };

    createComment = async (content, userId, postId) => {
        const createCommentData = await Comment.create({content, userId, postId});//이게 문제다
        return createCommentData;
    }

    updateComment = async (commentId, content, userId) => {

    }

    deleteComment = async (commentId, content, userId) => {

    }



}

module.exports = CommentRepository ;