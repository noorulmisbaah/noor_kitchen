const util = require('./utils');

function renderAdministratorPage(req, res) {
    res.render('administrator-dashboard')
}

module.exports = { renderAdministratorPage };