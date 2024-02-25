import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCounter } from "./header.js";

loadHeaderFooter();
updateCartCounter();

if (!localStorage.getItem("visited")) {
    createGiveAwayModal()
    localStorage.setItem("visited", true);
}

function createGiveAwayModal() {
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalContent.innerHTML += "" +
        "      <div class=\"modal-header\">" +
        "        <span class=\"close\">&times;</span>" +
        "        <h2>Gear Up for Adventure: Win Big in Our Ultimate Camping Giveaway!</h2>" +
        "      </div>" +
        "      <div class=\"modal-body\">" +
        "        <p>Register to be entered into the giveaway!</p>" +
        "        <p>One lucky registrar will be entered to win a tent of their choice!</p>" +
        "        <form id=\"giveaway\" name=\"register-form\" accept-charset=\"utf-8\" action=\"\"" +
        "          method=\"\">" +
        "          <fieldset id=\"giveaway-inputs\">" +
        "            <label for=\"full-name\">Full Name</label>" +
        "            <input type=\"text\" name=\"name\" id=\"full-name\" placeholder=\"First and Last\" required>" +
        "            <label for=\"email-address\">Email Address</label>" +
        "            <input type=\"email\" name=\"email\" id=\"email-address\" placeholder=\"email@site.com\" required>" +
        "            <input type=\"hidden\" name=\"subject\" id=\"email-subject\" value=\"Give Away Registration\">" +
        "          </fieldset>" +
        "          <input type=\"submit\" value=\"Register\">" +
        "        </form>" +
        "      </div>" +
        "      <div class=\"modal-footer\">" +
        "        <h3>Terms May Apply: Gear Galore Grab - Winners must navigate a simulated wilderness obstacle course to claim their prize.</h3>" +
        "      </div>" +
        "";
    const main = document.querySelector("main");
    main.append(modalContent);
    document.querySelector(".close")?.addEventListener("click", function (e) {
        modalContent.style.display = "none";
    })
}

