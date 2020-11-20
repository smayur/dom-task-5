var productName = document.querySelector('.product-name');
var productQuantity = document.querySelector('.product-quantity');
var clearAll = document.querySelector('.clear-all');
var saveProduct = document.querySelector('.save');
var productList = document.querySelector('.product-list');


saveProduct.addEventListener('click', function(e) {
  e.preventDefault();
  addProduct(productName, productQuantity);
});


clearAll.addEventListener('click', function() {
  localStorage.clear();
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
  displayProducts(newProduct.name, newProduct.quantity);
}

/* Display Existing Products from local storage */
function fetchExistingProducts() {
  var products = getProductFromLocal();
  products.forEach((existingMember) => {
    displayProducts(existingMember.name, existingMember.quantity);
  });
}

fetchExistingProducts();

/* Create and Display product card  */
function displayProducts(name, quantity) {
  var productCard = document.createElement('li');
  productCard.classList.add('product');
  productCard.innerHTML = `
  <ul class="product-details">
    <li>
      <figure class="product-image">
        <img src="https://source.unsplash.com/featured/?${name}"  alt="${name}">
      </figure>
    </li>
    <li>
      <span class="label-product-name">product name :</span>
      <span id="product-name">${name}</span>
    </li>
    <li>
      <span class="label-product-quantity">quantity :</span>
      <span id="product-quantity">${quantity}</span>
    </li>
    <li>
      <input type="button" class="btn edit" value="edit" />
      <input type="button" class="btn delete" value="delete" />
    </li>
  </ul>
  `;
  productList.appendChild(productCard);
};