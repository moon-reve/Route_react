import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/common.css'
import '../styles/log_calendar.css'

function getSavedItems() {
  const items = []
  Object.keys(localStorage).filter(k =>
    k.startsWith('route_saved_') && !k.includes('_date') && !k.includes('_title') && !k.includes('_type') && !k.includes('_href')
  ).forEach(k => {
    if (localStorage.getItem(k) !== 'true') return
    const dateStr = localStorage.getItem(k + '_date')
    if (!dateStr) return
    items.push({
      key: k,
      date: dateStr,
      title: localStorage.getItem(k + '_title') || '',
      type: localStorage.getItem(k + '_type') || '',
      href: localStorage.getItem(k + '_href') || '',
    })
  })
  return items
}

const HARD_LOG_CARDS = [
  { day: 8, badge: 'log-badge--gold', badgeText: '[인강] 피그마 기초', time: '오전 11:30', text: '오토레이아웃에서 Hug 속성 쓸 때 패딩 주의할 것. 레퍼런스 이미지 첨부함.', img: '/images/log_card_img.png' },
  { day: 8, badge: 'log-badge--terracotta', badgeText: '[매거진] 아티클', time: '오후 07:10', text: '2025 디자인 트렌드 아티클 읽음. 모션디자인 섹션 인상적.' },
  { day: 12, badge: 'log-badge--sage', badgeText: '[도서] Lean 스타트업', time: '오후 04:20', text: '1장 요약. 시각적 위계가 인지 부하에 미치는 영향.' },
  { day: 12, badge: 'log-badge--orange', badgeText: '[프로젝트]', time: '오후 09:00', text: '포트폴리오 리뉴얼 — 앱 기획 완료.\n와이어프레임 작업 시작함.' },
]

const DAY_LABELS = { 8: '5월 8일', 12: '5월 12일' }

export default function LogCalendarPage() {
  const navigate = useNavigate()
  const today = new Date().getDate()
  const [selectedDay, setSelectedDay] = useState(today)
  const [savedItems, setSavedItems] = useState([])
  const [savedDates, setSavedDates] = useState(new Set())

  useEffect(() => {
    const items = getSavedItems()
    setSavedItems(items)
    const dates = new Set()
    items.forEach(item => {
      const parts = item.date.split('-')
      const y = parseInt(parts[0])
      const m = parseInt(parts[1])
      const d = parseInt(parts[2])
      if (y === 2026 && m === 5) dates.add(d)
    })
    setSavedDates(dates)
  }, [])

  const selectDay = (day) => setSelectedDay(day)

  const visibleHardCards = HARD_LOG_CARDS.filter(c => c.day === selectedDay)
  const visibleSavedCards = savedItems.filter(item => {
    const d = parseInt(item.date.split('-')[2])
    return d === selectedDay
  })
  const totalCount = visibleHardCards.length + visibleSavedCards.length

  const label = DAY_LABELS[selectedDay] || `5월 ${selectedDay}일`
  const dividerText = `${label}의 기록${totalCount > 0 ? ` (${totalCount})` : ''}`

  const DOT_DAYS = {
    8: ['cal-dot--gold', 'cal-dot--terracotta'],
    12: ['cal-dot--sage', 'cal-dot--orange'],
  }

  return (
    <div className="screen">
      <div className="scroll-area">
        <div className="log-page">
          <main className="main">

            <header className="header">
              <div className="header-title">내가 쌓은 시간들</div>
            </header>

            <nav className="tabs">
              <Link to="/log" className="tab tab--active">캘린더</Link>
              <Link to="/log/feed" className="tab">로그 피드</Link>
              <Link to="/log/project" className="tab">프로젝트</Link>
            </nav>

            <div className="contents">

              <div className="calendar">
                <div className="cal-header">
                  <button className="cal-nav-btn">
                    <img src="/images/cal_prev.svg" alt="이전달" />
                  </button>
                  <div className="cal-month">2026년 5월</div>
                  <button className="cal-nav-btn">
                    <img src="/images/cal_next.svg" alt="다음달" />
                  </button>
                </div>

                <div className="cal-grid">
                  {['일','월','화','수','목','금','토'].map(d => (
                    <div key={d} className="cal-dow">{d}</div>
                  ))}

                  {/* 이전달 빈칸 */}
                  {[26,27,28,29,30].map(n => (
                    <div key={`prev-${n}`} className="cal-day cal-day--prev"><span className="cal-num">{n}</span></div>
                  ))}

                  {/* 이번달 날짜 */}
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1
                    const dots = DOT_DAYS[day] || []
                    const savedDot = savedDates.has(day)
                    return (
                      <div
                        key={day}
                        className={`cal-day${selectedDay === day ? ' cal-day--selected' : ''}`}
                        onClick={() => selectDay(day)}
                      >
                        <span className="cal-num">{day}</span>
                        {(dots.length > 0 || savedDot) && (
                          <div className="cal-dots">
                            {dots.map(cls => <span key={cls} className={`cal-dot ${cls}`}></span>)}
                            {savedDot && <span className="cal-dot cal-dot--bookmark"></span>}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="section-divider">
                <div className="divider-title">{dividerText}</div>
              </div>

              {totalCount === 0 ? (
                <p className="log-empty">오늘의 항로를 기록해보세요</p>
              ) : (
                <div className="section-log">
                  {visibleHardCards.map((card, i) => (
                    <div key={i} className="log-card">
                      <div className="log-top">
                        <span className={`log-badge ${card.badge}`}>{card.badgeText}</span>
                        <span className="log-time">{card.time}</span>
                      </div>
                      <div className="log-text">{card.text}</div>
                      {card.img && (
                        <div className="log-img-box">
                          <img src={card.img} alt="참고 이미지" />
                        </div>
                      )}
                    </div>
                  ))}

                  {visibleSavedCards.map((item, i) => (
                    <div
                      key={i}
                      className="log-card log-card--saved"
                      onClick={() => item.href && navigate('/' + item.href)}
                      style={item.href ? { cursor: 'pointer' } : undefined}
                    >
                      <div className="log-card-top">
                        <span className="log-badge badge--bookmark">[저장] {item.type}</span>
                      </div>
                      <p className="log-title">{item.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <BottomNav active="log" />
    </div>
  )
}
