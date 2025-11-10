import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import MyPosts from './pages/MyPosts'
import Trending from './pages/Trending'
import Saved from './pages/Saved'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1f2937',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/generate" replace />} />
          <Route path="generate" element={<Dashboard />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="trending" element={<Trending />} />
          <Route path="saved" element={<Saved />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
