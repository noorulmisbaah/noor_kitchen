function purchaseItem() {
    makePurchase([{ itemName, itemOriginalPrice, itemNewPrice, itemQuantity }]);
}

function increaseItemQuantity() {
    if (itemQuantity === remaining)
        return;
    itemQuantity++;
    itemSelectedQuantity.innerText = itemQuantity;
    itemNewPrice += itemOriginalPrice;
}

function decreaseItemQuantity() {
    if (itemQuantity < 2)
        return;
    itemQuantity--;
    itemSelectedQuantity.innerText = itemQuantity;
    itemNewPrice -= itemOriginalPrice;
}

try {
    const imageSrc = document.querySelector('[image-src]').innerText;
    const itemImage = document.querySelector('[item-image]');
    const increaseButton = document.querySelector('.increase');
    const decreaseButton = document.querySelector('.decrease');
    const buyButton = document.querySelector('.buy-item-button');
    var customerName = document.querySelector('[username]').innerText;
    var itemOriginalPrice = document.querySelector('.item-price');
    var itemRemainingQuantity = document.querySelector('.remaining-quantity');
    var itemSelectedQuantity = document.querySelector('.selected-quantity');
    var itemName = document.querySelector('.item-name').innerText;
    var itemOriginalPrice = Number(itemOriginalPrice.innerText);
    var remaining = Number(itemRemainingQuantity.innerText);
    var itemQuantity = Number(itemSelectedQuantity.innerText);
    var itemNewPrice = itemOriginalPrice;
    
    itemImage.src = imageSrc;

    buyButton.addEventListener('click', () => {
        purchaseItem()
    });

    increaseButton.addEventListener('click', () => {
        increaseItemQuantity();
    });

    decreaseButton.addEventListener('click', () => {
        decreaseItemQuantity();
    });
    
} catch (e) {

}