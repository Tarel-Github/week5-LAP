const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/auth-middleware')

const UsersController = require('../controllers/users.controller');  //컨트롤러 파일을 가져와서
const usersController = new UsersController();              //재정의

router.post('/signup', usersController.signup);           //회원가입하기
router.post('/login', usersController.login);             //로그인하기

module.exports = router;