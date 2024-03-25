function toggleSection(arg, section) {
  if (arg === 'show')
      section.style.opacity = section.style.zIndex = 1;
  else if (arg === 'hide') {
      section.style.opacity = 0;
      section.style.zIndex = -1;
  }
}

function addItem(item) {
  const itemName = item.querySelector('[item-name]').innerText;
  const itemPrice = item.querySelector('[item-price]').innerText;
  const itemImageSrc = item.querySelector('[item-image-source]').innerText;
  const remaining = Number(item.querySelector('[item-remaining]').innerText);
  if (cartItems.some(item => item.itemName === itemName))
      showNotificationBox('Item Exists', `${itemName} is already in the cart.`);
  else {
      cartItems.push({
        itemName,
        itemImageSrc,
        itemQuantity: 1,
        itemOriginalPrice: Number(itemPrice),
        itemNewPrice: Number(itemPrice),
        remaining: Number(remaining)
      });
  }
}

function removeItem(id) {
  const newItems = cartItems.filter(item => item.id !== id);
  cartItems = [...newItems];
  showCartItems();
}

function increaseQuantity(id) {
  const [currentItem] = cartItems.filter(item => item.id === id);
  const currentItemPriceText = retrieveNodeItem(itemPriceText, id.toString());
  const currentItemQuantityText = retrieveNodeItem(itemQuantityText, id.toString());

  if (currentItem.itemQuantity === currentItem.remaining) {
    return;
  } else {
    currentItem.itemQuantity += 1;
    currentItem.itemNewPrice = currentItem.itemOriginalPrice * currentItem.itemQuantity
    currentItemPriceText.innerText = `${currentItem.itemNewPrice}`;
    currentItemQuantityText.innerText = `${currentItem.itemQuantity}`;
    totalAmount.innerText = `Total Amount: $${sumAllPrice()}`;
  }
}

function decreaseQuantity(id) {
  const [currentItem] = cartItems.filter(item => item.id === id);
  const currentItemPriceText = retrieveNodeItem(itemPriceText, id.toString());
  const currentItemQuantityText = retrieveNodeItem(itemQuantityText, id.toString());

  if (currentItem.itemQuantity < 2) {
    return;
  } else {
    currentItem.itemQuantity -= 1;
    currentItem.itemNewPrice -= currentItem.itemOriginalPrice;
    currentItemPriceText.innerText = `${currentItem.itemNewPrice}`;
    currentItemQuantityText.innerText = `${currentItem.itemQuantity}`;
    totalAmount.innerText = `Total Amount: $${sumAllPrice()}`;
  }
}

function retrieveNodeItem(nodeList, id) {
  for (var i = 0; i < nodeList.length; i++) {
    if (nodeList[i].id === id)
      return nodeList[i];
  }

  return;
}

function sumAllPrice() {
  var total = 0;

  for (var i = 0; i < cartItems.length; i++) {
    total += Number(cartItems[i].itemNewPrice);
  }

  return total;
}

function assignId() {
  removeItemIcons = document.querySelectorAll('.remove-item');
  increaseButtons = document.querySelectorAll('.increase-button');
  decreaseButtons = document.querySelectorAll('.decrease-button');
  itemPriceText = document.querySelectorAll('.item-price-text');
  itemQuantityText = document.querySelectorAll('.item-quantity-text');

  for (var i = 0; i < cartItems.length; i++) {
    removeItemIcons[i].id = i;
    increaseButtons[i].id = i;
    decreaseButtons[i].id = i;
    itemPriceText[i].id = i;
    itemQuantityText[i].id = i;
    cartItems[i].id = i;
  }
}

function assignEventListener() {
  if (cartItems.length > 0) {
    proceedButton = document.querySelector('.proceed');
    proceedButton.addEventListener('click', () => {
      downloadReceipt();
    });
  }

  removeItemIcons.forEach(button => {
    button.addEventListener('click', () => {
      currentCartItemId = Number(button.id);
      removeItem(currentCartItemId);
    });
  });

  increaseButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentCartItemId = Number(button.id);
      increaseQuantity(currentCartItemId);
    });
  });

  decreaseButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentCartItemId = Number(button.id);
      decreaseQuantity(currentCartItemId);
    });
  });
}

function showCartItems() {
  heading.innerHTML = `
      <div>
          <p class="cart-heading"></p>
          <p class="total-amount">Total Amount: $${sumAllPrice()}</p>
      </div>`;
  cartContentArea.innerHTML = cartItems.map(item => {
      return `
        <div class="cart-item">
            <img class="cart-item-image" src="${item.itemImageSrc}" alt="Image of ${item.itemName}" />
            <div class="cart-items-details">
                <p class="cart-item-name detail">${item.itemName}</p>
                <p class="detail">Price: $<span class="detail item-price-text">${item.itemNewPrice}</span></p>
                <p class="detail">Quantity: <span class="detail item-quantity-text">${item.itemQuantity}</span></p>
                <div class="cart-item-buttons">
                    <button class="cart-item-button increase-button">+</button>
                    <button class="cart-item-button decrease-button">-</button>
                    <i class="fas fa-trash remove-item"></i>
                </div>
            </div>
        </div>`
  }).join('');

  cartItems.length > 0 && cartContentArea.insertAdjacentHTML('beforeEnd', () => '<button class="proceed">Proceed</button>');
  const cartItemsNumber = document.querySelector('.cart-heading');
  totalAmount = document.querySelector('.total-amount');
  cartItemsNumber.innerText = cartItems.length < 1 ? 'No items in the cart.' : `Items Selected: ${cartItems.length}`;
  assignId();
  assignEventListener();
}

function showItemInformation(currentItem, index) {
  information.innerHTML = `
      <div class="head">
          <img class="info-section-image" src="${itemImageSources[index].innerText}" alt="Image">
          <p class="item-title">${currentItem.querySelector('[item-name]').innerText}</p>
      </div>
      <div class="info">
          <p>Item price: ${currentItem.querySelector('[item-price]').innerText}</p>
          <p>Item availability: ${currentItem.querySelector('[item-remaining]').innerText !== '0' ? 'Available' : 'Unavailable'}</p>
          <p>${currentItem.querySelector('[item-remaining]').innerText !== '0' ?
          'Remaining: ' + currentItem.querySelector('[item-remaining]').innerText : 'This item is currently unvailable.'}</p>
          <p style="margin-top: 1rem">Description: ${currentItem.querySelector('[item-description]').innerText}</p>
      </div>`;
}

function sendCustomerName() {
  customerNameField.value = customerName;
  sendCustomerNameButton.click();
}

function displayPageNumbers() {
  var pageNumberButtons = []

  for (var i = 1; i <= numberOfPages; i++) {
    pageNumberButtons[i] = document.createElement('button');
    pageNumberButtons[i].innerText = i;
    pageNumberButtons[i].setAttribute('class', 'page-number');
    pageNumberButtons[i].addEventListener('click', (e) => {
      sendPageNumber(e.target.innerText);
    })

    if (i === currentPage) {
      pageNumberButtons[i].classList.add('current-page');
    }

    pageNumbersArea.appendChild(pageNumberButtons[i]);
  }
}

function sendPageNumber(number) {
  const pageNumberInput = document.querySelector('[page-field]');
  const submitPageNumberButton = document.querySelector('[submit-page-number]');

  pageNumberInput.value = number;
  submitPageNumberButton.click();
}

const searchButton = document.querySelector('[get-item-name-button]');
const itemButtonsArea = document.querySelectorAll('[item-buttons]');
const itemImageSources = document.querySelectorAll('[item-image-source]');
const itemImages = document.querySelectorAll('.item-image');
const itemInformationSection = document.querySelector('.item-information');
const closeInformationSection = document.querySelector('.close-information');
const items = document.querySelectorAll('.item');
const moreInfoButtons = document.querySelectorAll('[more-info-button]');
const addToCartButtons = document.querySelectorAll('[add-to-cart-button]');
const shoppingCartArea = document.querySelector('.shopping-cart');
const openCartButton = document.querySelector('.cart');
const closeCartButton = document.querySelector('.close-cart-area');
const information = document.querySelector('.information');
const heading = document.querySelector('[heading]');
const cartContentArea = document.querySelector('.cart-items');
const customerNameField = document.querySelector('[customer-name-field]');
const customerName = document.querySelector('[username]').innerText;
const sendCustomerNameButton = document.querySelector('[send-customer-name]');
const dashboardButton = document.querySelector('.dashboard-button');
const pageNumbersArea = document.querySelector('.page-numbers');
const currentPage = Number(document.querySelector('[page]').innerText);
const numberOfPages = Number(document.querySelector('[pages]').innerText);
var removeItemIcons = [];
var increaseButtons = [];
var decreaseButtons = [];
var itemPriceText = [];
var itemQuantityText = [];
var cartItems = [];
var totalAmount;
var currentCartItemId;
var proceedButton;

itemButtonsArea.forEach((item, index) => {
  item.id = index;
});

itemImages.forEach((item, index) => {
  item.src = itemImageSources[index].innerText;
});

searchButton.addEventListener('click', () => {
  searchForItem();
});

closeCartButton.addEventListener('click', () => {
    toggleSection('hide', shoppingCartArea);
});

closeInformationSection.addEventListener('click', () => {
    toggleSection('hide', itemInformationSection);
})

moreInfoButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        toggleSection('show', itemInformationSection);
        showItemInformation(items[index], index);
    });
});

addToCartButtons.forEach(button=> {
    const itemIndex = button.parentElement.id;
    button.addEventListener('click', () => {
        addItem(items[itemIndex]);
    });
});

openCartButton.addEventListener('click', () => {
    toggleSection('show', shoppingCartArea);
    showCartItems();
});

dashboardButton.addEventListener('click', () => {
  sendCustomerName();
});

displayPageNumbers();