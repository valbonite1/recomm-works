function randomNumberID(){
  return Math.floor(Math.random()*(1000002 - 1 + 1)) + 1;
}
$(document).ready( function () {
  getrecomLists();
  document.getElementById('modalSubmit').addEventListener('click', modalSubmit);

  function modalSubmit (e) {
    let recomTempId = randomNumberID();
    let inputName = document.getElementById('inputName').value;
    let inputRecom = document.getElementById('inputRecom').value;
    let rating = document.getElementById('rating').value;

    const recomId = recomTempId+inputName+randomNumberID(); //Used to give each recom a unique id
    if(inputName !== '' && inputRecom !== ''){
      let newrecom = {
         id: recomId,
        name: inputName.toUpperCase(),
        category: rating,
        description: inputRecom
       };

      //Add new recom to localStorage. The localStorage key for all the recom is recomList'
      if(localStorage.getItem("recomList") === null || localStorage.getItem("recomList") === [] || localStorage.getItem("recomList") === undefined ){
        let recomList = [];
        recomList.push(newrecom);
        localStorage.setItem("recomList", JSON.stringify(recomList));
      } else {
        let recomList = JSON.parse(localStorage.getItem("recomList"));
        recomList.push(newrecom);
        localStorage.setItem("recomList", JSON.stringify(recomList));
      }
     } else{
       alert('All fields are required. Please check your entries again');
     }
    getrecomLists();

    resetForm();
   e.preventDefault();
  }

}); //DocumentBody end tag

//get the data stored in the localStorage for display on load
function getrecomLists() {
  if(localStorage.getItem("recomList") === null){
    alert("Your dashboard is currently empty. Use the add button to add new recoms.");
    document.getElementById("recomShow").disabled = true;
  } else {
    document.getElementById("recomShow").disabled = false;
    let recomList = JSON.parse(localStorage.getItem("recomList"));
    let display = document.getElementById('display');
    //Display result
    display.innerHTML = '';
    for (let i = 0; i < recomList.length; i++){
      let id = recomList[i].id;
      let name = recomList[i].name;
      let category = recomList[i].category;
      let description = recomList[i].description;

      display.innerHTML += '<li class="recom-text list-group-item"><strong>'+name+'</strong><p>'+category+'</p><p>'+description+'</p><p><a' +
          ' href="#" onclick="editrecom(\''+id+'\')" data-toggle="modal" data-target="#addNewRecomModal">' +
          '<i class="fa fa-edit green-text darken-2 "></i>&nbsp;Edit</a> &nbsp;&nbsp; ' +
          '<a href="#" id="deleteId" onclick="deleterecom(\''+id+'\')"><i class="fa fa-trash' +
          ' red-text' +
          ' darken-2"></i>&nbsp;' +
          ' Delete</a>' +
          ' </p>' +
          '</li>';
      }
    }
  }


// deleting the main bookmark.
function deleterecom(id) {
  let recomList = JSON.parse(localStorage.getItem("recomList"));
  for(let i = 0; i < recomList.length; i++){
    if (recomList[i].id === id) {
      recomList.splice(i,1);
      //console.log(result);
    }
  }
  localStorage.setItem("recomList", JSON.stringify(recomList)); //reset the values in the local storage
  getrecomLists(); // to quickly display what is remaining from local storage.
}

// Editing a recom
function editrecom(id) {
  "use strict";
  document.getElementById('modalSubmit').style.display = "none";
  document.getElementById("addNewRecomModalLabel").textContent = "Edit Recommendation";

  let tempId = id;
  let parentDiv = document.getElementById('modalFooter');
  let recomList = JSON.parse(localStorage.getItem("recomList"));


  if (parentDiv.contains(document.getElementById("editButton"))) {
    document.getElementById('editButton').disabled = false;
  } else {
    let editButton = document.createElement('button');
    editButton.id = "editButton";
    editButton.className = "fa fa-hdd-o btn btn-outline-primary btn-sm m-2";
    editButton.textContent = " Save Changes";
    parentDiv.appendChild(editButton);
  }
  for (let i = 0; i < recomList.length; i++) {
    if (recomList[i].id === id) {
      document.getElementById("inputName").value = recomList[i].name;
      document.getElementById("inputRecom").value = recomList[i].description;
      document.getElementById("rating").value = recomList[i].category;
    }
  }

  document.getElementById("editButton").addEventListener("click", function () {
    addrecom();
    let recomList = JSON.parse(localStorage.getItem("recomList"));
    for(let i = 0; i < recomList.length; i++){
      if(recomList[i].id === tempId){
        recomList.splice(i,1);
      }
    }
    localStorage.setItem("recomList", JSON.stringify(recomList));
    getrecomLists();
    resetForm();
    document.getElementById("editButton").style.display = "none";

    $(".addNewRecom").on('click',recomFormReset());

  });

}

function resetForm() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputRecom").value = "";
  document.getElementById("rating").value = "";
}

function recomFormReset() {
  document.getElementById('modalSubmit').style.display = "block";
  document.getElementById("addNewRecomModalLabel").textContent = "New recom Form";
  document.getElementById('editButton').style.display = "none";
}


function addrecom() {
  let recomTempId = randomNumberID();
  let inputName = document.getElementById('inputName').value;
  let inputRecom = document.getElementById('inputRecom').value;
  let rating = document.getElementById('rating').value;

  const recomId = recomTempId + inputName + randomNumberID(); //Used to give each recom a unique id
  if (inputName !== '' && inputRecom !== '') {
    let newrecom = {
      id: recomId,
      name: inputName.toUpperCase(),
      category: rating,
      description: inputRecom
    };
    if (localStorage.getItem("recomList") === null || localStorage.getItem("recomList") === [] || localStorage.getItem("recomList") === undefined) {
      let recomList = [];
      recomList.push(newrecom);
      localStorage.setItem("recomList", JSON.stringify(recomList));
    } else {
      let recomList = JSON.parse(localStorage.getItem("recomList"));
      recomList.push(newrecom);
      localStorage.setItem("recomList", JSON.stringify(recomList));
    }
  }
}

//holdval_ document.getElementById('editButton').style.display = "none"; //checks in case of disabled button.
