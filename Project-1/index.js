console.log("This is a Notes Application");
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  //console.log(notesObj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  //------------------------Function to Show element from LocalStorage--------------------
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem; background:rgba(128, 128, 128, 0.322); color:white;">
    <div class="card-body">
    <h5 class="card-title">Note ${index + 1}</h5>
    <p class="card-text">${element}</p>
    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
    </div>
    </div>
    `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! use "Save Note" Section above to add notes`;
  }
}

//------------------------Function to Delete a Note--------------------

function deleteNote(index) {

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//------------------------Function to search a Note--------------------

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () {

  let inputVal = searchTxt.value;
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
});
