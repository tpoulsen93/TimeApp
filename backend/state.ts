
import { Pool } from "pg"
import { Employee } from "../types"
import { getEmployees } from "./dbRequestManager"

type ServerState = {
  employees: Employee[]
}

const initialState: ServerState = {
  employees: [] as Employee[]
}

const initState = async (pool: Pool) => {
  const state = initialState

  state.employees = await getEmployees(await pool.connect())

  return state
}

export type { ServerState }
export { initState }
