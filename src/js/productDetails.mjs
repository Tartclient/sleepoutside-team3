import { doc } from "prettier";
import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(category, productId) {
  product = await findProductById(category, productId);
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
  updateCartCounter();
  animateCart();
}

function updateCartCounter() {
  let backpackCounter = document.querySelector("#cartLength");
  backpackCounter.textContent++;
}

// Animate background when Item is added to cart
const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

// Async - Await delay to play animate, finish then remove.
const animateCart = async () => {
  const backpack = document.querySelector(".cart svg");
  backpack.classList.add("animate-cart");
  let delayres = await delay(1000);
  backpack.classList.remove("animate-cart");
};

function renderProductDetails() {
  let extraImageCarousel = document.querySelector(".extraImageCarousel");
  let extraImages = getExtraImages();
  extraImages.forEach(image => {
    let listItem = document.createElement("li");
    let imageElement = document.createElement("img");
    imageElement.src = image.Src;
    imageElement.alt = image.Alt;
    listItem.append(imageElement);
    extraImageCarousel.append(listItem);
  });

  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

function getExtraImages() {
  let extraImages = product.Images.ExtraImages;
  if (extraImages.length > 0) {
    let carouselCtn = document.querySelector(".carousel");
    let prevBtn = document.createElement("button");
    let nextBtn = document.createElement("button");
    prevBtn.className = "carousel-btn prev";
    nextBtn.className = "carousel-btn next";
    prevBtn.textContent = "⬅️";
    nextBtn.textContent = "➡️";
    carouselCtn.prepend(nextBtn);
    carouselCtn.prepend(prevBtn);


    //carousel js
    const prevAtt = prevBtn.createAttribute("data-carousel-button");
    prevAtt.value = "prev";

    const nextAtt = nextBtn.createAttribute("data-carousel-button");
    nextAtt.value = "next";


    const buttons = document.querySelector("[data-carousel-button]")
    
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = buttons.closest("[data-carousel]").querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
      })
    });

    return extraImages;
  }
}

