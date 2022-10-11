
import { useCallback, useContext } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu, Person } from '@mui/icons-material';
import { ReducerContext } from '../App';
import { ReducerActions } from '../state/stateReducer';
import theme from '../theme';
import { Employee } from '../../../types';

const NavBar = (props: { selectedEmployee: Employee | null }) => {
  const { selectedEmployee } = props
  const { dispatcher } = useContext(ReducerContext)

  const currentEmployee = selectedEmployee === null ? <Person sx={{ color: "white" }} /> : selectedEmployee.fullName

  const handleClick = useCallback(() =>
    dispatcher({ type: ReducerActions.ToggleEmployeeDrawer, payload: true }), [dispatcher]
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 4 }}
            onClick={handleClick}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
            TP Time App
          </Typography>
          <Button color="inherit" sx={{ display: "flex", justifySelf: "flex-end" }}>
            {currentEmployee}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar
