//for import, positioning is important for CSS, since compiler reads from top to bottom. hence, bottom CSS will overwrite the above CSS.
import React from 'react';
import ReactDOM from 'react-dom'; //react-dom for Web app. react-native for mobile app
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css'; //manually key-in this css for Semantic Calendar.
import 'react-toastify/dist/ReactToastify.min.css'; //manually key-in this css to use toastify css
import 'react-datepicker/dist/react-datepicker.css';//manually key-in this css to use datepicker css
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { Router } from 'react-router-dom';
import {createBrowserHistory} from 'history'; // manually key-in, loads createbrowserhistory function from history package.

export const history = createBrowserHistory();

ReactDOM.render(
  // takes a value props from store in store.ts
  // use <BrowserRouter> to initiate React-router into your app.
  // BrowserRouter automatically provides history obj to our App. Where we can use React.Hooks
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
