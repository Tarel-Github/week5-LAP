// const express = require('express');
// const { User } = require('../models');
// const router = express.Router();
// const Joi = require("joi");

// //  /api/signup
// router.post("/", async (req, res) => {
//     const { nickname, password, confirmPassword } = req.body;
//     if (password !== confirmPassword) {
//       res.status(400).send({ errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",});    //페스워드 다시입력 부분과 페스워드부분이 다른 경우
//       return;                                                                            //에러는 무조건 리턴을 보내서 끝내버리자
//     }
//     const existsName = await User.findOne({where: { nickname } });                        //where: 찾을 조건을 입력하는 명령,,닉네임이 중복인지 확인! 
//     if(existsName){
//       res.status(400).send({errorMessage:"중복된 닉네임입니다."})                          //중복된것이 있으니까 에러를 반환해야지??
//       return;                                                                              //에러는 무조건 리턴을 보내서 끝내버리자
//     }
    
//     if (password.includes(nickname)) {
//         res.status(400).send({errorMessage: "패스워드에 닉네임을 사용하지 마십시오.",});
//         return;
//     }
//     if (password.length < 4) {
//         res.status(400).send({errorMessage: "패스워드는 4자 이상으로 해주시기 바랍니다.",});
//         return;
//     }
//     const nickSchema = Joi.string().alphanum().min(3).required();           //이걸 써서 닉네임의 구성 요건을 맞춰보자

//     try {
//         Joi.assert(nickname, nickSchema);
//       } catch (err) {
//         console.error(err);
//         res.status(400).send({
//           errorMessage:
//             "닉네임은 최소 3자 이상, 알파벳 대소문자, 숫자로 구성되어야 합니다.",
//         });
//         return;
//       }

//     //위의 조건문을 무시했다는건 문제가 없다는뜻!
//     await User.create({ nickname, password });                                             //데이터를 생성해 저장해주자
//     res.status(201).send({ "message": "회원가입 성공"});                                   //성공했으면 답변은 필수
//   });

//   module.exports = router;