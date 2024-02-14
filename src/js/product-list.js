// import productList from "./productList.mjs"; //!delete?
// productList(".product-list", "tents"); //!delete?
import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
console.log("category");
console.log(category);
productList(".product-list", category);