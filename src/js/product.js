import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCounter } from "./header.js";


const productId = getParam("product");
const productCategory = getParam("category");
productDetails(productCategory, productId);

loadHeaderFooter();
updateCartCounter();