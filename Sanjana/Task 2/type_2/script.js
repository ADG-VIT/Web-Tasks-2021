class UI {
    
    constructor() {
      this.budgetFeedback = document.querySelector(".budget-feedback");
      this.expenseFeedback = document.querySelector(".expense-feedback");
      this.budgetForm = document.getElementById("budget-form");
      this.budgetInput = document.getElementById("budget-input");
      this.budgetAmount = document.getElementById("budget-amount");
      this.expenseAmount = document.getElementById("expense-amount");
      this.balance = document.getElementById("balance");
      this.balanceAmount = document.getElementById("balance-amount");
      this.expenseForm = document.getElementById("expense-form");
      this.expenseInput = document.getElementById("expense-input");
      this.amountInput = document.getElementById("amount-input");
      this.expenseList = document.getElementById("expense-list");
      this.dateInput=document.getElementById("date");
      this.itemList = [];
      this.itemID = 0;
    }
    //submit budget method 
    submitBudgetForm(){
       const value =this.budgetInput.value;
       if (value===''|| value<0)
       {
           this.budgetFeedback.classList.add('showItem');
           this.budgetFeedback.innerHTML='<p>value cannot be empty or negative</p>';
           //to hide the error msg after sometime
           const self =this;//without the self pointer to the class error occurs as this @28 points to global parameter and cant access the constructors info
           setTimeout(function(){
            self.budgetFeedback.classList.remove('showItem');
           },4000);
       }
       else
       {
           this.budgetAmount.textContent=value;
           this.budgetInput.value='';
           this.showBalance();

       }
    }
    //show balance
    showBalance()
    {
        const expense=this.totalExpense();
        const total =parseInt(this.budgetAmount.textContent)-expense;
        this.balanceAmount.textContent=total;
        if(total<0){
            this.balance.classList.remove('showGreen','showBlack');
            this.balance.classList.add("showRed")
        }
        if(total>0){
            this.balance.classList.remove('showRed','showBlack');
            this.balance.classList.add("showGreen")
        }
        if(total===0){
            this.balance.classList.remove('showRed','showBlack');
            this.balance.classList.add("showBlack")
        }


    }
    //submit expense form ASK SENIORS WHY THIS PART ISNT WORKING SAME CONCEPT USED AS 
    //SUBMIT BUDGET METHOD
    submitExpenseForm() {
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;
        const dateValue = this.dateInput.value;
        console.log(amountValue);
    
        if (expenseValue === "" || amountValue === "" || amountValue < 0) {
          this.expenseFeedback.classList.add("showItem");
          this.expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`;
          const self = this;
          setTimeout(function() {
            self.expenseFeedback.classList.remove("showItem");
          }, 3000);
        } else {
          let amount = parseInt(amountValue);
          this.expenseInput.value = "";
          this.amountInput.value = "";
          this.dateInput.value="";
          let expense = {
            id: this.itemID,
            title: expenseValue,
            amount: amount
          };
          this.itemID++;
          this.itemList.push(expense);
          this.addExpense(expense);
          this.showBalance();
        }
      }
     // add expense
  addExpense(expense) {
    const div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">
       <h6 class="expense-title mb-0 text-uppercase list-item">- ${
         expense.title
      }</h6>
       <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
       <!-- icons -->
      <div class="expense-icons list-item">
          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
      </div>
   `;
    this.expenseList.appendChild(div);
  }
    //calculate total expense
  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce(function(acc, curr) {
        acc += curr.amount;
        return acc;
      }, 0);
    }
    this.expenseAmount.textContent = total;
    return total;
  }
  // edit expense
  editExpense(element) 
  {
    let id = parseInt(element.dataset.id);

    let parent = element.parentElement.parentElement.parentElement;
    // remove from dom
    this.expenseList.removeChild(parent);
    //remove from list;
    let expense = this.itemList.filter(function(item) {
      return item.id === id;
    });
// show value
this.expenseInput.value = expense[0].title;
this.amountInput.value = expense[0].amount;
this.dateInput.value=expense[0].date;
// delete item
let tempList = this.itemList.filter(function(expense) {
  return expense.id !== id;
});

this.itemList = tempList;
this.showBalance();
}
//delete expense
deleteExpense(element) {
    let id = parseInt(element.dataset.id);
    console.log(id);
    let parent = element.parentElement.parentElement.parentElement;
    // remove from dom
    this.expenseList.removeChild(parent);

    // delete item
    let tempList = this.itemList.filter(function(expense) {
      return expense.id !== id;
    });

    this.itemList = tempList;
    this.showBalance();
  }
}

  
function eventListeners() {
    const budgetFeedback = document.querySelector(".budget-feedback"),
      expenseFeedback = document.querySelector(".expense-feedback"),
      budgetForm = document.getElementById("budget-form"),
      budgetInput = document.getElementById("budget-input"),
      budgetAmount = document.getElementById("budget-amount"),
      expenseAmount = document.getElementById("expense-amount"),
      balance = document.getElementById("balance"),
      balanceAmount = document.getElementById("balance-amount"),
      expenseForm = document.getElementById("expense-form"),
      expenseInput = document.getElementById("expense-input"),
      amountInput = document.getElementById("amount-input"),
      expenseList = document.getElementById("expense-list");
      dateInput=document.getElementById("date");
    // calculated values
    let list = [];
    let id = 0;
    //new instance of UI class
    const ui = new UI(
      budgetFeedback,
      expenseFeedback,
      budgetInput,
      budgetAmount,
      expenseAmount,
      balance,
      balanceAmount,
      expenseInput,
      amountInput,
      expenseList,
      dateInput,
      list,
      id
    );
    //budget form submit form;
    budgetForm.addEventListener("submit", function(event) {
      event.preventDefault();
      ui.submitBudgetForm();
    });
    expenseForm.addEventListener("submit", function(event) {
      event.preventDefault();
      ui.submitExpenseForm();
    });
    expenseList.addEventListener("click", function() {
      if (event.target.parentElement.classList.contains("edit-icon")) {
        ui.editExpense(event.target.parentElement);
      } else if (event.target.parentElement.classList.contains("delete-icon")) {
        ui.deleteExpense(event.target.parentElement);
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    eventListeners();
  });