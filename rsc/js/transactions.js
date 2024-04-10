function viewTransaction(id) {
    fetch('view_transaction', {
        body: JSON.stringify({ id, currentCustomer: customerName }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json '}
    }).then(res => res.json()).then(data => {
        downloadReceipt(data.items, data.id);
    }).catch(err => {});
}

function removeTransaction(id) {
    fetch('transactions', {
        body: JSON.stringify({ currentCustomer: customerName, id }),
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(data => {
        showNotificationBox('Successful', 'The operation has been completed successfully.');
        if (data.length < 1) {
            purchaseHistorySection.innerHTML = 'No purchases to show.';
        } else {
            reRenderTransactions(data);
        }
    }).catch(err => {});
}

function reRenderTransactions(transactions) {
    transactionsTable.innerHTML = transactions.map(transaction => {
        return `
            <tr>
                <td class="transaction-id">${transaction.transactionId}</td>
                <td class="center-align">${transaction.transactionDate}</td>
                <td class="center-align">$${transaction.amount}</td>
                <td class="center-align" id=${transaction.transactionId}>
                    <button class="view-transaction-button">View</button>
                    <button class="remove-transaction-button">Remove</button>
                </td>
            </tr> 
        `
    }).join('');

    transactionBoxes.innerHTML = transactions.map(transaction => {
        return `
        <div class="transaction-details">
            <p>Transaction ID: ${transaction.transactionId}</p>
            <p>Date: ${transaction.transactionDate}</p>
            <p>Amount: $${transaction.amount}</p>
            <div style="margin-top: 1rem;" id=${transaction.transactionId}>
                <button class="view-transaction-button">View</button>
                <button class="remove-transaction-button">Remove</button>
            </div>
        </div>
        `
    }).join();
    assignButtonListeners();
}

function assignButtonListeners() {
    const viewTransactionButtons = document.querySelectorAll('.view-transaction-button');
    const removeTransactionButtons = document.querySelectorAll('.remove-transaction-button');
    
    viewTransactionButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentId = button.parentElement.id;
            viewTransaction(currentId);
        });
    });
    
    removeTransactionButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentId = button.parentElement.id;
            removeTransaction(currentId);
        });
    });
}

const transactionsTable = document.querySelector('.transactions-table-body');
const transactionBoxes = document.querySelector('.box-view');
const purchaseHistorySection = document.querySelector('.purchase-history');
const customerName = document.querySelector('[username]').innerText;
var currentId;

assignButtonListeners();