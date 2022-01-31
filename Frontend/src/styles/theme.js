import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito',
  },
  palette: {
    // mode: 'dark',
    primary: {
      main: '#242526',
    },
    secondary: {
      main: '#eb5050',
    },
  },
});

export default theme;
