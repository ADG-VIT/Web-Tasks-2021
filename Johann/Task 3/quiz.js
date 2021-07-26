var question = document.getElementById("Q");
var options = document.querySelectorAll("label");
var choice = document.querySelectorAll("input");
num = 0;
score=0;
var questions = [];
var mychoices = ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]

fetch("https://task-3-api.herokuapp.com/questions")
    .then(res => {
        return res.json();
    }).then(loadedQuestions => {
        questions = loadedQuestions;
        NextQuestion();
        document.querySelectorAll("button")[0].style.visibility = "hidden";
    });

function QuestionDetails() {
    question.innerHTML = questions[num - 1]["question"];
    options[0].innerHTML = questions[num - 1]["optionA"];
    options[1].innerHTML = questions[num - 1]["optionB"];
    options[2].innerHTML = questions[num - 1]["optionC"];
    options[3].innerHTML = questions[num - 1]["optionD"];
    if (mychoices[num - 1] != "-") {
        document.getElementById(mychoices[num - 1]).checked = true;
    }
    else {
        for (i = 0; i < choice.length; i++) {
            choice[i].checked = false;
        }
    }
}

function ansCheck() {
    for (i = 0; i < choice.length; i++) {
        if (choice[i].checked == true) {
            mychoices[num - 1] = choice[i].value;
        }
    }
}

function NextQuestion() {
    num++;
    document.querySelector("h3").innerHTML = "Question " + num;
    QuestionDetails();
}

function PreQuestion() {
    num--;
    document.querySelector("h3").innerHTML = "Question " + num;
    QuestionDetails();
}


document.querySelectorAll("button")[1].addEventListener("click", function () {
    ansCheck();
    if (num == 9) {
        document.querySelectorAll("button")[1].innerText = "Submit";
        NextQuestion();
    }
    else if (num == 10) {
        for(i=0;i<10;i++){
            if(mychoices[i]==questions[i]["correctOption"]){
                score++;
            }
        }
        sessionStorage.setItem("score",score);
        window.open("result.html", "_self")
    }
    else {
        NextQuestion();
        document.querySelectorAll("button")[0].style.visibility = "visible";
        document.querySelectorAll("button")[1].innerText = "Next";
    }
})

document.querySelectorAll("button")[0].addEventListener("click", function () {
    ansCheck();
    if (num == 2) {
        document.querySelectorAll("button")[0].style.visibility = "hidden";
        PreQuestion();
    }
    else if(num==10){
        score=0;
        PreQuestion();
        document.querySelectorAll("button")[1].innerText = "Next";
    }
    else {
        PreQuestion();
        document.querySelectorAll("button")[1].style.visibility = "visible";
        document.querySelectorAll("button")[1].innerText = "Next";
    }
})


//Countdown Timer
var currentDate = new Date();
var countDownDate = new Date();
countDownDate.setTime(currentDate.getTime() + (5 * 60 * 1000));

var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("time").innerHTML = minutes + " : " + seconds + " mins left";
    if (distance < 0) {
        clearInterval(x);
        for (i = 0; i < 10; i++) {
            if (mychoices[i] == questions[i]["correctOption"]) {
                score++;
            }
        }
        sessionStorage.setItem("score", score);
        window.open("result.html", "_self")
    }
}, 1000);