const button = document.getElementById("addBtn");
const table = document.getElementById("table");
let count = 0;

button.addEventListener("click", ()=>{
    const description = document.getElementById("description");
    const amount = document.getElementById("money");
    const date = document.getElementById("date");
    count += 1;
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerText = description.value;
    let td2 = document.createElement("td");
    td2.innerText = amount.value;
    let td3 = document.createElement("td");
    td3.innerText = date.value;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    count%2 == 0 ? tr.classList.add("even") : tr.classList.add("odd");
    table.appendChild(tr);
    description.value = "";
    amount.value = "";
    date.value = "";
})