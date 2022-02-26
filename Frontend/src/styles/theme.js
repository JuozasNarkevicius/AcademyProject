import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito',
  },
  palette: {
    primary: {
      main: '#242526',
    },
    secondary: {
      main: '#eb5050',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '1em',
        },
      },
    },
    MuiContainer: {
      root: {
        defaultProps: {
          maxWidth: '100%',
        },
      },
    },
  },
});

export default theme;
