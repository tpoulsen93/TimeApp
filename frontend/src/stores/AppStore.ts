
import { makeAutoObservable } from "mobx";
import { Employee } from "../../../types";
import { RootStore } from "./RootStore";

export class AppStore {
  root: RootStore
  calendarIsLoading: boolean
  employeeDrawerIsOpen: boolean
  optionsAnchorEl: HTMLButtonElement | null
  selectedDate: Date | null
  selectedEmployee: Employee | null
  snackbarMessage: string
  snackbarIsOpen: boolean

  constructor(root: RootStore) {
    makeAutoObservable(this, { root: false }, { autoBind: true })
    this.root = root
    this.calendarIsLoading = true
    this.employeeDrawerIsOpen = false
    this.optionsAnchorEl = null
    this.selectedDate = null
    this.selectedEmployee = null
    this.snackbarMessage = ""
    this.snackbarIsOpen = false
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

  setOptionsAnchorEl(element: HTMLButtonElement | null) {
    this.optionsAnchorEl = element
  }

  setSelectedDate(date: Date | null) {
    this.selectedDate = date
  }

  setSnackbarIsOpen(isOpen: boolean) {
    this.snackbarIsOpen = isOpen
  }

  setSnackbarMessage(message: string) {
    this.snackbarMessage = message
  }
}
