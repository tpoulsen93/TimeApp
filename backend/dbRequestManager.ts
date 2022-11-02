import { PoolClient } from "pg";
import { getMonthStart, getNextMonthStart } from "./common"
import { Employee, HourRow } from "../types"

const fetchEmployees = async (client: PoolClient): Promise<Employee[]> => {
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

  return employees
}

const getHoursByMonth = async (client: PoolClient, month: number, year: number) => {
  const response = await client.query(
    `SELECT id, date, time as hours FROM payroll
    WHERE date >= '${getMonthStart(month, year)}'AND date < '${getNextMonthStart(month, year)}'`
  )

  return response.rows as HourRow[]
}

export { fetchEmployees, getHoursByMonth }
