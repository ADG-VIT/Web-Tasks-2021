var expenses = [];

window.addEventListener("DOMContentLoaded", function() {
    loadExpense();
}, false);

function loadExpense() {
    var exp = JSON.parse(localStorage.getItem("expenses"));
    for(var i = 0; i < exp.length; i++)
        addTasks(exp[i]);
}

function totalExpense() {
    total = 0;
    for(var i in expenses) {
        total += expenses[i].expense;
    }
    return total;
}

function updateExpense() {
    var expense = totalExpense();
    document.getElementById('total-expense').innerHTML = `Rs ${expense}`;
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addTasks(e) {
    expenses.push(e);
    // Create an element with unique id
    const element = document.createElement("div");
    element.classList.add('task-card');
    element.id = e.key;
    element.innerHTML = `
    <button name=${e.key} onclick="deleteElement(event)" class="close-button" aria-label="Close">&#215</button>
    <p>Description:</p>
    <h1>${e.description}</h1>
    <h2><b>Expenditure:</b> Rs ${e.expense}</h2>
    <h2><b>Date:</b> ${e.date}</h2>
    `;
    document.getElementById('all-tasks').appendChild(element);
    updateExpense();
}

function createKey()
{
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 10; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    for ( var i = 0; i < expenses.length; i++){
        if(expenses.key === result)
            createKey();
    }
    return result;
}

function formSubmit() {
    desc = document.getElementById('description').value;
    amt = document.getElementById('expense').value;
    dat = document.getElementById('date').value;
    var key = createKey();
    const info = {
        key: key,
        description: desc,
        expense: parseFloat(amt),
        date: dat
    };

    if(amt > 0) {
        addTasks(info);
    }

    document.getElementById('app-expense').reset();
}

function deleteAll()
{
    if(confirm('Are you sure you want delete everything?')) {
        expenses = [];
        updateExpense();
        document.getElementById('all-tasks').innerHTML = "";
    }
}

function deleteElement(event)
{
    var id = event.toElement.name;
    var task = document.getElementById(id);
    var index = expenses.findIndex(a => a.key === id);
    if(index != -1) {
        expenses.splice(index,1);
        document.getElementById('all-tasks').removeChild(task);
        updateExpense();
    } 
}

function exportExpenditure() {
    const dataStr = JSON.stringify(Object.assign({}, expenses));
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    let exportFileDefaultName = 'data.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}