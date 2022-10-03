
import { Employee } from "../../../types"
import { Action } from "./stateReducer"

type ContextType = {
  state: AppState,
  dispatcher: React.Dispatch<Action>,
}

type AppState = {
  openEmployeeDrawer: boolean,
  employees: Employee[]
}

const initialAppState = (): AppState => {
  return {
    openEmployeeDrawer: false,
    employees: [],
  }
}

export type { AppState, ContextType }
export default initialAppState
