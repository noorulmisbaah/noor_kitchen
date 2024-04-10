const { handleReviewRequest } = require('./handlers/reviews-handler');
const { searchItem } = require('./handlers/search-handler');
const { renderShoppingArea } = require('./handlers/shopping-area-handler'); 
const { renderAdministratorPage } = require('./handlers/adminstrator-handler');
const { renderCustomerPage } = require('./handlers/customer-handler');
const { createUserAccount } = require('./handlers/signup-handler');
const { checkSigninInfo } = require('./handlers/signin-handler');
const { updateAccount } = require('./handlers/update-account-handler.js');
const { updateTransactions } = require('./handlers/transaction-handler');
const { submitTransaction } = require('./handlers/purchase-handler');
const { viewTransaction } = require('./handlers/view-transaction-handler');
const { removeUser } = require('./handlers/remove-user-handler');
const express = require('express');
const app = express();

function start() {
    //Setting up express and view engine
    app.set('view engine', 'ejs');
    app.use(express.static('rsc'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.listen(8000);
    //Setting up the routes
    app.get('/', (req, res) => res.render('index'));
    app.get('/reviews', (req, res) => handleReviewRequest(req, res));
    app.post('/admin', (req, res) => renderAdministratorPage(req, res));
    app.post('/customer', (req, res) => renderCustomerPage(req, res));
    app.post('/shopping', (req, res) => renderShoppingArea(req, res));
    app.post('/search', (req, res) => searchItem(req, res));
    app.post('/signup', (req, res) => createUserAccount(req, res));
    app.post('/signin', (req, res) => checkSigninInfo(req, res));
    app.post('/user-search', (req, res) => searchItem(req, res));
    app.post('/update-account', (req, res) => updateAccount(req, res));
    app.post('/purchase', (req, res) => submitTransaction(req, res));
    app.post('/view_transaction', (req, res) => viewTransaction(req, res));
    app.delete('/transactions', (req, res) => updateTransactions(req, res));
    app.delete('/remove-user', (req, res) => removeUser(req, res));
    //app.post('/user', (req, res) => {
    //});
}

module.exports = { start }