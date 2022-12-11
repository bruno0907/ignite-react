import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  id: string;
  description: string
  type: 'income' | 'outcome';
  category: string;
  amount: number;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContext {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>
}

const TransactionsContext = createContext({} as TransactionsContext)

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        q: query
      }
    })
    const { data } = response
    setTransactions(data)
  }

  useEffect(() => {
    fetchTransactions()

  }, [])
  
  return (
    <TransactionsContext.Provider value={{ 
      transactions,
      fetchTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
