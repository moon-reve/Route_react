import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/global.css'
import '../styles/onboarding_route_loading.css'

const STEPS = [
  '사용자 정보를 분석하고 있어요.',
  '희망 직무 정보를 분석하고 있어요.',
  '보유 스킬 데이터를 분석하고 있어요.',
  '맞춤 로드맵을 구성하고 있어요.',
]

export default function OnboardingLoadingPage() {
  const navigate = useNavigate()
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        const next = prev + 1
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => navigate('/onboarding/complete'), 500)
        }
        return next > 100 ? 100 : next
      })
    }, 50)
    return () => clearInterval(interval)
  }, [navigate])

  const getStepClass = (i: number) => {
    const doneAt = (i + 1) * 25
    const startAt = i * 25
    if (percent >= doneAt) return 'rl__icon--done'
    if (percent >= startAt) return 'rl__icon--loading'
    return 'rl__icon--waiting'
  }

  return (
    <div className="app-container">
      <main className="rl">
        <div className="rl__title-section">
          <h1 className="rl__title">맞춤 커리어 루트를<br />만들고 있습니다.</h1>
          <div className="rl__title-bar"></div>
        </div>

        <div className="rl__list">
          {STEPS.map((step, i) => (
            <div key={i} className="rl__item" id={`step-${i + 1}`}>
              <div className={`rl__icon ${getStepClass(i)}`}>
                <svg className="rl__check" width="12" height="9" viewBox="0 0 12 9" fill="none">
                  <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="rl__item-text">{step}</span>
            </div>
          ))}
        </div>
      </main>

      <div className="rl__footer">
        <p className="rl__footer-desc">완성도 높은 루트를 만들기 위해 꼼꼼하게 분석 중이에요</p>
        <div className="rl__footer-status">
          <span className="rl__footer-label">PROCESSING</span>
          <span className="rl__footer-percent">{percent}%</span>
        </div>
        <div className="rl__bar-track">
          <div className="rl__bar-fill" style={{ width: `${percent}%` }}></div>
        </div>
        <p className="rl__footer-caption">조금만 기다려주세요...</p>
      </div>
    </div>
  )
}
