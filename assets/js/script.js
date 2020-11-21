var productName = document.querySelector('.product-name');
var productQuantity = document.querySelector('.product-quantity');
var clearAll = document.querySelector('.clear');
var saveProduct = document.querySelector('.save');
var productList = document.querySelector('.product-list');


/* Display Existing Products from local storage */
function fetchExistingProducts() {
  var products = getProductFromLocal();
  products.forEach((existingProduct) => {
    displayProducts(existingProduct.name, existingProduct.quantity);
  });
}

fetchExistingProducts(); 

saveProduct.addEventListener('click', function(e) {
  e.preventDefault();
  addProduct(productName, productQuantity);
});


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

  var productArray = getProductFromLocal(); 
  productArray.push(newProduct);
  localStorage.setItem('products', JSON.stringify(productArray));
  productList.innerHTML = '';
  fetchExistingProducts(); 
  // displayProducts(newProduct.name, newProduct.quantity);
  document.querySelector('.product-form').reset();
}
 

/* Create and Display product card  */
function displayProducts(name, quantity) {
  if (saveProduct.value === "Update") {
    saveProduct.value = "Submit";
    clearAll.classList.remove('hide-cancle-btn');
  }

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
  addDeleteFunction();
  addEditFunction();
};


// Add Event Listener to delete button.
function addDeleteFunction() {
  document.querySelectorAll('.delete').forEach((element) => {
    element.addEventListener('click', deleteCard);
  });
}

function deleteCard(ele) {
  var productArray = getProductFromLocal();
  productArray.splice(productArray.findIndex(product => 
    product.name === ele.path[2].children[0].lastElementChild.innerText.toLowerCase()), 1);
  ele.path[3].remove();
  localStorage.setItem('products', JSON.stringify(productArray));
}

// Add Event Listener to Edit button.
function addEditFunction() {
  document.querySelectorAll('.edit').forEach((element) => {
    element.addEventListener('click', editCard);
  });
}


function editCard(e) {
  clearAll.classList.add('hide-clear-btn');
  saveProduct.value = "Update";
  card = e.path[2];
  productName.value = card.children[0].lastElementChild.innerText;
  productQuantity.value = card.children[1].lastElementChild.innerText;
  deleteCard(e);
}

/* Clear local storage and Product cards */ 
clearAll.addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.clear();
  productList.innerHTML = '';
});