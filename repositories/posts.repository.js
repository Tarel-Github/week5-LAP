const { Post } = require('../models');          //모델 데이터를 가져오고

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


}

module.exports = PostRepository;
