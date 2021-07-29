function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var tenMinutes = 60 * 10,
        display = document.querySelector('#time');

    fetch("https://task-3-api.herokuapp.com/questions")
        .then(res => res.json())
        .then(questions => {
            obj = [questions]

            startTimer(tenMinutes, display);
        })
        .catch((error) => {
            console.error('Error:', error);
        }

};

var c = 0;

function handler(arr) {
    document.getElementById("qNo").innerText = `Question ${c + 1}`
    document.getElementById("ques").innerText = arr[c].question;
    document.getElementById("A").innerText = arr[c].optionA;
    document.getElementById("B").innerText = arr[c].optionB;
    document.getElementById("C").innerText = arr[c].optionC;
    document.getElementById("D").innerText = arr[c].optionD;
}

const ans = document.querySelectorAll(".ans1");