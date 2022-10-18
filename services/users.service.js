const UserRepository = require("../repositories/users.repository");//리포지토리의 내용을 가져와야한다.

//로그인, 회원가입
class UserService{
    userRepository = new UserRepository();//리포지토리 가져오기


    signup = async (nickname, password) => {
        //닉네임과 페스워드를 저장함
        const signupdata = await this.userRepository.createUser(nickname,password);
        return {signupdata
            // // userId: signupdata.userId,
            // nickname: signupdata.nickname,
            // password: signupdata.title,
            // createdAt: signupdata.createdAt,
            // updatedAt: signupdata.updatedAt,
        }
    }
    


    login = async (nickname, password) =>{
        //유저 아이디를 기반으로 리포에서 유저데이터 가져옴
        try{
            const user = await this.userRepository.findUserByNickname({where: {nickname}});
            // if(!user || password !== user.password){
            //     //res.status(400).send({errorMessage:"이메일 또는 페스워드가 틀렸습니다."});
            //     return;
            // }
            return{
                userId: user.userId,
                nickname: user.nickname,
                password: user.password,    //일단 이거는 없는게 좋지 않을까???
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }catch(error){
            console.log(error.message)
            // res.status(400)({})
            return;
        }

    }


}

module.exports = UserService;