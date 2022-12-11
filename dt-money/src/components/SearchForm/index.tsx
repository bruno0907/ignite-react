import { MagnifyingGlass } from "phosphor-react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as zod from  'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchFormContainer } from "./styles";
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from "../../contexts/Transactions";

const searchFormSchema = zod.object({
  query: zod.string()
})

type SearchForm = zod.infer<typeof searchFormSchema>

export function SearchForm() {  
  const fetchTransactions = useContextSelector(TransactionsContext, ctx => ctx.fetchTransactions)

  const { register, handleSubmit, formState } = useForm<SearchForm>({
    resolver: zodResolver(searchFormSchema)
  })

  const { isSubmitting } = formState

  const handleSearchForm: SubmitHandler<SearchForm> = async ({ query }) => {    
    await fetchTransactions(query)    
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchForm)}>
      <input 
        type="text" 
        placeholder="Busque por transações" 
        {...register('query')}
      />

      <button 
        type="submit"
        disabled={isSubmitting}
      >
        <MagnifyingGlass size={20}/> Buscar
      </button>
    </SearchFormContainer>
  );
}