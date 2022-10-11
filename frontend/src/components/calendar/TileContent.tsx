import { useContext } from "react"
import { ReducerContext } from "../../App"
import { formatDate } from "../../helpers/common"
import theme from "../../theme"

const TileContent = (props: { day: number, month: number, year: number }) => {
  const { day, month, year } = props
  const { state } = useContext(ReducerContext)

  const hours = state.selectedEmployee?.hours.get(formatDate(day, month, year)) ?? 0

  return (
    <div style={{ color: theme.palette.text.primary, height: "30px" }}>
      {hours > 0 ? `Submitted hours: ${hours}` : "0"}
    </div>
  )
}

export default TileContent
