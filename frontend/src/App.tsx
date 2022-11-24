import { Box } from '@mui/material'
import { observer } from "mobx-react-lite"
import { ThemeProvider } from '@mui/material/styles'
import TimeCalendar from './components/calendar/TimeCalendar'
import EmployeesDrawer from './components/EmployeesDrawer'
import EmployeeMenu from './components/EmployeeMenu'
import NavBar from "./components/NavBar"
import './helpers/calendar.css';
import theme from './theme'
import SubmissionSnackbar from './components/SubmissionSnackbar'

const App = () => {
  const appContainer = {
    backgroundColor: theme.palette.primary.main,
    margin: "-8px",
    height: "100vh"
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={appContainer}>
        <NavBar />
        <TimeCalendar />
      </Box>
      <EmployeeMenu />
      <EmployeesDrawer />
      <SubmissionSnackbar />
    </ThemeProvider>
  )
}

export default observer(App)
