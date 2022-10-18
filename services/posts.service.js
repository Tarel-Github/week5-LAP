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
        // const findPost = await this.postRepository.findPostById(postId);
        // if(!findPost) throw new Error("없는 포스트입니다.")     //포스트가 없으면 에러 던지기
        
        // await this.postRepository.updatePost(postId, title, content);//리포의 포스트업데이트를 실행

        const updatePost = await this.postRepository.updatePost(postId, title, content, userId);//수정된걸 다시 가져와서
        return updatePost
    };

    deletePost = async (postId) => {
        // const findPost = await this.postRepository.findPostById(postId);//리포에 있는 findPostById를 호출
        // if(!findPost) throw new Error("없는 포스트입니다.")     //포스트가 없으면 에러 던지기
        
        const deletePost = await this.postRepository.deletePost(postId);//포스트 아이디와 비번이 일치한걸 찾아서 지우기
        //리포에 있는 deletePost함수를 참조한다.
        return deletePost
    };
}
module.exports = PostService;