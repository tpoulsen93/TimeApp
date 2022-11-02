
import { ThemeProvider } from '@mui/material/styles'
import { createContext, useEffect, useReducer } from 'react'
import {  reducer, ReducerActions } from "./state/stateReducer"
import { getEmployees, getEmployeesHoursByMonth } from './requests/serverRequestManager'
import { ContextType, initialAppState } from './state/state'
import EmployeesDrawer from './components/EmployeesDrawer'
import TimeCalendar from './components/calendar/TimeCalendar'
import NavBar from "./components/NavBar"
import theme from './theme'
import { Box, CircularProgress, LinearProgress } from '@mui/material'
import './helpers/calendar.css';


const ReducerContext = createContext<ContextType>({} as ContextType)

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialAppState())


  useEffect(() => {
    const initializeState = async () => {
      console.log("initializeState()")

      // add all the employees to the state
      const employees = await getEmployees()
      employees.forEach((employee) =>
        dispatch({ type: ReducerActions.AddEmployee, payload: { id: employee.id, employee: employee } })
      )

      // add all the hours to the employees
      const today = new Date()
      const thisMonth = today.getMonth() + 1
      const thisYear = today.getFullYear()
      const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1
      const lastMonthsYear = thisMonth === 1 ? thisYear - 1 : thisYear

      let hours = [
        ...await getEmployeesHoursByMonth(thisMonth, thisYear),
        ...await getEmployeesHoursByMonth(lastMonth, lastMonthsYear)
      ]

      dispatch({ type: ReducerActions.AddEmployeesHours, payload: hours })

      dispatch({ type: ReducerActions.setCalendarIsLoading, payload: false })
      console.log("initialization complete")
    }

    initializeState()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const reducerContextValue = {
    state: state,
    dispatcher: dispatch,
  }

  return (
    <ThemeProvider theme={theme}>
      <ReducerContext.Provider value={reducerContextValue}>
        <Box sx={{ backgroundColor: theme.palette.primary.main, margin: "-8px", height: "100vh" }}>
          <NavBar selectedEmployee={state.selectedEmployee}/>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {state.calendarIsLoading
              ? <CircularProgress color="info"  sx={{ mt: "auto", size: 100 }}/>
              : <TimeCalendar state={state} />
            }
          </Box>
        </Box>
        {state.openEmployeeDrawer &&
          <EmployeesDrawer employees={state.employees} isOpen={state.openEmployeeDrawer} />
        }
      </ReducerContext.Provider>
    </ThemeProvider>
  );
}

export { ReducerContext }
export default App;
