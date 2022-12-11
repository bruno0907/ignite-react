import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from 'react-hook-form';
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'

const newTransactionSchema = zod.object({
  description: zod.string(),
  amount: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome'])
})

type NewTransaction = zod.infer<typeof newTransactionSchema>

export const NewTransactionModal = () => {  
  const { register, handleSubmit, formState, control } = useForm<NewTransaction>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      type: 'income'
    }
  })

  const { isSubmitting } = formState

  const handleNewTransaction: SubmitHandler<NewTransaction> = value => {

    console.log(value)
  }  

  const handleNewTransactionErrors: SubmitErrorHandler<NewTransaction> = errors => console.log(errors)

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleNewTransaction, handleNewTransactionErrors)}>
          <input 
            type="text" 
            placeholder="Descrição" 
            required 
            {...register('description')}
          />
          <input 
            type="number" 
            placeholder="Valor" 
            required 
            {...register('amount', { valueAsNumber: true })}
          />
          <input 
            type="text" 
            placeholder="Categoria" 
            required 
            {...register('category')}
          />

          <Controller 
            control={control} 
            name="type"
            render={({ field }) => 
              <TransactionType onValueChange={field.onChange} value={field.value}>
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            }
          />

          <button 
            type="submit"
            disabled={isSubmitting}
          >
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}