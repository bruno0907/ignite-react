import { createContext, ReactNode, useReducer, useState } from "react";
import { Cycle } from "../@types/cycle";
import { createNewCycleAction, interruptCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { cyclesReducer } from "../reducers/cycles/reducer";

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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  })

  const { cycles, activeCycleId } = cyclesState

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

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

  const interruptCycle = () => dispatch(interruptCycleAction())

  const markCurrentCycleAsFinished = () => dispatch(markCurrentCycleAsFinishedAction())

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
