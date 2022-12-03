import { createContext, ReactNode, useContext, useState } from "react";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startedAt: Date;
  interruptedAt?: Date;
  finishedAt?: Date;
}

interface NewCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContext {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  totalSeconds: number;
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
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCyleId] = useState<string | null>(null) 
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const markCurrentCycleAsFinished = () => {
    setCycles(prevCycles => prevCycles.map(
      cycle => cycle.id === activeCycleId 
        ? {...cycle, finishedAt: new Date() } 
        : cycle
      )
    )
    setActiveCyleId(null)
  }

  const createNewCycle = ({ task, minutesAmount }: NewCycleData) => {      
    const id = `${new Date().getTime()}`
    const startedAt = new Date()
  
    const cycle: Cycle = {
      id,
      task,
      minutesAmount,
      startedAt
    }

    setCycles(prevCycles => [...prevCycles, cycle])
    setActiveCyleId(cycle.id)
    setAmountSecondsPassed(0)
  }  

  const interruptCycle = () => {
    setCycles(
      prevCycles => prevCycles.map(cycle => cycle.id === activeCycleId 
        ? { ...cycle, interruptedAt: new Date() } 
        : cycle
      )
    )
    setActiveCyleId(null)
  }

  return (
    <CyclesContext.Provider value={{ 
      activeCycle,
      activeCycleId,
       markCurrentCycleAsFinished,
       amountSecondsPassed,
       totalSeconds,
       createNewCycle,
       interruptCycle,
       setAmountSecondsPassed       
    }}>
      {children}
    </CyclesContext.Provider>
  )  
}
