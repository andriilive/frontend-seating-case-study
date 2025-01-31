import {CartProvider} from "@/cart";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "@/auth.tsx";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App/>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)
