var heading = document.querySelector(".main_head");
var question = document.querySelector(".question");
var options = Array.from(document.querySelectorAll(".option"));
var options_div = Array.from(document.querySelectorAll(".container"));
var prev=document.querySelector(".prev");
var next=document.querySelector(".next");
var progress_fill=document.querySelector(".progress_fill");
var loader=document.querySelector(".loader");
var main=document.querySelector(".main");
var time=document.querySelector(".time_main")


var curr_ques={};
var score=0;
var questionCounter=0;
let available_questions = [];

function convert(alphabet)
{
    if(alphabet==="A")
    {
        return 1;
    }
    else if(alphabet==="B")
    {
        return 2;
    }
    else if(alphabet==="C")
    {
        return 3;
    }
    else if(alphabet==="D")
    {
        return 4;
    }
}


fetch("https://task-3-api.herokuapp.com/questions")
    .then(res=>{
        return res.json();
    })
    .then(loadedQuestions=>{
        available_questions=loadedQuestions.map((item,index)=>{
            const required_question={
                question: item.question,
                choice1: item.optionA,
                choice2: item.optionB,
                choice3: item.optionC,
                choice4: item.optionD,
                answer: convert(item.correctOption)
            }
            return required_question;
        });
        startTimer(10);
        startGame();
    })
    .catch(err=>{
        console.log(err);
    });


var max=available_questions.length;

function startGame()
{
    questionCounter=0;
    score=0;
    max=available_questions.length;
    progress_fill.style.width=((questionCounter+1)/max)*100+'%';
    getNextQuestion();
}


function getNextQuestion()
{
    curr_ques=available_questions[questionCounter];
    heading.innerText='Question '+(questionCounter+1);
    question.innerHTML="<p>"+curr_ques.question+"</p>";
    options.map((item)=>{
        const number=item.dataset["number"]
        item.innerText=curr_ques['choice'+number];
    })
}

var selected=[];

options_div.map((item)=>{
    item.addEventListener("click",function(event){
        var circleList=Array.from(document.querySelectorAll(".circle"));
        circleList.map((item)=>{
            const list=Array.from(item.classList);
            if(list.includes("colour"))
            {
                item.classList.remove("colour");
            }
        })
        const selected_answer=event.target.dataset['number'];
        selected[questionCounter]=selected_answer;
        var circle=item.firstElementChild;
        circle.classList.add("colour")
    })
})

prev.addEventListener("click",function (){
    if(questionCounter==0)
    {
        alert("This is the start of the test");
    }
    else
    {
        next.innerText="Next"; 
        questionCounter--;
        progress_fill.style.width=((questionCounter+1)/max)*100+'%';
        var circleList=Array.from(document.querySelectorAll(".circle"));
        circleList.map((item,index)=>{
            const list=Array.from(item.classList);
            if(list.includes("colour"))
            {
                item.classList.remove("colour");
            }
            if(selected[questionCounter]==(index+1))
            {
                item.classList.add("colour");
            }
        })
        getNextQuestion();
    }   
});

next.addEventListener("click",function (){
    if((questionCounter+1)==max)
    {
        setScore();
        localStorage.setItem("mostRecentScore",score);
        localStorage.setItem("max",max);
        return window.location.assign("./results.html"); 
    }
    else
    {
        questionCounter++;
        progress_fill.style.width=((questionCounter+1)/max)*100+'%';
        if(questionCounter+1==max)
        {
            next.innerText="Submit"; 
        }
        var circleList=Array.from(document.querySelectorAll(".circle"));
        circleList.map((item,index)=>{
            const list=Array.from(item.classList);
            if(list.includes("colour"))
            {
                item.classList.remove("colour");
            }
            if(selected[questionCounter]==(index+1))
            {
                item.classList.add("colour");
            }
        })
        getNextQuestion();
    }
});

function startTimer(timer)
{
    let timer_counter= timer*60;
    setInterval(function (){
        loader.classList.add("hidden");
        main.classList.remove("hidden");
        let minutes=Math.floor(timer_counter/60);
        let seconds = timer_counter%60;
        seconds=seconds<10 ? '0'+seconds : seconds;
        minutes=minutes<10 ? '0'+minutes : minutes;
        time.innerText=minutes+':'+seconds;
        if(timer_counter==0)
        {
            setScore();
            localStorage.setItem("mostRecentScore",score);
            localStorage.setItem("max",max);
            return window.location.assign("./results.html"); 
        }
        timer_counter--;
    },1000)
}

function setScore()
{
    selected.map((answer,index)=>{
        if(answer==available_questions[index].answer)
        {
            score++;
        }
    })
}