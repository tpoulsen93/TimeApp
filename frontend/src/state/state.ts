
import { Employee } from "./types"

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

export type { AppState }
export default initialAppState
