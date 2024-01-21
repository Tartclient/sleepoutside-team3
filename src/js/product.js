import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  let currentCart = getLocalStorage("so-cart");
  let cartObjects = [];
  // if so-cart doesn't exist in storage already
  if (currentCart == null){
    // initialize as a list
    cartObjects = [product];
  } else {
    // add new product to the end of an array of existing product
    cartObjects = currentCart;
    cartObjects.push(product)
  }
  setLocalStorage("so-cart", cartObjects);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
