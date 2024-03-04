import { doc } from "prettier";
import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";

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
  alertMessage("Item Added To Cart!")
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

  // Add all images to screen
  extraImages.forEach(image => {
    let listItem = document.createElement("li");
    listItem.classList.add("slide");
    let imageElement = document.createElement("img");
    imageElement.src = image.Src;
    imageElement.alt = image.Alt;
    imageElement.classList.add("extra-image");
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

  // event listeners for click buttons
  carouselCycle();
}

function getExtraImages() {
  let extraImages = product.Images.ExtraImages;
  if (extraImages.length > 0) {
    return extraImages;
  }
}

function carouselCycle(){
  // select carousel container
  let carouselCtn = document.querySelector(".carousel");

  //Create Buttons
  let prevBtn = document.createElement("button");
  let nextBtn = document.createElement("button");

  //Add classes to buttons
  prevBtn.classList.add("carousel-btn");
  nextBtn.classList.add("carousel-btn");
  prevBtn.classList.add("prev");
  nextBtn.classList.add("next");

  //set button text and add to DOM
  prevBtn.textContent = "⬅️";
  nextBtn.textContent = "➡️";
  carouselCtn.prepend(nextBtn);
  carouselCtn.prepend(prevBtn);

  // selects buttons
  const buttons = document.querySelectorAll(".carousel-btn");

  let index = 0;
  const images = document.querySelectorAll(".slide");
  images[0].classList.add("activeImage");
  // If button is clicked then either go forward or backward through image list
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      //remove the activeImage class from the current list item
      images[index].classList.remove("activeImage")
        // if button has class "prev" then subtract
        if (button.classList.contains("prev")){
          //prev button has been pressed
          if (index == 0){
            index = images.length - 1;
          } else {
            index--;
          }
        } else if (button.classList.contains("next")){
          if (index == (images.length - 1)){
            index = 0;
          } else {
            index++;
          }
        }
        images[index].classList.add("activeImage");
    })
  });
}


