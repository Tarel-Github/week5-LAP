// const express = require('express');
// const jwt = require("jsonwebtoken")   
// const { User } = require('../models');
// const router = express.Router();

// //  /api/login
// router.post("/", async (req, res) => {
//     const { nickname, password } = req.body;                                              //로그인 할때는 닉네임과 페스워드를 가져온다.
//     const user = await User.findOne({where: {nickname,},}); 
//     console.log({User})                               //모델의 유저데이터에서 닉네임을 찾아온다. 
//     try{
//       if (!user || password !== user.password) {                                             //비번이 다르면
//         res.status(400).send({errorMessage: "이메일 또는 패스워드가 틀렸습니다.",});          //로그인 실패!!
//         return;                                                                               //리턴
//       }
//       const accessToken = jwt.sign({ id: user.userId }, "customized-secret-key",{ expiresIn: '100s' });
//       res.cookie('accessToken', accessToken);

//       return res.status(200).send({ "message": "Token이 정상적으로 발급되었습니다." , accessToken});     
//     }catch (error) {
//       console.log(error.message)
//       res.status(400)({})
//       return;
//     }
//   });


// module.exports = router;