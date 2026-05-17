import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/global.css'
import '../styles/onboarding.css'

export default function Onboarding5Page() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])

  const options = [
    { value: 'ecommerce', label: '이커머스/쇼핑' },
    { value: 'fintech',   label: '핀테크 (금융)' },
    { value: 'health',    label: '헬스케어/운동' },
    { value: 'edutech',   label: '에듀테크 (교육)' },
    { value: 'mobility',  label: '모빌리티 (이동)' },
    { value: 'sns',       label: 'SNS/커뮤니티' },
  ]

  const toggle = (value) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const handleFinish = () => {
    localStorage.setItem('onb_domains', JSON.stringify(selected))
    navigate('/onboarding/loading')
  }

  return (
    <div className="app-container">
      <main className="onb">
        <div className="onb-topbar">
          <button className="onb-topbar__close" onClick={() => navigate(-1)} aria-label="닫기">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="#1A1C1E"/>
            </svg>
          </button>
        </div>

        <div className="onb-progress">
          <div className="onb-progress__bar">
            <div className="onb-progress__seg onb-progress__seg--active"></div>
            <div className="onb-progress__seg onb-progress__seg--active"></div>
            <div className="onb-progress__seg onb-progress__seg--active"></div>
            <div className="onb-progress__seg onb-progress__seg--active"></div>
            <div className="onb-progress__seg onb-progress__seg--active"></div>
          </div>
          <span className="onb-progress__label">STEP 05 / 05</span>
        </div>

        <div className="onb-header">
          <h1 className="onb-header__title">어떤 분야의 앱을 기획하고 싶으신가요?</h1>
          <p className="onb-header__subtitle">선택하신 도메인은 기획 초안 생성의 핵심 테마로 활용됩니다.</p>
        </div>

        <div className="onb-list">
          {options.map(opt => (
            <label key={opt.value} className="onb-item">
              <input
                type="checkbox"
                name="domain"
                value={opt.value}
                checked={selected.includes(opt.value)}
                onChange={() => toggle(opt.value)}
              />
              <span className="onb-item__text">{opt.label}</span>
              <span className="onb-item__check"></span>
            </label>
          ))}
        </div>

        <div className="onb-footer">
          <button
            className="onb-btn"
            disabled={selected.length === 0}
            onClick={handleFinish}
          >
            <span>마치기</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10.6532 7.87505H0V6.12504H10.6532L5.75316 1.22501L7.00004 0L14.0001 7.00004L7.00004 14.0001L5.75316 12.7751L10.6532 7.87505Z" fill="white"/>
            </svg>
          </button>
        </div>
      </main>
    </div>
  )
}
