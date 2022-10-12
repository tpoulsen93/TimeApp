import { Employee } from "../../../../types"
import { formatDate } from "../../helpers/common"
import theme from "../../theme"

const TileContent = (props: { day: number, month: number, year: number, selectedEmployee: Employee | null }) => {
  const { day, month, year, selectedEmployee } = props

  const hours = selectedEmployee?.hours.get(formatDate(day, month+1, year)) ?? 0

  return (
    <div style={{ color: theme.palette.text.primary, height: "30px" }}>
      {hours > 0 ? `Submitted hours: ${hours}` : "0"}
    </div>
  )
}

export default TileContent
