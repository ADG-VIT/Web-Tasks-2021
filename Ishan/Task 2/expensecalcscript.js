function budgetAlert(message, className) {
    if (document.querySelectorAll(".alert").length) {
      document.querySelectorAll(".alert")[0].remove();
    }
    var div = document.createElement("div");
    div.className = `alert alert-${className}`;
    var textNode = document.createTextNode(message);
    div.appendChild(textNode);
  
    var budgetForm = document.getElementById("budget-form");
    budgetForm.insertBefore(div, budgetForm.childNodes[0]);
  
    setTimeout(() => {
      document.querySelectorAll(".alert")[0].remove();
    }, 1000);
  }
  function budgetStore() {
    let budget = [];
    if (localStorage.getItem("budget") === null) {
      budget = [];
    } else {
      budget = JSON.parse(localStorage.getItem("budget"));
    }
    return budget;
  }
  function budgetColum(value) {
    Object.keys(value).forEach((val) => {
      var budgeAmount = document.getElementById("budget-amount");
      budgeAmount.textContent = value[val];
    });
  }
  function budgetList(budget) {
    Object.keys(budget).forEach((bud) => {
      budgetColum(budget[bud]);
    });
  }
  budgetRender();
  function budgetRender() {
    var budgeAmount = document.getElementById("budget-amount");
    budgeAmount.innerHTML = "";
    var budget = JSON.parse(localStorage.getItem("budget")) || [];
    budget.forEach((bud) => {
      budgetColum(bud);
    });
  }
  function addBudget(budget) {
    var budgeAmount = document.getElementById("budget-amount");
    var budgets = budgetStore();
    budgets.push(budget);
    localStorage.setItem("budget", JSON.stringify(budgets));
    budgetRender();
    document.getElementById("budget").value = "";
  }
  totalbudget();
  function totalbudget() {
    var budget = budgetStore();
    var total = 0;
    if (budget.length > 0) {
      total = budget.reduce(function (accu, curr) {
        accu += parseInt(curr.budget);
        return accu;
      }, 0);
    }
    var budgeAmount = document.getElementById("budget-amount");
    budgeAmount.textContent = total;
    return total;
  }
  showBalance();
  function showBalance() {
    var budget = totalbudget();
    var expense = totalExpense();
    var total = parseInt(budget - expense);
    var balanceAmount = document.getElementById("balance-amount");
    balanceAmount.innerText = total;
    return total;
  }
  var budgetForm = document.getElementById("budget-form");
  budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    var budget = document.getElementById("budget").value;
  
    if (budget == "" || budget < 0) {
      budgetAlert(
        "Please Provide a Budget and Do not Use Negative Budget",
        "danger"
      );
    } else {
      addBudget({ budget: budget });
      showBalance();
      budgetAlert("Budget Added Successfully", "success");
    }
  });
  function expenseAlert(message, className) {
    if (document.querySelectorAll(".alert").length) {
      document.querySelectorAll(".alert")[0].remove();
    }
    var div = document.createElement("div");
    div.className = `alert alert-${className}`;
    var textNode = document.createTextNode(message);
    div.appendChild(textNode);
  
    var expenseForm = document.getElementById("expense-form");
    expenseForm.insertBefore(div, expenseForm.childNodes[0]);
  
    setTimeout(() => {
      document.querySelectorAll(".alert")[0].remove();
    }, 1000);
  }
  function store() {
    let expense = [];
    if (localStorage.getItem("expense") === null) {
      expense = [];
    } else {
      expense = JSON.parse(localStorage.getItem("expense"));
    }
    return expense;
  }
  function tableColum(value, index) {
    var tr = document.createElement("tr");
    var tdIn = document.createElement("td");
    tdIn.innerHTML = index;
    tr.appendChild(tdIn);
    Object.keys(value).forEach((val) => {
      var td = document.createElement("td");
      td.innerHTML = value[val];
      tr.appendChild(td);
    });
    var td = document.createElement("td");
    var deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.innerHTML = "Delete";
    td.appendChild(deleteButton);
    tr.appendChild(td);
    deleteButton.addEventListener("click", () => {
      var expense = store();
      expense.splice(index - 1, 1);
      localStorage.setItem("expense", JSON.stringify(expense));
      renderExpense();
      clearExpense();
      totalExpense() - 1;
      showBalance() - 1;
      alert("Expense Deleted Successfully");
    });
    var expenseList = document.getElementById("expenselist");
    expenseList.appendChild(tr);
  }
  function expenseList(expense, index) {
    tableColum(index + 1);
    Object.keys(expense).forEach((exp) => {
      tableColum(expense[exp]);
    });
  }
  renderExpense();
  function renderExpense() {
    var expenseList = document.getElementById("expenselist");
    expenseList.innerHTML = "";
    var expense = JSON.parse(localStorage.getItem("expense")) || [];
  
    expense.forEach((exp, index) => {
      tableColum(exp, index + 1);
    });
  }
  function clearExpense() {
    document.getElementById("amount").value = "";
    document.getElementById("expense").value = "";
  }
  function addExpense(expense) {
    var expenses = store();
    expenses.push(expense);
    localStorage.setItem("expense", JSON.stringify(expenses));
    renderExpense();
    clearExpense();
  }
  totalExpense();
  function totalExpense() {
    var expense = store();
    var total = 0;
    if (expense.length > 0) {
      total = expense.reduce(function (accu, curr) {
        console.log(`${accu} ${curr.amount}`);
        accu += parseInt(curr.amount);
        return accu;
      }, 0);
    }
    var expenseAmount = document.getElementById("expense-amount");
    expenseAmount.innerHTML = total;
    return total;
  }
  var expenseForm = document.getElementById("expense-form");
  expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    var expenseTitle = document.getElementById("expense").value;
    var amount = document.getElementById("amount").value;
  
    if (expenseTitle == "" || amount == "" || amount < 0) {
      expenseAlert("Please Provide Expense Title and Amount ", "danger");
    } else {
      addExpense({ expenseTitle: expenseTitle, amount: amount });
      totalExpense();
      showBalance();
      expenseAlert("Expense Added Successfully", "success");
    }
  });