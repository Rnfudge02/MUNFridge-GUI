import {getItemsInFridge} from "./API.ts";

let x = document.getElementById("Test_BTN");
x.addEventListener("click", get_item, false);
console.log(x);

function get_item() {
    const x = getItemsInFridge(1);
    console.log(x);
}