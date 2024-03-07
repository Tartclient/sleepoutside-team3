import { login } from "./auth.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
const redirect = getParam("redirect");

document.querySelector("#submit").addEventListener("click", (e) => {
    console.log("button pressed");
    let user = document.querySelector("#user").value;
    let pass = document.querySelector("#pass").value;
    login({email, password}, redirect);
});
