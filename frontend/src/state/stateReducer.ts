
import { AppState } from "./state"

type Action = {
  type: ReducerActions,
  payload: any
}

enum ReducerActions {
  SetEmployees = "SetEmployees",
  ToggleEmployeeDrawer = "ToggleEmployeesDrawer",
}

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case ReducerActions.SetEmployees:
      return {
        ...state,
        employees: action.payload
      }

    case ReducerActions.ToggleEmployeeDrawer:
      return {
        ...state,
        openEmployeeDrawer: !state.openEmployeeDrawer
      }

    default:
      return state
  }
}

export type { Action }
export { reducer, ReducerActions }
