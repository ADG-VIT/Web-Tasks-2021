const table = {};
table.leftover = document.querySelector("#balance");
table.saving = document.querySelector("#saving");
table.expen = document.querySelector("#expen");

const form = {};
form.amt = document.querySelector("#amt");
form.eventDesc = document.querySelector("#eventDesc");
form.transdate = document.querySelector("#transdate");
form.addButton = document.querySelector("#Button");

const transactions = document.querySelector("#transactions");

function addSpend() {
  let amt = form.amt.value;
  let description = form.eventDesc.value;
  let transdate = form.transdate.value;

  var trans = document.createElement("tr");

  var td1 = document.createElement("td");
  var bin = document.createElement("i");
  bin.classList.add("fa");
  bin.classList.add("fa-trash-o");
  bin.classList.add("fa-lg");
  addListenerbin(bin);
  td1.append(bin);
  trans.appendChild(td1);

  var td2 = document.createElement("td");
  td2.innerHTML = description;
  trans.appendChild(td2);

  var td3 = document.createElement("td");
  td3.innerHTML = "Rs. " + amt;
  trans.appendChild(td3);

  var td4 = document.createElement("td");
  td4.innerHTML =
    transdate.slice(8, 10) +
    "/" +
    transdate.slice(5, 7) +
    "/" +
    transdate.slice(0, 4);
  trans.appendChild(td4);

  if (Number(amt) < 0) {
    table.expen.innerHTML = Number(table.expen.innerHTML) - Number(amt);
  } else {
    table.saving.innerHTML = Number(table.saving.innerHTML) + Number(amt);
  }

  table.leftover.innerHTML = Number(table.leftover.innerHTML) + Number(amt);

  transactions.appendChild(trans);

  form.val.value = "";
  form.eventDesc.value = "";
  form.transdate.value = "";
}

form.addButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (form.eventDesc.value == "") {
    alert("You must describe the transaction");
  } else {
    addSpend();
  }
});

function addListenerbin(bin) {
  bin.addEventListener("click", function (e) {
    e.stopPropagation();
    deleteSpend(e);
  });
}

function deleteSpend(e) {
  let currTrans = e.target.parentNode.parentNode;
  var val = currTrans.getElementsByTagName("td")[2].innerHTML;
  val = val.slice(4, amt.length);
  if (Number(amt) < 0) {
    table.expen.innerHTML = Number(table.expen.innerHTML) + Number(amt);
  } else {
    table.saving.innerHTML = Number(table.saving.innerHTML) - Number(amt);
  }
  table.leftover.innerHTML = Number(table.leftover.innerHTML) - Number(amt);
  currTrans.parentNode.removeChild(currTrans);
}
