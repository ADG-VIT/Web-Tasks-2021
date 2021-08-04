const arr = document.getElementsByTagName("input");
const btn = document.getElementById("3");
const var1 = document.getElementsByTagName("select");
var question = document.getElementById("questions");
btn.addEventListener("click", (e)=>{
    var count = 0
    for(let i = 0; i<3;i++){
        if(arr[i].value == ""){
            arr[i].classList.add("invalid");
            document.getElementById(`${i}`).style.display = "inline";
        } else {
            arr[i].classList.remove("invalid");
            count += 1;
        }
    }
    if(var1[0].value == ""){
        var1[0].classList.add("invalid");
        document.getElementById("select-span").style.display = "inline";
    } else {
        count += 1;
    }
    if (count != 4){
        e.preventDefault();
    }
});

const arr = [];

fetch("https://task-3-api.herokuapp.com/questions")
  .then((res) => res.json())
  .then((data) => console.log(data));
//   {
//     for (j = 0; j < data.length; j++) {
//       var obj = {};
//       obj["question"] = data[j].question;
//       obj["optionA"] = data[j].optionA;
//       obj["optionB"] = data[j].optionB;
//       obj["optionC"] = data[j].optionC;
//       obj["optionD"] = data[j].optionD;
//       obj["correctOption"] = data[j].correctOption;
//       arr.push(obj);
//     }
//   });

  var score = 0;
  var i = 0;
  function questions() {
    question.innerText = arr[i].question;
    document.getElementById("A").innerText = arr[i].optionA;
    document.getElementById("B").innerText = arr[i].optionB;
    document.getElementById("C").innerText = arr[i].optionC;
    document.getElementById("D").innerText = arr[i].optionD;
  }
  
  
var1[0].addEventListener("change", (e)=>{
    if(var1[0].value != ""){
        var1[0].classList.remove("invalid")
        document.getElementById("select-span").style.display = "none";
    }
})

// const timer = document.MediaQueryList(".timer")
