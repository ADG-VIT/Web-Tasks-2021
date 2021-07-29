const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fetch = require('node-fetch');

var quizData;
var count = 0;
var score = 0;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});

app.post("/register", (req, res) => {
    res.redirect("/quiz");
});

app.get("/quiz", (req, res) => {
    count = 0; 
    fetch("https://task-3-api.herokuapp.com/questions")
    .then((res) => res.json())
    .then((data) => {
        quizData = data;
        res.render('quiz', {quizData: quizData[count], button: "Next"});
    });
});

app.post("/quiz", (req, res) => {
    var correctOption = quizData[count].correctOption;
    if (req.body.length !== 0 && req.body.options === correctOption)
        score++;

    count++;
    if (count < quizData.length) {
        var button;
        if (count === quizData.length - 1)
            button = "Submit";
        else
            button = "Next";    
        res.render('quiz', {quizData: quizData[count], button: button});
    } else
        res.redirect("/results");    
});

app.get("/results", (req, res) => {
    res.render('results', {score: score, total: quizData.length});
});

app.listen(3000, () => {
    console.log("Server started at 3000");
});