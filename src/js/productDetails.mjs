import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(category, productId) {
  product = await findProductById(category, productId);
  console.log(`Here: ${product}`);
  renderProductDetails();

  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  let currentCart = getLocalStorage("so-cart");
  let cartObjects = [];
  // if so-cart doesn't exist in storage already
  if (currentCart == null) {
    // initialize as a list
    cartObjects = [product];
  } else {
    // add new product to the end of an array of existing product
    cartObjects = currentCart;
    cartObjects.push(product)
  }
  setLocalStorage("so-cart", cartObjects);
  animateCart();
}

// Animate background when Item is added to cart
function animateCart() {
  const backpack = document.querySelector(".cart a svg");
  backpack.classList.Add("animate-cart");
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

