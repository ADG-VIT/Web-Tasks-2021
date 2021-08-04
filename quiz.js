var question = document.getElementById("questions");
var option = document.getElementsByName("option");
var next = document.getElementById("next");
var previous = document.getElementById("prev");
var result = document.getElementById("result");
var button = document.querySelector(".btn1");
var A = document.getElementById("option1");
var B = document.getElementById("option2");
var C = document.getElementById("option3");
var D = document.getElementById("option4");
var questioId = document.getElementById("question-number");

const arr = [];

fetch("https://task-3-api.herokuapp.com/questions")
  .then((response) => response.json())
  .then(
    (
      data // console.log(data));
    ) => {
      for (j = 0; j < data.length; j++) {
        var obj = {};
        obj["questionId"] = data[j].questionId;
        obj["question"] = data[j].question;
        obj["optionA"] = data[j].optionA;
        obj["optionB"] = data[j].optionB;
        obj["optionC"] = data[j].optionC;
        obj["optionD"] = data[j].optionD;
        obj["correctOption"] = data[j].correctOption;
        arr.push(obj);
        // console.log(obj);
      }
    }
  );

var score = 0;
var i = 0;
function questions() {
  questioId.innerText = arr[i].questionId;
  question.innerText = arr[i].question;
  A.innerText = arr[i].optionA;
  B.innerText = arr[i].optionB;
  C.innerText = arr[i].optionC;
  D.innerText = arr[i].optionD;
}

option.forEach((val) => {
  val.addEventListener("click", () => {
    if (val.checked) {
      if (val.value === arr[i].correctOption) {
        score++;

        option.forEach((val) => {
          val.classList.add("response");
        });
      } else {
        score--;

        option.forEach((val) => {
          val.classList.add("response");
        });
      }
    }
  });
});

const ans = document.querySelectorAll(".ans");

// Previous button
previous.addEventListener("click", () => {
  if (i != 0) {
    i -= 1;
  }
  questions();

  value.classList.remove("response");
});

// next button
next.addEventListener("click", () => {
  i++;
  if (i < arr.length) {
    questions();

    option.forEach((value) => {
      option.forEach((val) => {
        val.checked = false;
      });
      value.classList.remove("response");
    });
  } else {
    resultPage();
  }
  if (i == 9) {
    next.innerText = "Submit";
  } else {
    next.innerText = "Next";
  }
});

function resultPage() {
  const container = document.querySelector(".quiz-container");
  container.innerHTML = "";
  const result = document.getElementsByTagName("body");
  result[0].innerHTML = `<div class="res"><div class="scor"><h1>You Scored: <span>${score}</span> out of 10</h1></div><div class="res-end"><form method="post"><button type="submit" href="quiz.html">Play again!</button></form></div></div>`;
}

var totaltime = 60 * 10 - 1,
  display = document.getElementById("clock");
startTimer(totaltime, display);

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds + "minute left";

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}
