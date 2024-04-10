const utils = require('./utils');

function submitTransaction(req, res) {
    const { items, customerName } = req.body;
    const allPurchases = utils.readJSONFile(`./users/${customerName}/purchases.json`);
    const allTransactions = utils.readJSONFile(`./users/${customerName}/transactions.json`);
    const allProducts = utils.readJSONFile('./products/products.json');
    const id = generateTransactionId(allPurchases, items);
    const newItems = prepareItems(items, id);
    const { isValid, invalidItem } = validatePurchase(allProducts, items);
    var total = 0;

    if (!isValid) {
        res.send(JSON.stringify({ id, invalidItem, uploaded: false }));
        return;
    }

    for (var i = 0; i < items.length; i++) {
        total += items[i].itemNewPrice;
    }

    allPurchases[allPurchases.length] = newItems;
    allTransactions[allTransactions.length] = { transactionId: id, transactionDate: new Date().toDateString(), amount: total };
    updateProductsQuantity(allProducts, items);
    utils.writeJSONFile(`./users/${customerName}/purchases.json`, allPurchases);
    utils.writeJSONFile(`./users/${customerName}/transactions.json`, allTransactions);

    res.send(JSON.stringify({ uploaded: true, id }));
}

function generateTransactionId(items) {
    var ids = [];
    var id = randomId();

    for (var i = 0; i < items.length; i++) {
        ids[i] = items[i].transactionId;
    }

    while (ids.some(i => i === id)) {
        id = randomId();
    }

    return id;
}

function randomId() {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const prefix = letters[Math.floor(Math.random() * letters.length)];
    const suffix = letters[Math.floor(Math.random() * letters.length)];
    const middle = Math.floor(Math.random() * 10000);
    
    return `${prefix}${middle}${suffix}`;
}

function prepareItems(items, id) {
    var newItems = [];

    for (var i = 0; i < items.length; i++) {
        const { itemName, itemQuantity, itemOriginalPrice, itemNewPrice } = items[i];
        newItems[i] = { itemName, itemQuantity, itemOriginalPrice, itemNewPrice };
    }

    return { id, items: newItems };
}

function validatePurchase(products, currentPurchase) {
    var isValid;
    var invalidItem;

    for (var i = 0; i < currentPurchase.length; i++) {
        var currentItem = currentPurchase[i];

        for (var j = 0; j < products.length; j++) {
            if (currentItem.itemName === products[j].itemName) {
                if ((products[j].remaining - currentItem.itemQuantity) < 0) {
                    isValid = false;
                    invalidItem = currentItem.itemName;
                    break;
                } else {
                    isValid = true;
                }
            }
        }

        if (!isValid) {
            break;
        }
    }

    return { isValid, invalidItem };
}

function updateProductsQuantity(products, currentPurchase) {
     for (var i = 0; i < currentPurchase.length; i++) {
        var currentItem = currentPurchase[i];

        for (var j = 0; j < products.length; j++) {
            if (products[j].itemName === currentItem.itemName) {
                products[j].remaining -= currentItem.itemQuantity;
            }
        }
     }

     utils.writeJSONFile('./products/products.json', products);
}

module.exports = { submitTransaction };