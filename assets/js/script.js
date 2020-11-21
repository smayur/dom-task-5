var productName = document.querySelector('.product-name');
var productQuantity = document.querySelector('.product-quantity');
var clearAll = document.querySelector('.clear');
var saveProduct = document.querySelector('.save');
var productList = document.querySelector('.product-list');


/* Display Existing Products from local storage */
function fetchExistingProducts() {
  var products = getProductFromLocal(); //call function to fetch exisiting cards
  products.forEach((existingProduct) => {
    displayProducts(existingProduct.name, existingProduct.quantity); //call function to display existing cards
  });
}

fetchExistingProducts();  //Fetch Products from local storage after page load is done.

saveProduct.addEventListener('click', function(e) {
  e.preventDefault();

  //Call function validateInputValues to checked whether fields are empty or not.
  //And call function addProduct when there is no any error.
  if (validateInputValues()) {
    addProduct(productName, productQuantity);  //Call function to add product in array of object.
  }
});

//validate Input fields 
function validateInputValues() {
  if ( productName.value == '' || productQuantity.value == '' ) {
    showError('Please fill this field');  //call showError function to show error.
    return false;
  } else {
    showError();
    return true;
  }
}

function showError(errorMessage) {
  document.querySelectorAll('.error').forEach(element => {
  if ( element.previousElementSibling.value === '' || element.previousElementSibling.value === 'null' ) {
      element.innerHTML = errorMessage;  //If input fields are empty then print message recived from showError function.
    } else {
      element.innerHTML = '';
    }
  });
}


/* Fetch Existing Products from local storage */
function getProductFromLocal() {
  var productArray;
  if (localStorage.getItem('products') === null) {
    productArray = [];
  } else {
    productArray = JSON.parse(localStorage.getItem('products'));
  }
  return productArray;
}

/* Add New Product to local storage */
function addProduct(name, quantity) {
  var newProduct = {
    "name": name.value,
    "quantity": quantity.value,
  }

  //Before add new product to local and DOM.
  //Fetch existing product array and then add new product to array.
  var productArray = getProductFromLocal();
  productArray.push(newProduct);
  localStorage.setItem('products', JSON.stringify(productArray));  //Save updated product array in local storage.
  productList.innerHTML = '';  //Before printing products, clear product list DOM.
  fetchExistingProducts();   //Fetch and Display updated product list
  document.querySelector('.product-form').reset();   //clear input fields.
}
 

/* Create and Display product card  */
function displayProducts(name, quantity) {

  if (saveProduct.value === "Update") {
    saveProduct.value = "Submit";
    clearAll.classList.remove('hide-clear-btn'); 
  }

  // create element to show product
  var productCard = document.createElement('li');
  productCard.classList.add('product');
  productCard.innerHTML = `
  <ul class="product-details">
    <li>
      <span class="label-product-name">product name :</span>
      <span class="product-name">${name}</span>
    </li>
    <li>
      <span class="label-product-quantity">quantity :</span>
      <span class="product-quantity">${quantity}</span>
    </li>
    <li>
      <input type="button" class="btn edit" value="edit" />
      <input type="button" class="btn delete" value="delete" />
    </li>
  </ul>
  `;
  productList.appendChild(productCard);
  addDeleteFunction(); //call function to add delete functionality
  addEditFunction();  //call function to add edit functionality
};


// Add Event Listener to each delete button.
function addDeleteFunction() {
  document.querySelectorAll('.delete').forEach((element) => {
    element.addEventListener('click', deleteCard);
  });
}

function deleteCard(ele) {
  var productArray = getProductFromLocal();  //Fetch products from local storage
  productArray.splice(productArray.findIndex(product => 
    product.name === ele.path[2].children[0].lastElementChild.innerText.toLowerCase()), 1);  //Remove product from array of object when "name" is matched.
  ele.path[3].remove();  //remove product from DOM.
  localStorage.setItem('products', JSON.stringify(productArray));  //Save updated product array in local storage.
}

// Add Event Listener to Edit button.
function addEditFunction() {
  document.querySelectorAll('.edit').forEach((element) => {
    element.addEventListener('click', editCard);
  });
}


function editCard(e) {
  clearAll.classList.add('hide-clear-btn');  //Hide Clear All button.
  saveProduct.value = "Update";  //change value of submit button to Update.
  card = e.path[2];
  //Set card name and quantity to input value.
  productName.value = card.children[0].lastElementChild.innerText;
  productQuantity.value = card.children[1].lastElementChild.innerText;
  deleteCard(e);  //call function to Delete edited card.
}

/* Clear local storage and Product cards */ 
clearAll.addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.clear();  //clear local storage.
  productList.innerHTML = '';  //clear product list in DOM
});