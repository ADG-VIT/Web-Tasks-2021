var balance = document.getElementById("balance");
var amount_plus = document.getElementById("amount-plus");
var amount_minus = document.getElementById("amount-minus");
var list = document.getElementById("list");
var form = document.getElementById("form");
var text = document.getElementById("text");
var amount = document.getElementById("amount");
var data=document.getElementById("data");

var localStoragetransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions =
  localStorage.getItem("transactions") !== null ? localStoragetransactions : [];


function addtransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    
  } else
{
    var transaction = {
      id: genenrateID(),
      text: text.value,
      amount: +amount.value,
      date:date.value
    };
    transactions.push(transaction);
    addtransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
    date.value="";
  }
}
//generate id
function genenrateID() {
  return Math.floor(Math.random() * 100000000);
}

//add transactions to dom list
function addtransactionDOM(transaction) {
  //get sign
  var sign = transaction.amount < 0 ? "-" : "+";
  var item = document.createElement("li");
  //add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transaction.date}  <span>${transaction.text}</span>
  <span>${sign}${Math.abs(transaction.amount )}<br>
    
    </span> <button class="delete-btn" onclick="removetransaction(${transaction.id })">x</button>`;
  list.appendChild(item);
}
//update the balance
function updateValues() {
  var amounts = transactions.map((transaction) => transaction.amount);
  var total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  var income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  var expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  amount_plus.innerText = `$${income}`;
  amount_minus.innerText = `$${expense}`;
}
//remove
function removetransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

//updatelocal storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//init
function init() {
  list.innerHTML = "";
  transactions.forEach(addtransactionDOM);
  updateValues();
}
init();

form.addEventListener("submit", addtransaction);
