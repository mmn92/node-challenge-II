import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface StoreData {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    return this.transactions.reduce(
      (acc: Balance, transaction: StoreData) => {
        if (transaction.type === 'income') {
          acc.income += transaction.value;
        } else {
          acc.outcome += transaction.value;
        }
        acc.total = acc.income - acc.outcome;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create(newTransaction: Transaction): Transaction {
    this.transactions = [newTransaction, ...this.transactions];

    return newTransaction;
  }
}

export default TransactionsRepository;
