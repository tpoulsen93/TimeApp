import { Box } from '@mui/material'
import { observer } from "mobx-react-lite"
import { ThemeProvider } from '@mui/material/styles'
import TimeCalendar from './components/calendar/TimeCalendar'
import EmployeesDrawer from './components/EmployeesDrawer'
import NavBar from "./components/NavBar"
import theme from './theme'
import './helpers/calendar.css';
import EmployeeMenu from './components/EmployeeMenu'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.primary.main, margin: "-8px", height: "100vh" }}>
        <NavBar />
        <TimeCalendar />
      </Box>
      <EmployeeMenu />
      <EmployeesDrawer />
    </ThemeProvider>
  )
}

export default observer(App)
