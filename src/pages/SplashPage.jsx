import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/splash.css'

// SVG 원본 별 경로 그대로 — 큰 중앙별 포함
const STROKE_STARS = [
  { d: 'M200 186L204 175L208 186L219 190L208 194L204 205L200 194L189 190L200 186Z', stroke: '#D4A853', sw: '1.2', glow: 'rgba(212,168,83,0.9)', delay: 0.0, dur: 6.0 },
  { d: 'M360 174L363 166L366 174L374 177L366 180L363 188L360 180L352 177Z', stroke: '#D4A853', sw: '1',   glow: 'rgba(212,168,83,0.85)',   delay: 2.2, dur: 7.0 },
  { d: 'M70 260L72 254L74 260L80 262L74 264L72 270L70 264L64 262Z',         stroke: '#D4A853', sw: '0.9', glow: 'rgba(212,168,83,0.8)',    delay: 1.1, dur: 5.8 },
  { d: 'M388 526L390 520L392 526L398 528L392 530L390 536L388 530L382 528Z', stroke: '#D4A853', sw: '0.9', glow: 'rgba(212,168,83,0.8)',    delay: 3.5, dur: 6.2 },
  { d: 'M145 820L148 812L151 820L159 823L151 826L148 834L145 826L137 823Z', stroke: '#8FAF8A', sw: '1',   glow: 'rgba(143,175,138,0.85)',  delay: 1.8, dur: 7.5 },
  { d: 'M32 340L34 334L36 340L42 342L36 344L34 350L32 344L26 342Z',         stroke: '#8FAF8A', sw: '0.9', glow: 'rgba(143,175,138,0.8)',   delay: 0.7, dur: 6.0 },
  { d: 'M290 848L292 842L294 848L300 850L294 852L292 858L290 852L284 850Z', stroke: '#C4876A', sw: '0.9', glow: 'rgba(196,135,106,0.8)',   delay: 2.8, dur: 6.8 },
]


export default function SplashPage() {
  const navigate = useNavigate()


  return (
    <div className="screen" onClick={() => navigate('/onboarding')} style={{ cursor: 'pointer' }}>
      <img className="bg" src="/images/splash_bg.svg" alt="" />

      {/* 트윙클 오버레이 — SVG 원본 경로 그대로 사용 */}
      <svg
        className="splash-star-overlay"
        viewBox="0 0 430 932"
        preserveAspectRatio="xMidYMid slice"
      >
        {STROKE_STARS.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill="none"
            stroke={s.stroke}
            strokeWidth={s.sw}
            strokeLinejoin="round"
            className="splash-star-stroke"
            style={{ animationDelay: s.delay + 's', animationDuration: s.dur + 's', '--glow': s.glow }}
          />
        ))}
      </svg>

      {/* 별똥별 */}
      <div className="splash-stars-wrap">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
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
