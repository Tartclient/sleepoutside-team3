import { getLocalStorage } from "./utils.mjs";

export function getCartLength() {
  let output;
  try {
    const cartItems = getLocalStorage("so-cart");
    output = cartItems.length;
  } catch {
    output = 0;
  }
  return output;
}

export function updateCartCounter() {
  if (document.readyState == "complete") {
    let backpackCounter = document.querySelector("#cartLength");
    let total = getCartLength();
    backpackCounter.textContent = total;
  }
}

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    let backpackCounter = document.querySelector("#cartLength");
    let total = getCartLength();
    backpackCounter.textContent = total;
  }
};
