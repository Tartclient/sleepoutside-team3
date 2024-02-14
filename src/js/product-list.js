import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");

productList(".product-list", category);

// let test = document.createElement("h1");
// test.textContent = "HI";
// let main = document.querySelector("main");
// main.append(test);
