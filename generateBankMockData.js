var fs = require('fs')

let a = new Date('2021-01-01');
let b = new Date('2024-01-01');

var randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

function createMockDataForBank(a, b){
let mode = ['CASH',	'ATM', 'CARD_PAYMENT', 'UPI', 'FT', 'OTHERS']
let type = ['OPENING', 'INTEREST', 'TDS', 'INSTALLMENT', 'CLOSING','OTHERS'];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let transactionsArray = []
let currentBalance = 0.00
let hoursMinutes = new Date().toISOString().split('T')[1].slice(0, 8);
let i = 0;
while(a <= b){
    let valueDate = a
    let obj = {
        Txnid: `M${randomFixedInteger(7)}`,
        Mode: mode[Math.floor(Math.random() * (5 - 0 + 1)) + 0],
        Type: type[Math.floor(Math.random() * (5 - 0 + 1)) + 0],
        Amount: '100000.00',
        Balance: (parseFloat(100000.00.toString()) + parseFloat(currentBalance.toString())).toFixed(2),
        valueDate: valueDate.toISOString().slice(0, 10),
        Transactiontimestamp: a.toISOString().split('T')[0] + ' '+ hoursMinutes,
        Reference: `RFN${randomFixedInteger(8)}`,
        Narration: `TOWARDS FD FOR MONTH ${months[i].toUpperCase()}`
    }
    i = i == 11 ? 0 : i+=1
    currentBalance = obj.Balance
    transactionsArray.push(obj)
    a.setMonth(a.getMonth() + 1)
}
 return transactionsArray;
}

fs.writeFileSync('./data.json', JSON.stringify(createMockDataForBank(a, b)), err=> {
    if(err){
        console.error(err);
        return;
    }
})
