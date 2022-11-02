
import { Employee } from "../../../types"
import { Action } from "./stateReducer"

type ContextType = {
  state: AppState,
  dispatcher: React.Dispatch<Action>,
}

type AppState = {
  openEmployeeDrawer: boolean,
  employees: { [id: number]: Employee }
  selectedEmployee: Employee | null,
  calendarIsLoading: boolean,
}

const initialAppState = (): AppState => {
  const state: AppState = {
    openEmployeeDrawer: false,
    employees: {},
    selectedEmployee: null,
    calendarIsLoading: true,
  }

  return state
}

export type { AppState, ContextType }
export { initialAppState }
