import { useContext } from 'react'
import { observer } from "mobx-react-lite"
import { ThemeProvider } from '@mui/material/styles'
import { Box, CircularProgress } from '@mui/material'
import TimeCalendar from './components/calendar/TimeCalendar'
import EmployeesDrawer from './components/EmployeesDrawer'
import NavBar from "./components/NavBar"
import { StoreContext } from "./index"
import theme from './theme'
import './helpers/calendar.css';

const App = () => {
  const { appStore } = useContext(StoreContext)
  const { calendarIsLoading, employeeDrawerIsOpen } = appStore

  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: theme.palette.primary.main, margin: "-8px", height: "100vh" }}>
          <NavBar />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {calendarIsLoading
              ? <CircularProgress color="info"  sx={{ mt: "auto", size: 100 }}/>
              : <TimeCalendar />
            }
          </Box>
        </Box>
        {employeeDrawerIsOpen &&
          <EmployeesDrawer />
        }
    </ThemeProvider>
  );
}

export default observer(App)
