const apiurl = "https://task-3-api.herokuapp.com/questions";
var qno = parseInt(document.getElementById("qno").innerHTML, 10);
var total = document.getElementById("score").innerHTML;
var score = 0;

async function setQuestion(){
  const res = await fetch (apiurl);
  var Data = await res.json();
  document.getElementById("qno").innerHTML = Data[qno - 1].questionId;
  document.getElementById("question").innerHTML = Data[qno - 1].question;
  document.getElementById("optionA").innerHTML = Data[qno - 1].optionA;
  document.getElementById("optionB").innerHTML = Data[qno - 1].optionB;
  document.getElementById("optionC").innerHTML = Data[qno - 1].optionC;
  document.getElementById("optionD").innerHTML = Data[qno - 1].optionD;
}

function timer(){
  var countDownDate = new Date( Date.parse(new Date()) + 10*60*1000).getTime();
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = minutes + ":" + seconds + " mins left";
    if (distance < 0) {
      clearInterval(x);
      onclick(location.href="results.html");
    }
  }, 1000);
}

async function next(){
  qno += 1;
  setQuestion();
  score = score+1;
  if(qno == 10){
    document.getElementById("nextbtn").innerHTML = "Submit";
    document.getElementById("nextbtn").setAttribute("onclick", "submit()");
  }
}

async function previous(){
  if(qno > 1){
    qno -= 1;
    setQuestion();
  }
  if(qno == 9){
    document.getElementById("nextbtn").innerHTML = "Next";
    document.getElementById("nextbtn").setAttribute("onclick", "next()");
  }
}

function quiz(){
  setQuestion();
  timer();
}

function submit(){
  location.href = 'results.html';
}

function displayScore(){
  score.toString;
  total = score;
}