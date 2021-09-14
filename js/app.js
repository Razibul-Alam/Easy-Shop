// load products from server
const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const {image,rating,title,price,category} = product;
    const div = document.createElement("div");
    div.classList.add("col", "text-center");
    const ratings=Math.round(rating.rate)
    div.innerHTML = `
    <div class="card h-100 rounded shadow-lg text-light">
    <img src=${image} class="product-image my-3" alt="...">
    <div class="card-body my-card">
      <h4 class="card-title">${title}</h4>
      <p>Category : ${category}</P>
      <h5>Price: $ ${price}</h5>
      <h6>Total Ratings : ${rating.count}</h6>
      <h6>Average Rating: ${rating.rate} <span class="text-warning fs-5"> <i class="fas fa-star"></i></span></h6>
      
    </div>
    <div class="mb-2 my-card">
    <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-danger">add to cart</button>
    <button id="details-btn" class="btn btn-primary">Details</button></div>
      </div>
    
  </div>
  </div>
  `;
    document.getElementById("all-products").appendChild(div);
  }
};

// product add to cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};

// get id from html elements
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  console.log(converted)
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice =value;
  const total = convertedOldPrice + convertPrice;
  console.log(total,convertPrice,convertedOldPrice)
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText =value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
    console.log(grandTotal)
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

const showDetails=()=>{
  console.log('hello')
}
