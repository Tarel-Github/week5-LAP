const UserRepository = require("../repositories/users.repository");//리포지토리의 내용을 가져와야한다.

//로그인, 회원가입
class UserService{
    userRepository = new UserRepository();//리포지토리 가져오기

    signup = async (nickname, password) => {
        //닉네임과 페스워드를 저장함
        const signupdata = await this.userRepository.createUser(nickname,password);
        return {signupdata}
    }
    
    login = async (nickname, password) =>{
        //유저 아이디를 기반으로 리포에서 유저데이터 가져옴
        try{
            const user = await this.userRepository.findUserByNickname({where: {nickname}});

            return{
                userId: user.userId,
                nickname: user.nickname,
                password: user.password,    
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