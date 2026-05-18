import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/pre_step.css'

const OPTIONS = [
  { text: '몰입형 (주 20h+)', sub: '빠른 성장을 위해 하루 3시간 이상 투자' },
  { text: '병행형 (주 10-15h)', sub: '현재 직무와 커리어 성장을 동시에' },
  { text: '거북이형 (주 5-10h)', sub: '퇴근 후 한 시간씩 꾸준하게' },
  { text: '슬로우형', sub: '부담 없이 원할 때마다 조금씩' },
]

export default function PreStep4Page() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  return (
    <div className="screen">
      <img src="/images/pre_bg.svg" alt="" className="pre-bg" />

      <div className="pre-wrap">
        <div className="pre-main">
          <header className="pre-header">
            <button className="btn-back" onClick={() => navigate('/pre/3')}>
              <img src="/images/pre_header.svg" alt="뒤로가기" className="btn-back-img" />
            </button>
          </header>

          <div className="pre-contents">
            <div className="pre-top">
              <div className="progressbar">
                <span className="step-label">STEP 04 / 05</span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div className="question-card">
                <p className="question-title">주간 커리어 투자 가능 시간은?</p>
                <p className="question-sub">선택하신 시간대에 맞춰 최적의 로드맵과 미션 리스트를 구성해 드립니다.</p>
              </div>
            </div>

            <div className="option-list">
              {OPTIONS.map((opt) => (
                <div
                  key={opt.text}
                  className={`option-item${selected === opt.text ? ' option-item--selected' : ''}`}
                  onClick={() => setSelected(opt.text)}
                >
                  <div className="option-text-group">
                    <span className="option-text">{opt.text}</span>
                    <span className="option-sub">{opt.sub}</span>
                  </div>
                  <img
                    src={selected === opt.text ? '/images/pre_radio_selected.svg' : '/images/pre_radio_empty.svg'}
                    alt=""
                    className="option-radio"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="btn-next" onClick={() => navigate('/pre/5')}>
          <span className="btn-next-text">다음으로</span>
          <img src="/images/pre_btn_next.svg" alt="" className="btn-next-icon" />
        </button>
      </div>
    </div>
  )
}
