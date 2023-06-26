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
//console.log('> items', items);

let itemId;
let domItemElement;

domItemColumn.onclick = (e) => {

  e.stopPropagation();
  domItemElement = e.target;
  itemId = domItemElement.dataset.id;
  console.log('itemId in domItemColumn',itemId)
  console.log('domItemElement in domItemColumn',domItemElement)
  if (!itemId) return;


  const itemVO = items.find((item) => item.id === itemId);

  console.log("itemVO in domItemColumn", itemVO);

  renderItemPopup(itemVO,
    'Update',
    'Save',
    (itemTitle, itemDescription,
     itemQty, itemCost, itemTotal) => {
    console.log('> Update item -> On confirm', {itemTitle, itemDescription,
        itemQty, itemCost, itemTotal});

    itemVO.title = itemTitle;
    itemVO.description = itemDescription;
    itemVO.qty = itemQty;
    itemVO.cost = itemCost;
    itemVO.total = itemTotal;


    const domItemUpdated = renderItem(itemVO);
    domItemColumn.replaceChild(domItemUpdated,domItemElement);
    saveItem();

     // console.log("items",items);
     // console.log("itemVO",itemVO);
     // console.log("itemId",e.target.dataset.id);

  });

  console.log('itemId after column',itemId);


  console.log('domItemElement after column',domItemElement);
 // domItemColumn.onclick = null;
  getDOM(Dom.Button.CREATE_ITEM).disabled = true;
}


getDOM(Dom.Button.CREATE_ITEM).onclick = () => {
 // console.log('> domPopupCreateItem.classList');
  renderItemPopup(null,
    'Add',
    'Create',
    (itemTitle, itemDescription, itemQty,
     itemCost, itemTotal) => {
   // console.log('> Create item -> On confirm');
    const itemId = `task_${items.length}_${Date.now()}`;
    const itemVO = new ItemVO(itemId, itemTitle, itemDescription,
      itemQty, itemCost, itemTotal);

    renderItem(itemVO);
    items.push(itemVO);

    saveItem();

  });

  getDOM(Dom.Button.CREATE_ITEM).disabled = true;
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
console.log('domItemElement before deleteItem',domItemElement);
function deleteItem (itemVO) {

  const indexOfItem = items.indexOf(itemVO);
  console.log('indexOfItem in deleteItem',indexOfItem);

  console.log('items before splice in deleteItem',items);

  items.splice(indexOfItem, 1);

  console.log('items after splice in deleteItem',items);


  console.log('domItemElement in deleteItem',domItemElement);


  console.log('domItemColumn.children(domItemElement) in deleteItem',domItemColumn.children[domItemElement]);

  domItemColumn.removeChild(domItemElement);
  saveItem();
}

async function renderItemPopup(
  itemVO,
  popupTitle,
  confirmText,
  processDataCallback,
)  {
  const domPopupContainer = getDOM(Dom.Popup.CONTAINER);
// console.log("classList", domPopupContainer)
  domPopupContainer.classList.remove('hidden');

  const onClosePopup = () => {
    domPopupContainer.children[0].remove();
    domPopupContainer.classList.add('hidden');
  };
  console.log("itemVO before onDeleteItem in renderItemPopup",itemVO);
  const onDeleteItem = () => {
    deleteItem(itemVO, itemId);
    domPopupContainer.children[0].remove();
    domPopupContainer.classList.add('hidden');
  }

const ItemPopup = (await import('./src/view/popup/ItemPopup')).default;
const itemPopupInstance = new ItemPopup(
  popupTitle,
  confirmText,
  (itemTitle, itemDescription, itemQty, itemCost, itemTotal) =>{
   // console.log('Main -> processDataCallback',{itemTitle, itemDescription, itemQty, itemCost, itemTotal});
    processDataCallback(itemTitle, itemDescription, itemQty, itemCost, itemTotal)
    onClosePopup();
  },
  onClosePopup,


  onDeleteItem,

);

if (itemVO) {
  itemPopupInstance.itemTitle = itemVO.title;
  itemPopupInstance.itemDescription = itemVO.description;
  itemPopupInstance.itemQty = itemVO.qty;
  itemPopupInstance.itemCost = itemVO.cost;
  itemPopupInstance.itemTotal = itemVO.total;

}

//console.log("itemPopupInstance",itemPopupInstance);
domPopupContainer.append(itemPopupInstance.render());
}

function saveItem() {
  localStorage.setItem(KEY_LOCAL_ITEM,JSON.stringify(items));
}