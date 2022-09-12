import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { blue, brown, lime, purple, red, yellow, orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[400],
      contrastText: '#FFFFFF',
    },
    secondary: red,
  },
});

export default theme;
