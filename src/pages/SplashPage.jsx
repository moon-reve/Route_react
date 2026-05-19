import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/splash.css'

// SVG 파일(430x932)에서 추출한 정확한 별 위치·색상·크기
const STARS = [
  { cx: 204, cy: 190, size: 30, color: '#D4A853', glow: 'rgba(212,168,83,0.8)',   delay: 0,   dur: 7.0 },
  { cx: 363, cy: 177, size: 22, color: '#D4A853', glow: 'rgba(212,168,83,0.75)',  delay: 2.2, dur: 6.5 },
  { cx: 72,  cy: 262, size: 16, color: '#D4A853', glow: 'rgba(212,168,83,0.7)',   delay: 1.1, dur: 5.8 },
  { cx: 390, cy: 528, size: 16, color: '#D4A853', glow: 'rgba(212,168,83,0.7)',   delay: 3.5, dur: 6.2 },
  { cx: 148, cy: 823, size: 22, color: '#8FAF8A', glow: 'rgba(143,175,138,0.75)', delay: 1.8, dur: 7.5 },
  { cx: 34,  cy: 342, size: 16, color: '#8FAF8A', glow: 'rgba(143,175,138,0.7)',  delay: 0.7, dur: 6.0 },
  { cx: 292, cy: 850, size: 16, color: '#C4876A', glow: 'rgba(196,135,106,0.7)',  delay: 2.8, dur: 6.8 },
]

export default function SplashPage() {
  const navigate = useNavigate()


  return (
    <div className="screen" onClick={() => navigate('/onboarding')} style={{ cursor: 'pointer' }}>
      <img className="bg" src="/images/splash_bg.svg" alt="" />

      {/* 트윙클 별 레이어 */}
      <div className="splash-star-layer">
        {STARS.map((s, i) => (
          <svg
            key={i}
            className="splash-star"
            viewBox="0 0 100 100"
            width={s.size}
            height={s.size}
            style={{
              top:  (s.cy / 932 * 100) + '%',
              left: (s.cx / 430 * 100) + '%',
              animationDelay:    s.delay + 's',
              animationDuration: s.dur   + 's',
              '--glow': s.glow,
            }}
          >
            <path
              d="M50 4 L56 44 L96 50 L56 56 L50 96 L44 56 L4 50 L44 44 Z"
              fill="none"
              stroke={s.color}
              strokeWidth="5"
              strokeLinejoin="round"
            />
          </svg>
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
