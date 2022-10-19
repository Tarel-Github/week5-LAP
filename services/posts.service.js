const PostRepository = require("../repositories/posts.repository");//리포지토리의 내용을 가져와야한다.

class PostService {
    postRepository = new PostRepository();//리포지토리 가져오기
    
    //모든 포스트를 가져오는 함수, 파라미터는 없다.
    findAllPost = async() => {
        const allPost = await this.postRepository.findAllPost();
        allPost.sort((a,b) =>{
            return b.createdAt - a.createdAt      //생성시간 순서대로 정렬
        })
        return allPost;
    };

    //특정 포스트를 가져오는 함수, 파라미터는 포스트의 id
    findPostById = async (postId) => {
        const findPost = await this.postRepository.findPostById(postId);
        return findPost;
    }

    //포스트를 만드는 함수, 파라미터는 그거에 필요한 것들
    createPost = async (userId, title, content) => {
        const createPostData = await this.postRepository.createPost(userId, title,content)    //리포의 createPost에 아래 4개의 파라미터를 넣는다.
        return createPostData
    }

    //포스트를 업데이트 수정하는 경우
    updatePost = async (postId, title, content, userId) => {
       const updatePost = await this.postRepository.updatePost(postId, title, content, userId);//수정된걸 다시 가져와서
        return updatePost
    };

    deletePost = async (postId) => {    
        const deletePost = await this.postRepository.deletePost(postId);
    };


    likePost = async (res, postId, userId) => {
        const likePost = await this.postRepository.likePost(res, postId, userId);
        return likePost
    };

    likeGet = async (res,userId) => {
        const likeGet = await this.postRepository.likeGet(res, userId);
        return likeGet
    };

}
module.exports = PostService;