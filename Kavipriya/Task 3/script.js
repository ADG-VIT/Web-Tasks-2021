function countdown( ele, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }
    function updateTimer()
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
           alert("Time is up");
           onclick(location.href="result.html");
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() +"  mins left");
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    element = document.getElementById( ele );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}

countdown( "timer", 10, 0 );

var question=document.getElementById("question");
var options = document.getElementsByName("option");
var pre = document.getElementById("pre");
var next = document.getElementById("next");
var result = document.getElementById("result");

const dat = [];

fetch("https://task-3-api.herokuapp.com/questions")
  .then((res) => res.json())
  .then((data) => {
    for (i= 0; i < data.length; i++) {
      var elem= {};
      elem["question"] = data[i].question;
      elem["optionA"] = data[i].optionA;
      elem["optionB"] = data[i].optionB;
      elem["optionC"] = data[i].optionC;
      elem["optionD"] = data[i].optionD;
      elem["correctOption"] = data[i].correctOption;
      dat.push(elem);
    }
  });


var j = 0;
function questions() {
  question.innerText = dat[j].question;
  document.getElementById("opt1").innerText = dat[j].optionA;
  document.getElementById("opt2").innerText = dat[j].optionB;
  document.getElementById("opt3").innerText = dat[j].optionC;
  document.getElementById("opt4").innerText = dat[j].optionD;
}

var score = 0;
options.forEach((val) => {
  val.addEventListener("click", () => {
    if (val.checked) {
      if (val.value === dat[j].correctOption) {
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

pre.addEventListener("click", () => {
    j--;
    if (j < dat.length) {
      questions();
  
        options.forEach((val) => {
          val.checked = false;
        });
      
    }} );
    

next.addEventListener("click", () => {
  j++;
  if (j < dat.length) {
    questions();
      options.forEach((val) => {
        val.checked = false;
      });
     
  }
  if(j===0)
    {
      document.getElementById("pre").innerHTML.disabled=true;
    }
    else{
      document.getElementById("pre").innerHTML.disabled=false;
    }
  if(j===9)
  {
    document.getElementById("next").innerHTML="Submit";
  }
  else{
    document.getElementById("next").innerHTML="Next";
  }
  if(j===10)
  {
   
    onclick(location.href="result.html");
  }
  
});

function resultPage()
{
  document.getElementById("scores").innerHTML=score;
}
