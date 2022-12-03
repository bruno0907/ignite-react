import { HandPalm, Play } from "phosphor-react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { Countdown } from "../../components/Countdown"
import { NewCycleForm } from "../../components/NewCycleForm"
import { useCycles } from "../../hooks/useCycles"

import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles"

const newCycleValidationSchema = zod.object({
  task: zod.string().min(5, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo não deve ultrapassar 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

export const Home = () => {  
  const { 
    activeCycle,
    createNewCycle, 
    interruptCycle,
  } = useCycles()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  }) 

  const { reset, watch, handleSubmit } = newCycleForm  

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }

  const handleInterruptCycle = () => interruptCycle() 
  
  const task = watch('task')  
  const isSubmitDisabled = !task

  return (    
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />        
          
          {!activeCycle ? (
            <StartCountdownButton 
              type="submit"
              disabled={isSubmitDisabled}
            >
              <Play size={24} />
              Começar          
            </StartCountdownButton>
          ) : (
            <StopCountdownButton 
              type="button"            
              onClick={handleInterruptCycle}  
            >
              <HandPalm size={24} />
              Interromper          
            </StopCountdownButton>
          )}
      </form>    
    </HomeContainer>
  )
}
