import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/onboarding.css'

export default function Onboarding3Page() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      {/* 슬라이드 레이어 */}
      <div className="slide-layer">
        <img className="ob-bg" src="/images/onboarding3_bg.svg" alt="" />
        <div className="ob-content">
          <div className="title title--w236">
            <span className="title-main">눈에 보이는 나의 성장</span>
            <span className="title-sub">루트가 끝까지 응원할게요!</span>
          </div>
          <img className="ob-line" src="/images/onboarding_line.svg" alt="" />
          <div className="body-text">
            <p>매일 쌓여가는 기록을 보며 자신감을 채워보세요.</p>
            <p>루트와 함께 당신만의 항로를 탐색할 준비가 되셨나요?</p>
          </div>
        </div>
      </div>

      {/* 하단 컨트롤 */}
      <div className="bottom-controls bottom-controls--ob3">
        <button className="cta-btn" onClick={() => navigate('/login')}>나만의 길 찾기 시작하기 →</button>
      </div>
    </div>
  )
}
