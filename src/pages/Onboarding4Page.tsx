import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/global.css'
import '../styles/onboarding.css'

export default function Onboarding4Page() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('')

  const options = [
    { value: 'immersive', label: '몰입형 (주 20h+)', sub: '빠른 성장을 위해 하루 3시간 이상 투자' },
    { value: 'parallel',  label: '병행형 (주 10-15h)', sub: '현재 직무와 커리어 성장을 동시에' },
    { value: 'turtle',    label: '거북이형 (주 5-10h)', sub: '퇴근 후 한 시간씩 꾸준하게' },
    { value: 'slow',      label: '슬로우형', sub: '부담 없이 원할 때마다 조금씩' },
  ]

  const handleNext = () => {
    localStorage.setItem('onb_time', selected)
    navigate('/onboarding/5')
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
            <div className="onb-progress__seg"></div>
          </div>
          <span className="onb-progress__label">STEP 04 / 05</span>
        </div>

        <div className="onb-header">
          <h1 className="onb-header__title">주간 커리어 투자 가능 시간은?</h1>
          <p className="onb-header__subtitle">선택하신 시간대에 맞춰 최적의 로드맵과 미션 리스트를 구성해 드립니다.</p>
        </div>

        <div className="onb-list">
          {options.map(opt => (
            <label key={opt.value} className="onb-item onb-item--tall">
              <input
                type="checkbox"
                name="time"
                value={opt.value}
                checked={selected === opt.value}
                onChange={() => setSelected(selected === opt.value ? '' : opt.value)}
              />
              <div className="onb-item__content">
                <span className="onb-item__text">{opt.label}</span>
                <span className="onb-item__sub">{opt.sub}</span>
              </div>
              <span className="onb-item__check"></span>
            </label>
          ))}
        </div>

        <div className="onb-footer">
          <button
            className="onb-btn"
            disabled={!selected}
            onClick={handleNext}
          >
            <span>다음으로</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10.6532 7.87505H0V6.12504H10.6532L5.75316 1.22501L7.00004 0L14.0001 7.00004L7.00004 14.0001L5.75316 12.7751L10.6532 7.87505Z" fill="white"/>
            </svg>
          </button>
        </div>
      </main>
    </div>
  )
}
