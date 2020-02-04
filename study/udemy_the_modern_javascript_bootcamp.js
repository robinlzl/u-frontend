let myAccount = {
    name : "lzl",
    expenses : 0,
    income : 0
}

let addExpense = function(account, amount) {
    account.expenses += amount
}


let addIncome =  function(account, income) {
    account.income += income
}

let resetAccount =  function (account) {
    account.expenses = 0
    account.income = 0
}

let getAccountSummary = function(account) {
    console.log(`account for ${account.name} has ${account.income - account.expenses}. ${account.income} in income. ${account.expenses} in expenses`)
}
addIncome(myAccount, 1000)
getAccountSummary(myAccount)
