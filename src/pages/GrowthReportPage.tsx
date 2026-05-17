import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/growth_report.css'

export default function GrowthReportPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('월간')

  return (
    <div className="app-container grw-rep-app">
      <header className="grw-rep-header">
        <button className="grw-rep-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/images/ic_back_btn.svg" className="header-back-icon" alt="뒤로가기" />
        </button>
        <h1 className="grw-rep-header__title">성장 리포트 상세</h1>
      </header>

      <main className="grw-rep-main scroll-content">
        <div className="grw-rep-filter">
          {['주간', '월간', '전체'].map(f => (
            <button
              key={f}
              className={`grw-rep-filter__btn${filter === f ? ' grw-rep-filter__btn--active' : ''}`}
              onClick={() => setFilter(f)}
            >{f}</button>
          ))}
        </div>

        <section className="grw-rep-section">
          <h2 className="grw-rep-headline">
            김루트 님, 지난달보다<br />
            <span style={{ fontWeight: 700 }}>UI 디자인 역량이 <span className="grw-rep-headline--highlight">12%</span> 상승했어요!</span>
          </h2>
          <div className="grw-rep-radar-card">
            <div className="grw-rep-radar-chart">
              <svg className="grw-rep-radar-svg" viewBox="0 0 192 192" width="192" height="192">
                <polygon points="96,0 187.3,66.3 152.4,173.7 39.6,173.7 4.7,66.3" fill="#F9F9F9" stroke="#E5C185" strokeWidth="2"/>
                <polygon points="96,48 141.6,81.1 124.2,134.8 67.8,134.8 50.4,81.1" fill="none" stroke="#D1D1D1" strokeDasharray="3,3" strokeWidth="2"/>
                <line x1="96" y1="96" x2="96" y2="0" stroke="#E5C185" strokeWidth="1"/>
                <line x1="96" y1="96" x2="187.3" y2="66.3" stroke="#E5C185" strokeWidth="1"/>
                <line x1="96" y1="96" x2="152.4" y2="173.7" stroke="#E5C185" strokeWidth="1"/>
                <line x1="96" y1="96" x2="39.6" y2="173.7" stroke="#E5C185" strokeWidth="1"/>
                <line x1="96" y1="96" x2="4.7" y2="66.3" stroke="#E5C185" strokeWidth="1"/>
                <polygon className="grw-rep-radar-poly--past" points="96,19.2 159.9,75.2 138.3,154.3 48.1,162.0 23.0,72.2" fill="none" stroke="#D1D1D1" strokeDasharray="4,4" strokeWidth="2"/>
                <polygon className="grw-rep-radar-poly--current" points="96,0 173.6,70.8 143.9,162.0 45.2,165.9 32.1,75.2" fill="rgba(212, 160, 23, 0.1)" stroke="#D4A017" strokeWidth="3" strokeLinejoin="round"/>
              </svg>
              <span className="grw-rep-radar-label grw-rep-radar-label--ui">UI</span>
              <span className="grw-rep-radar-label grw-rep-radar-label--ux">UX</span>
              <span className="grw-rep-radar-label grw-rep-radar-label--tool">Tool</span>
              <span className="grw-rep-radar-label grw-rep-radar-label--comm">Comm.</span>
              <span className="grw-rep-radar-label grw-rep-radar-label--concept">Concept</span>
            </div>
            <div className="grw-rep-radar-legend">
              <div className="grw-rep-radar-legend-item">
                <span className="grw-rep-radar-legend-color grw-rep-radar-legend-color--current"></span>
                이번 달
              </div>
              <div className="grw-rep-radar-legend-item grw-rep-radar-legend-item--past">
                <span className="grw-rep-radar-legend-color grw-rep-radar-legend-color--past"></span>
                지난달
              </div>
            </div>
          </div>
        </section>

        <section className="grw-rep-section">
          <h3 className="grw-rep-section-title">나의 학습 집중 흐름</h3>
          <div className="grw-rep-heatmap-card">
            <div className="grw-rep-heatmap-header">
              <span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span><span>일</span>
            </div>
            <div className="grw-rep-heatmap-grid">
              {[0,2,0,0,2,3,0, 0,1,2,2,1,1,2, 3,0,2,1,0,3,1, 2,0,0,2,0,3,0].map((lv, i) => (
                <div key={i} className={`grw-rep-heatmap-cell grw-rep-heatmap-cell--lv${lv}`}></div>
              ))}
            </div>
            <p className="grw-rep-heatmap-desc">꾸준한 페이스 유지가 돋보이네요!<br />지금 속도로 나아가면 충분합니다.</p>
          </div>
        </section>

        <section className="grw-rep-section">
          <h3 className="grw-rep-section-title">이번 달 성취 마일스톤</h3>
          <div className="grw-rep-milestone-tags">
            <span className="grw-rep-milestone-tag grw-rep-milestone-tag--dark">꾸준함의 아이콘</span>
            <span className="grw-rep-milestone-tag grw-rep-milestone-tag--light">UI 정복자</span>
            <span className="grw-rep-milestone-tag grw-rep-milestone-tag--light">리서치 초심자 탈출</span>
          </div>
          <div className="grw-rep-milestone-msg">
            김루트 님, 정말 놀라운 성장을 보여주셨어요!<br />
            데이터가 증명하는 김루트 님의 노력을 <b>Route</b>가 응원합니다.
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
