import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/onboarding.css'

const SLIDES = [
  {
    bg: '/images/onboarding1_bg.svg',
    titleSub: '혼자 하는 이직 준비',
    titleMain: '많이 막막하셨죠?',
    body: ['어디서부터 어떻게 시작해야 할지 몰라도 괜찮아요.', '루트가 당신에게 딱 맞는 길을 차근차근 안내해 드릴게요.'],
    isLast: false,
  },
  {
    bg: '/images/onboarding2_bg.svg',
    titleSub: '내 목표에 맞는 미션만 쏙쏙',
    titleMain: '내 페이스대로!',
    body: ['거창한 계획은 내려놓으세요. 당장 오늘 실천할 수 있는', '작은 미션들을 하나씩 달성하며 나만의 길을 만들어가요.'],
    isLast: false,
  },
  {
    bg: '/images/onboarding3_bg.svg',
    titleMain: '눈에 보이는 나의 성장',
    titleSub: '루트가 끝까지 응원할게요!',
    body: ['매일 쌓여가는 기록을 보며 자신감을 채워보세요.', '루트와 함께 당신만의 항로를 탐색할 준비가 되셨나요?'],
    isLast: true,
  },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [idx, setIdx] = useState(0)
  const startX = useRef(null)
  const isDragging = useRef(false)

  const goNext = () => {
    if (idx < SLIDES.length - 1) setIdx(idx + 1)
    else navigate('/login')
  }

  const goPrev = () => {
    if (idx > 0) setIdx(idx - 1)
  }

  const handleDragStart = (clientX) => {
    startX.current = clientX
    isDragging.current = true
  }

  const handleDragEnd = (clientX) => {
    if (!isDragging.current || startX.current === null) return
    const diff = startX.current - clientX
    if (diff > 50) goNext()
    else if (diff < -50) goPrev()
    startX.current = null
    isDragging.current = false
  }

  // Touch
  const handleTouchStart = (e) => handleDragStart(e.touches[0].clientX)
  const handleTouchEnd = (e) => handleDragEnd(e.changedTouches[0].clientX)

  // Mouse
  const handleMouseDown = (e) => handleDragStart(e.clientX)
  const handleMouseUp = (e) => handleDragEnd(e.clientX)

  const slide = SLIDES[idx]

  return (
    <div
      className="screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ userSelect: 'none' }}
    >
      {/* 슬라이더 */}
      <div className="ob-slider-wrap">
        <div
          className="ob-slider"
          style={{ transform: `translateX(calc(-${idx} * 100% / 3))` }}
        >
          {SLIDES.map((s, i) => (
            <div className="ob-slide" key={i}>
              <img className="ob-bg" src={s.bg} alt="" draggable={false} />
              <div className="ob-content">
                <div className={`title${s.isLast ? ' title--w236' : ''}`}>
                  {s.isLast ? (
                    <>
                      <span className="title-main">{s.titleMain}</span>
                      <span className="title-sub">{s.titleSub}</span>
                    </>
                  ) : (
                    <>
                      <span className="title-sub">{s.titleSub}</span>
                      <span className="title-main">{s.titleMain}</span>
                    </>
                  )}
                </div>
                <img className="ob-line" src="/images/onboarding_line.svg" alt="" />
                <div className="body-text">
                  {s.body.map((line, j) => <p key={j}>{line}</p>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 컨트롤 */}
      {slide.isLast ? (
        <div className="bottom-controls bottom-controls--ob3">
          <button className="ob3-cta-btn" onClick={() => navigate('/login')}>
            나만의 길 찾기 시작하기 →
          </button>
        </div>
      ) : (
        <div className="bottom-controls">
          <button className="skip-btn" onClick={() => navigate('/login')}>SKIP</button>
          <div className="dots">
            {SLIDES.map((_, i) => (
              <span key={i} className={`dot${idx === i ? ' dot--active' : ''}`} />
            ))}
          </div>
          <button className="next-btn" onClick={goNext}>
            <img src="/images/onboarding_next_btn.svg" alt="다음" />
          </button>
        </div>
      )}
    </div>
  )
}
