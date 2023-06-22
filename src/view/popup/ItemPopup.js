import Dom from "../../constants/Dom.js";

class ItemPopup {
  #title;
  #confirmText;
  #confirmCallback;
  #closeCallback;

  constructor(title, confirmText, confirmCallback, closeCallback) {
    this.#title = title;
    this.#confirmText = confirmText;
    this.#confirmCallback = confirmCallback;
    this.#closeCallback = closeCallback;
  }

  #itemTitle = '';

  set itemTitle(value) {
    this.#itemTitle = value;
  }

  render() {
    const div = document.createElement('div');
    div.innerHTML = `
<div>
    <div class='flex flex-row justify-between'>
      <div class='flex flex-row'>Delete</div>
      <button data-id="close" class='flex flex-row'>close</button>
    </div>


    <div class='flex flex-row justify-between'>
      <div class='text-2xl'>${this.#title}</div>
      <div>Qty: <input></div>
      <div>Cost:<input></div>
      <div>
        <button data-id="btnConfirm" class='bg-slate-500 text-white rounded px-2 py-1'>${this.#confirmText}</button>
      </div>
    </div>

    <div class='flex flex-col'>
      <div  class='flex flex-row ml-2'>Work item:</div>
      <input data-id="inpTitle" type="text" value="${this.#itemTitle}" class='border-solid border-2 border-slate-500 rounded'>
    </div>

    <div class='flex flex-col'>
      <div class='flex flex-row ml-2'>Description:</div>
      <input class='border-solid border-2 border-slate-500 rounded'>
    </div>
    </div>
    `;

    console.log('div.firstChild', div.children);
    console.log('Popup', div);

    const popup = div.children[0];

    console.log('div.firstChild[1]', popup);


    const domBtnClose = popup.querySelector('[ data-id="close"]');
    const domBtnConfirm = popup.querySelector('[ data-id="btnConfirm"]');
    const domInpTitle = popup.querySelector('[ data-id="inpTitle"]');

    console.log('domBtnConfirm',domBtnConfirm)
    console.log('domBtnClose',domBtnClose)

    domBtnClose.onclick = () => {
      domBtnClose.onclick = null;
      domBtnConfirm.onclick = null;
      this.#closeCallback();
      document.getElementById(Dom.Button.CREATE_ITEM).disabled = false;
    };

    domBtnConfirm.onclick = () => {
      const itemTitle = domInpTitle.value;
      const itemDescription = 'orange juice without added sugar';
      const itemQty = '1';
      const itemCost = '3';
      const itemTotal = '3';
      this.#confirmCallback(itemTitle, itemDescription, itemQty, itemCost, itemTotal);
      document.getElementById(Dom.Button.CREATE_ITEM).disabled = false;
    };
    return div.children[0];
  }
}
export default ItemPopup;