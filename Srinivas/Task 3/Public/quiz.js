const Check = [0,0,0,0,0,0,0,0,0,0];
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds + " minutes left";

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

var obj = {};

window.onload = function () {
    var fiveMinutes = 60 * 10,
        display = document.getElementById('time');
    const spinner = document.getElementById("spinner");
    spinner.style.position = "absolute";
    spinner.style.top = "0";
    spinner.style.left = "0";
    spinner.style.height = "100vh";
    spinner.style.width = "100vw";
    spinner.style.backgroundColor = "white";
    spinner.style.opacity = "1";
    fetch("https://task-3-api.herokuapp.com/questions")
    .then(res => res.json())
    .then(data => {
        obj = [
            ...data
        ]
        handleQuestions(data);
        startTimer(fiveMinutes, display);
        spinner.style.display = "none"
        console.log(obj);
    })
};

var count = 0;
function handleQuestions(arr){
    document.getElementById("id").innerText = `Question ${count+1}`
    document.getElementById("Question").innerText = arr[count].question;
    document.getElementById("option1").innerText = arr[count].optionA;
    document.getElementById("option2").innerText = arr[count].optionB;
    document.getElementById("option3").innerText = arr[count].optionC;
    document.getElementById("option4").innerText = arr[count].optionD;
}

const ans = document.querySelectorAll(".ans");

document.getElementById("prev").addEventListener("click", (e)=>{
    if(count != 0){
        count -= 1;
    }
    ans.forEach((i)=>{
        i.checked = false;
    })
    handleQuestions(obj)
    if(count == 9){
        document.getElementById("next").innerText = "Submit";
    } else {
        document.getElementById("next").innerText = "Next";
    }
})

document.getElementById("next").addEventListener("click", (e)=>{
    count += 1;
    if(count <=9){
        ans.forEach((i)=>{
            i.checked = false;
        })
        handleQuestions(obj);
    }
    if(count == 9){
        console.log(count)
        document.getElementById("next").innerText = "Submit";
    } else if(count < 9) {
        document.getElementById("next").innerText = "Next";
    }

    if(count == 10){
        changeStuff();
    }
})

// const xml = new XMLHttpRequest();
// xml.open("POST", "/set");
// xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// xml.send();


ans.forEach((i)=>{
    i.addEventListener("click", (e)=>{
        const numQ = document.getElementById("id").innerText;
        Check[Number(numQ.split("Question ")[1])-1] = e.target.id;
    })
});


function changeStuff(){
    var total = 0;
    for(var i = 0; i<10 ;i++){
        if(Check[i] == obj[i].correctOption){
            total++;
        }
    }
    const bruh = document.getElementsByTagName("body");
    bruh[0].innerHTML = `<section id="topper"><div class="res"><div class="res-head"><h1>You Scored<br>${total}<br>out of 10</h1></div><div class="res-end"><form action="/res" method="post"><button type="submit">I wanna try again</button></form></div></div></section>`;
}