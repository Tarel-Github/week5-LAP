const UserService = require('../services/users.service');    //서비스 파일을 가져옴
const Joi = require("joi");
const jwt = require("jsonwebtoken")  

class UsersController {
    userService = new UserService();

    //회원가입
    signup = async (req, res, next) => { 
        const { nickname, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            res.status(400).send({ errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",});    //페스워드 다시입력 부분과 페스워드부분이 다른 경우
            return;                                                                            //에러는 무조건 리턴을 보내서 끝내버리자
        }
        if (password.includes(nickname)) {
            res.status(400).send({errorMessage: "패스워드에 닉네임을 사용하지 마십시오.",});
            return;
        }
        if (password.length < 4) {
            res.status(400).send({errorMessage: "패스워드는 4자 이상으로 해주시기 바랍니다.",});
            return;
        }
        const createUserData = await this.userService.signup( nickname,password )
        if(!createUserData.signupdata) {
            res.status(400).json({errorMessage: "중복된 닉네임입니다..",});
            return;
        }
        res.status(201).json({data: createUserData});
    }
    //로그인

    login = async (req, res, next)=> {
        try{
            const { nickname, password } = req.body;        //body로 받아온 데이터.
            if(!nickname) {
                res.status(400).json({message:"아이디를 입력하세요"});
                return;
            }
            if(!password) {
                res.status(400).json({message:"비밀번호를 입력하세요"});
                return;
            }
            const loginUserData = await this.userService.login(nickname, password)
            if(!loginUserData){
                res.status(400).json({message:"아이디 혹은 비밀번호가 잘못되었습니다."});
                return;
            }
            const accessToken = jwt.sign({ id: loginUserData.userId }, "customized-secret-key",{ expiresIn: '100s' });
            res.cookie('accessToken', accessToken);

            return res.status(200).send({ "message": "Token이 정상적으로 발급되었습니다." , accessToken});
        }catch(error){
            res.status(400).json({message:"잘못된 로그인 요청입니다."});
            return;
        }


    }
}




module.exports = UsersController;
