var question = document.getElementById("question");
var options = document.getElementsByName("op");
var next = document.getElementById("button");
var result = document.getElementById("result");
var playagain = document.querySelector(".dButton");
var nextContainer = document.querySelector(".disp-2");

const arr = [];

fetch("https://task-3-api.herokuapp.com/questions")
  .then((res) => res.json())
  .then((data) => {
    for (j = 0; j < data.length; j++) {
      var obj = {};
      obj["question"] = data[j].question;
      obj["optionA"] = data[j].optionA;
      obj["optionB"] = data[j].optionB;
      obj["optionC"] = data[j].optionC;
      obj["optionD"] = data[j].optionD;
      obj["correctOption"] = data[j].correctOption;
      arr.push(obj);
    }
  });

var score = 0;
var i = 0;
function questions() {
  question.innerText = arr[i].question;
  document.getElementById("one").innerText = arr[i].optionA;
  document.getElementById("two").innerText = arr[i].optionB;
  document.getElementById("three").innerText = arr[i].optionC;
  document.getElementById("four").innerText = arr[i].optionD;
}

options.forEach((val) => {
  val.addEventListener("click", () => {
    if (val.checked) {
      if (val.value === arr[i].correctOption) {
        score++;

        options.forEach((val) => {
          val.classList.add("response");
        });
      } else {
        score--;

        options.forEach((val) => {
          val.classList.add("response");
        });
      }
    }
  });
});

next.addEventListener("click", () => {
  i++;
  if (i < arr.length) {
    questions();

    options.forEach((value) => {
      options.forEach((val) => {
        val.checked = false;
      });
      value.classList.remove("response");
    });
  } else {
    console.log("end");
    result.classList.remove("display");
    playagain.classList.remove("display");
    nextContainer.classList.add("display");

    result.innerHTML = "You Scored :" + " " + score + "/" + arr.length;
  }
});


function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = "Time left" + " "+ ":" +" " + minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}
var tottime = 60 * 10,
  display = document.getElementById("time");
startTimer(tottime, display);
