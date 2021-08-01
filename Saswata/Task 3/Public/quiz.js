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
    var tenMinutes = 60 * 10,
        display = document.getElementById('clock');

    fetch("https://task-3-api.herokuapp.com/questions")
        .then(res => res.json())
        .then(questions => {
            obj = [
                ...questions
            ]
            handler(questions);
            startTimer(tenMinutes, display);

        })


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

document.getElementById("prev").addEventListener("click", (e) => {
    if (c != 0) {
        c -= 1;
    }
    ans.forEach((i) => {
        i.checked = false;
    })
    handler(obj)

})

document.getElementById("next").addEventListener("click", (e) => {
    c += 1;
    if (c <= 9) {
        ans.forEach((i) => {
            i.checked = false;
        })
        handler(obj);
    }
    if (c == 9) {
        console.log(c)
        document.getElementById("next").innerText = "Submit";
    } else if (c < 9) {
        document.getElementById("next").innerText = "Next";
    }

    if (c == 10) {
        result();
    }
})

ans.forEach((i) => {
    i.addEventListener("click", (e) => {
        const qNum = document.getElementById("ques").innerText;
        Check[Number(qNum.split("Question ")[1]) - 1] = e.target.id;
    })
});

function result() {
    var total = 0;
    for (var i = 0; i < 10; i++) {
        if (Check[i] == obj[i].correctOption) {
            total++;
        }
    }

}