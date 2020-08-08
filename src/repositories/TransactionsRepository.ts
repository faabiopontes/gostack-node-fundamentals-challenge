import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = { income: 0, outcome: 0, total: 0 };
    this.transactions.forEach(({ value, type }: Transaction) => {
      if (type === 'income') {
        balance.income += value;
        balance.total += value;
      }
      if (type === 'outcome') {
        balance.outcome += value;
        balance.total -= value;
      }
    });

    return balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
