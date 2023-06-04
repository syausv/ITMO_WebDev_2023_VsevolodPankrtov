import Dom from './src/constants/Dom.js';

const KEY_LOCAL_ITEMS = 'items';

class ItemVO {
  static fromJSON(json) {
    return new ItemVO(json.id, json.title);
  }
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}
const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTemplateItem = getDOM(Dom.Template.ITEM);
const domItemColumn = domTemplateItem.parentNode;
domTemplateItem.removeAttribute('id');
domTemplateItem.remove();

const rawItems = localStorage.getItem(KEY_LOCAL_ITEMS);

const items = rawItems
  ? JSON.parse(rawItems).map((json) => ItemVO.fromJSON(json))
  : [];

domItemColumn.onclick = (e) => {
  e.stopPropagation();
  console.log('domItemColumn', e.target);
  const domItemSelected = e.target;
  const itemId = domItemSelected.dataset.id;
  if (!itemId) return;

  const itemVO = items.find((item) => item.id === itemId);
  console.log('> itemVO:', itemVO);
  renderItemsPopup(
    itemVO,
    'Update task',
    'Update',
    (itemTitle) => {
      console.log('> Update task -> On Confirm', {
        itemTitle: itemTitle,
      });
      itemVO.title = itemTitle;
      const domItemUpdated = renderItem(itemVO);
      domItemColumn.replaceChild(domItemUpdated, domItemSelected);
      saveItem();
    }
  );
};
getDOM(Dom.Button.CREATE_ITEM).onclick = () => {
  console.log('> domPopupCreateTask.classList');
  renderItemsPopup(
    null,
    'Create task',
    'Create',
    (itemTitle) => {
      console.log('> Create task -> On Confirm');
      const itemId = `item_${Date.now()}`;
      const itemVO = new ItemVO(itemId, itemTitle);

      renderItem(itemVO);
      items.push(itemVO);

      saveItem();
    }
  );
};

function renderItem(itemVO) {
  const domItemClone = domTemplateItem.cloneNode(true);
  domItemClone.dataset.id = itemVO.id;
  QUERY(domItemClone, Dom.Template.Item.TITLE).innerText = itemVO.title;
  domItemColumn.prepend(domItemClone);
  return domItemClone;
}

async function renderItemsPopup(
  itemVO,
  popupTitle,
  processDataCallback
) {
  const domPopupContainer = getDOM(Dom.Popup.CONTAINER);
  domPopupContainer.classList.remove('hidden');

  const onClosePopup = () => {
    domPopupContainer.children[0].remove();
    domPopupContainer.classList.add('hidden');
  };

  const ItemPopup = (await import('./src/view/popup/ItemPopup')).default;
  const itemPopupInstance = new ItemPopup(
    popupTitle,
    (itemTitle) => {
      console.log('Main -> renderItemsPopup: confirmCallback', {
        itemTitle: itemTitle,
      });
      processDataCallback(itemTitle);
      onClosePopup();
    },
    onClosePopup
  );

  if (itemVO) {
    itemPopupInstance.itemTitle = itemVO.title;
  }
}
function saveItem() {
  localStorage.setItem(KEY_LOCAL_ITEMS, JSON.stringify(items));
}