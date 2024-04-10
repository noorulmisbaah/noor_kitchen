const utils = require('./utils');

function viewTransaction(req, res) {
    const { id, currentCustomer } = req.body;
    const purchases = utils.readJSONFile(`./users/${currentCustomer}/purchases.json`);
    const [requestedPurchase] = purchases.filter(purchase => purchase.id === id);

    res.send(JSON.stringify(requestedPurchase));
}

module.exports = { viewTransaction };