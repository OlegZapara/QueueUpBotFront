import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
        

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        
        

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
  </BrowserRouter>
)
