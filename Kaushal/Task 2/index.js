let totalAmount = document.getElementById("totalAmount");
let totalAmountValue = 0;
displayNote();
let isAlpha = /[a-z A-Z]/;
eventLis();

function eventLis() {
  let saveNoteButton = document.getElementById("saveNote");
  saveNoteButton.addEventListener("click", () => {
    let amount = document.getElementById("amount");
    let expenseDate = document.getElementById("expenseDate");
    let name = document.getElementById("expenseName");
    let savedNote = localStorage.getItem("notes");
    let newNote = [];
    if (savedNote === null) {
      savedNoteObj = [];
    } else {
      savedNoteObj = JSON.parse(savedNote);
    }
    if (
      expenseDate.value === "" ||
      expenseDate.value === null ||
      name.value === "" ||
      name.value === null ||
      amount.value === "" ||
      amount.value === null
    ) {
      alert("Any field cannot be left empty");
    } else {
      newNote.push(name.value);
      newNote.push(expenseDate.value);
      newNote.push(amount.value);

      savedNoteObj.push(newNote);
      console.log(savedNoteObj);

      localStorage.setItem("notes", JSON.stringify(savedNoteObj));
      amount.value = "";
      expenseDate.value = "";
      name.value = "";
    }
    displayNote();
  });
}

function displayNote() {
  let newNote = "";
  let savedNt = localStorage.getItem("notes");
  if (savedNt === null) {
    savedNoteObj = [];
  } else {
    savedNoteObj = JSON.parse(savedNt);
  }
  savedNoteObj.forEach((e, i) => {
    newNote += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="card mb-4 box-shadow bg-secondary text-light ">
            <div class="card-body">
             <h3 class="card-title">
              ${e[0]}
            </h3>
            <div class="card-text">${e[2]}</div>
            <div class="card-text">${e[1]}</div>
          </div>
            <div class="row">
            <div class="col-6">
            <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-danger btn-lg btn-block">Delete</button>

            </div>
            <div class="col-6">
            <button id="${
              i * 2
            }" onclick="editNote(this.id)" class="btn btn-warning btn-lg btn-block">Edit</button>

            </div>
            </div>

         </div>
        </div>`;
    totalAmountValue += parseFloat(e[2]);
    totalAmount.innerHTML = totalAmountValue;
  });
  let disNote = document.getElementById("display");
  if (savedNoteObj.length != 0) disNote.innerHTML = newNote;
  else {
    disNote.innerHTML = `<h5 class="text-light pl-5">Nothing to show</h2>`;
    // totalAmount.innerHTML = totalAmountValue;
  }
}

function deleteNote(index) {
  console.log("I am deleting", index);
  let savedNt = localStorage.getItem("notes");
  if (savedNt === null) {
    savedNoteObj = [];
  } else {
    savedNoteObj = JSON.parse(savedNt);
    // console.log(savedNoteObj[index][2]);
    totalAmountValue -= savedNoteObj[index][2];
    totalAmount.innerHTML = totalAmountValue;
  }
  savedNoteObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(savedNoteObj));
  displayNote();
}

function editNote(index) {
  let newNoteTxt = document.getElementById("saveNoteText");
  let savedNt = localStorage.getItem("notes");
  savedNoteObj = JSON.parse(savedNt);
  newNoteTxt.value = savedNoteObj.splice(index / 2, 1);
  deleteNote(index / 2);
}
