import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/pre_step.css'

const OPTIONS = ['UI 중심', 'UX 기획 중심', 'BX 중심', 'Generalist']

export default function PreStep3Page() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="screen">
      <img src="/images/pre_bg.svg" alt="" className="pre-bg" />

      <div className="pre-wrap">
        <div className="pre-main">
          <header className="pre-header">
            <button className="btn-back" onClick={() => navigate('/pre/2')}>
              <img src="/images/pre_header.svg" alt="뒤로가기" className="btn-back-img" />
            </button>
          </header>

          <div className="pre-contents">
            <div className="pre-top">
              <div className="progressbar">
                <span className="step-label">STEP 03 / 05</span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div className="question-card">
                <p className="question-title">어떤 디자이너로 성장하고 싶으신가요?</p>
                <p className="question-sub">지향하시는 커리어 방향을 선택해주세요.</p>
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
                    src={selected === opt ? '/images/pre_radio_filled.svg' : '/images/pre_radio_empty.svg'}
                    alt=""
                    className="option-radio"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="btn-next" onClick={() => navigate('/pre/4')}>
          <span className="btn-next-text">다음으로</span>
          <img src="/images/pre_btn_next.svg" alt="" className="btn-next-icon" />
        </button>
      </div>
    </div>
  )
}
