import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/onboarding.css'

export default function Onboarding2Page() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      {/* 슬라이드 레이어 */}
      <div className="slide-layer">
        <img className="ob-bg" src="/images/onboarding2_bg.svg" alt="" />
        <div className="ob-content">
          <div className="title">
            <span className="title-sub">내 목표에 맞는 미션만 쏙쏙</span>
            <span className="title-main">내 페이스대로!</span>
          </div>
          <img className="ob-line" src="/images/onboarding_line.svg" alt="" />
          <div className="body-text">
            <p>거창한 계획은 내려놓으세요. 당장 오늘 실천할 수 있는</p>
            <p>작은 미션들을 하나씩 달성하며 나만의 길을 만들어가요.</p>
          </div>
        </div>
      </div>

      {/* 하단 컨트롤 */}
      <div className="bottom-controls">
        <button className="skip-btn" onClick={() => navigate('/login')}>SKIP</button>
        <div className="dots">
          <span className="dot"></span>
          <span className="dot dot--active"></span>
          <span className="dot"></span>
        </div>
        <button className="next-btn" onClick={() => navigate('/onboarding/3')}>
          <img src="/images/onboarding_next_btn.svg" alt="다음" />
        </button>
      </div>
    </div>
  )
}
