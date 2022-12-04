import { Cycle } from "../../@types/cycle";

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

export const createNewCycleAction = (newCycle: Cycle) => ({
  type: ActionTypes.ADD_NEW_CYCLE,
  payload: {
    newCycle        
  }
})

export const interruptCycleAction = () => ({
  type: ActionTypes.INTERRUPT_CURRENT_CYCLE 
})

export const markCurrentCycleAsFinishedAction = () => ({
  type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED  
})