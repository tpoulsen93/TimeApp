
// import { getEmployeeHoursByDay } from "../requests/serverRequestManager"
import { Calendar } from "react-calendar"
import { AppState } from "../../state/state"
import TileContent from "./TileContent"

const TimeCalendar = (props: { state: AppState }) => {
  const { state } = props



  return (
      <Calendar
        view="month"
        tileContent={({ date }) =>
          <TileContent
            day={date.getDate()}
            month={date.getMonth()}
            year={date.getFullYear()}
            selectedEmployee={state.selectedEmployee}
          />
        }
      />
  )
}

export default TimeCalendar
