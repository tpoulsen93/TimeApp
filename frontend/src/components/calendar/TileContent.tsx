import { makeStyles } from "@mui/styles"
import { Employee } from "../../../../types"
import { formatDate } from "../../helpers/common"

const useStyles = makeStyles({
  tile: {
    height: `${8}vh`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
})

const TileContent = (props: {
  day: number,
  month: number,
  year: number,
  employees: Record<number, Employee>,
  selectedEmployee: Employee | null
}) => {
  const { day, month, year, employees, selectedEmployee } = props

  const classes = useStyles()

  const hours = selectedEmployee
    ? selectedEmployee.hours.get(formatDate(day, month+1, year)) ?? 0
    : Object.values(employees).reduce(
        (sum, employee) => sum + (employee.hours.get(formatDate(day, month+1, year)) ?? 0),
        0
      )

  return (
    <div className={classes.tile}>
      {hours > 0 ? `${hours.toString().slice(0, 5)} hours` : ""}
    </div>
  )
}

export default TileContent
