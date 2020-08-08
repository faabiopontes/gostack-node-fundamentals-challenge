import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (!['outcome', 'income'].includes(type)) {
      throw Error('Invalid Transaction type');
    }

    if (type === 'outcome' && balance.total < value) {
      throw Error('Balance is lower than transaction value');
    }

    const transaction = new Transaction({ title, value, type });
    this.transactionsRepository.create(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
