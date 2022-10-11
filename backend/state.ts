
import { Pool } from "pg"
import { Employee, HourRow } from "../types"
import { getEmployees, getHoursByMonth } from "./dbRequestManager"

type ServerState = {
  employees: Employee[],
}

const initialState: ServerState = {
  employees: [] as Employee[]
}

const initState = async (pool: Pool) => {
  const state = initialState

  // get all the employees and their info from the db
  state.employees = await getEmployees(await pool.connect())

  return state
}

export type { ServerState }
export { initState }