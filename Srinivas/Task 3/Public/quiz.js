var qind = 0;
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

window.onload = function () {
    var fiveMinutes = 60 * 10,
        display = document.getElementById('time');
    startTimer(fiveMinutes, display);
    
    fetch("https://task-3-api.herokuapp.com/questions")
    .then(res => res.json())
    .then(data => {
        const Q = document.getElementById("Question");
        Q.innerText = data[qind].question;
        const id = document.getElementById("id");
        id.innerText = "Question "+ data[qind].questionId;
        arr = data;
    })
    .catch(err => console.log(err))

};

