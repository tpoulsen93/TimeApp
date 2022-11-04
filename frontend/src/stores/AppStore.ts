
import { makeAutoObservable } from "mobx";
import { Employee, MonthInfo } from "../../../types";
import { RootStore } from "./RootStore";

export class AppStore {
  root: RootStore
  employeeDrawerIsOpen: boolean
  selectedEmployee: Employee | null
  calendarIsLoading: boolean
  currentMonth: MonthInfo | null

  constructor(root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
    this.root = root
    this.employeeDrawerIsOpen = false
    this.selectedEmployee = null
    this.calendarIsLoading = true
    this.currentMonth = null

    this.initialize()
  }

  setEmployeeDrawerIsOpen(isOpen: boolean) {
    this.employeeDrawerIsOpen = isOpen
  }

  setSelectedEmployee(employee: Employee | null) {
    this.selectedEmployee = employee
  }

  setCalendarIsLoading(isLoading: boolean) {
    this.calendarIsLoading = isLoading
  }

  setCurrentMonth(month: number, year: number) {
    this.currentMonth = { month: month, year: year }
  }

  private initialize() {
    const date = new Date()
    this.currentMonth = { month: date.getMonth() + 1, year: date.getFullYear() }
  }
}
