const util = require('./utils');

function renderCustomerPage(req, res) {
    res.render('customer-dashboard', { username: req.body.username })
}

module.exports = { renderCustomerPage };