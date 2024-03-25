function downloadReceipt() {
    const file = new jsPDF();

    file.addImage(logoURI, 10, 10, 50, 50);
    file.setFont('Poppins-Bold');
    file.setFontSize(25);
    file.text('NOOR KITCHEN', 90, 20);
    file.setFontSize(15);
    file.setFont('Poppins-Regular');
    file.text('Your Favorite Home of Dishes and Snacks!', 70, 27);
    file.text('Noor Kitchen', 140, 50);
    file.text('noorkitchen@noor.com', 140, 57);
    file.text('123-456-7890', 140, 64);
    file.text('Customer name: Usman Hassan', 10, 80);
    file.text(`Transaction date: ${new Date().toDateString()}`, 10, 87);
    file.setFont('Poppins-Bold');
    file.setFontSize('20');
    file.text('TRANSACTION RECIEPT', 120, 87);
    file.autoTable({
        head: [['Item', 'Quantity', 'Original Price', 'Amount']],
        body: generateReceiptTable(cartItems),
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
    file.save('Reciept.pdf');
}

function generateReceiptTable(data) {
    var tableRows = [];

    for (var i = 0; i < data.length; i++) {
        var { itemName, itemQuantity, itemOriginalPrice, itemNewPrice } = {...data[i]};
        tableRows[i] = [itemName, itemQuantity, itemOriginalPrice, itemNewPrice];
    }

    return tableRows;
}

//window.addEventListener('load', downloadReceipt)