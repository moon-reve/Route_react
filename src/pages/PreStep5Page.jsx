import { useState } from 'react'
import useHtmlBackground from '../hooks/useHtmlBackground'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/pre_step.css'
import '../styles/pre_step5.css'

const DOMAINS = [
  { name: '이커머스/쇼핑', img: '/images/domain_ecommerce.svg' },
  { name: '핀테크 (금융)', img: '/images/domain_fintech.svg' },
  { name: '헬스케어/운동', img: '/images/domain_health.svg' },
  { name: '에듀테크 (교육)', img: '/images/domain_edu.svg' },
  { name: '모빌리티 (이동)', img: '/images/domain_mobility.svg' },
  { name: 'SNS/커뮤니티', img: '/images/domain_sns.svg' },
]

export default function PreStep5Page() {
  useHtmlBackground('/images/pre_bg.svg')
  const navigate = useNavigate()
  const [selected, setSelected] = useState(new Set())

  const toggleDomain = (name) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <div className="screen">
      <img src="/images/pre_bg.svg" alt="" className="pre-bg" />

      <div className="pre-wrap">
        <div className="pre-main">
          <header className="pre-header">
            <button className="btn-back" onClick={() => navigate('/pre/4')}>
              <img src="/images/pre_header.svg" alt="뒤로가기" className="btn-back-img" />
            </button>
          </header>

          <div className="pre-contents">
            <div className="pre-top">
              <div className="progressbar">
                <span className="step-label">STEP 05 / 05</span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="question-card">
                <p className="question-title">어떤 분야의 앱을 기획하고 싶으신가요?</p>
                <p className="question-sub">선택하신 도메인은 기획 초안 생성의 핵심 테마로 활용됩니다.</p>
              </div>
            </div>

            <div className="domain-grid">
              {[0, 1, 2].map(row => (
                <div className="domain-row" key={row}>
                  {DOMAINS.slice(row * 2, row * 2 + 2).map(domain => (
                    <div
                      key={domain.name}
                      className={`domain-card${selected.has(domain.name) ? ' domain-card--selected' : ''}`}
                      onClick={() => toggleDomain(domain.name)}
                    >
                      <img src={domain.img} alt={domain.name} className="domain-icon" />
                      <span className="domain-name">{domain.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="btn-next" onClick={() => navigate('/pre/loading')}>
          <span className="btn-next-text">마치기</span>
        </button>
      </div>
    </div>
  )
}
