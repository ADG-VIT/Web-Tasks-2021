const button = document.getElementById("addBtn");
const table = document.getElementById("table");
let count = 0;
let sum = 0;

function createFinal(sum,count) {
  let trF = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.innerText = "Total";
  let td2 = document.createElement("td");
  td2.innerText = sum;
  trF.appendChild(td1);
  trF.appendChild(td2);
  (count+1)%2 === 0 ? trF.classList.add("even") : trF.classList.add("odd");
  table.appendChild(trF);
}

function deleteFinal(count) {
  count > 0 && table.lastChild.remove();
}

button.addEventListener("click", () => {
  deleteFinal(count);
  const description = document.getElementById("description");
  const amount = document.getElementById("money");
  const date = document.getElementById("date");
  count += 1;
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.innerText = description.value;
  let td2 = document.createElement("td");
  td2.innerText = amount.value;
  sum += Number(amount.value);
  let td3 = document.createElement("td");
  td3.innerText = date.value;
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  count % 2 == 0 ? tr.classList.add("even") : tr.classList.add("odd");
  table.appendChild(tr);
  description.value = "";
  amount.value = "";
  date.value = "";
  createFinal(sum,count);
});
