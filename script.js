function randomNumberID(){
  return Math.floor(Math.random()*(1000002 - 1 + 1)) + 1;
}
$(document).ready( function () {
  getProductLists();
  document.getElementById('modalSubmit').addEventListener('click', modalSubmit);

  function modalSubmit (e) {
    let productTempId = randomNumberID();
    let inputName = document.getElementById('inputName').value;
    let inputRecom = document.getElementById('inputRecom').value;
    let rating = document.getElementById('rating').value;

    const productId = productTempId+inputName+randomNumberID(); //Used to give each product a unique id
    if(inputName !== '' && inputRecom !== ''){
      let newProduct = {
         id: productId,
        name: inputName.toUpperCase(),
        category: rating,
        description: inputRecom
       };

      //Add new product to localStorage. The localStorage key for all the product is productList'
      if(localStorage.getItem("productList") === null || localStorage.getItem("productList") === [] || localStorage.getItem("productList") === undefined ){
        let productList = [];
        productList.push(newProduct);
        localStorage.setItem("productList", JSON.stringify(productList));
      } else {
        let productList = JSON.parse(localStorage.getItem("productList"));
        productList.push(newProduct);
        localStorage.setItem("productList", JSON.stringify(productList));
      }
     } else{
       alert('All fields are required. Please check your entries again');
     }
    getProductLists();

    resetForm();
   e.preventDefault();
  }

}); //DocumentBody end tag

//get the data stored in the localStorage for display on load
function getProductLists() {
  if(localStorage.getItem("productList") === null){
    alert("Your dashboard is currently empty. Use the add button to add new products.");
    document.getElementById("recomShow").disabled = true;
  } else {
    document.getElementById("recomShow").disabled = false;
    let productList = JSON.parse(localStorage.getItem("productList"));
    let display = document.getElementById('display');
    //Display result
    display.innerHTML = '';
    for (let i = 0; i < productList.length; i++){
      let id = productList[i].id;
      let name = productList[i].name;
      let category = productList[i].category;
      let description = productList[i].description;

      display.innerHTML += '<li class="recom-text list-group-item"><strong>'+name+'</strong><p>'+category+'</p><p>'+description+'</p><p><a' +
          ' href="#" onclick="editProduct(\''+id+'\')" data-toggle="modal" data-target="#addNewRecomModal">' +
          '<i class="fa fa-edit green-text darken-2 "></i>&nbsp;Edit</a> &nbsp;&nbsp; ' +
          '<a href="#" id="deleteId" onclick="deleteProduct(\''+id+'\')"><i class="fa fa-trash' +
          ' red-text' +
          ' darken-2"></i>&nbsp;' +
          ' Delete</a>' +
          ' </p>' +
          '</li>';
      }
    }
  }


// deleting the main bookmark.
function deleteProduct(id) {
  let productList = JSON.parse(localStorage.getItem("productList"));
  for(let i = 0; i < productList.length; i++){
    if (productList[i].id === id) {
      productList.splice(i,1);
      //console.log(result);
    }
  }
  localStorage.setItem("productList", JSON.stringify(productList)); //reset the values in the local storage
  getProductLists(); // to quickly display what is remaining from local storage.
}

// Editing a product
function editProduct(id) {
  "use strict";
  document.getElementById('modalSubmit').style.display = "none";
  document.getElementById("addNewRecomModalLabel").textContent = "Edit Recommendation";

  let tempId = id;
  let parentDiv = document.getElementById('modalFooter');
  let productList = JSON.parse(localStorage.getItem("productList"));


  if (parentDiv.contains(document.getElementById("editButton"))) {
    document.getElementById('editButton').disabled = false;
  } else {
    let editButton = document.createElement('button');
    editButton.id = "editButton";
    editButton.className = "fa fa-hdd-o btn btn-outline-primary btn-sm m-2";
    editButton.textContent = " Save Changes";
    parentDiv.appendChild(editButton);
  }
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id === id) {
      document.getElementById("inputName").value = productList[i].name;
      document.getElementById("inputRecom").value = productList[i].description;
      document.getElementById("rating").value = productList[i].category;
    }
  }

  document.getElementById("editButton").addEventListener("click", function () {
    addProduct();
    let productList = JSON.parse(localStorage.getItem("productList"));
    for(let i = 0; i < productList.length; i++){
      if(productList[i].id === tempId){
        productList.splice(i,1);
      }
    }
    localStorage.setItem("productList", JSON.stringify(productList));
    getProductLists();
    resetForm();
    document.getElementById("editButton").style.display = "none";

    $(".addNewRecom").on('click',productFormReset());

  });

}

function resetForm() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputRecom").value = "";
  document.getElementById("rating").value = "";
}

function productFormReset() {
  document.getElementById('modalSubmit').style.display = "block";
  document.getElementById("addNewRecomModalLabel").textContent = "New Product Form";
  document.getElementById('editButton').style.display = "none";
}


function addProduct() {
  let productTempId = randomNumberID();
  let inputName = document.getElementById('inputName').value;
  let inputRecom = document.getElementById('inputRecom').value;
  let rating = document.getElementById('rating').value;

  const productId = productTempId + inputName + randomNumberID(); //Used to give each product a unique id
  if (inputName !== '' && inputRecom !== '') {
    let newProduct = {
      id: productId,
      name: inputName.toUpperCase(),
      category: rating,
      description: inputRecom
    };
    if (localStorage.getItem("productList") === null || localStorage.getItem("productList") === [] || localStorage.getItem("productList") === undefined) {
      let productList = [];
      productList.push(newProduct);
      localStorage.setItem("productList", JSON.stringify(productList));
    } else {
      let productList = JSON.parse(localStorage.getItem("productList"));
      productList.push(newProduct);
      localStorage.setItem("productList", JSON.stringify(productList));
    }
  }
}

//holdval_ document.getElementById('editButton').style.display = "none"; //checks in case of disabled button.
