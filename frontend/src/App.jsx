import React from 'react'
import {Route, Routes} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Analytics from './pages/Analytics'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandinPage'
import { Toaster } from 'sonner';
const App = () => {
  return (
    <div>
      <Toaster />
      
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<AuthPage/>} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default App