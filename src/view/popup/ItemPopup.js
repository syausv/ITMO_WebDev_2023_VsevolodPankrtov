import Dom from "../../constants/Dom.js";

class ItemPopup {
  #title;
  #confirmText;
  #confirmCallback;
  #closeCallback;

  #deleteCallback;

  constructor(title, confirmText, confirmCallback, closeCallback, deleteCallback) {
    this.#title = title;
    this.#confirmText = confirmText;
    this.#confirmCallback = confirmCallback;
    this.#closeCallback = closeCallback;
    this.#deleteCallback = deleteCallback;
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
      <button  data-id="delete" class='flex flex-row'>Delete</button>
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




    const domBtnClose = popup.querySelector('[ data-id="close"]');
    const domBtnDelete = popup.querySelector('[ data-id="delete"]');
    const domInpQty = popup.querySelector('[ data-id="inpQty"]');
    const domInpCost = popup.querySelector('[ data-id="inpCost"]');
    const domInpTotal = popup.querySelector('[ data-id="inpTotal"]');
    const domBtnConfirm = popup.querySelector('[ data-id="btnConfirm"]');
    const domInpTitle = popup.querySelector('[ data-id="inpTitle"]');
    const domInpDescription = popup.querySelector('[ data-id="inpDescription"]');

    domInpQty.addEventListener("change", updateQty, updateTotal);
    domInpCost.addEventListener("change", updateCost, updateTotal);

    let qty;
    let cost;
    let total;


    function updateQty(e)  {
      console.log("qty updated",e.target.value);
      if (e.target.value != null) {
        qty = e.target.value;
      } else {
        qty = 0;
      }
      updateTotal(qty,cost);
    };

    function updateCost(e)  {
      console.log("cost updated",e.target.value);
      if (e.target.value != null) {
        cost = e.target.value;
      } else {
        cost = 0;
      }
      updateTotal(qty,cost);
    };

   // console.log('domInpTotal.value',domInpTotal);

    function updateTotal(qty,cost) {
      console.log('updateTotal -> qty',qty);
      console.log('updateTotal -> cost',cost);

      if ((qty != undefined) && (cost != undefined)) {
        total = qty * cost;
        console.log('updateTotal ->if total',total);
      } else {
        total = 0;
        console.log('updateTotal ->else total',total);
      }
      console.log('updateTotal -> total',total);
      popup.querySelector('[ data-id="inpTotal"]').value = total;
      //this.#itemTotal = total;
    };



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

    domBtnDelete.onclick = () => {
      domBtnClose.onclick = null;
      domBtnDelete.onclick = null;
      domBtnConfirm.onclick = null;
      this.#deleteCallback();
      document.getElementById(Dom.Button.CREATE_ITEM).disabled = false;
    };
    //console.log( this.#itemTitle);
    return div.children[0];

  }

}
export default ItemPopup;