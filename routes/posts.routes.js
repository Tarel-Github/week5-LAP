const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/auth-middleware')

const PostsController = require('../controllers/posts.controller');  //컨트롤러 파일을 가져와서
const postsController = new PostsController();              //재정의
//미들웨어는 라우터에서 경유하는 걸지도??

router.post('/like',Auth, postsController.likeGet);        //좋아요 게시글 가져오기
router.post('/:postId/like',Auth, postsController.likePost);    //게시글 좋아요

router.get('/', postsController.getPosts);                  //전체 게시글 가져오기
router.get('/:postId', postsController.getPostById);        //특정 게시글 가져오기
router.post('/',Auth, postsController.createPost);               //게시글 작성하기
router.put('/:postId',Auth, postsController.updatePost);         //게시글 수정하기
router.delete('/:postId',Auth, postsController.deletePost);      //게시글 삭제하기


module.exports = router;