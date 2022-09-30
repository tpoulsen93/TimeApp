
import { useContext } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { ReducerContext } from '../App';
import { ReducerActions } from '../state/stateReducer';

const NavBar = () => {
  const { state, dispatcher } = useContext(ReducerContext)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: "flex" }}
            onClick={() => dispatcher(
              { type: ReducerActions.ToggleEmployeeDrawer, payload: !state.openEmployeeDrawer }
            )}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{display: "flex"}}>
            TP Time App
          </Typography>
          <Button color="inherit" sx={{display: "flex"}}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar
