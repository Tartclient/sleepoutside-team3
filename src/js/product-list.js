import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { updateCartCounter } from "./header.js";

updateCartCounter();
loadHeaderFooter();

const category = getParam("category");

productList(".product-list", category);
