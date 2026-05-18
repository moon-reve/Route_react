import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// iOS safe area: window.innerHeight + safe-area-inset-bottom으로 실제 높이 측정
const setVh = () => {
  const sab = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--sab')
  ) || 0
  const vh = (window.innerHeight + sab) * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
setVh()
window.addEventListener('resize', setVh)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
