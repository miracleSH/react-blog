const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://seungheon:dustn@@56@react-blog.njxco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{useNewUrlParser: true}).then(()=>{
    console.log("connected!")
}).catch(err=>{
    console.log(err);
});


app.get("/", (req, res)=> {
    res.send("hello world");
})

app.listen(5000);