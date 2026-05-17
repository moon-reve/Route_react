import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/account_security.css'

export default function AccountSecurityPage() {
  const navigate = useNavigate()
  const [biometricOn, setBiometricOn] = useState(false)

  return (
    <div className="app-container sec-app">
      <header className="sec-header">
        <button className="sec-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/images/ic_back_btn.svg" className="header-back-icon" alt="뒤로가기" />
        </button>
        <h1 className="sec-header__title">Security</h1>
      </header>

      <main className="sec-main">
        <section className="sec-section">
          <h2 className="sec-section__eyebrow">LOGIN INFORMATION</h2>
          <div className="sec-card sec-card--gray">
            <div className="sec-card__content">
              <span className="sec-card__label">연결된 계정</span>
              <strong className="sec-card__title">Google</strong>
              <span className="sec-card__desc">user_architect_01@gmail.com</span>
            </div>
            <div className="sec-card__logo">
              <img src="/images/ic_google.svg" alt="Google" />
            </div>
          </div>
        </section>

        <section className="sec-section">
          <h2 className="sec-section__eyebrow">SECURITY CONTROLS</h2>
          <div className="sec-list">
            <button className="sec-list-item">
              <div className="sec-list-item__left">
                <img src="/images/ic_password.svg" alt="" className="sec-list-item__icon" />
                <span className="sec-list-item__text">비밀번호 변경</span>
              </div>
              <img src="/images/icon_chevron_right.svg" alt="" className="sec-list-item__arrow" />
            </button>
            <button className="sec-list-item">
              <div className="sec-list-item__left">
                <img src="/images/ic_shield_check.svg" alt="" className="sec-list-item__icon" />
                <div className="sec-list-item__text-group">
                  <span className="sec-list-item__text">2단계 인증 설정</span>
                  <span className="sec-list-item__badge">OFF</span>
                </div>
              </div>
              <img src="/images/icon_chevron_right.svg" alt="" className="sec-list-item__arrow" />
            </button>
            <button className="sec-list-item">
              <div className="sec-list-item__left">
                <img src="/images/ic_fingerprint.svg" alt="" className="sec-list-item__icon" />
                <span className="sec-list-item__text">생체 인식 로그인 (Face ID)</span>
              </div>
              <div
                className={`sec-toggle${biometricOn ? ' sec-toggle--on' : ''}`}
                onClick={() => setBiometricOn(!biometricOn)}
              >
                <div className="sec-toggle__knob"></div>
              </div>
            </button>
          </div>
        </section>

        <section className="sec-section">
          <h2 className="sec-section__eyebrow">DEVICE MANAGEMENT</h2>
          <p className="sec-device-hint">로그인 된 기기</p>
          <div className="sec-device-list">
            <div className="sec-device-item sec-device-item--white">
              <div className="sec-device-item__icon-box">
                <img src="/images/ic_laptop.svg" alt="" />
              </div>
              <div className="sec-device-item__info">
                <strong className="sec-device-item__name">MacBook Pro 14</strong>
                <span className="sec-device-item__status sec-device-item__status--active">현재 기기</span>
              </div>
              <button className="sec-device-item__logout">로그아웃</button>
            </div>
            <div className="sec-device-item sec-device-item--gray">
              <div className="sec-device-item__icon-box sec-device-item__icon-box--white">
                <img src="/images/ic_iphone.svg" alt="" />
              </div>
              <div className="sec-device-item__info">
                <strong className="sec-device-item__name">iPhone 15 Pro</strong>
                <span className="sec-device-item__status">최근 접속: 2시간 전</span>
              </div>
              <button className="sec-device-item__logout">로그아웃</button>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
