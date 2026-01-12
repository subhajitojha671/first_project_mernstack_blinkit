import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import VerifyOtp from "./pages/VerifyOtp.jsx"
const router = createBrowserRouter([
  {
    
    path: '/',
    element: <App />,
    children: [
      {
        path: '/register',
        element: <Signup/>
      },
      {
        path: '/verify',
        element: <VerifyOtp/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
