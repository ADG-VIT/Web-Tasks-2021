var quizData = [];
var count = 0;
var score = 0;
var timer;

fetch("https://task-3-api.herokuapp.com/questions")
  .then((res) => res.json())
  .then((data) => {
    quizData = data;
    firstTime();
  });

$("#nextButton").click(() => {
    var correctOption = quizData[count].correctOption

    if ($('input[name="options"]:checked').val() === correctOption) {
      score++;
      $("#answerStatus").addClass("correct");
      $("#answerStatus").text("Your answer is correct!");
      setQuestion();

    } else if ($('input[name="options"]:checked').val() === undefined) {
      $("#answerStatus").text("Choose an option!");

    } else {
      $("#answerStatus").addClass("wrong");
      $("#answerStatus").text("Your answer is incorrect!");
      setQuestion();
    }
});

function setQuestion() {
  clearInterval(timer);
  count++;

  setTimeout(() => {
    if (count < quizData.length) {
      $("#answerStatus").removeClass("correct wrong");
      $("#answerStatus").text("");
      $(".form-check-input").prop('checked', false);
      $("#questionNum").text("Question " + quizData[count].questionId);
      $("#question").text(quizData[count].question + " _____________.");
      $("#optionA").text(quizData[count].optionA);
      $("#optionB").text(quizData[count].optionB);
      $("#optionC").text(quizData[count].optionC);
      $("#optionD").text(quizData[count].optionD);
      $("#time").text("00:20");
      if (count == quizData.length - 1)
        $("#nextButton").text("Submit"); 
    
      var time = 20;
      $("#time").removeClass("wrong");
      timer = setInterval(() => {
      time--;
      if (time < 10)
        $("#time").text("00:0" + time);
      else 
        $("#time").text("00:" + time);
      if (time <= 5)
        $("#time").addClass("wrong");
      if (time == 0) {
        clearInterval(timer);
        $("#answerStatus").addClass("wrong");
        $("#answerStatus").text("Time's up!");
        setQuestion();
      } 
    }, 1000);
  } else
    $.post("/quiz", {score: score, total: quizData.length});
  }, 1000);
}

function firstTime() {
    $(".form-check-input").prop('checked', false);
    $("#questionNum").text("Question " + quizData[0].questionId);
    $("#question").text(quizData[0].question + " _____________.");
    $("#optionA").text(quizData[0].optionA);
    $("#optionB").text(quizData[0].optionB);
    $("#optionC").text(quizData[0].optionC);
    $("#optionD").text(quizData[0].optionD);
    $("#loading").hide();
    $(".holder").show();

    var time = 20;
    $("#time").removeClass("wrong");
    timer = setInterval(() => {
    time--;
    if (time < 10)
      $("#time").text("00:0" + time);
    else 
      $("#time").text("00:" + time);
    if (time <= 5)
      $("#time").addClass("wrong");
    if (time == 0) {
      clearInterval(timer);
      $("#answerStatus").addClass("wrong");
      $("#answerStatus").text("Time's up!");
      setQuestion();
    }  
  }, 1000);
}