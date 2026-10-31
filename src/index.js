import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>
      <FilterProvider>
        <ToastContainer closeButton={false} autoClose={3000} position={"bottom-right"} />
        <CartProvider>
          <App />
        </CartProvider>
      </FilterProvider>
    </Router>

  </React.StrictMode>
);


