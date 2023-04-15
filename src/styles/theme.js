import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#5a8fc5',
      main: '#04416D',
      dark: '#035a9a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffa280',
      main: '#FF8F26',
      dark: '#b3661a',
      contrastText: '#1E1E1C',
    },
    success: {
      light: '#56cfe1',
      main: '#37B662',
      dark: '#268f4c',
      contrastText: '#1E1E1C',
    },
    warning: {
      light: '#ffa280',
      main: '#DD5512',
      dark: '#b3661a',
      contrastText: '#FFF',
    },
    info: {
      light: '#56cfe1',
      main: '#31C4EA',
      dark: '#268f9a',
      contrastText: '#fff',
    },
    brown: {
      light: '#7d4c32',
      main: '#57351B',
      dark: '#472d1f',
      contrastText: '#fff',
    },
    dark: {
      light: '#1e1e1c',
      main: '#1E1E1C',
      dark: '#131312',
      contrastText: '#fff',
    },
    purple: {
      light: '#5e5a6f',
      main: '#49475F',
      dark: '#3a3849',
      contrastText: '#fff',
    },
    gray: {
      light: '#e0e0e0',
      main: '#CDCDCD',
      dark: '#a8a8a8',
      contrastText: '#fff',
    },
    light: {
      light: '#f3f3f4',
      main: '#EFF0F2',
      dark: '#c1c1c2',
      contrastText: '#1E1E1C',
    },
    white: {
      light: '#f3f3f4',
      main: '#FFFFFF',
      dark: '#d6d6d7',
      contrastText: '#1E1E1C',
    }
    
  },
});

export default theme;