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
  #itemDescription = '';
  #itemQty = '';
  #itemCost = '';
  #itemTotal = '';


  set itemTitle(value) {
    this.#itemTitle = value;
  }
  set itemDescription(value) {
    this.#itemDescription = value;
  }
  set itemQty(value) {
    this.#itemQty = value;
  }
  set itemCost(value) {
    this.#itemCost = value;
  }
  set itemTotal(value) {
    this.#itemTotal = value;
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
      <div>Qty: <input data-id="inpQty" type="number" value="${this.#itemQty}"></div>
      <div>Cost:<input data-id="inpCost" type="number" value="${this.#itemCost}"></div>
      <div>Total:<input data-id="inpTotal" type="number" value="${this.#itemTotal}"></div>
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
      <input data-id="inpDescription" type="text" value="${this.#itemDescription}" class='border-solid border-2 border-slate-500 rounded'>
    </div>
    </div>
    `;

   // console.log('div.firstChild', div.children);
   // console.log('Popup', div);


    const popup = div.children[0];

    console.log('div.firstChild[0]', popup);


    const domBtnClose = popup.querySelector('[ data-id="close"]');
    const domInpQty = popup.querySelector('[ data-id="inpQty"]');
    const domInpCost = popup.querySelector('[ data-id="inpCost"]');
    const domInpTotal = popup.querySelector('[ data-id="inpTotal"]');
    const domBtnConfirm = popup.querySelector('[ data-id="btnConfirm"]');
    const domInpTitle = popup.querySelector('[ data-id="inpTitle"]');
    const domInpDescription = popup.querySelector('[ data-id="inpDescription"]');



    //console.log('domBtnConfirm',domBtnConfirm)
   // console.log('domBtnClose',domBtnClose)

    domBtnClose.onclick = () => {
      domBtnClose.onclick = null;
      domBtnConfirm.onclick = null;
      this.#closeCallback();
      document.getElementById(Dom.Button.CREATE_ITEM).disabled = false;

    };

    domBtnConfirm.onclick = () => {

      const itemTitle = domInpTitle.value;
      const itemDescription = domInpDescription.value;
      const itemQty = domInpQty.value;
      const itemCost = domInpCost.value;
      const itemTotal = domInpTotal.value;
      this.#confirmCallback(itemTitle, itemDescription, itemQty, itemCost, itemTotal);
      document.getElementById(Dom.Button.CREATE_ITEM).disabled = false;
      console.log('domInpTitle.value',domInpTitle.value)
    };
    //console.log( this.#itemTitle);
    return div.children[0];

  }

}
export default ItemPopup;