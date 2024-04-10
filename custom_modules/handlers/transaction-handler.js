const utils = require('./utils');

function updateTransactions(req, res) {
    const { currentCustomer, id } = req.body;
    const transactions = utils.readJSONFile(`./users/${currentCustomer}/transactions.json`);
    const purchases = utils.readJSONFile(`./users/${currentCustomer}/purchases.json`);
    const newTransactions = transactions.filter(transaction => transaction.transactionId !== id);
    const newPurchases = purchases.filter(purchase => purchase.id !== id);

    utils.writeJSONFile(`./users/${currentCustomer}/transactions.json`, newTransactions);
    utils.writeJSONFile(`./users/${currentCustomer}/purchases.json`, newPurchases);
    res.send(JSON.stringify(utils.reverseArrayContent(newTransactions)));
}

module.exports = { updateTransactions };