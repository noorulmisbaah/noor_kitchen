const util = require('./utils');

function renderCustomerPage(req, res) {
    try {
        const { username, email } = util.readJSONFile(`./users/${req.body.username}/user_information.json`);
        const messages = util.reverseArrayContent(util.readJSONFile(`./users/${username}/messages.json`));
        const allTransactions = util.reverseArrayContent(util.readJSONFile(`./users/${username}/transactions.json`));
        var total = 0;
    
        for (var i = 0; i < allTransactions.length; i++) {
            total += allTransactions[i].amount;
        }
    
        res.render('customer-dashboard', { username, email, messages, allTransactions, total });
    } catch (e) {
        res.redirect('/');
    }
}

module.exports = { renderCustomerPage };