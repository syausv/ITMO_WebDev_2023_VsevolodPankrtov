

// main.ts
import "uno.css";
import "@unocss/reset/tailwind.css";
import Key from "./src/constants/dom.js";

const DOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);
const domBtnCreateTask = document.getElementById("btnCreateTask");


DOM(Key.Button.CREATE_TASK).onclick = (e) => {
  console.log("click");
  const domPopupCreateTask = DOM(Key.Popup.CREATE_TASK);
  const domClosePopupCreateTask = QUERY(domPopupCreateTask, Key.Button.CLOSE_POPUP_CREATE_TASK);
  domPopupCreateTask.classList.remove("hidden");


  QUERY(domPopupCreateTask, Key.Button.CLOSE_POPUP_CREATE_TASK).onclick = (e) => {
    DOM(Key.Popup.CREATE_TASK).classList.add("hidden");
    DOM(Key.Button.CLOSE_POPUP_CREATE_TASK).onclick = null;
  }
};