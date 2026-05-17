import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/mypage.css'

export default function MypagePage() {
  return (
    <div className="app-container mp-app">
      <main className="mp-main scroll-content">
        <section className="mp-hero">
          <span className="mp-hero__eyebrow">PROFESSIONAL PROFILE</span>
          <div className="mp-hero__title-row">
            <h1 className="mp-hero__title">마이 페이지</h1>
            <span className="mp-hero__id">ID: user_architect_01</span>
          </div>
        </section>

        <section className="mp-bento">
          <Link to="/profile-edit" className="mp-card mp-profile-card">
            <div className="mp-card__header">
              <h2 className="mp-card__title">내 프로필 관리</h2>
              <img src="/images/ic_edit.svg" className="mp-card__icon mp-card__icon--right" alt="수정" />
            </div>
            <p className="mp-card__desc">개인 정보 및 경력 기술서 업데이트</p>
            <div className="mp-profile-tags">
              <span className="mp-tag">PRODUCT DESIGN</span>
              <span className="mp-tag">SEOUL</span>
            </div>
          </Link>

          <div className="mp-bento-row">
            <Link to="/settings" className="mp-card">
              <div className="mp-card__header">
                <img src="/images/ic_settings.svg" className="mp-card__icon" alt="설정" />
              </div>
              <h2 className="mp-card__title">설정</h2>
              <p className="mp-card__desc">중요 커리어 알림 관리</p>
            </Link>
            <Link to="/account-security" className="mp-card">
              <div className="mp-card__header">
                <img src="/images/ic_security.svg" className="mp-card__icon" alt="계정 보안" />
              </div>
              <h2 className="mp-card__title">계정 보안</h2>
              <p className="mp-card__desc">비밀번호 및 보안인증</p>
            </Link>
          </div>
        </section>

        <div className="mp-divider"><span>PAYMENTS</span></div>

        <section className="mp-card">
          <div className="mp-plan-header">
            <div className="mp-plan-icon">
              <img src="/images/ic_sparkle.svg" alt="Pro 플랜" />
            </div>
            <div className="mp-plan-info">
              <h3 className="mp-plan-title">Pro 커리어 플랜</h3>
              <p className="mp-plan-subtitle">구독 중 · 다음 결제일 24.11.20</p>
            </div>
            <Link to="/payment" className="mp-plan-manage">관리</Link>
          </div>
          <p className="mp-payments-label">최근 결제 내역</p>
          <ul className="mp-payments-list">
            <li className="mp-payment-item">
              <span className="mp-payment-item__name">커리어 로드맵 컨설팅</span>
              <span className="mp-payment-item__price">₩49,000</span>
            </li>
            <li className="mp-payment-item">
              <span className="mp-payment-item__name">포트폴리오 정밀 진단</span>
              <span className="mp-payment-item__price">₩29,000</span>
            </li>
          </ul>
        </section>

        <Link to="/payment" className="mp-banner">
          <div className="mp-banner-content">
            <span className="mp-banner-eyebrow">PREMIUM ACCESS</span>
            <h2 className="mp-banner-title">1:1 피드백권 결제<br />(Payment)</h2>
            <p className="mp-banner-desc">전문가와 직접 대화하며 커리어를 완성하세요</p>
          </div>
          <div className="mp-banner-arrow">
            <img src="/images/ic_arrow_right.svg" alt="이동" />
          </div>
        </Link>
      </main>
      <BottomNav />
    </div>
  )
}
