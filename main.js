

// main.ts
import "uno.css";
import "@unocss/reset/tailwind.css";
import Dom from "./src/constants/dom.js";
import {randomString} from "./src/utils/stringUtils.js";

const KEY_LOCAL_TASKS  = "tasks";

const Tags = ["Web","Design","Content"]
class TaskVO {

  static fromJSON(json) {
    return new TaskVO(json.id,json.title, json.date, json.tag)
  }
  constructor(id, title, date, tag) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.tag = tag;
  }

}



const task = new TaskVO("Read", Date.now(),Tags[0]);
const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTemplateTask = getDOM(Dom.template.TASK);
const domTaskColumn = domTemplateTask.parentNode
domTemplateTask.removeAttribute('id');
domTemplateTask.remove();

const rawTasks = localStorage.getItem(KEY_LOCAL_TASKS);

const tasks = rawTasks
  ? JSON.parse(rawTasks).map((json) => TaskVO.fromJSON(json)) : [];
tasks.forEach((taskVO) => renderTask(taskVO));

domTaskColumn.onclick = (e) => {
  e.stopPropagation();
  console.log('domTaskColumn',e.target)
  renderTaskPopup("Update Task","Update",() => {console.log('> Update task -> On Confirm')});
}
getDOM(Dom.Button.CREATE_TASK).onclick = () => {
  renderTaskPopup("Create Task","Create",() => {console.log('> Create task -> On Confirm')});
};


function onCreateTaskClick() {
  const taskId = `task_${Date.now()}`;
  const taskTitle = randomString(12);
  const taskVO = new TaskVO(
    taskId,
    taskTitle,
    Date.now(),
    Tags[0]);


  renderTask(taskVO);

  tasks.push(taskVO);

  console.log("confirm", taskVO);

  localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));

}


function renderTask(taskVO) {
  const domTaskClone = domTemplateTask.cloneNode(true);
  domTaskClone.dataset.id = taskVO.id;
  QUERY(domTaskClone,Dom.template.Task.TITLE).innerText = taskVO.title;
  domTaskColumn.prepend(domTaskClone);
}
function renderTaskPopup(popupTitle, btnConfirmText, confirmCallback){
  console.log("click");

  const domPopupCreateTask = getDOM(Dom.Popup.CREATE_TASK);
  const domBtnClose = QUERY(domPopupCreateTask, Dom.Button.POPUP_CREATE_TASK_CLOSE);
  const domBtnConfirm = QUERY(domPopupCreateTask, Dom.Button.POPUP_CREATE_TASK_CONFIRM);
  const domTitle = QUERY(domPopupCreateTask, Dom.Popup.CreateTask.TITLE)

   domBtnConfirm.innerText = btnConfirmText;
  domTitle.innerText = popupTitle;


  domPopupCreateTask.classList.remove("hidden");
  const onClosePopup = () => {
    domPopupCreateTask.classList.add("hidden");
    domBtnClose.onclick = null;
    domBtnConfirm.onclick = null;
  }

  domBtnClose.onclick = onClosePopup;

  domBtnConfirm.onclick = () => {
    const taskTitle = randomString(12);
    const taskDate = randomString(12);
    const taskTags = Tags [0];
    confirmCallback && confirmCallback();

    onClosePopup();
  };
}