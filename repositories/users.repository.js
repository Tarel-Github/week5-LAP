const { User } = require('../models');          //모델 데이터를 가져오고
//const user = require('../models/user');


class UserRepository {
    createUser = async(nickname, password) => {     //회원가입으로 유저 생성

        const existsName = await User.findOne({where: { nickname } });      //중복확인 기능 일단 off                  //where: 찾을 조건을 입력하는 명령,,닉네임이 중복인지 확인! 
        //이게 있다면 중복이 있는거임!
        if(existsName){
            //res.status(400).send({errorMessage:"중복된 닉네임입니다."})                          //중복된것이 있으니까 에러를 반환해야지??
            return;                                                                              //에러는 무조건 리턴을 보내서 끝내버리자
        }

        const user = await User.create({nickname,password});
        return user
    }

    findUserByNickname = async (nickname) => {              //로그인시 유저 아이디 찾아옴
        const findUser = await User.findOne(nickname);
        return findUser;
    }


    findUserById = async (userId) => {              //로그인시 유저 아이디 찾아옴
        const findUser = await User.findByPk(userId);
        return findUser;
    }

}

module.exports = UserRepository;