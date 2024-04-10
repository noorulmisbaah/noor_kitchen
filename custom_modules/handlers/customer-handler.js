const util = require('./utils');
const fs = require('fs');

function renderCustomerPage(req, res) {
    if (!util.readJSONFile('./users/users.json').some(user => user.username === req.body.username)) {
        res.redirect('/');
        return;
    }

    const { username, email } = util.readJSONFile(`./users/${req.body.username}/user_information.json`);
    const messages = util.reverseArrayContent(util.readJSONFile(`./users/${username}/messages.json`));
    const allTransactions = util.reverseArrayContent(util.readJSONFile(`./users/${username}/transactions.json`));
    var total = 0;

    for (var i = 0; i < allTransactions.length; i++) {
        total += allTransactions[i].amount;
    }

    res.render('customer-dashboard', { username, email, messages, allTransactions, total });
}

module.exports = { renderCustomerPage };