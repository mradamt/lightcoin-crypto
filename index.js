class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value
    }
    return balance
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}


class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.time = new Date()
    this.account.addTransaction(this)
  }
}


class Withdrawal extends Transaction {
  get value() {
    return -1 * this.amount
  }
}


class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("sillyBilly");
console.log('Starting balance:', myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
// console.log('Transactions 1:', t1.transactions);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
// console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
// console.log("t3.value:::", t3.value)
t3.commit();
// console.log('Transaction 3:', t3);

console.log(myAccount);

console.log('Balance:', myAccount.balance);
