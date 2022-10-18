const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken")      
const app = express();
const router = express.Router();
const SECRET_KEY = `customized-secret-key`;
const routes = require('./routes');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


//==라우트 추가 영역
app.use('/', require('./routes/users.routes'));
app.use('/posts', require('./routes/posts.routes'));
app.use('/comments', require('./routes/comments.routes'));



//app.use('/api', routes); //이거 없애야 할지도

app.listen(8080, () => {
    console.log("서버 가동");
  });
