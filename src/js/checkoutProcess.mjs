import { totalCart } from "./cart.js";

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.itemTotal = totalCart();
        this.calculateItemSummary();
    },
    calculateItemSummary: function () {
        // calculate and display the total amount of the items in the cart, and the number of items.
        let output = !this.list === null ? this.list.length : 0; //counting how many items in list
        document.querySelector("#cartLength").textContent = output; // displaying how many items in list

        document.querySelector("#subTotal").textContent = this.itemTotal; // how much stuff costs

    },
    calculateOrdertotal: function () {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.shipping = this.list.length > 1 ? 10 + (this.list.length - 1) * 2 : 10;

        this.tax = this.itemTotal * 1.06;
        // display the totals.
        this.displayOrderTotals();
    },
    displayOrderTotals: function () {
        // once the totals are all calculated display them in the order summary page
        document.querySelector("#shippingCost").textContent = this.shipping;
        document.querySelector("#taxCost").textContent = this.tax;
    }
};

export default checkoutProcess;