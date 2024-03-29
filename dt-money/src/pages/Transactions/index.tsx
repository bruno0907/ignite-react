import { Header } from "../../components/Header"
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary"
import { useContextSelector } from 'use-context-selector'
import { currencyFormatter, dateFormatter } from "../../utils/formatter";

import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/Transactions";

export const TransactionsPage = () => {  
  const transactions = useContextSelector(TransactionsContext, ctx => ctx.transactions)

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' ? '- ' : '+ '}
                      {currencyFormatter.format(transaction.amount)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
              )
            })}            
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}