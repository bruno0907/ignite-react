import { HandPalm, Play } from "phosphor-react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles"
import { useEffect, useState } from "react"
import { differenceInSeconds } from "date-fns"
import { Countdown } from "../../components/Countdown"
import { NewCycleForm } from "../../components/NewCycleForm"

const newCycleValidationSchema = zod.object({
  task: zod.string().min(5, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo não deve ultrapassar 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startedAt: Date;
  interruptedAt?: Date;
  finishedAt?: Date;
}

export const Home = () => {  
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCyleId] = useState<string | null>(null)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  }) 

  const handleCreateNewCycle: SubmitHandler<NewCycleFormData> = data => {
    const { task, minutesAmount } = data
    const id = `${task}#${minutesAmount}-${new Date().getTime()}`
    const startedAt = new Date()

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startedAt
    }

    setCycles(prevCycles => [...prevCycles, newCycle])
    setActiveCyleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  const handleInterruptCycle = () => {  
    setCycles(
      prevCycles => prevCycles.map(cycle => cycle.id === activeCycleId 
        ? { ...cycle, interruptedAt: new Date() } 
        : cycle
      )
    )
    setActiveCyleId(null)
  }
  
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutesToShow = String(minutesAmount).padStart(2, '0')
  const secondsToShow = String(secondsAmount).padStart(2, '0')

  const task = watch('task')  
  const isSubmitDisabled = !task

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      const countdown = () => {
        const secondsCountdownDifference = differenceInSeconds(new Date(), activeCycle.startedAt)

        if (secondsCountdownDifference >= totalSeconds) {
          setCycles(prevCycles => prevCycles.map(
            cycle => cycle.id === activeCycleId 
              ? {...cycle, finishedAt: new Date() } 
              : cycle
            )
          )
          
          setAmountSecondsPassed(totalSeconds)
          setActiveCyleId(null)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsCountdownDifference)

        }

      }

      interval = setInterval(countdown, 1000)
    }

    return () => {
      clearInterval(interval)
    }
    
  }, [activeCycle, totalSeconds,activeCycleId])

  useEffect(() => {
    if(activeCycle) document.title = `${minutesToShow}:${secondsToShow}`

  }, [minutesToShow, secondsToShow, activeCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm 
          activeCycle={!!activeCycle}
          register={register}
        />

        <Countdown 
          minutes={minutesToShow}
          seconds={secondsToShow}
        />        
        
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
