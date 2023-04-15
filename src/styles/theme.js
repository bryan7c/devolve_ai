import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#046EBB',
      main: '#04416D',
      dark: '#04395F',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFB672',
      main: '#FF8F26',
      dark: '#C96E18',
      contrastText: '#1E1E1C',
    },
    success: {
      light: '#31C4EA',
      main: '#37B662',
      dark: '#1E8A4C',
      contrastText: '#1E1E1C',
    },
    warning: {
      light: '#FFB672',
      main: '#DD5512',
      dark: '#C96E18',
      contrastText: '#FFF',
    },
    info: {
      light: '#31C4EA',
      main: '#31C4EA',
      dark: '#1E8A4C',
      contrastText: '#1E1E1C',
    },
    brown: {
      light: '#57351B',
      main: '#57351B',
      dark: '#1E1E1C',
      contrastText: '#fff',
    },
    dark: {
      light: '#1E1E1C',
      main: '#1E1E1C',
      dark: '#04395F',
      contrastText: '#fff',
    },
    purple: {
      light: '#49475F',
      main: '#49475F',
      dark: '#1E1E1C',
      contrastText: '#fff',
    },
    gray: {
      light: '#CDCDCD',
      main: '#CDCDCD',
      dark: '#1E1E1C',
      contrastText: '#fff',
    },
    light: {
      light: '#EFF0F2',
      main: '#EFF0F2',
      dark: '#1E1E1C',
      contrastText: '#fff',
    },
    white: {
      light: '#EFF0F2',
      main: '#FFFFFF',
      dark: '#1E1E1C',
      contrastText: '#fff',
    }
  },
});

export default theme;