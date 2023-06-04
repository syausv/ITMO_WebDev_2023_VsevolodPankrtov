
class ItemPopup {
  #title;
  #confirmCallback;
  #closeCallback;
  constructor(title, confirmCallback, closeCallback) {
    this.#title = title;
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
<div data-id='addElementToTable' class='flex flex-col mx-32 w-[1024px]'>

      <div class='flex flex-row justify-between'>
        <div class='flex flex-row'>Delete</div>
        <div data-id="btnClose" class='flex flex-row'>close</div>
      </div>


    <div class='flex flex-row justify-between'>
      <div class='text-2xl'>Add</div>
      <div>Qty:</div>
      <div>Cost:</div>
      <div>
        <button class='bg-slate-500 text-white rounded px-2 py-1'>Create</button>
      </div>
    </div>

    <div class='flex flex-col'>
      <div class='flex flex-row ml-2'>Work item:</div>
      <input data-id="inpTitle" class='border-solid border-2 border-slate-500 rounded'>
    </div>

    <div class='flex flex-col'>
      <div class='flex flex-row ml-2'>Description:</div>
      <input class='border-solid border-2 border-slate-500 rounded'>
    </div>
  </div>
    `;
    console.log('div.firstChild', div.children);

    const popup = div.children[0];

    const domBtnClose = popup.querySelector('[data-id="btnClose"]');
    const domBtnConfirm = popup.querySelector('[data-id="btnConfirm"]');
    const domInpTitle = popup.querySelector('[data-id="inpTitle"]');

    domBtnClose.onclick = () => {
      domBtnClose.onclick = null;
      domBtnConfirm.onclick = null;
      this.#closeCallback();
    };

    domBtnConfirm.onclick = () => {
      const itemTitle = domInpTitle.value;
      const itemDate = Date.now();
      this.#confirmCallback(itemTitle, itemDate);
    };

    return div.children[0];
  }
}

export default ItemPopup;