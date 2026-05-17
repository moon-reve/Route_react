import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/onboarding.css'

export default function Onboarding1Page() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      {/* 슬라이드 레이어 */}
      <div className="slide-layer slide-layer--static">
        <img className="ob-bg" src="/images/onboarding1_bg.svg" alt="" />
        <div className="ob-content">
          <div className="title">
            <span className="title-sub">혼자 하는 이직 준비</span>
            <span className="title-main">많이 막막하셨죠?</span>
          </div>
          <img className="ob-line" src="/images/onboarding_line.svg" alt="" />
          <div className="body-text">
            <p>어디서부터 어떻게 시작해야 할지 몰라도 괜찮아요.</p>
            <p>루트가 당신에게 딱 맞는 길을 차근차근 안내해 드릴게요.</p>
          </div>
        </div>
      </div>

      {/* 하단 컨트롤 */}
      <div className="bottom-controls">
        <button className="skip-btn" onClick={() => navigate('/login')}>SKIP</button>
        <div className="dots">
          <span className="dot dot--active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <button className="next-btn" onClick={() => navigate('/onboarding/2')}>
          <img src="/images/onboarding_next_btn.svg" alt="다음" />
        </button>
      </div>
    </div>
  )
}
