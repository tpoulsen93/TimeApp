
import { ThemeProvider } from '@mui/material/styles'
import { createContext, useEffect, useReducer } from 'react'
import {  reducer, ReducerActions } from "./state/stateReducer"
import { getEmployees, getEmployeesHoursByMonth } from './requests/serverRequestManager'
import { ContextType, initialAppState } from './state/state'
import EmployeesDrawer from './components/EmployeesDrawer'
import TimeCalendar from './components/calendar/TimeCalendar'
import NavBar from "./components/NavBar"
import theme from './theme'


const ReducerContext = createContext<ContextType>({} as ContextType)

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialAppState())


  useEffect(() => {
    const initializeState = async () => {
      console.log("initializeState()")
      const employees = await getEmployees()

      const today = new Date()
      const currentMonthHours = await getEmployeesHoursByMonth(today.getMonth() + 1, today.getFullYear())

      currentMonthHours.forEach((row) => employees.find((employee) => employee.id === row.id)?.hours.set(row.date, row.hours))

      dispatch({ type: ReducerActions.SetEmployees, payload: employees })
    }

    initializeState()
  }, [])

  const reducerContextValue = {
    state: state,
    dispatcher: dispatch,
  }

  return (
    <ThemeProvider theme={theme}>
      <ReducerContext.Provider value={reducerContextValue}>
        <div style={{ backgroundColor: theme.palette.primary.main }}>
          <NavBar selectedEmployee={state.selectedEmployee}/>
          <TimeCalendar state={state} />
          {state.openEmployeeDrawer &&
            <EmployeesDrawer employees={state.employees} isOpen={state.openEmployeeDrawer} />
          }
        </div>
      </ReducerContext.Provider>
    </ThemeProvider>
  );
}

export { ReducerContext }
export default App;
