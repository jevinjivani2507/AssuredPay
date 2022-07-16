import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App';
import { BrowserRouter as Router, Route, Routes, Switch, Outlet } from 'react-router-dom';
import { ConfigureStore } from "./Redux/ConfigureStore";

const store = ConfigureStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

