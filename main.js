import Dom from './src/constants/Dom';



class ItemVO {
  constructor(title, description, qty, cost) {
    this.title = title;
    this.description = description;
    this.qty = qty;
    this.cost = cost;
  }
}

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id='${id}']`);

const domTask = getDOM(Dom.Template.ITEM);

const items = [];

getDOM(Dom.Button.CREATE_ITEM).onclick = () => {
  console.log('> domPopupCreateItem.classList');

  const domPopupCreateItem = getDOM(Dom.Popup.CONTAINER);
  const domBtnClose = QUERY(
    domPopupCreateItem,
    Dom.Button.POPUP_CREATE_ITEM_CLOSE
  );
  const domBtnConfirm = QUERY(
    domPopupCreateItem,
    Dom.Button.POPUP_CREATE_ITEM_CONFIRM
  );

  domPopupCreateItem.classList.remove('hidden');

  const onClosePopup = () => {
    domPopupCreateItem.classList.add('hidden');
    domBtnClose.onclick = null;
    domBtnConfirm.onclick = null;
  };

  domBtnClose.onclick = onClosePopup;

  domBtnConfirm.onclick = () => {
    const itemVO = new ItemVO( 0,0,0,0);
    const itemView = domTask.cloneNode(true);

    QUERY(itemView, Dom.Template.Item.TITLE).innerText = itemVO.title;
    QUERY(itemView, Dom.Template.Item.DESCRIPTION).innerText = itemVO.description;
    QUERY(itemView, Dom.Template.Item.QTY).innerText = itemVO.qty;
    QUERY(itemView, Dom.Template.Item.COST).innerText = itemVO.cost;

    domTask.parentNode.prepend(itemView);
    items.push(itemVO);

    console.log('confirm', itemVO);

    onClosePopup();
  };
};