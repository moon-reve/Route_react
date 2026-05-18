import { useState } from 'react'
import useHtmlBackground from '../hooks/useHtmlBackground'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/pre_step.css'

const OPTIONS = ['비전공자 / 입문자', '유관 직군 전향', '주니어 디자이너', '독학 중']

export default function PreStep1Page() {
  useHtmlBackground('/images/pre_bg.svg')
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  return (
    <div className="screen">
      <img src="/images/pre_bg.svg" alt="" className="pre-bg" />

      <div className="pre-wrap">
        <div className="pre-main">
          <header className="pre-header">
            <button className="btn-back" onClick={() => navigate('/home')}>
              <img src="/images/pre_header.svg" alt="뒤로가기" className="btn-back-img" />
            </button>
          </header>

          <div className="pre-contents">
            <div className="pre-top">
              <div className="progressbar">
                <span className="step-label">STEP 01 / 05</span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '20%' }}></div>
                </div>
              </div>

              <div className="question-card">
                <p className="question-title">현재 디자인 경험은 어느 정도인가요?</p>
                <p className="question-sub">맞춤형 커리큘럼을 추천해드려요.</p>
              </div>
            </div>

            <div className="option-list">
              {OPTIONS.map((opt) => (
                <div
                  key={opt}
                  className={`option-item${selected === opt ? ' option-item--selected' : ''}`}
                  onClick={() => setSelected(opt)}
                >
                  <span className="option-text">{opt}</span>
                  <img
                    src={selected === opt ? '/images/pre_radio_selected.svg' : '/images/pre_radio_empty.svg'}
                    alt=""
                    className="option-radio"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="btn-next" onClick={() => navigate('/pre/2')}>
          <span className="btn-next-text">다음으로</span>
          <img src="/images/pre_btn_next.svg" alt="" className="btn-next-icon" />
        </button>
      </div>
    </div>
  )
}
