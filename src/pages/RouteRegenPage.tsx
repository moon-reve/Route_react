import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/route_regen.css'

export default function RouteRegenPage() {
  const navigate = useNavigate()
  const [chips, setChips] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  const toggleChip = (chip: string) => {
    setChips(prev => prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip])
  }

  return (
    <div className="app-container rr-app">
      <header className="rr-header">
        <button className="rr-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/images/ic_back_btn.svg" className="rr-header__back-icon" alt="뒤로가기" />
        </button>
        <span className="rr-header__title">루트 재생성</span>
      </header>

      <main className="rr-main">
        <div className="rr-section rr-section--warn">
          <div className="rr-warn-box">
            <img src="/images/icon_warning.svg" className="rr-warn-box__icon" alt="" />
            <p className="rr-warn-box__text">목표를 변경하시겠습니까?<br />새로운 루트를 생성하면 기존의 학습<br />데이터와 진행률은 초기화됩니다.</p>
          </div>
          <div className="rr-desc">
            <p className="rr-desc__text">기존 기록을 유지하며 루트를 일부 수정하시겠습니까? 아니면 아예 새롭게 다시 시작하시겠습니까?</p>
            <Link to="/route-setting" className="rr-desc__link">
              루트 정보만 수정하러 가기
              <img src="/images/icon_chevron_right.svg" className="rr-desc__link-arrow" alt="" />
            </Link>
          </div>
        </div>

        <div className="rr-section">
          <h2 className="rr-section__title">재생성 사유를 선택해 주세요</h2>
          <div className="rr-chips">
            {['목표 직군 변경', '난이도 조절', '학습 시간 변경', '개인 사정'].map(chip => (
              <button
                key={chip}
                className={`rr-chip${chips.includes(chip) ? ' rr-chip--active' : ''}`}
                onClick={() => toggleChip(chip)}
              >{chip}</button>
            ))}
          </div>
        </div>

        <div className="rr-help-card">
          <div className="rr-help-card__text">
            <span className="rr-help-card__label">HELP CENTER</span>
            <p className="rr-help-card__title">진행 데이터 백업이 필요한가요?</p>
          </div>
          <img src="/images/icon_help.svg" className="rr-help-card__icon" alt="" />
        </div>

        <button className="rr-cta" onClick={() => setModalOpen(true)}>설문 다시 시작하기</button>
      </main>

      <BottomNav />

      <div className={`rr-overlay${modalOpen ? ' is-visible' : ''}`} onClick={() => setModalOpen(false)}></div>
      <div className={`rr-modal${modalOpen ? ' is-open' : ''}`}>
        <div className="rr-modal__icon-wrap">
          <img src="/images/icon_modal_warning.svg" className="rr-modal__icon" alt="" />
        </div>
        <h3 className="rr-modal__title">정말 초기화할까요?</h3>
        <p className="rr-modal__desc">
          한 번 초기화된 데이터는 <strong>절대 복구할 수 없으며</strong>,<br />
          모든 주차별 학습 기록과 산출물이 <strong>삭제됩니다</strong>.
        </p>
        <div className="rr-modal__actions">
          <button className="rr-modal__btn rr-modal__btn--cancel" onClick={() => navigate('/onboarding/1')}>초기화 및 다시 시작</button>
          <button className="rr-modal__btn rr-modal__btn--confirm" onClick={() => setModalOpen(false)}>아니요, 유지할게요</button>
        </div>
      </div>
    </div>
  )
}
