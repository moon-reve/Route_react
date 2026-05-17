import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/weekly_progress.css'

const CIRCUMFERENCE = 2 * Math.PI * 100
const ITEMS = [
  { icon: 'ic_phase_icon_service',   name: '서비스 가이드', desc: '플랫폼 활용법 익히기' },
  { icon: 'ic_phase_icon_theory',    name: '기초 이론',     desc: '핵심 메커니즘의 이해' },
  { icon: 'ic_phase_icon_portfolio', name: '포폴 기초',     desc: '나만의 강점 발견하기' },
]

export default function WeeklyProgressPage() {
  const navigate = useNavigate()
  const pct = parseFloat(localStorage.getItem('routeProgressPct') || '0')
  const [offset, setOffset] = useState(CIRCUMFERENCE)
  const [pctText, setPctText] = useState('0%')
  const [checked, setChecked] = useState<boolean[]>(ITEMS.map(() => false))

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOffset(CIRCUMFERENCE * (1 - pct / 100))
        setPctText(Math.round(pct) + '%')
      })
    })
  }, [pct])

  const toggle = (i: number) => {
    setChecked(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  return (
    <div className="app-container">
      <main className="wp-main">
        <header className="wp-header">
          <button className="wp-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            <img src="/images/ic_back_btn.svg" className="wp-header__back-icon" alt="뒤로가기" />
          </button>
          <span className="wp-header__title">주간 진행률 상세</span>
        </header>

        <section className="wp-hero">
          <div className="wp-donut-wrap">
            <div className="wp-donut">
              <svg viewBox="0 0 256 256" width="256" height="256" className="wp-donut__svg">
                <circle cx="128" cy="128" r="100" fill="none" stroke="#D1D1D1" strokeWidth="20" transform="rotate(-90 128 128)" />
                <circle cx="128" cy="128" r="100" fill="none" stroke="#D4A017" strokeWidth="20" strokeLinecap="round"
                  strokeDasharray="628.318" strokeDashoffset={offset}
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                  transform="rotate(-90 128 128)" />
              </svg>
              <div className="wp-donut__overlay">
                <span className="wp-donut__pct">{pctText}</span>
                <span className="wp-donut__label">PROGRESS</span>
              </div>
            </div>
          </div>
          <div className="wp-editorial">
            <h2 className="wp-editorial__title">반가워요 서준 님,<br />이제 시작이에요!</h2>
            <p className="wp-editorial__desc">전체 여정의 0%를 달성 중입니다.<br />첫 미션을 완료하고 그래프를 채워보세요.</p>
          </div>
        </section>

        <section className="wp-phases">
          <div className="wp-phases__header">
            <h3 className="wp-phases__title">Phase 1: 시작 (1-4주)</h3>
            <img src="/images/ic_phase_divider.svg" className="wp-phases__divider" alt="" />
          </div>
          <div className="wp-list">
            {ITEMS.map((item, i) => (
              <div key={i} className={`wp-item${checked[i] ? ' wp-item--done' : ''}`} onClick={() => toggle(i)} style={{ cursor: 'pointer' }}>
                <div className="wp-item__left">
                  <div className="wp-item__icon-wrap">
                    <img src={`/images/${item.icon}.svg`} className="wp-item__icon" alt="" />
                  </div>
                  <div className="wp-item__text">
                    <span className="wp-item__name">{item.name}</span>
                    <span className="wp-item__desc">{item.desc}</span>
                  </div>
                </div>
                <div className={`wp-item__circle${checked[i] ? ' is-checked' : ''}`}></div>
              </div>
            ))}
          </div>
        </section>

        <div className="wp-bottom">
          <button className="wp-cta" onClick={() => navigate('/first-mission')}>미션 가이드 보기</button>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
