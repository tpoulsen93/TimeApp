import { makeAutoObservable } from "mobx";
import { getCurrentMonthInfo, getPreviousMonthInfo, monthsAreTheSame } from "../helpers/common";
import { fetchEmployees, fetchHoursByMonth } from "../requests/serverRequests";
import { Employee, HourRow, MonthInfo } from "../../../types";
import { RootStore } from "./RootStore";

export class DomainStore {
  root: RootStore
  employees: { [id: number]: Employee }
  monthsFetched: MonthInfo[]
  currentMonth: MonthInfo

  constructor(root: RootStore) {
    makeAutoObservable(this, { root: false }, { autoBind: true })
    this.root = root
    this.employees = {}
    this.monthsFetched = []
    this.currentMonth = {} as MonthInfo

    this.initialize()
  }

  addEmployee(employee: Employee) {
    this.employees[employee.id] = employee
  }

  addMonthFetched(month: MonthInfo) {
    this.monthsFetched.push(month)
  }

  setCurrentMonth(month: MonthInfo) {
    this.currentMonth = month
  }

  monthAlreadyFetched(monthInfo: MonthInfo): boolean {
    return this.monthsFetched.some((mi) => monthsAreTheSame(monthInfo, mi))
  }

  *fetchMonthsHours(monthInfo: MonthInfo): any {
    if (this.monthAlreadyFetched(monthInfo)) return

    this.addMonthFetched(monthInfo)
    const hours: HourRow[] = yield fetchHoursByMonth(monthInfo)
    hours.forEach((row) =>
      this.employees[row.id].hours.set(row.date.slice(0, 10), row.hours))
  }

  private *initialize(): any {
    this.currentMonth = getCurrentMonthInfo()

    // fetch the employees
    const employees: Employee[] = yield fetchEmployees()
    employees.forEach((employee) => this.addEmployee(employee))

    // fetch the hours and add them
    const currentMonth = getCurrentMonthInfo()
    yield this.fetchMonthsHours(currentMonth)
    this.addMonthFetched(currentMonth)

    this.root.appStore.setCalendarIsLoading(false)

    const lastMonth = getPreviousMonthInfo(currentMonth)
    yield this.fetchMonthsHours(lastMonth)
    this.addMonthFetched(lastMonth)
  }
}
