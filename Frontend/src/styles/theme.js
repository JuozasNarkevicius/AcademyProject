import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito',
  },
  palette: {
    background: {
      default: '#222222',
    },
    text: {
      primary: '#ffffff',
    },
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
          backgroundColor: 'black',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
});

export default theme;
