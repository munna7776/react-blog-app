import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      > */}
        <App />
      {/* </ToastContainer> */}
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

