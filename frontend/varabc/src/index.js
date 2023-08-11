import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
<<<<<<< HEAD
import store from './redux/Store/store'; 
=======
import './index.css';
import store from './redux/Store/store';
>>>>>>> 460191dbfec67728f6aa6beb9f43feb03ed8d100
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
