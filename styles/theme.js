import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { blue, brown, lime, purple, red, yellow } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: brown,
    secondary: lime,
  },
});

export default theme;
