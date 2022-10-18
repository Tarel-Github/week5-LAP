//로그인 확인 미들웨어
const jwt = require("jsonwebtoken");
const { User } = require("../models");  //이부분 에러났었음, 주소에 파일명을 명확히 함으로써 해결함       "../models"   =>    "../models/user.js"

module.exports =async (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.(1)",
    });
    return;
  }
  try {
    const { id } = jwt.verify(authToken, "customized-secret-key");  //customized-secret-key
    const user = await User.findOne({where:{userId:id}})
    res.locals.user = user;
    next();
    // User.findOne({where : {userId: 2}}).then((user) => {                              //크게 달라진 부분은 이부분정도??
    //   console.log("식별용===========")
    //   console.log(user)
    //   res.locals.user = user;
    //  next();
    // });
  } catch (err) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};
