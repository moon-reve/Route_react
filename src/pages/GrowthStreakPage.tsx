import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/growth_streak.css'

export default function GrowthStreakPage() {
  const navigate = useNavigate()

  return (
    <div className="app-container gs-app">
      <header className="gs-header">
        <button className="gs-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/images/ic_back_btn.svg" className="gs-header__back-icon" alt="뒤로가기" />
        </button>
        <span className="gs-header__title">나의 성장 스트릭</span>
      </header>

      <main className="gs-main">
        <section className="gs-hero">
          <div className="gs-hero__flame-card">
            <img src="/images/ic_streak_flame.svg" className="gs-hero__flame" alt="streak" />
            <span className="gs-hero__streak-badge">STREAK</span>
          </div>
          <p className="gs-hero__days">5일</p>
          <p className="gs-hero__sub">김루트 님, 나만의 속도로 잘 나아가고 있어요!</p>
        </section>

        <section className="gs-cal-wrap">
          <div className="gs-cal">
            <div className="gs-cal__head">
              <span className="gs-cal__month">2026년 4월</span>
              <div className="gs-cal__nav">
                <button className="gs-cal__nav-btn">&#8249;</button>
                <button className="gs-cal__nav-btn">&#8250;</button>
              </div>
            </div>
            <div className="gs-cal__days-header">
              <span>SUN</span><span>MON</span><span>TUE</span>
              <span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
            </div>
            <div className="gs-cal__grid">
              <div className="gs-cal__cell"><span className="gs-date gs-date--prev">28</span></div>
              <div className="gs-cal__cell"><span className="gs-date gs-date--prev">29</span></div>
              <div className="gs-cal__cell"><span className="gs-date gs-date--prev">30</span></div>
              <div className="gs-cal__cell"><span className="gs-date">1</span></div>
              <div className="gs-cal__cell"><span className="gs-date">2</span></div>
              <div className="gs-cal__cell"><span className="gs-date gs-date--streak">3</span><div className="gs-cal__line"></div></div>
              <div className="gs-cal__cell"><span className="gs-date gs-date--streak">4</span></div>
              <div className="gs-cal__cell"><span className="gs-date gs-date--streak">5</span><div className="gs-cal__line"></div></div>
              <div className="gs-cal__cell"><span className="gs-date gs-date--streak">6</span><div className="gs-cal__line"></div></div>
              <div className="gs-cal__cell"><span className="gs-date gs-date--streak">7</span></div>
              <div className="gs-cal__cell"><span className="gs-date gs-date--today">8</span></div>
              <div className="gs-cal__cell"><span className="gs-date">9</span></div>
              <div className="gs-cal__cell"><span className="gs-date">10</span></div>
              <div className="gs-cal__cell"><span className="gs-date">11</span></div>
            </div>
          </div>
        </section>

        <div className="gs-stats">
          <div className="gs-stat gs-stat--light">
            <span className="gs-stat__label">Phase 2 진입까지</span>
            <span className="gs-stat__value">D-12일</span>
          </div>
          <div className="gs-stat gs-stat--dark">
            <span className="gs-stat__label">지난달 대비 꾸준함</span>
            <span className="gs-stat__value gs-stat__value--gold">+15% <img src="/images/ic_nav_growth.svg" className="gs-stat__icon" alt="" /></span>
          </div>
        </div>

        <section className="gs-badge-section">
          <h2 className="gs-section-title">나의 성장 기록 (배지)</h2>
          <div className="gs-badges">
            <div className="gs-badge gs-badge--earned">
              <div className="gs-badge__box gs-badge__box--earned">
                <img src="/images/icon_badge_weekend.svg" className="gs-badge__icon" alt="" />
              </div>
              <span className="gs-badge__label">[주말 열정맨]</span>
            </div>
            <div className="gs-badge gs-badge--locked">
              <div className="gs-badge__box gs-badge__box--locked">
                <img src="/images/icon_badge_7days.svg" className="gs-badge__icon gs-badge__icon--locked" alt="" />
              </div>
              <span className="gs-badge__label gs-badge__label--locked">[7일 연속]</span>
            </div>
            <div className="gs-badge gs-badge--locked">
              <div className="gs-badge__box gs-badge__box--locked">
                <img src="/images/icon_badge_report.svg" className="gs-badge__icon gs-badge__icon--locked" alt="" />
              </div>
              <span className="gs-badge__label gs-badge__label--locked">[리포트 완성]</span>
            </div>
          </div>
        </section>

        <section className="gs-balance-section">
          <h2 className="gs-section-title">이번 달 나의 학습 밸런스</h2>
          <div className="gs-balance-bar">
            <div className="gs-balance__seg gs-balance__seg--theory" style={{ width: '30%' }}>30%</div>
            <div className="gs-balance__seg gs-balance__seg--practice" style={{ width: '50%' }}>50%</div>
            <div className="gs-balance__seg gs-balance__seg--research" style={{ width: '20%' }}>20%</div>
          </div>
          <div className="gs-balance-legend">
            <div className="gs-legend-item" style={{ width: '30%' }}>
              <span className="gs-legend-dot gs-legend-dot--theory"></span>
              <span className="gs-legend-label">이론</span>
            </div>
            <div className="gs-legend-item" style={{ width: '50%' }}>
              <span className="gs-legend-dot gs-legend-dot--practice"></span>
              <span className="gs-legend-label">실습</span>
            </div>
            <div className="gs-legend-item" style={{ width: '20%' }}>
              <span className="gs-legend-dot gs-legend-dot--research"></span>
              <span className="gs-legend-label">리서치</span>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
