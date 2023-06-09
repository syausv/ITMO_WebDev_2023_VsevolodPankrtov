import Dom from './src/constants/Dom';

const KEY_LOCAL_ITEM = 'item';

class ItemVO {
  static fromJSON(json) {
    return new ItemVO(json.title, json.description, json.qty, json.cost, json.total);
  }
  constructor(title, description, qty, cost, total) {
    this.title = title;
    this.description = description;
    this.qty = qty;
    this.cost = cost;
    this.total = total;
  }
}

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id='${id}']`);



const domTemplateItem = getDOM(Dom.Template.ITEM)
const domItemColumn = domTemplateItem.parentNode;
domTemplateItem.remove();



const rawItem = localStorage.getItem(KEY_LOCAL_ITEM);
const items = rawItem ? JSON.parse(rawItem).map((json) => ItemVO.fromJSON(json)) : [] ;
items.forEach((itemVO) => renderItem(itemVO));
console.log('> items', items);

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
    const itemVO = new ItemVO( 'Juice','orange juice without added sugar','1','3','3');
    renderItem(itemVO);
    items.push(itemVO);
    localStorage.setItem(KEY_LOCAL_ITEM,JSON.stringify(items));
    console.log('confirm', itemVO);
    onClosePopup();
  };
};

function renderItem (itemVO,) {
  const itemView = domTemplateItem.cloneNode(true);

  QUERY(itemView, Dom.Template.Item.TITLE).innerText = itemVO.title;
  QUERY(itemView, Dom.Template.Item.DESCRIPTION).innerText = itemVO.description;
  QUERY(itemView, Dom.Template.Item.QTY).innerText = itemVO.qty;
  QUERY(itemView, Dom.Template.Item.COST).innerText = itemVO.cost;
  QUERY(itemView, Dom.Template.Item.TOTAL).innerText = itemVO.total;

  domItemColumn.prepend(itemView);
}