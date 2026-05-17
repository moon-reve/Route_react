import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/splash.css'

export default function SplashPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => {
      navigate('/login')
    }, 3000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="screen">
      <img className="bg" src="/images/splash_bg.svg" alt="" />

      <div className="title-box">
        <div className="logo">
          <img src="/images/splash_logo.svg" alt="Route Logo" />
          <span className="logo-text">Route</span>
        </div>

        <img className="divider" src="/images/splash_line.svg" alt="" />

        <p className="tagline">멈춰있는 커리어를 움직이는<br />실행의 궤적 : 루트</p>
      </div>
    </div>
  )
}
