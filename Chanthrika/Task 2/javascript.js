var amount;
document.getElementById("form").addEventListener("submit",function(evt){
    evt.preventDefault();
    let form = document.getElementById("form");
    var e = form.elements[1].value;
    var descp = form.elements[0].value;
    var dt = form.elements[2].value;
    amount = parseInt(document.getElementById("amt").textContent,10);
    amount = amount + parseInt(e,10);
    amount.toString(10);
    document.getElementById("amt").innerHTML = amount;

    var paradesc = document.createElement("p");
    var descprition = document.createTextNode(descp);
    paradesc.appendChild(descprition);
    paradesc.classList.add("descpription");

    var paraexp = document.createElement("p");
    var expenses = document.createTextNode(e);
    paraexp.appendChild(expenses);
    paraexp.classList.add("expenses");

    var paradate = document.createElement("p");
    var date = document.createTextNode(dt);
    paradate.appendChild(date);
    paradate.classList.add("date");

    var btn = document.createElement("button");
    var btntext = document.createTextNode("Delete Expense");
    btn.appendChild(btntext);
    btn.classList.add("delete");
    btn.setAttribute("onclick","delExp(this)");

    var divn = document.createElement("div");
    divn.appendChild(paradesc);
    divn.appendChild(paraexp);
    divn.appendChild(paradate);
    divn.appendChild(btn);
    divn.classList.add("card");
    document.getElementById("exp").appendChild(divn);
});

function delExp(btn){
    amount = parseInt(document.getElementById("amt").innerHTML,10);
    amount = amount - parseInt(btn.parentNode.children[1].innerHTML,10);
    amount.toString();
    document.getElementById("amt").innerHTML = amount;
    btn.parentNode.remove();
}
