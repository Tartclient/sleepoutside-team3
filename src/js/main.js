import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCounter } from "./header.js";

loadHeaderFooter();
updateCartCounter();

if (!localStorage.getItem("visited")) {
    // myFunction();
    localStorage.setItem("visited", true);
}
