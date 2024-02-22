import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCounter } from "./header.js";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();
updateCartCounter();
checkoutProcess.init("so-cart", ".checkout-summary");