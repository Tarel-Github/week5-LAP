const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/auth-middleware')

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

// comments/
router.get('/:postId', commentsController.getComments);            //덧글 열람하기
router.post('/:postId', Auth, commentsController.createComment);           //덧글 작성하기
// router.put('/:commentId',Auth, commentsController);         //덧글 수정하기
// router.delete('/:commentId',Auth, commentsController);      //덧글 삭제하기

module.exports = router;