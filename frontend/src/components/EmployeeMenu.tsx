import { action } from "mobx"
import { observer } from "mobx-react-lite"
import { Box, ClickAwayListener, Popover, Typography } from "@mui/material"
import { useStores } from ".."

const EmployeeMenu = () => {
  const { appStore } = useStores()
  const { setSelectedDate, setOptionsAnchorEl, optionsAnchorEl } = appStore

  const handleClickAway = action(() => {
    setSelectedDate(null)
    setOptionsAnchorEl(null)
  })

  return (
    <Popover
      open={optionsAnchorEl !== null}
      anchorEl={optionsAnchorEl}
      anchorOrigin={{ vertical: "center", horizontal: "center"}}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ height: 50, width: 50, backgroundColor: "green", color: "white" }}>
          <Typography>
            hi mom
          </Typography>
        </Box>
      </ClickAwayListener>
    </Popover>
  )
}

export default observer(EmployeeMenu)
