import { getLocalStorage } from "./utils.mjs";

export function getCartTotal() {
    const cartItems = getLocalStorage("so-cart");
    let output = !cartItems.length == 0 ? cartItems.length : 0;
    return output;
}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        let backpackCounter = document.querySelector("#cartTotal");
        let total = getCartTotal();
        backpackCounter.textContent = total;
    }
}