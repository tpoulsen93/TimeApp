
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import NavBar from "./components/NavBar"
import { createContext, useReducer } from 'react'
import initialAppState, { AppState } from './state/state'
import EmployeesDrawer from './components/EmployeesDrawer'
import { Action, reducer } from "./state/stateReducer"

type ContextType = {
  state: AppState,
  dispatcher: React.Dispatch<Action>,
}
const ReducerContext = createContext({} as ContextType)

const App = () => {
  const appState: AppState = initialAppState()
  const [state, dispatch] = useReducer(reducer, appState)

  const reducerContextValue = {
    state: state,
    dispatcher: dispatch,
  }

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
