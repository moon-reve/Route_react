import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/profile_edit.css'

export default function ProfileEditPage() {
  const navigate = useNavigate()
  const [activePill, setActivePill] = useState('PRODUCT DESIGN')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [location, setLocation] = useState('서울')
  const [goal, setGoal] = useState('글로벌 테크 기업 리드 디자이너로 이직 및 디자인 시스템 구축 리드')

  const locations = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충청', '전라', '경상', '제주']
  const pills = ['PRODUCT DESIGN', 'UX DESIGN', 'UI DESIGN']

  return (
    <div className="app-container pe-app">
      <header className="pe-header">
        <button className="pe-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/images/ic_back_btn.svg" className="header-back-icon" alt="뒤로가기" />
        </button>
        <span className="pe-header__title">내 프로필 관리</span>
      </header>

      <main className="pe-main scroll-content">
        <div className="pe-profile-img-wrap">
          <img src="/images/img_profile_sample.png" alt="Profile" className="pe-profile-img" />
          <button className="pe-profile-edit-btn">
            <img src="/images/ic_edit_white.svg" alt="Edit" />
          </button>
        </div>

        <section className="pe-section">
          <h2 className="pe-section__title">기본 정보</h2>
          <div className="pe-input-card">
            <span className="pe-input-label">아이디</span>
            <span className="pe-input-value">아이디: user_architect_01</span>
          </div>
        </section>

        <section className="pe-section">
          <h2 className="pe-section__title">커리어 목표 수정</h2>

          <div className="pe-form-group">
            <label className="pe-form-label">목표 직무</label>
            <div className="pe-pill-group">
              {pills.map(pill => (
                <button
                  key={pill}
                  className={`pe-pill${activePill === pill ? ' pe-pill--active' : ''}`}
                  onClick={() => setActivePill(pill)}
                >{pill}</button>
              ))}
            </div>
          </div>

          <div className="pe-form-group pe-form-group--dropdown">
            <label className="pe-form-label">목표 근무 지역</label>
            <div
              className={`pe-dropdown${dropdownOpen ? ' pe-dropdown--open' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>{location}</span>
              <img src="/images/ic_chevron_down.svg" alt="열기" />
            </div>
            {dropdownOpen && (
              <ul className="pe-dropdown-list pe-dropdown-list--open">
                {locations.map(loc => (
                  <li
                    key={loc}
                    className={`pe-dropdown-item${location === loc ? ' pe-dropdown-item--selected' : ''}`}
                    onClick={() => { setLocation(loc); setDropdownOpen(false) }}
                  >{loc}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="pe-form-group">
            <label className="pe-form-label">나의 커리어 목표</label>
            <textarea className="pe-textarea" value={goal} onChange={e => setGoal(e.target.value)}></textarea>
          </div>

          <div className="pe-submit-wrap">
            <button className="btn btn--primary" onClick={() => navigate('/mypage')}>프로필 수정 완료</button>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
