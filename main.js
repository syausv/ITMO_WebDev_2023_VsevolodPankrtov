

// main.ts
import "uno.css";
import "@unocss/reset/tailwind.css";

const domBtnCreateTask = document.getElementById("btnCreateTask");
const dompopupCreateTask = document.getElementById("popupCreateTask");


domBtnCreateTask.onclick = (e) => {
  console.log("click");
  dompopupCreateTask.classList.remove("hidden");
  const dombtnCloseCreateTaskPopup = document.getElementById("btnCloseCreateTaskPopup");

  dombtnCloseCreateTaskPopup.onclick = (e) => {
    dompopupCreateTask.classList.add("hidden");
    dombtnCloseCreateTaskPopup.onclick = null;
  }
};