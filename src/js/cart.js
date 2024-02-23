import { loadHeaderFooter, money_round, getLocalStorage } from "./utils.mjs";
import { updateCartCounter } from "./header.js";

loadHeaderFooter();

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const htmlItems = cartItems.map((item) => {
//     return cartItemTemplate(item)
//   });
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  /********* COUNTING CODE **********/
  const counter = {};
  let ids = cartItems.map((item) => item.Id)
  // Count how many of item
  ids.forEach(ele => {
    if (counter[ele]) {
      counter[ele] += 1;
    } else {
      counter[ele] = 1;
    }
  });

  let itemsToBeRendered = [];
  const htmlItems = [];
  for (let i = 0; i < cartItems.length; i++) {
    if (!itemsToBeRendered.includes(cartItems[i].Id)) {
      itemsToBeRendered.push(cartItems[i].Id);
      htmlItems.push(cartItemTemplate(cartItems[i], counter[cartItems[i].Id]));
    }
  }
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item, itemQuantity) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${itemQuantity} </p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function isCartEmpty() {
  const cartItems = getLocalStorage("so-cart");
  return cartItems.length == 0;
}

export function totalCart() {
  if (document.readyState == "complete") {
    const cartItems = getLocalStorage("so-cart");
    let total = 0;
    cartItems.forEach((item) => {
      total += item.FinalPrice;
    });
    return total;
  }
}

function renderTotal() {
  const cartTotal = document.querySelector(".cart-total");
  cartTotal.textContent = `Total: $${money_round(totalCart())}`;
  showCartFooter();
}

function showCartFooter() {
  const cartFooter = document.querySelector("div.cart-footer");
  if (!isCartEmpty()) {
    cartFooter.classList.remove("hide");
  } else {
    cartFooter.classList.add("hide");
  }
}

document.onreadystatechange = () => {
  renderTotal();
  updateCartCounter();
};

renderCartContents();