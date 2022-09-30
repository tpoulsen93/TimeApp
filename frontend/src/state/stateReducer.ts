
import { AppState } from "./state"

type Action = {
  type: ReducerActions,
  payload: string | number | boolean
}

enum ReducerActions {
  ToggleEmployeeDrawer = "ToggleEmployeesDrawer",

}

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case ReducerActions.ToggleEmployeeDrawer:
      console.log(`Reducer: ToggleEmployeeDrawer -> ${state.openEmployeeDrawer}`)
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
