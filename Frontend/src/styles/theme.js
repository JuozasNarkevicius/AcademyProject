import { createTheme } from '@mui/material/styles';
import COLORS from './colors';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito',
  },
  palette: {
    background: {
      default: COLORS.BACKGROUND,
    },
    text: {
      primary: COLORS.TEXT,
    },
    primary: {
      main: '#242526',
    },
    secondary: {
      main: '#eb5050',
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child th, &:last-child td': {
            borderBottom: 0,
          },
        },

      },
    },
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
    MuiInput: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.BACKGROUND,
        },
      },
    },
  },
});

export default theme;
