const PostService = require('../services/posts.service');

class PostsController {
    postService = new PostService();

    //모든 게시글 불러오기
    getPosts = async (req, res, next) => {
        const posts = await this.postService.findAllPost();//포스트서비스의 findAllPost를 사용
        res.status(200).json({data: posts});//컨트롤러는 요청과 응답에 관여하니 응답만
    };

    //특정 게시글 불러오기
    getPostById = async (req, res, next) => {
        const {postId} = req.params;
        const posts = await this.postService.findPostById(postId);
        res.status(200).json({data: posts});
    }

    //게시글 작성하기
    createPost = async(req, res, next) =>{
        const {title, content} =req.body;//내용을 받아옴
        const user = res.locals.user;
        const createPostData = await this.postService.createPost(user.userId, title,content)
        res.status(201).json({data: createPostData});
    };

    //게시글 수정하기
    updatePost = async (req, res, next) => {
        const {postId} = req.params;                        //수정하고자 하는 포스트의 넘버
        const {title, content}= req.body;

        const user = res.locals.user; //로그인한 유저의 데이터


        const updatePost = await this.postService.updatePost(postId, title, content, user.userId)
        console.log("다시 콘트롤로 돌아옴")
        console.log(updatePost)
        if(!updatePost){
            res.status(400).json({errorMessage: "수정 권한이 없습니다.."})
            return;
        }
        res.status(200).json({data: updatePost})
    };

    //게시글 삭제

    deletePost = async (req, res, next) => {
        const {postId} = req.params;      
        const deletePost = await this.postService.deletePost(postId);
        res.status(200).json({data: deletePost});
    }
}




module.exports = PostsController;
