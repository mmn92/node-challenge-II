import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateService {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: CreateService): Transaction {
    const newTransaction = new Transaction(data);

    const currentBalance = this.transactionsRepository.getBalance();

    if (data.type === 'outcome' && data.value > currentBalance.total) {
      throw new Error('Insuficient funds');
    }

    const created = this.transactionsRepository.create(newTransaction);

    return created;
  }
}

export default CreateTransactionService;
