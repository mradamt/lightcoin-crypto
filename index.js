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
    if (this.isAllowed()) {
      this.account.addTransaction(this)
    } else {
      console.log('Insufficient funds to process this withdrawal')
      return 'Insufficient funds to process this withdrawal'
    }
  }

}


class Withdrawal extends Transaction {
  get value() {
    return -1 * this.amount
  }

  isAllowed() {
    return (this.account.balance + this.value) >= 0
  }

}


class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return (this.account.balance + this.value) >= 0
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("sillyBilly");
console.log('Starting balance:', myAccount.balance);

t3 = new Deposit(100.00, myAccount);
// console.log("t3.value:::", t3.value)
t3.commit();
// console.log('Transaction 3:', t3);
console.log('Balance:', myAccount.balance);

t1 = new Withdrawal(110, myAccount);
t1.commit();
// console.log('Transactions 1:', t1.transactions);
console.log('Balance:', myAccount.balance);

t2 = new Withdrawal(100, myAccount);
t2.commit();
// console.log('Transaction 2:', t2);
console.log('Balance:', myAccount.balance);


// console.log(myAccount);

