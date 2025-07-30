import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container} from '@mui/material';
import { SearchBar } from './searchbar';
import Weather from './weather';


function App() {
const theme = createTheme({
  palette: {
    primary: {
      main: "#008b8f",
    },
  },
  typography: {
    fontFamily: 'MyFont',
    fontSize: 14,
  },
});
  return (
    <ThemeProvider  theme={theme}>
      <Container className='App' style={{marginTop:'20px'}} maxWidth="md">
        <SearchBar />
        <Weather/>
      </Container>
  </ThemeProvider>
  );
}
export default App;
