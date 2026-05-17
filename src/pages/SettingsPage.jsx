import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/settings.css'

export default function SettingsPage() {
  const navigate = useNavigate()
  const [toggles, setToggles] = useState([true, true, false])

  const toggle = (i) => {
    setToggles(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  return (
    <div className="app-container set-app">
      <header className="set-header">
        <button className="set-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/images/ic_back_btn.svg" className="header-back-icon" alt="뒤로가기" />
        </button>
        <h1 className="set-header__title">Settings</h1>
      </header>

      <main className="set-main">
        <section className="set-profile">
          <div className="set-profile__img-box">
            <img src="/images/img_profile_sample.png" alt="프로필 이미지" className="set-profile__img" />
          </div>
          <div className="set-profile__info">
            <div className="set-profile__text">
              <strong className="set-profile__name">김루트 님</strong>
              <span className="set-profile__tier">Premium Member</span>
            </div>
            <a href="#" className="set-profile__logout">로그아웃</a>
          </div>
        </section>

        <section className="set-section">
          <h2 className="set-section__title">알림 설정</h2>
          <div className="set-box">
            {[
              '데일리 미션 푸시 알림',
              '위클리 회고 리마인드',
              '마케팅 정보 수신',
            ].map((label, i) => (
              <div key={i} className="set-row">
                <span className="set-row__label">{label}</span>
                <button
                  className={`set-toggle${toggles[i] ? ' set-toggle--on' : ''}`}
                  aria-pressed={toggles[i]}
                  onClick={() => toggle(i)}
                >
                  <div className="set-toggle__knob"></div>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="set-section">
          <h2 className="set-section__title">서비스 안내</h2>
          <div className="set-list">
            {['고객센터 / FAQ', '공지사항', '서비스 이용약관', '개인정보 처리방침'].map(item => (
              <a key={item} href="#" className="set-list__item">
                <span className="set-list__label">{item}</span>
                <img src="/images/icon_chevron_right.svg" alt="" className="set-list__arrow" />
              </a>
            ))}
          </div>
        </section>

        <section className="set-section set-section--bottom">
          <div className="set-version">
            <span className="set-version__label">현재 버전</span>
            <strong className="set-version__value">1.2.0</strong>
          </div>
          <button className="set-withdraw">회원 탈퇴</button>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
