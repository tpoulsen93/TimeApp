
import { Employee, HourRow } from "../../../types"
import { AppState } from "./state"

type Action = {
  type: ReducerActions,
  payload: any
}

enum ReducerActions {
  SetSelectedEmployee = "SetSelectedEmployee",
  AddEmployee = "AddEmployee",
  ToggleEmployeeDrawer = "ToggleEmployeesDrawer",
  AddEmployeesHours = "AddEmployeesHours",
}

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case ReducerActions.SetSelectedEmployee: {
      // payload: employee: Employee
      const employee: Employee = action.payload
      return {
        ...state,
        selectedEmployee: employee
      }
    }

    case ReducerActions.AddEmployee: {
      // payload: { id: number, employee: Employee }
      const employee: Employee = action.payload.employee
      const id: number = action.payload.id

      // initialize the hours map
      employee.hours = new Map<string, number>()

      const employees = state.employees
      employees[id] = employee

      return {
        ...state,
        employees: employees
      }
    }

    case ReducerActions.AddEmployeesHours: {
      // payload: hours: HourRow[]
      const hours: HourRow[] = action.payload
      const employees = state.employees

      hours.forEach((row) => employees[row.id].hours.set(row.date.slice(0, 10), row.hours))

      return {
        ...state,
        employees: employees
      }
    }

    case ReducerActions.ToggleEmployeeDrawer: {
      return {
        ...state,
        openEmployeeDrawer: !state.openEmployeeDrawer
      }
    }

    default:
      return state
  }
}

export type { Action }
export { reducer, ReducerActions }
