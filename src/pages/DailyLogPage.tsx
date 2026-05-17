import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/daily_log.css'

export default function DailyLogPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('')
  const categories = ['이론', '실습', '리서치', '인사이트', '기타']

  return (
    <div className="app-container">
      <div className="status-bar status-bar--light">
        <span className="status-bar__time status-bar__time--dark">9:41</span>
      </div>

      <main className="dl-scroll-area scroll-content">
        <header className="dl-topbar">
          <div className="dl-topbar__container">
            <button className="dl-topbar__back" onClick={() => navigate(-1)} aria-label="뒤로가기" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
              <img src="/images/ic_back_btn.svg" className="header-back-icon" alt="뒤로가기" />
            </button>
            <h1 className="dl-topbar__title">오늘의 학습 로그</h1>
          </div>
        </header>

        <section className="dl-section-date">
          <div className="dl-date-group">
            <span className="dl-date-label">2026. 04. 06 월요일</span>
            <h2 className="dl-category-title">카테고리 선택</h2>
          </div>
          <div className="dl-category-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`dl-cat-btn${activeCategory === cat ? ' dl-cat-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="dl-editor-card">
          <div className="dl-editor-textarea">
            <div className="dl-editor-placeholder">
              오늘 어떤 것을 배우고 느끼셨나요?<br />자유롭게 기록해 보세요.
            </div>
          </div>
          <div className="dl-editor-toolbar-wrap">
            <div className="dl-editor-toolbar">
              <button className="dl-toolbar-btn">
                <img src="/images/icon_toolbar_image.svg" alt="" width="15" height="15" />
                <span>이미지</span>
              </button>
              <button className="dl-toolbar-btn">
                <img src="/images/icon_toolbar_link.svg" alt="" width="15" height="15" />
                <span>링크</span>
              </button>
              <button className="dl-toolbar-btn">
                <img src="/images/icon_toolbar_checklist.svg" alt="" width="15" height="15" />
                <span>체크리스트</span>
              </button>
            </div>
          </div>
        </section>

        <section className="dl-section-tags">
          <span className="dl-tags-label">태그</span>
          <div className="dl-tags-input-wrap">
            <input type="text" className="dl-tags-input" placeholder="#태그를 입력해 주세요 (예: #피그마 #인터뷰)" />
          </div>
        </section>

        <div className="dl-action-footer">
          <button className="dl-save-btn btn btn--primary" onClick={() => navigate('/growth')}>오늘의 로그 저장하기</button>
        </div>
      </main>

      <BottomNav />
      <div className="home-indicator home-indicator--light"></div>
    </div>
  )
}
