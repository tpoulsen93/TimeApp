import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#041C32',
    },
    secondary: {
      main: '#04293A',
    },
    action: {
      active: '#064663',
    },
    text: {
      primary: '#ECB365',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;


