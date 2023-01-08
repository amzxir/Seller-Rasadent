import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';
import './i18n'
import reportWebVitals from './reportWebVitals'
ReactDOM.render(
  // <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  // </CookiesProvider>,
  document.getElementById('root')
);
reportWebVitals()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

