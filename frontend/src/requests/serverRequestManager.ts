
import axios from "axios"
import { Employee } from "../../../types"

const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get("http://localhost:8081/api/getEmployees")
  const employees = response.data
  return employees
}

export { getEmployees }
