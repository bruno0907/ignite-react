import { MagnifyingGlass } from "phosphor-react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as zod from  'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchFormContainer } from "./styles";

const searchFormSchema = zod.object({
  query: zod.string()
})

type SearchForm = zod.infer<typeof searchFormSchema>

export function SearchForm() {
  const { register, handleSubmit, formState } = useForm<SearchForm>({
    resolver: zodResolver(searchFormSchema)
  })

  const { isSubmitting } = formState

  const handleSearchForm: SubmitHandler<SearchForm> = value => {
    console.log(value)
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