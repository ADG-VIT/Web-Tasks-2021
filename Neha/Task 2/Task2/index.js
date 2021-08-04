const itemCtrl = (function(){
    const Item=function(id,description,amount){
        this.id=id;
        this.description=description;
        this.amount=amount;
    }
    const data = {
        items:[]
    }

    return {
        logData:function(){
            return data;
        },
        addMoney:function(description,amount){

            let ID = itemCtrl.createID();

            newmoney = new Item(ID,description,amount);

            data.items.push(newmoney);

            return newmoney;

        },
        createID:function(){

            const idnum= Math.floor(Math.random()*10000);
            return idnum;
        },
        getIdNumber : function(item){

            const amountID = (item.parentElement.id);
            
            const itemarr = amountID.split('-');

            const id = parseInt(itemarr[1]);

            return id;

        },
        deleteamountarr: function(id){
            const ids = data.items.map(function(item){

                return item.id
            });

            const index = ids.indexOf(id)

            data.items.splice(index,1);
        }
    }
})();

const UICtrl  = (function(){
    const UISelectors= {
        incomebtn:'#add_income',
        expensebtn:'#add_expense',
        description:'#description',
        amount:'#amount',
        moneyEarned:'#amount_earned',
        moneyAvailable:'#amount_available',
        moneySpent:'#amount_spent',
        incomelist:'#income_container',
        expenseslist:'#expenses_container',
        incomeitem:'.income_amount',
        expenseitem:'.expense_amount',
        itemscontainer:'.items_container'
    }

    return {
        getSelectors:function(){
            return UISelectors
        },
        getdescriptioninput: function(){
            return {
              descriptioninput : document.querySelector(UISelectors.description).value
            }

        },
        getvalueinput: function(){
            return{
                amountinput : document.querySelector(UISelectors.amount).value
            }
        },
        addincomeitem:function(item){
            const div = document.createElement('div');

            div.classList='item income'
            div.id = `item-${item.id}`

            div.innerHTML= `
            <h4>${item.description}</h4>
            <div class="item_income">
                <p class="symbol">$</p>
                <span class="income_amount">${item.amount}</span>
            </div>
            <i class="fas fa-trash"></i>
            `;

            document.querySelector(UISelectors.incomelist).insertAdjacentElement('beforeend',div);
        },
        clearInputs: function(){
            document.querySelector(UISelectors.description).value = ''
            document.querySelector(UISelectors.amount).value = ''
        },
        updateEarned: function(){
            const allincome = document.querySelectorAll(UISelectors.incomeitem);

            const incomecount = [...allincome].map(item => +item.innerHTML);

            
            const incomeSum = incomecount.reduce(function(a,b){

                return a+b
                 
            },0);

            const earnedtotal = document.querySelector(UISelectors.moneyEarned).innerHTML = incomeSum.toFixed(2);
        },
        addexpenseitem : function(item){

            const div = document.createElement('div');

            div.classList='item expense'
            div.id = `item-${item.id}`

            div.innerHTML= `
            <h4>${item.description}</h4>
            <div class="item_expense">
                <p class="symbol">$</p>
                <span class="expense_amount">${item.amount}</span>
            </div>
            <i class="fas fa-trash"></i>
            `;

            document.querySelector(UISelectors.expenseslist).insertAdjacentElement('beforeend',div);
        },
        updatespent : function(){
            const allexpenses = document.querySelectorAll(UISelectors.expenseitem);

            const expensecount = [...allexpenses].map(item => +item.innerHTML)

            const expenseSum = expensecount.reduce(function(a,b){
                return a+b
            },0);

            const expensestotal = document.querySelector(UISelectors.moneySpent).innerHTML = expenseSum.toFixed(2);
        },
        updateavailable : function(){
            const earned = document.querySelector(UISelectors.moneyEarned);

            const spent = document.querySelector(UISelectors.moneySpent);

            const available = document.querySelector(UISelectors.moneyAvailable);

            available.innerHTML = ((+earned.innerHTML)-(+spent.innerHTML)).toFixed(2)
        },
        deleteamount : function(id){

            const amountID = `#item-${id}`;

            const amountdelete = document.querySelector(amountID);

            amountdelete.remove();
        }
    }
})();

const app = (function(){

    const loadEventListeners = function(){

        const UISelectors = UICtrl.getSelectors();
    
        document.querySelector(UISelectors.incomebtn).addEventListener('click',addincome);
    
        document.querySelector(UISelectors.expensebtn).addEventListener('click',addexpense);

        document.querySelector(UISelectors.itemscontainer).addEventListener('click',deleteitem);
    }
    
    const addincome = function(){
        
        const description = UICtrl.getdescriptioninput();
    
        const amount = UICtrl.getvalueinput();
    
        if(description.descriptioninput !== '' && amount.amountinput !== ''){
    
            const newmoney = itemCtrl.addMoney(description.descriptioninput,amount.amountinput);
    
            UICtrl.addincomeitem(newmoney);
    
            UICtrl.clearInputs();
    
            UICtrl.updateEarned();
     
            //const checkData = itemCtrl.logData();
            //console.log(checkData);

            UICtrl.updateavailable();
        }
    }
    
    //add expenses
    const addexpense = function(){
        const description = UICtrl.getdescriptioninput();
        const amount = UICtrl.getvalueinput();

        if(description.descriptioninput !== '' && amount.amountinput !== ''){
            const newmoney = itemCtrl.addMoney(description.descriptioninput,amount.amountinput);

            UICtrl.addexpenseitem(newmoney);

            UICtrl.clearInputs();

            UICtrl.updatespent();

            UICtrl.updateavailable();
        }
    }

    const deleteitem = function(e){

        if(e.target.classList.contains('fas')){
            
            const id = itemCtrl.getIdNumber(e.target)

            UICtrl.deleteamount(id);

            itemCtrl.deleteamountarr(id);

            UICtrl.updateEarned();

            UICtrl.updatespent();

            UICtrl.updateavailable();
        }

        e.preventDefault()
    }

    return{
        init:function(){
            loadEventListeners();
        }
    }


})(itemCtrl,UICtrl);

app.init();