import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/splash.css'

// 배경 SVG의 금색 별 위치에 맞춘 트윙클 레이어
const STARS = [
  { top: '9.9%',  left: '27.8%', size: 13, delay: 0,    dur: 2.5 },
  { top: '8.4%',  left: '80.6%', size: 11, delay: 1.2,  dur: 3.0 },
  { top: '19.3%', left: '8.3%',  size: 15, delay: 0.6,  dur: 2.8 },
  { top: '31.4%', left: '26.4%', size: 20, delay: 1.8,  dur: 2.3 },
  { top: '35.7%', left: '88.9%', size: 12, delay: 0.3,  dur: 3.2 },
  { top: '52.9%', left: '11.1%', size: 17, delay: 1.5,  dur: 2.6 },
  { top: '52.9%', left: '87.9%', size: 10, delay: 0.9,  dur: 2.9 },
  { top: '77.8%', left: '63.9%', size: 18, delay: 0.4,  dur: 2.7 },
  { top: '83.4%', left: '82.9%', size: 11, delay: 2.0,  dur: 2.4 },
]

export default function SplashPage() {
  const navigate = useNavigate()


  return (
    <div className="screen" onClick={() => navigate('/onboarding')} style={{ cursor: 'pointer' }}>
      <img className="bg" src="/images/splash_bg.svg" alt="" />

      {/* 트윙클 별 레이어 */}
      <div className="splash-star-layer">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="splash-star"
            style={{
              top: s.top,
              left: s.left,
              fontSize: s.size + 'px',
              animationDelay: s.delay + 's',
              animationDuration: s.dur + 's',
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="title-box">
        <div className="logo">
          <img src="/images/splash_logo.svg" alt="Route Logo" />
          <span className="splash-logo-text">Route</span>
        </div>

        <img className="divider" src="/images/splash_line.svg" alt="" />

        <p className="tagline">멈춰있는 커리어를 움직이는<br />실행의 궤적 : 루트</p>
      </div>
    </div>
  )
}
