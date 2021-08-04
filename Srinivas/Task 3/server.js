const express = require("express")
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const PORT = 3000 || process.env.PORT;

app.use(express.static(__dirname + "/Public"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
});

app.route("/")
.get((req,res)=>{
    res.sendFile(__dirname + "/Public/home.html");
});


app.route("/register")
.post((req,res)=>{
    const User = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email
    }
    res.redirect("/quiz");
});

app.route("/quiz")
.get((req,res)=>{
    res.sendFile(__dirname + "/Public/quiz.html")
});

app.route("/res")
.post((req,res)=>{
    res.redirect("/");
});