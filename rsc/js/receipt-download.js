function downloadReceipt(items, id) {
    const file = new jsPDF();

    file.addImage(logoURI, 10, 10, 50, 50);
    file.setFont('Poppins-Bold');
    file.setFontSize(25);
    file.text('NOOR KITCHEN', 90, 20);
    file.setFontSize(15);
    file.setFont('Poppins-Regular');
    file.text('Your Favorite Home of Dishes and Snacks!', 70, 27);
    file.text('Noor Kitchen', 140, 40);
    file.text('noorkitchen@noor.com', 140, 47);
    file.text('123-456-7890', 140, 54);
    file.text(`Customer name: ${customerName.toUpperCase()}`, 10, 70);
    file.text(`Transaction date: ${new Date().toDateString()}`, 10, 77);
    file.text(`Transaction ID: ${id}`, 10, 84);
    file.setFont('Poppins-Bold');
    file.setFontSize('20');
    file.text('TRANSACTION RECIEPT', 120, 87);
    file.autoTable({
        head: [['Item', 'Quantity', 'Original Price ($)', 'Total Amount ($)']],
        body: generateReceiptTableRows(items),
        startY: 95,
        styles: {
            font: 'Poppins-Regular',
            fontSize: 15
        },
        headStyles: {
            halign: 'center',
            font: 'Poppins-Bold',
            fillColor: [255, 187, 0]
        },
        columnStyles: {
            0: {
                halign: 'left'
            },
            1: {
                halign: 'center'
            },
            2: {
                halign: 'center'
            },
            3: {
                halign: 'center'
            }
        }  
    })
    file.save(`${id}_Trasanction_Receipt.pdf`);
}

function makePurchase(items) {
    fetch('purchase', {
        body: JSON.stringify({ customerName: customerName.toLowerCase(), items }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(data => {
        if (data.uploaded) {
            showNotificationBox('Successful', 'Your transaction was successful.');
            downloadReceipt(items, data.id);
        } else {
            showNotificationBox('Purchase Error', `Sorry, your purchase could not be made because '${data.invalidItem}' is low or unavailable in stock.`);
        }
    }).catch(err => {});
}

function generateReceiptTableRows(data) {
    var tableRows = [];

    for (var i = 0; i < data.length; i++) {
        var { itemName, itemQuantity, itemOriginalPrice, itemNewPrice } = {...data[i]};
        tableRows[i] = [itemName, itemQuantity, itemOriginalPrice, itemNewPrice];
    }

    return tableRows;
}
