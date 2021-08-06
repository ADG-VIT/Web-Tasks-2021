
const nextbutton = document.querySelector(".next");
const previousbtn = document.querySelector(".previous");
const ans = document.querySelectorAll(".answer");
let score = 0;


var totalTime = 60*10-1;
var display = document.getElementById("time");
startTimer(totalTime,display);

function startTimer(duration,display){
    var timer = duration;
    var minutes;
    var seconds;
    setInterval(function()  {
        minutes = parseInt(timer / 60 , 10);
        seconds = parseInt(timer % 60 , 10);

        minutes = minutes < 10 ? "0" + minutes:minutes;
        seconds = seconds < 10 ? "0" + seconds:seconds;

        display.textContent = minutes + ":" +seconds + "minute left";

        if(--timer < 0){
            timer = duration;
        }
    }, 1000);
                
}


function checkanswer(counter){
    let selectedoption = document.querySelector('input[name="choice"]:checked').value;
    console.log(selectedoption);
    if(selectedoption==arr[counter].correctOption){
      score++;
    }
    //console.log(score);
}

var counter = 0;
let arr =[];
var quizData;


fetch("https://task-3-api.herokuapp.com/questions")
.then(res=>res.json())
.then(data =>{
    quizData = data;
    printQuestions(quizData,counter);
    for(var j=0;j<data.length;j++){
        var obj ={};
        obj["correctOption"] = data[j].correctOption;
        arr.push(obj);
    }
    
})




function printQuestions(quizData,counter){
    document.getElementById("question-number").innerText = quizData[counter].questionId;
    document.getElementById("question-box").innerText = quizData[counter].question;
    document.getElementById("op1").innerText = quizData[counter].optionA;
    document.getElementById("op2").innerText = quizData[counter].optionB;
    document.getElementById("op3").innerText = quizData[counter].optionC;
    document.getElementById("op4").innerText = quizData[counter].optionD;
    
}



nextbutton.addEventListener("click",(e)=>{
    checkanswer(counter);
    counter +=1;
    if(counter <=9){
        ans.forEach((i)=>{
            i.checked = false;
            
        })
        printQuestions(quizData,counter);
    }
    if(counter == 9){
        nextbutton.innerText = "Submit";
    }
    
    else if(counter<9){
        nextbutton.innerText = "Next";
    }
    if (counter==10){
        lastpage();
    }
    
    
});

previousbtn.addEventListener("click",function(){
    if(counter !=0){
        counter -=1;
    }
    
    printQuestions(quizData,counter);
    if(counter == 9){
        nextbutton.innerText = "Submit";
    }else {
        nextbutton.innerText = "Next";
    }
    
});


function lastpage(){
  const result = document.getElementsByTagName("body");
  result[0].innerHTML = `<div class="res"><div class="scor"><h1>You Scored: <span>${score}</span> out of 10</h1></div><div class="res-end"><form method="post"><button type="submit" href="quiz.html">Play again!</button></form></div></div>`;
}

























    






















