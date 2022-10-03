
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import NavBar from "./components/NavBar"
import { createContext, useEffect, useReducer, useState } from 'react'
import initialAppState, { AppState, ContextType } from './state/state'
import EmployeesDrawer from './components/EmployeesDrawer'
import {  reducer } from "./state/stateReducer"
import { getEmployees } from './requests/serverRequestManager'
import { Employee } from '../../types'

const ReducerContext = createContext<ContextType>({} as ContextType)

const App = () => {
  const appState: AppState = initialAppState()
  const [state, dispatch] = useReducer(reducer, appState)
  const [employees, setEmployees] = useState<Employee[]>([])

  // starting grabbing state data from the server
  useEffect(() => {
    const fetchEmployees = async () => {
      setEmployees(await getEmployees())
    }
    fetchEmployees()
  }, [state.employees])

  const reducerContextValue = {
    state: state,
    dispatcher: dispatch,
  }

  console.log(employees)

  return (
    <ThemeProvider theme={theme}>
      <ReducerContext.Provider value={reducerContextValue}>
        <CssBaseline />
        <NavBar />
        {state.openEmployeeDrawer && <EmployeesDrawer />}
      </ReducerContext.Provider>
    </ThemeProvider>
  );
}

export { ReducerContext }
export default App;
