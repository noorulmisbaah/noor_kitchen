const { readJSONFile } = require('./utils');

function renderShoppingArea(req, res) {
    const currentUser = req.body.username;
    const pageNumber = req.body.page;
    const fileContent = readJSONFile('./products/products.json');
    const numberOfPages = Math.ceil(fileContent.length / 8);
    var displayItems = [];

    if (pageNumber) {
        displayItems = arrangeDisplayItems(fileContent, pageNumber);
        res.render('shopping-area', { 
            products: displayItems, 
            username: currentUser, 
            page: pageNumber, 
            pages: numberOfPages 
        });
    } else {
        displayItems = arrangeDisplayItems(fileContent, 1);
        res.render('shopping-area', {
            products: displayItems,
            username: currentUser,
            page: 1,
            pages: numberOfPages
        });
    }
}

function arrangeDisplayItems(items, pageNumber) {
    const startingIndex = (pageNumber * 8) - 8;
    var newItems = [];

    for (var i = startingIndex, j = 0; j < 8, i < (startingIndex + 8); i++, j++) {
        if (!items[i]) {
            break;
        }
        else {
            newItems[j] = items[i];
        }
    }
    
    return newItems;
}

module.exports = { renderShoppingArea };