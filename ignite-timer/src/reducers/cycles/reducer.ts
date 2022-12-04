import produce from "immer";
import { Cycle } from "../../@types/cycle";
import { ActionTypes } from "./actions";

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;  
}

export const cyclesInitialState = {
  cycles: [],
  activeCycleId: null
}

interface CycleAction {
  type: ActionTypes;
  payload?: any
}

export const cyclesReducer = (state: CyclesState, { type, payload }: CycleAction) => {

  switch (type) {
    case ActionTypes.ADD_NEW_CYCLE:      
      return produce(state, draft => {
        draft.cycles.push(payload.newCycle),
        draft.activeCycleId = payload.newCycle.id
      })
    
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

      if (currentCycleIndex < 0) return state

      return produce(state, draft => {
        draft.activeCycleId = null,
        draft.cycles[currentCycleIndex].interruptedAt = new Date()
      })

    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

      if (currentCycleIndex < 0) return state

      return produce(state, draft => {
        draft.activeCycleId = null,
        draft.cycles[currentCycleIndex].finishedAt = new Date()
      })
    }

    default: 
      return state 
  }

}