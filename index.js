const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require("./config/key")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 5000;
const {User} = require("./model/user");

mongoose.connect(config.mongoURI,
{useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false}).then(()=>{
    console.log("connected!")
}).catch(err=>{
    console.log(err);
});

app.get("/", (req, res)=> {
    res.send("hello world!");
})
//데이터 타입을 분석하는 역할
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/register', (req, res)=>{
    //회원가입에 필요한 정보들을 client에서 가져오면
    //데이터베이스에 전송
    const user = new User(req.body);
    user.save((err, userData) => {
        if(err) return res.json({success : false, err});
        return res.status(200).json({
            success : true
        })
    });
})

app.listen(port, ()=> console.log(`Example app listening on port ${port}`));