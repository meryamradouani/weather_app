import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Container from '@mui/material/Container';
import  'bootstrap/dist/css/bootstrap.min.css';
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <Container maxWidth="lg" style={{marginTop:'0px'}} className='App'>
          {/* <ThemeProvider theme={theme}> */}
            {/* <CssBaseline /> */}
            {/* <Container maxWidth="md" style={{marginTop:'20px'}} className='App'> */}
              {/* <SearchBar /> */}
              {/* <Weather/> */}
            {/* </Container> */}
          {/* </ThemeProvider> */}
        <App />
        </Container> 
      </Provider>
  </React.StrictMode>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
