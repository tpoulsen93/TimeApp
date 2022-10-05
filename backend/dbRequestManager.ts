
import { PoolClient } from "pg";
import { Employee } from "../types"

const getEmployees = async (client: PoolClient): Promise<Employee[]> => {
  const response = await client.query('SELECT * FROM employees')
  const employees = response.rows
    .filter((row) => row.first_name !== "admin")
    .map((row) => {
      return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        phone: row.phone,
        email: row.email,
        supervisorID: row.supervisorID,
      } as Employee
    })

  employees.sort((e1, e2) => e1.lastName.localeCompare(e2.lastName))
  return employees
}

export { getEmployees }
