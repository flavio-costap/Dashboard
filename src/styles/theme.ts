// theme.ts
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2148BF',
    },
    warning: {
      main: '#BF9321',
    },
    success: {
      main: '#21BF32',
    },
    error: {
      main: '#BF2151',
    },
    secondary: {
      main: '#f50057',
    },
  },
})

export default theme
