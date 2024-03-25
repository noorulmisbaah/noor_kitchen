const utils = require('./utils');

function searchItem(req, res) {
    const fileContent = utils.readJSONFile('./products/products.json');
    const user = req.body.username;
    const item = req.body.item;
    var currentItem;

    for (var i = 0; i < fileContent.length; i++) {
        if (fileContent[i].itemName.toLowerCase() === item.toLowerCase()) {
            currentItem = fileContent[i];
            break;
        }
    }
    if (user)
        res.render('user-search', { result: currentItem, username: user });
    else {
        res.render('search', { result: currentItem });
    }
}

module.exports = { searchItem };