import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/common.css'

export default function BottomNav({ active }) {
  const navigate = useNavigate()
  const location = useLocation()

  const getActive = () => {
    if (active) return active
    const path = location.pathname
    if (path === '/home') return 'home'
    if (path === '/roadmap') return 'route'
    if (path.startsWith('/log')) return 'log'
    if (path === '/my') return 'my'
    return ''
  }

  const currentActive = getActive()

  return (
    <nav className="nav-bar">
      <button
        className={`nav-tab${currentActive === 'home' ? ' nav-tab--active' : ''}`}
        onClick={() => navigate('/home')}
      >
        <img src="/images/nav_home.svg" alt="Home" className="nav-icon" />
        <span className="nav-label">Home</span>
      </button>

      <button
        className={`nav-tab${currentActive === 'route' ? ' nav-tab--active' : ''}`}
        onClick={() => navigate('/roadmap')}
      >
        <img src="/images/nav_route.svg" alt="Route" className="nav-icon" />
        <span className="nav-label">Route</span>
      </button>

      {/* 중앙 + 버튼 */}
      <button
        className="nav-center"
        onClick={() => navigate('/log/write')}
      >
        <img src="/images/nav_center.svg" alt="기록하기" />
      </button>

      <button
        className={`nav-tab${currentActive === 'log' ? ' nav-tab--active' : ''}`}
        onClick={() => navigate('/log')}
      >
        <img src="/images/nav_log.svg" alt="Log" className="nav-icon" />
        <span className="nav-label">Log</span>
      </button>

      <button
        className={`nav-tab${currentActive === 'my' ? ' nav-tab--active' : ''}`}
        onClick={() => navigate('/my')}
      >
        <img src="/images/nav_my.svg" alt="My" className="nav-icon" />
        <span className="nav-label">My</span>
      </button>
    </nav>
  )
}
