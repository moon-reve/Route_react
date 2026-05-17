import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/payment.css'

export default function PaymentPage() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState('Pro 플랜')
  const [selectedMethod, setSelectedMethod] = useState('간편결제')

  return (
    <div className="app-container pay-app">
      <header className="pay-header">
        <button className="pay-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/images/ic_back_btn.svg" className="header-back-icon" alt="뒤로가기" />
        </button>
        <span className="pay-header__title">피드백권 결제</span>
      </header>

      <main className="pay-main scroll-content">
        <section className="pay-section">
          <span className="pay-section__eyebrow">CURRENT PLAN</span>
          <div className="pay-card">
            <div className="pay-card__info">
              <h3 className="pay-card__title">Pro 커리어 플랜</h3>
              <p className="pay-card__desc">현재 이용 중인 멤버십입니다</p>
            </div>
            <div className="pay-card__icon-box">
              <img src="/images/icon_plan_membership.svg" alt="멤버십" />
            </div>
          </div>
        </section>

        <section className="pay-section">
          <h2 className="pay-section__title">플랜 선택하기</h2>
          <div className="pay-plan-list">
            <div
              className={`pay-plan${selectedPlan === 'Basic 플랜' ? ' pay-plan--active' : ''}`}
              onClick={() => setSelectedPlan('Basic 플랜')}
            >
              <div className="pay-plan__left">
                <h3 className="pay-plan__title">Basic 플랜</h3>
                <p className="pay-plan__desc">월 1회 피드백</p>
              </div>
              <div className="pay-plan__right">
                <span className="pay-plan__price">₩0</span>
              </div>
            </div>

            <div
              className={`pay-plan${selectedPlan === 'Pro 플랜' ? ' pay-plan--active' : ''}`}
              onClick={() => setSelectedPlan('Pro 플랜')}
            >
              <span className="pay-plan__badge">RECOMMENDED</span>
              <div className="pay-plan__left">
                <h3 className="pay-plan__title">Pro 플랜</h3>
                <div className="pay-plan__features">
                  <span className="pay-plan__feature">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    월 4회 피드백
                  </span>
                  <span className="pay-plan__feature">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    전문가 1:1 채팅
                  </span>
                </div>
              </div>
              <div className="pay-plan__right">
                <span className="pay-plan__price">₩49,000</span>
                <span className="pay-plan__price-sub">MONTHLY</span>
              </div>
            </div>

            <div
              className={`pay-plan${selectedPlan === 'Ultra 플랜' ? ' pay-plan--active' : ''}`}
              onClick={() => setSelectedPlan('Ultra 플랜')}
            >
              <div className="pay-plan__left">
                <h3 className="pay-plan__title">Ultra 플랜</h3>
                <p className="pay-plan__desc">무제한 피드백 + 포트폴리오 정밀 진단</p>
              </div>
              <div className="pay-plan__right">
                <span className="pay-plan__price">₩99,000</span>
              </div>
            </div>
          </div>
        </section>

        <section className="pay-section">
          <div className="pay-section__header-row">
            <h2 className="pay-section__title">결제 수단 선택</h2>
            <a href="#" className="pay-section__link">수단 관리</a>
          </div>
          <div className="pay-method-grid">
            <div
              className={`pay-method${selectedMethod === '신용카드' ? ' pay-method--active' : ''}`}
              onClick={() => setSelectedMethod('신용카드')}
            >
              <img src="/images/ic_credit_card.svg" alt="신용카드" className="pay-method__icon" />
              <span className="pay-method__label">신용카드</span>
            </div>
            <div
              className={`pay-method${selectedMethod === '간편결제' ? ' pay-method--active' : ''}`}
              onClick={() => setSelectedMethod('간편결제')}
            >
              <img src="/images/ic_wallet.svg" alt="간편결제" className="pay-method__icon" />
              <span className="pay-method__label">간편결제</span>
            </div>
          </div>
        </section>

        <button className="pay-submit-btn">
          <span>₩49,000 결제하기</span>
          <img src="/images/ic_arrow_right.svg" alt="결제 진행" />
        </button>
      </main>
      <BottomNav />
    </div>
  )
}
