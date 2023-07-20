import Dom from './src/constants/Dom';


const KEY_LOCAL_ITEM = 'item';
const KEY_lOCAL_OPERATIONS = 'operations';

class ItemVO {
  static fromJSON(json) {
    return new ItemVO(json.id, json.title, json.description, json.qty, json.cost, json.total);
  }
  constructor(id, title, description, qty, cost, total) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.qty = qty;
    this.cost = cost;
    this.total = total;
  }
}

class Operations {
  constructor(subtotal, discount, total) {
    this.subtotal = subtotal;
    this.discount = discount;
    this.total = total;
  }
}

const operations = [];

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

let localDiscount = {};
let localNumberOfList = {};
let localTotal = {};

let subtotalGlobal;
let discountGlobal;
let totalGlobal;

const domTotalList = document.querySelector('[ id="totalList"]');
const domNumberOfList = document.querySelector('[ id="numberOfList"]');

const subtotalDom = document.querySelector('[ id="subtotal"]');
const discountResultDom = document.querySelector('[ id="discountResult"]');
const discountResultDomValue = document.querySelector('[ id="discountResultValue"]');
const totalResultDom = document.querySelector('[ id="totalResult"]');
console.log('>discountResultDom ',discountResultDom);
/*discountResultDom.addEventListener("change", countSubtotal);*/
countSubtotal();
domNumberOfList.addEventListener("input", function (event){
  localNumberOfList[event.target.id] = event.target.value;
  localStorage.setItem("localNumberOfList",JSON.stringify(localNumberOfList));
});

if (localStorage.getItem('localNumberOfList')) {
  localNumberOfList = JSON.parse(localStorage.getItem('localNumberOfList'));
  console.log('if in LS localDiscount:',localNumberOfList.numberOfList);
  domNumberOfList.value = localNumberOfList.numberOfList;
}


if (localStorage.getItem('localDiscount')) {
  localDiscount = JSON.parse(localStorage.getItem('localDiscount'));
  console.log('if in LS localDiscount:',localDiscount.discountResult);
  discountResultDom.value = localDiscount.discountResult;
  countDiscount();
}
domTotalList.addEventListener("input", function (event){
  localDiscount[event.target.id] = event.target.value;
  localStorage.setItem("localDiscount",JSON.stringify(localDiscount));
  countSubtotal();
   countDiscount();
});

function countDiscount () {
  console.log('> if discountGlobal ',discountGlobal);
  console.log('> if subtotalGlobal ',subtotalGlobal);
  console.log('> if localDiscount.discountResult ',localDiscount.discountResult);
  if ( localDiscount.discountResult >= 0 && localDiscount.discountResult <= 100) {
    discountGlobal = (subtotalGlobal * (localDiscount.discountResult/100));
    console.log('> if discountGlobal ',discountGlobal);
    console.log('> if subtotalGlobal ',subtotalGlobal);
    console.log('> if localDiscount.value ',localDiscount.value);
    totalGlobal = subtotalGlobal - discountGlobal;
    console.log('> totalGlobal ',totalGlobal);
    totalResultDom.innerText = Math.round(totalGlobal);
  } else {
    console.log('> totalGlobal ',totalGlobal);
    discountGlobal = 0;
    totalGlobal = subtotalGlobal;
    totalResultDom.innerText = Math.round(totalGlobal);
  }
  totalResultDom.innerText = Math.round(totalGlobal);
  discountResultDomValue.innerText = Math.round(discountGlobal);
  console.log('>subtotalGlobal ', subtotalGlobal);
}

function countSubtotal () {
  let subtotal = 0;
   items.forEach(item => {
    subtotal += Number(item.total);
  });
  subtotalDom.innerText = subtotal;
  localStorage.setItem("localSubtotal",JSON.stringify(subtotal));
  // operations.push({"subtotal": subtotal});
  console.log('>countSubtotal subtotal ', subtotal);
 // console.log('>countSubtotal e ', e.value);
  subtotalGlobal = subtotal;

  discountGlobal = 0;
  totalGlobal = subtotalGlobal;
  console.log('>countSubtotal totalGlobal ', totalGlobal);
  totalResultDom.innerText = Math.round(totalGlobal);
  return subtotalGlobal;
};


let itemId;
let domItemElement;

domItemColumn.onclick = (e) => {
  e.stopPropagation()
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
  countSubtotal();
  countDiscount();
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
  countSubtotal();
  countDiscount();
}