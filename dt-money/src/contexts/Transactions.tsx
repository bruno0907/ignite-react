import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
}

const TransactionsContext = createContext({} as TransactionsContext)

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = async () => {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()
    setTransactions(data)
  }

  useEffect(() => {
    fetchTransactions()

  }, [])
  
  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
