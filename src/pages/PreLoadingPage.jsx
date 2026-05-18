import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/pre_loading.css'

export default function PreLoadingPage() {
  const navigate = useNavigate()
  const [itemStates, setItemStates] = useState(['pending', 'pending', 'pending', 'pending'])
  const [progress, setProgress] = useState(0)
  const intervalsRef = useRef([])

  const setItemState = (idx, state) => {
    setItemStates(prev => {
      const next = [...prev]
      next[idx] = state
      return next
    })
  }

  const startProgress = (_from, to) => {
    const iv = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1
        if (next >= to) {
          clearInterval(iv)
          return to
        }
        return next
      })
    }, 60)
    intervalsRef.current.push(iv)
  }

  useEffect(() => {
    const t1 = setTimeout(() => {
      setItemState(0, 'loading')
      startProgress(0, 25)
    }, 300)

    const t2 = setTimeout(() => {
      setItemState(0, 'done')
      setItemState(1, 'loading')
      startProgress(25, 50)
    }, 2000)

    const t3 = setTimeout(() => {
      setItemState(1, 'done')
      setItemState(2, 'loading')
      startProgress(50, 75)
    }, 3700)

    const t4 = setTimeout(() => {
      setItemState(2, 'done')
      setItemState(3, 'loading')
      startProgress(75, 100)
    }, 5400)

    const t5 = setTimeout(() => {
      setItemState(3, 'done')
    }, 7100)

    const t6 = setTimeout(() => {
      navigate('/pre/complete')
    }, 7700)

    return () => {
      [t1, t2, t3, t4, t5, t6].forEach(clearTimeout)
      intervalsRef.current.forEach(clearInterval)
    }
  }, [navigate])

  const CHECK_ITEMS = [
    '사용자 정보를 분석하고 있어요.',
    '희망 직무 정보를 분석하고 있어요.',
    '보유 스킬 데이터를 분석하고 있어요.',
    '맞춤 로드맵을 구성하고 있어요.',
  ]

  return (
    <div className="screen">
      <img src="/images/pre_bg.svg" alt="" className="loading-bg" />

      <div className="loading-wrap">
        <div className="loading-contents">
          <div className="loading-hero-section">
            <h1 className="loading-hero-title">맞춤 커리어 루트를<br />만들고 있습니다.</h1>
            <div className="loading-hero-bar"></div>
          </div>

          <div className="loading-checklist">
            {CHECK_ITEMS.map((text, i) => {
              const state = itemStates[i]
              return (
                <div key={i} className={`loading-check-item loading-check-item--${state}`}>
                  <div className="loading-check-icon-wrap">
                    <img
                      src="/images/loading_icon_done.svg"
                      alt=""
                      className="loading-check-icon loading-check-icon--done"
                      style={{ display: state === 'done' ? 'block' : 'none' }}
                    />
                    <img
                      src="/images/loading_icon_spinning.svg"
                      alt=""
                      className="loading-check-icon loading-check-icon--spin"
                      style={{ display: state === 'loading' ? 'block' : 'none' }}
                    />
                    <div
                      className="loading-check-icon loading-check-icon--empty"
                      style={{ display: state === 'pending' ? 'block' : 'none' }}
                    ></div>
                  </div>
                  <span className="loading-check-text">{text}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="loading-progress-footer">
          <p className="loading-progress-desc">완성도 높은 루트를 만들기 위해 꼼꼼하게 분석 중이에요</p>
          <div className="loading-progress-status">
            <span className="loading-progress-label">Processing</span>
            <span className="loading-progress-pct">{progress}%</span>
          </div>
          <div className="loading-progress-track">
            <div className="loading-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="loading-progress-sub">조금만 기다려주세요...</p>
        </div>
      </div>
    </div>
  )
}
