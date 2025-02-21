import { useState } from 'react'
import './App.css'
import Login from './pages/login'
import React from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import AppRouter from './Routes/Router';

function App() {
  return (
    <main>
     <AppRouter/>
    </main>
  )
}

export default App
