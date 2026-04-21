import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import theme from './theme'
import { AuthProvider } from './context/AuthContext'

import Home from './pages/Home'
import Services from './pages/Services'
import Work from './pages/Work'
import Process from './pages/Process'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminLayout from './components/layout/AdminLayout'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="home/stack" element={<Box sx={{ p: 3 }}><h1>Stack</h1></Box>} />
              <Route path="home/testimonials" element={<Box sx={{ p: 3 }}><h1>Testimonials</h1></Box>} />
              <Route path="home/stats" element={<Box sx={{ p: 3 }}><h1>Stats</h1></Box>} />
              <Route path="process/steps" element={<Box sx={{ p: 3 }}><h1>Steps</h1></Box>} />
              <Route path="process/faqs" element={<Box sx={{ p: 3 }}><h1>Process FAQs</h1></Box>} />
              <Route path="process/tools" element={<Box sx={{ p: 3 }}><h1>Tools</h1></Box>} />
              <Route path="work/projects" element={<Box sx={{ p: 3 }}><h1>Projects</h1></Box>} />
              <Route path="work/categories" element={<Box sx={{ p: 3 }}><h1>Categories</h1></Box>} />
              <Route path="services/list" element={<Box sx={{ p: 3 }}><h1>Services</h1></Box>} />
              <Route path="services/faqs" element={<Box sx={{ p: 3 }}><h1>Services FAQs</h1></Box>} />
              <Route path="contact/info" element={<Box sx={{ p: 3 }}><h1>Contact Info</h1></Box>} />
              <Route path="contact/messages" element={<Box sx={{ p: 3 }}><h1>Messages</h1></Box>} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)