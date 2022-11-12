import { Pool } from "pg"
import { Employee, HourRow } from "../types"
import { fetchEmployees } from "./dbRequestManager"

type ServerState = {
  employees: Employee[],
  monthOfHours: Record<string, HourRow[]>
}

const initialState: ServerState = {
  employees: [] as Employee[],
  monthOfHours: {}
}

const initState = async (pool: Pool) => {
  const state = initialState

  // get all the employees and their info from the db
  state.employees = await fetchEmployees(await pool.connect())

  return state
}

export type { ServerState }
export { initState }
