const balance = document.getElementById("total-amt");
const income = document.getElementById("earn-amt");
const expense = document.getElementById("spend-amt");
const list = document.getElementById("list");
const form = document.getElementById("form");
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const msg = document.querySelector(".msg");

form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (desc.value === "" || amount.value === "" || date.value === "") {
    msg.classList.add("error");
    msg.innerHTML = "Please enter all field.";
    setTimeout(() => msg.remove(), 3000);

  } else {

    var trans = document.createElement("tr");

    var td1 = document.createElement("td");
    td1.innerHTML = desc.value;
    trans.appendChild(td1);
  
    var td2 = document.createElement("td");
    td2.innerHTML = "Rs. " + amount.value;
    trans.appendChild(td2);
  
    var td3 = document.createElement("td");
    td3.innerHTML =
      date.value;
      trans.appendChild(td3);

      if (Number(amount.value) < 0) {
        expense.innerHTML = Number(expense.innerHTML) - Number(amount.value);
    } else {
        income.innerHTML = Number(income.innerHTML) + Number(amount.value);
    }

    balance.innerHTML = Number(balance.innerHTML) + Number(amount.value);

    list.appendChild(trans);

    desc.value = '';
    amount.value = '';
    date.value = '';
  }
}