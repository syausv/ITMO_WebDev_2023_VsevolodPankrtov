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
<div class="border-2 rounded border-opacity-25 px-6 pb-6 pt-3">
    <div class='flex flex-row justify-between pb-2'>
      <button  data-id="delete" class='flex flex-row'>Delete</button>
      <button data-id="close" class='flex flex-row'>close</button>
    </div>


    <div class='flex flex-row justify-between py-3 '>
      <div class='text-5xl font-weight-bold'>${this.#title}</div>
      <div>Qty: <input data-id="inpQty" type="number" value="${this.#itemQty}" class="border-b-2 border-opacity-25 border-slate-500"></div>
      <div>Cost: <a class="text-slate-300">($)</a> <input data-id="inpCost" type="number" value="${this.#itemCost}" class="border-b-2 border-opacity-25 border-slate-500"></div>
      <div>Total: <a class="text-slate-300">($)</a> <input data-id="inpTotal" type="number" value="${this.#itemTotal}"></div>
      <div>
        <button data-id="btnConfirm" class='bg-slate-500 text-white rounded px-2 py-1'>${this.#confirmText}</button>
      </div>
    </div>

    <div class='flex flex-col pt-2 pb-1'>
      <div  class='flex flex-row ml-1'>Work item:</div>
      <input data-id="inpTitle" type="text" value="${this.#itemTitle}" class='border-solid px-1 border-2 border-opacity-25 border-slate-500 rounded'>
    </div>

    <div class='flex flex-col'>
      <div class='flex flex-row ml-1'>Description:</div>
      <input data-id="inpDescription" type="text" value="${this.#itemDescription}" class='border-solid px-1 border-opacity-25 border-2 border-slate-500 rounded'>
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
      return qty;
    };

    function updateCost(e)  {
      console.log("cost updated",e.target.value);
      if (e.target.value != null) {
        cost = e.target.value;
      } else {
        cost = 0;
      }

      updateTotal(qty,cost);
      return cost;
    };

   // console.log('domInpTotal.value',domInpTotal);

    function updateTotal(qty,cost) {
      console.log('updateTotal -> qty',qty);
      console.log('updateTotal -> cost',cost);

      if ((qty != undefined) && (cost != undefined)) {
        total = qty * cost;
        console.log('updateTotal ->if total',total);
      } else {
        total = qty * cost;
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
       if (domInpTitle.value && domInpDescription.value && domInpQty.value && domInpCost.value != null) {
       const itemTitle = domInpTitle.value;
       const itemDescription = domInpDescription.value;
       const itemQty = domInpQty.value;
       const itemCost = domInpCost.value;
       const itemTotal = domInpTotal.value;
       this.#confirmCallback(itemTitle, itemDescription, itemQty, itemCost, itemTotal);
       document.getElementById(Dom.Button.CREATE_ITEM).disabled = false;
        console.log('domInpTitle.value',domInpTitle.value)
}    else {
         alert("Please input all values");
}

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