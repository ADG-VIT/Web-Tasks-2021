const button = document.getElementById("addBtn");
const table = document.getElementById("table");
let count = 0;
let sum = 0;
let addCount = 1;


function respondAddKey(event){
  console.log(event)
  if(event.key != "Delete"){
  const arr = document.getElementsByTagName("td");
  const l = arr.length;
  let sum1 = 0;
  for(let i = 1; i<l-2;i+=3){
    sum1 += Number(arr[i].innerText);
  }
  arr[l-1].innerText = sum1;
  sum = sum1;
  } else {
    sum -= Number(event.path[0].innerText);
    event.path[1].remove();
    respondAddKey({key: "Placeholder"});
    count -= 1;
    addCount -= 3;
  }
}


function createFinal(sum,count) {
  let trF = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.innerText = "Total";
  let td2 = document.createElement("td");
  td2.innerText = sum;
  trF.appendChild(td1);
  trF.appendChild(td2);
  trF.classList.add("odd");
  trF.classList.add("final");
  table.appendChild(trF);
}

function deleteFinal(count) {
  count > 0 && table.lastChild.remove();
}

function contentEditable(){
  const arr = document.getElementsByTagName("td");
  const l = arr.length;
  for(let i = 0; i<l-2;i++){
    arr[i].setAttribute("contentEditable", "true");
    if(i === addCount){
      arr[i].addEventListener("keyup", respondAddKey);
      addCount+=3;
    }
  }
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
  tr.classList.add("even");
  table.appendChild(tr);
  description.value = "";
  amount.value = "";
  date.value = "";
  createFinal(sum,count);
  contentEditable();
});
