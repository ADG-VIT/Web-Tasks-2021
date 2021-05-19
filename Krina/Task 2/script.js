const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense =document.getElementById('expense');
const list = document.getElementById('list');
const form =document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount')
const date = document.getElementById('date')
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
function addTransaction(e){
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('please add text and amount')
  }else{
    const transaction = {
      id:generateID(),
      text: text.value,
      amount:+amount.value,
      date: date.value

    }

    transactions.push(transaction);
    addTransactionDOM(transaction);

    updateValues();
    updateLocalStorage();
    text.value='';
    amount.value='';
    date.value='';
  }
}
function generateID(){
  return Math.floor(Math.random()*1000000000);
}


function addTransactionDOM(transaction) {

  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");


  item.classList.add(
    transaction.amount < 0 ? "expense" : "income"
  );

  item.innerHTML = `

    <b>Amount:
    <span>${sign}${Math.abs(transaction.amount)}</span>
    <b><br>Description : ${transaction.text}<br>
    Date: ${transaction.date}
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
  list.appendChild(item);
}
function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  Init();
}
function updateValues() {
  const amounts = transactions.map(
    (transaction) => transaction.amount
  );
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const expense =(amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *-1).toFixed(2);

    balance.innerText=`Rs${total}`;
    income.innerText = `Rs${income}`;
    expense.innerText = `Rs${expense}`;
}
function updateLocalStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}
function Init(){
  list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}
Init();

form.addEventListener('submit',addTransaction);
