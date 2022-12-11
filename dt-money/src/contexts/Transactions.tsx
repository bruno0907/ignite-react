import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../services/api";

interface Transaction {
  id: string;
  description: string
  type: 'income' | 'outcome';
  category: string;
  amount: number;
  createdAt: Date;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface CreateNewTransaction {
  description: string
  type: 'income' | 'outcome';
  category: string;
  amount: number;  
}

interface TransactionsContext {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (transaction: CreateNewTransaction) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContext)

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })
    const { data } = response
    setTransactions(data)
  }, [])

  const createTransaction = useCallback(async (transaction: CreateNewTransaction) => {
    const { amount, category, description, type } = transaction
    const response = await api.post('transactions', {
      amount,
      category,
      description,
      type,
      createdAt: new Date()  
    })
    const { data } = response
    setTransactions(prevState => [data, ...prevState])
  }, [])

  useEffect(() => {
    fetchTransactions()

  }, [])
  
  return (
    <TransactionsContext.Provider value={{ 
      transactions,
      fetchTransactions,
      createTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}
