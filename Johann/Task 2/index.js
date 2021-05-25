var expense = [];
var total = 0;
var noOfdiv = 0;

document.querySelector("h2").innerHTML = "Total : ₹" + total;
document.querySelector(".btn").addEventListener("click", addExpenseBox);
document.addEventListener("keypress", function(event){
    if(event.key==="Enter"){
        addExpenseBox();
    }
});

function addExpenseBox() {
    var des = document.querySelectorAll("input")[0].value;
    var exp = document.querySelectorAll("input")[1].value;
    var date = document.querySelectorAll("input")[2].value;
    if (des === "" || exp === "" || date === "") {
        alert("Please Fill in All Details");
    }
    else {
        // expense.push(new ExpenseDetails(des, exp, date));
        for (i = 0; i < 3; i++) {
            document.querySelectorAll("input")[i].value = "";
        }
        total += parseInt(exp);
        document.querySelector("h2").innerHTML = "Total : ₹" + total;

        noOfdiv++;
        var newElm = document.createElement("div");
        newElm.innerHTML = "<button>X</button><p>" + des + "</p><p>₹" + exp + "</p><p>" + date + "</p>"
        document.querySelector(".expenseContainer").appendChild(newElm);


        getBackgroundColor();

        // for (i = 1; i <= noOfdiv; i++) {
        //     document.querySelectorAll("div")[i].querySelector("button").addEventListener("click", function () {
        //         var rem = document.querySelector(".expenseContainer")
        //         rem.removeChild(rem.childNodes[i]);
        //         noOfdiv--;
        //     })
        // }

        // var i= noOfdiv;
        // document.querySelectorAll("div")[i].querySelector("button").addEventListener("click", function () {
        //         var rem = document.querySelector(".expenseContainer")
        //         rem.removeChild(document.querySelectorAll("div")[i]);
        //         noOfdiv--;
        //         i--;
        //     })
        var i= noOfdiv;
        document.querySelectorAll("div")[i].querySelector("button").addEventListener("click", function (event) {
            var close = event.target;
            total-=parseInt(exp);
            document.querySelector("h2").innerHTML = "Total : ₹" + total;
            close.closest("div").remove();
            noOfdiv--;
            getBackgroundColor()
        })
    }
}

function getBackgroundColor(){
    for(i=1;i<=noOfdiv;i++){
        if(i%2===0){
            document.querySelectorAll("div")[i].style.backgroundColor ="#4ca1a3";
        }
        else{
            document.querySelectorAll("div")[i].style.backgroundColor = "#a5e1ad";
        }
    }
}

getBackgroundColor();


