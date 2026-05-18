import { useState } from 'react'
import useHtmlBackground from '../hooks/useHtmlBackground'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/pre_step.css'
import '../styles/pre_step2.css'

const TOOLS = [
  { name: 'Figma', img: '/images/tool_figma.png', dark: false },
  { name: 'Adobe XD', img: '/images/tool_adobexd-6f07c2.png', dark: false },
  { name: 'Photoshop', img: '/images/tool_photoshop.png', dark: false },
  { name: 'Illustrator', img: '/images/tool_illustrator.png', dark: false },
  { name: 'Midjourney', img: '/images/tool_midjourney.png', dark: true },
  { name: 'Claude', img: '/images/tool_claude.png', dark: true },
]

export default function PreStep2Page() {
  useHtmlBackground('/images/pre_bg.svg')
  const navigate = useNavigate()
  const [selected, setSelected] = useState(new Set())

  const toggleTool = (name) => {
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
            <button className="btn-back" onClick={() => navigate('/pre/1')}>
              <img src="/images/pre_header.svg" alt="뒤로가기" className="btn-back-img" />
            </button>
          </header>

          <div className="pre-contents">
            <div className="pre-top">
              <div className="progressbar">
                <span className="step-label">STEP 02 / 05</span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div className="question-card">
                <p className="question-title">능숙하게 다룰 수 있는 디자인 툴을 선택해주세요.</p>
                <p className="question-sub">선택하신 툴 숙련도에 따라 실습 과제의 난이도와 비중이 맞춤 조정됩니다.</p>
              </div>
            </div>

            <div className="tool-grid">
              {[0, 1, 2].map(row => (
                <div className="tool-row" key={row}>
                  {TOOLS.slice(row * 2, row * 2 + 2).map(tool => (
                    <div
                      key={tool.name}
                      className={`tool-card${selected.has(tool.name) ? ' tool-card--selected' : ''}`}
                      onClick={() => toggleTool(tool.name)}
                    >
                      <div className={`tool-icon-wrap${tool.dark ? ' tool-icon-wrap--dark' : ''}`}>
                        <img src={tool.img} alt={tool.name} className="tool-icon" />
                      </div>
                      <span className="tool-name">{tool.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="btn-next" onClick={() => navigate('/pre/3')}>
          <span className="btn-next-text">다음으로</span>
          <img src="/images/pre_btn_next.svg" alt="" className="btn-next-icon" />
        </button>
      </div>
    </div>
  )
}
