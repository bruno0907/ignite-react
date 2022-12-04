import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle } from "../@types/cycle";
import { createNewCycleAction, interruptCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { cyclesInitialState, cyclesReducer } from "../reducers/cycles/reducer";

interface NewCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContext {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  totalSeconds: number;
  cycles: Cycle[];
  markCurrentCycleAsFinished: () => void;
  createNewCycle: (data: NewCycleData) => void;
  interruptCycle: () => void;
  setAmountSecondsPassed: (seconds: number) => void;  
}

interface CyclesProvider {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContext)

export const CyclesProvider = ({ children }: CyclesProvider) => {

  const [cyclesState, dispatch] = useReducer(cyclesReducer, cyclesInitialState, () => {
    const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')
    
    if(storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return cyclesInitialState

  })

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if(activeCycle) return differenceInSeconds(new Date(), new Date(activeCycle.startedAt))    
    return 0
  })

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const createNewCycle = ({ task, minutesAmount }: NewCycleData) => {      
    const id = `${new Date().getTime()}`
    const startedAt = new Date()
  
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startedAt
    }

    dispatch(createNewCycleAction(newCycle))
  }  

  const interruptCycle = () => {
    dispatch(interruptCycleAction())
    setAmountSecondsPassed(0)
  }

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction())
    setAmountSecondsPassed(0)
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)

  }, [cyclesState])

  return (
    <CyclesContext.Provider value={{ 
      activeCycle,
      activeCycleId,
       markCurrentCycleAsFinished,
       amountSecondsPassed,
       totalSeconds,
       createNewCycle,
       interruptCycle,
       setAmountSecondsPassed,
       cycles       
    }}>
      {children}
    </CyclesContext.Provider>
  )  
}
