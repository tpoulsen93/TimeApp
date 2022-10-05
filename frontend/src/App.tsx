
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import NavBar from "./components/NavBar"
import { createContext, useCallback, useEffect, useReducer } from 'react'
import { ContextType, initialAppState } from './state/state'
import EmployeesDrawer from './components/EmployeesDrawer'
import {  reducer, ReducerActions } from "./state/stateReducer"
import { getEmployees } from './requests/serverRequestManager'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

const ReducerContext = createContext<ContextType>({} as ContextType)

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialAppState)

  const initializeState = useCallback(async () => {
    const employees = await getEmployees()
    dispatch({ type: ReducerActions.SetEmployees, payload: employees })
  }, [])

  useEffect(() => {
    initializeState()
    console.log(state)
  }, [initializeState])

  const reducerContextValue = {
    state: state,
    dispatcher: dispatch,
  }


  return (
    <ThemeProvider theme={theme}>
      <ReducerContext.Provider value={reducerContextValue}>
        <CssBaseline />
        <NavBar />
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
        {state.openEmployeeDrawer && <EmployeesDrawer />}
      </ReducerContext.Provider>
    </ThemeProvider>
  );
}

export { ReducerContext }
export default App;
