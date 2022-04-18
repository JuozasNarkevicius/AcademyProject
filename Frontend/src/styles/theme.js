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
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '.MuiButtonBase-root': {
            color: COLORS.TEXT,
          },
          '&.MuiDataGrid-root .MuiDataGrid-cell': {
            borderColor: COLORS.SUB_ITEM_ITEM,
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeaders': {
            borderColor: COLORS.SUB_ITEM_ITEM,
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
          },
          '&.MuiDataGrid-root .MuiDataGrid-footerContainer': {
            borderColor: COLORS.SUB_ITEM_ITEM,
          },
        },
      },
    },
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
