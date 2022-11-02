import { makeAutoObservable } from "mobx";
import { fetchEmployees, fetchEmployeesHoursByMonth } from "../requests/serverRequests";
import { Employee, HourRow } from "../../../types";
import { RootStore } from "./RootStore";

export class DomainStore {
  root: RootStore
  employees: { [id: number]: Employee }

  constructor(root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
    this.root = root
    this.employees = {}
  }

  async initialize() {
    await this.initializeEmployees()
    const { appStore } = this.root
    appStore.setCalendarIsLoading(false)
  }

  addEmployeeHours(hours: HourRow[]) {
    hours.forEach((row) =>
      this.employees[row.id].hours.set(row.date.slice(0, 10), row.hours))
  }

  addEmployee(employee: Employee) {
    this.employees[employee.id] = employee
  }

  private async initializeEmployees() {
    // fetch the employees
    const employees = await fetchEmployees()
    employees.forEach((employee) => this.addEmployee(employee))

    // fetch the hours and add them
    const today = new Date()
    const thisMonth = today.getMonth() + 1
    const thisYear = today.getFullYear()
    const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1
    const lastMonthsYear = thisMonth === 1 ? thisYear - 1 : thisYear
    const hours = [
      ...await fetchEmployeesHoursByMonth(thisMonth, thisYear),
      ...await fetchEmployeesHoursByMonth(lastMonth, lastMonthsYear)
    ]

    this.addEmployeeHours(hours)

  }
}
