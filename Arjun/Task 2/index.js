function Expense(date, desc, cost, quantity, total, necessary) {
    this.date = date;
    this.desc = desc;
    this.cost = cost;
    this.quantity = quantity;
    this.total = total;
    this.necessary = necessary;
}

var expenses = [];
var expensesTable = $("#tableBody");
var desc = $("#desctxt");
var cost = $("#costtxt");
var qty = $("#quantitytxt");
var date = $("#datetxt");
var nesc = $("#isnesschk");
var grandTotalText = $("#grandTotal");
var grandTotal = 0;
var tip = 0;
grandTotalText.text(grandTotal);


$("#addbtn").click(function () {
    var cst = parseInt(cost.val());
    if (cost.val().length == 0)
        cst = 0;

    var quantity = parseInt(qty.val());
    if (qty.val().length == 0)
        quantity = 1;
    var total = cst*quantity;

    var necessary;
    if (nesc.prop("checked"))
        necessary = "Yes";
    else {
        necessary = "No";
        tip += total;
    }        

    var newExpense = new Expense(date.val(), desc.val(), cst, 
    quantity, total, necessary);
    expenses.push(newExpense);
    grandTotal += newExpense.total;
    grandTotalText.text(grandTotal);

    expensesTable.append("<tr class=\"tabrow\"><td>" + newExpense.date + "</td><td>" +
    newExpense.desc + "</td><td>" + newExpense.cost + "</td><td>" + newExpense.quantity + "</td><td>" +
    newExpense.total + "</td><td>" + newExpense.necessary + "</td></tr>");

    if (expenses.length !== 0) {
        if (tip > grandTotal*0.67)
            $("h6").text("Tip: You must try to reduce unnecessary expenses.");
        else 
            $("h6").text("You are good to go with your current expense pattern!"); 
    } else {
        $("h6").text(""); 
    }

    $(".tabrow").click(function () {
        var current = this;
        $(".tabrow").removeClass("bg-danger");
        $(document).unbind("keydown");
        $(current).addClass("bg-danger");
        $(document).keydown(function (event) {
            console.log(event.key);
            if (event.key === "Delete") {
                grandTotal -= expenses[$(current).index()].total;
                grandTotalText.text(grandTotal);
                
                if (expenses[$(current).index()].necessary === "No")
                    tip -= expenses[$(current).index()].total;   

                expenses.splice($(current).index(), $(current).index());
                if (expenses.length !== 0) {
                    if (tip > grandTotal*0.67)
                        $("h6").text("Tip: You must try to reduce unnecessary expenses.");
                    else 
                        $("h6").text("You are good to go with your current expense pattern!"); 
                } else {
                    $("h6").text(""); 
                }   

                $(current).remove();
                $(document).unbind("keydown");
            }
        })
    
    });
});

$("#clrbtn").click(function () {
    $("#desctxt").val("");
});

$("#clrallbtn").click(function () {
    $(".form-control").val("");
    $("#isnesschk").prop("checked", false);
});

$("#delallbtn").click(function () {
    $(document).unbind("keydown");
    tip = 0;
    grandTotal = 0;
    grandTotalText.text(grandTotal);
    $("h6").text(""); 
    $(".tabrow").remove();
});
