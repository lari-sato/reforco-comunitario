import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { Home2 } from './pages/Home2.tsx'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/home2" element={<Home2/>} />

      <Route path="*" element={<Navigate to='/home'/>} />
    </Routes>
  )
}
