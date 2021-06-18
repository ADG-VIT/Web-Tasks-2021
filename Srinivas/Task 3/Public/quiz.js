const arr = [];
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

document.getElementById("prev").addEventListener("click", (e)=>{
    if(count != 0){
        count -= 1;
    }
    handleQuestions(obj)
})

document.getElementById("next").addEventListener("click", (e)=>{
    if(count != 9){
        count += 1;
    }
    handleQuestions(obj);
})