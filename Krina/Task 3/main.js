// const quizDB = [
//     {
//         questionId: 1,
//         question: "Grand Central Terminal, Park Avenue, New York is the world's",
//         optionA: "Largest railway station",
//         optionB: "Highest railway station",
//         optionC: "Longest railway station",
//         optionD: "None of the above",
//         correctOption: "A"
//     },
//     {
//         questionId: 2,
//         question: "Entomology is the science that studies",
//         optionA: "Behavior of human beings",
//         optionB: "Insects",
//         optionC: "The origin and history of technical and scientific terms",
//         optionD: "The formation of rocks",
//         correctOption: "B"
//     },
//     {
//         questionId: 3,
//         question: "Eritrea, which became the 182nd member of the UN in 1993, is in the continent of",
//         optionA: "Asia",
//         optionB: "Africa",
//         optionC: "Europe",
//         optionD: "Australia",
//         correctOption:"B"
//     },
//     {
//         questionId: 4,
//         question: "For which of the following disciplines is Nobel Prize awarded?",
//         optionA: "Physics and Chemistry",
//         optionB: "Physiology or Medicine",
//         optionC: "Literature, Peace and Economics",
//         optionD: "All of the above",
//         correctOption: "D"
//     },
//     {
//         questionId: 5,
//         question: "Fire temple is the place of worship of which of the following religion?",
//         optionA: "Taoism",
//         optionB: "Judaism",
//         optionC: "Zoroastrianism (Parsi Religion)",
//         optionD: "Shintoism",
//         correctOption: "C"
//     },
//     {
//         questionId: 6,
//         question: "DRDL stands for",
//         optionA: "Defence Research and Development Laboratory",
//         optionB: "Department of Research and Development Laboratory",
//         optionC: "Differential Research and Documentation Laboratory",
//         optionD: "None of the above",
//         correctOption: "A"
//     },
//     {
//         questionId: 7,
//         question: "Who was the first Indian Chief of Army Staff of the Indian Army ?",
//         optionA: "Gen. K.M. Cariappa",
//         optionB: "Vice-Admiral R.D. Katari",
//         optionC: "Gen. Maharaja Rajendra Singhji",
//         optionD: "None of the above",
//         correctOption: "A"
//     },
//     {
//         questionId: 8,
//         question: "First Afghan War took place in the year",
//         optionA: "1848",
//         optionB: "1843",
//         optionC: "1833",
//         optionD: "1839",
//         correctOption: "D"
//     },
//     {
//         questionId: 9,
//         question: "Georgia, Uzbekistan and Turkmenistan became the members of UNO in",
//         optionA: "1991",
//         optionB: "1992",
//         optionC: "1993",
//         optionD: "1994",
//         correctOption: "B"
//     },
//     {
//         questionId: 10,
//         question: "During World War I, Germany was defeated in the Battle of Verdun on the western front and Romania declared war on the eastern front in the year",
//         optionA: "1914 AD",
//         optionB: "1915 AD",
//         optionC: "1916 AD",
//         optionD: "1917 AD",
//         correctOption: "C"
//     }
// ]
var question =document.getElementById("question");
var options = document.getElementsByClassName("answer");
var prev = document.getElementById("prev");
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
    document.getElementById("option1").innerText = dat[j].optionA;
    document.getElementById("option2").innerText = dat[j].optionB;
    document.getElementById("option3").innerText = dat[j].optionC;
    document.getElementById("option4").innerText = dat[j].optionD;
  }
//   var score = 0;
//   options.forEach((val) => {
//     val.addEventListener("click", () => {
//       if (val.checked) {
//         if (val.value === dat[j].correctOption) {
//           score++;
  
//           options.forEach((val) => {
//             val.classList.add("response");
//           });
//         } else {
//           score--;
  
//           options.forEach((val) => {
//             val.classList.add("response");
//           });
//         }
//       }
//     });
//   });
prev.addEventListener("click", () => {
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
      document.getElementById("prev").innerHTML.disabled=true;
    }
    else{
      document.getElementById("prev").innerHTML.disabled=false;
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

// function resultPage()
// {
//   document.getElementById("scores").innerHTML=score;
// }
  