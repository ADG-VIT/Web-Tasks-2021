const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
var count = 0;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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
    res.sendFile(__dirname + "/quiz.html");
});

app.post("/quiz", (req, res) => {
    var score = req.body.score;
    var total = req.body.total;
    
    res.sendFile(__dirname + "/results.html");
});

app.listen(3000, () => {
    console.log("Server started at 3000");
});