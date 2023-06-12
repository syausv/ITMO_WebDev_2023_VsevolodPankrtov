import Dom from './src/constants/Dom';

const KEY_LOCAL_ITEM = 'item';

class ItemVO {
  static fromJSON(json) {
    return new ItemVO(json.id, json.title, json.description, json.qty, json.cost, json.total);
  }
  constructor( id, title, description, qty, cost, total) {
    this.id = id;
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
domTemplateItem.removeAttribute('id');
domTemplateItem.remove();

const rawItem = localStorage.getItem(KEY_LOCAL_ITEM);

const items = rawItem ? JSON.parse(rawItem).map((json) => ItemVO.fromJSON(json)) : [] ;
items.forEach((itemVO) => renderItem(itemVO));
console.log('> items', items);

domItemColumn.onclick = (e) => {
  e.stopPropagation();
  console.log(e.target);
  const domItemSelected = e.target;
  const itemId = domItemSelected.dataset.id;
  if (!itemId) return;


  const itemVO = items.find((item) => item.id === itemId);
  console.log("> itemVO", itemVO);
  renderItemPopup(itemVO,
    'Update',
    'Save',
    (itemTitle, itemDescription,
     itemQty, itemCost, itemTotal) => {
    console.log('> Update item -> On confirm',{itemTitle, itemDescription,
        itemQty, itemCost, itemTotal});
    itemVO.title = itemTitle;
    const domItemUpdated = renderItem(itemVO);
    domItemColumn.replaceChild(domItemUpdated,domItemSelected);
    saveItem();
  });
}

getDOM(Dom.Button.CREATE_ITEM).onclick = () => {
  console.log('> domPopupCreateItem.classList');
  renderItemPopup(null,
    'Add',
    'Create',
    (itemTitle, itemDescription, itemQty,
     itemCost, itemTotal) => {
    console.log('> Create item -> On confirm');
    const itemId = `task_${items.length}_${Date.now()}`;
    const itemVO = new ItemVO(itemId, itemTitle, itemDescription,
      itemQty, itemCost, itemTotal);

    renderItem(itemVO);
    items.push(itemVO);
    saveItem();
  });
};

function renderItem (itemVO) {
  const domItemClone = domTemplateItem.cloneNode(true);
  domItemClone.dataset.id = itemVO.id;

  QUERY(domItemClone, Dom.Template.Item.TITLE).innerText = itemVO.title;
  QUERY(domItemClone, Dom.Template.Item.DESCRIPTION).innerText = itemVO.description;
  QUERY(domItemClone, Dom.Template.Item.QTY).innerText = itemVO.qty;
  QUERY(domItemClone, Dom.Template.Item.COST).innerText = itemVO.cost;
  QUERY(domItemClone, Dom.Template.Item.TOTAL).innerText = itemVO.total;

  domItemColumn.prepend(domItemClone);
  return domItemClone;
}

async function renderItemPopup(
  itemVO,
  popupTitle,
  confirmText,
  processDataCallback
)  {
  const domPopupContainer = getDOM(Dom.Popup.CONTAINER);

  domPopupContainer.classList.remove('hidden');

  const onClosePopup = () => {
    domPopupContainer.children[0].remove();
    domPopupContainer.classList.add('hidden');
  };

const ItemPopup = (await import('./src/view/popup/ItemPopup')).default;
const itemPopupInstance = new ItemPopup(
  popupTitle,
  confirmText,
  (itemTitle, itemDescription, itemQty, itemCost, itemTotal) =>{
    console.log('Main -> processDataCallback',{itemTitle, itemDescription, itemQty, itemCost, itemTotal});
    processDataCallback(itemTitle, itemDescription, itemQty, itemCost, itemTotal)
    onClosePopup();
  },
  onClosePopup
);

if (itemVO) {
  itemPopupInstance.itemTitle = itemVO.title;
}

domPopupContainer.append(itemPopupInstance.render());
}

function saveItem() {
  localStorage.setItem(KEY_LOCAL_ITEM,JSON.stringify(items));
}