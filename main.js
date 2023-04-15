

// main.ts
import "uno.css";
import "@unocss/reset/tailwind.css";
import Dom from "./src/constants/dom.js";
import {randomString} from "./src/utils/stringUtils.js";


const Tags = ["Web","Design","Content"]
class TaskVO {
  constructor(title, date, tag) {
    this.title = title;
    this.date = date;
    this.tag = tag;
  }

}



const task = new TaskVO("Read", Date.now(),Tags[0]);
const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);
const domTask = getDOM(Dom.template.TASK);
const tasks = [];

getDOM(Dom.Button.CREATE_TASK).onclick = () => {
  console.log("click")

  const domPopupCreateTask = getDOM(Dom.Popup.CREATE_TASK);
  const domClosePopupCreateTask = QUERY(domPopupCreateTask, Dom.Button.POPUP_CREATE_TASK_CLOSE);
  const domConfirmPopupCreateTask = QUERY(domPopupCreateTask, Dom.Button.POPUP_CREATE_TASK_CONFIRM);
  domPopupCreateTask.classList.remove("hidden");
  const onClosePopup = () => {
    domPopupCreateTask.classList.add("hidden");
    domClosePopupCreateTask.onclick = null;
    domConfirmPopupCreateTask.onclick = null;
  }

  domClosePopupCreateTask.onclick = onClosePopup;
  domConfirmPopupCreateTask.onclick = () =>{
    const taskVO = new TaskVO(
      randomString(12),
      Date.now(),
      Tags[0]);
    const taskView = domTask.cloneNode(true);
    QUERY(taskView,Dom.template.Task.TITLE).innerText = taskVO.title;
    domTask.parentNode.prepend(taskView);
    tasks.push(taskVO);
    console.log("confirm", taskVO);
    onClosePopup();
  }
};