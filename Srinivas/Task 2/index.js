const button = document.getElementById("addBtn");
const table = document.getElementById("table");
let count = 0;

button.addEventListener("click", ()=>{
    const description = document.getElementById("description").value;
    const amount = document.getElementById("money").value;
    const date = document.getElementById("date").value;
    count += 1;
    console.log(description);
    console.log(amount);
    console.log(date);
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerText = description;
    let td2 = document.createElement("td");
    td2.innerText = amount;
    let td3 = document.createElement("td");
    td3.innerText = date;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    count%2 == 0 && tr.classList.add("even");
    table.appendChild(tr);
})