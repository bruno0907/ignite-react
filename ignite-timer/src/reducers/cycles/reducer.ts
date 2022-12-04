import { Cycle } from "../../@types/cycle";
import { ActionTypes } from "./actions";

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;  
}

export const cyclesReducer = (state: CyclesState, { type, payload }: any) => {

  switch (type) {
    case ActionTypes.ADD_NEW_CYCLE:        
      return {
          ...state,
        cycles: [...state.cycles, payload.newCycle],
        activeCycleId: payload.newCycle.id,          
      }
    
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map(cycle => cycle.id === state.activeCycleId
          ? { ...cycle, interruptedAt: new Date() }
          : cycle
        ),
        activeCycleId: null
      }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map(cycle => cycle.id === state.activeCycleId
          ? { ...cycle, finishedAt: new Date() }
          : cycle
        ),
        activeCycleId: null
      }

    default: 
      return state 
  }

}