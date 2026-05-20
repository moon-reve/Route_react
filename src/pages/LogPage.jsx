import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/common.css'
import '../styles/log_calendar.css'
import '../styles/log_feed.css'
import '../styles/log_project.css'
import '../styles/log_page.css'

// ── Saved items ──────────────────────────────────────────────
function getSavedItems() {
  const items = []
  Object.keys(localStorage)
    .filter(k =>
      k.startsWith('route_saved_') &&
      !k.includes('_date') && !k.includes('_title') && !k.includes('_type') && !k.includes('_href')
    )
    .forEach(k => {
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

function formatDate(dateStr) {
  const p = dateStr.split('-')
  return `${p[0]}. ${p[1]}. ${p[2]}`
}

// ── Calendar static data ─────────────────────────────────────
const HARD_LOG_CARDS = [
  { day: 8,  badge: 'log-badge--gold',       badgeText: '[인강] 피그마 기초',   time: '오전 11:30', text: '오토레이아웃에서 Hug 속성 쓸 때 패딩 주의할 것. 레퍼런스 이미지 첨부함.', img: '/images/log_card_img.png' },
  { day: 8,  badge: 'log-badge--terracotta', badgeText: '[매거진] 아티클',       time: '오후 07:10', text: '2025 디자인 트렌드 아티클 읽음. 모션디자인 섹션 인상적.' },
  { day: 12, badge: 'log-badge--sage',       badgeText: '[도서] Lean 스타트업', time: '오후 04:20', text: '1장 요약. 시각적 위계가 인지 부하에 미치는 영향.' },
  { day: 12, badge: 'log-badge--orange',     badgeText: '[프로젝트]',            time: '오후 09:00', text: '포트폴리오 리뉴얼 — 앱 기획 완료.\n와이어프레임 작업 시작함.' },
]
const DAY_LABELS = { 8: '5월 8일', 12: '5월 12일' }
const DOT_DAYS   = { 8: ['cal-dot--gold', 'cal-dot--terracotta'], 12: ['cal-dot--sage', 'cal-dot--orange'] }

// ── Tab init ─────────────────────────────────────────────────
function getInitialTab(pathname) {
  if (pathname.startsWith('/log/project')) return 2
  if (pathname.startsWith('/log/feed'))    return 1
  return 0
}

const TAB_LABELS = ['캘린더', '로그 피드', '프로젝트']

// ─────────────────────────────────────────────────────────────
export default function LogPage() {
  const { pathname } = useLocation()
  const navigate     = useNavigate()

  // tab
  const initialTab = useRef(getInitialTab(pathname)).current
  const [tabIdx, setTabIdx] = useState(initialTab)
  const touchStartX = useRef(null)
  const wrapRef = useRef(null)
  const panelRefsEl = useRef([])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50 && tabIdx < 2) setTabIdx(tabIdx + 1)
    else if (diff < -50 && tabIdx > 0) setTabIdx(tabIdx - 1)
    touchStartX.current = null
  }
  const handleMouseDown = (e) => { touchStartX.current = e.clientX }
  const handleMouseUp = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.clientX
    if (diff > 50 && tabIdx < 2) setTabIdx(tabIdx + 1)
    else if (diff < -50 && tabIdx > 0) setTabIdx(tabIdx - 1)
    touchStartX.current = null
  }

  // calendar
  const _today = new Date()
  const [calYear,    setCalYear]    = useState(_today.getFullYear())
  const [calMonth,   setCalMonth]   = useState(_today.getMonth())
  const [selectedDay, setSelectedDay] = useState(_today.getDate())
  const [savedItems,  setSavedItems]  = useState([])
  const [savedDates,  setSavedDates]  = useState(new Set())

  // 월 이동
  const moveCal = (dir) => {
    let m = calMonth + dir, y = calYear
    if (m > 11) { m = 0; y++ }
    if (m < 0)  { m = 11; y-- }
    const isToday = y === _today.getFullYear() && m === _today.getMonth()
    setCalMonth(m); setCalYear(y)
    setSelectedDay(isToday ? _today.getDate() : 1)
  }

  // 달력 그리드 계산
  const firstDay    = new Date(calYear, calMonth, 1).getDay()
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
  const prevTotal   = new Date(calYear, calMonth, 0).getDate()
  const prevDays    = Array.from({ length: firstDay }, (_, i) => prevTotal - firstDay + 1 + i)

  // 이번 달 고정 기록 (2026년 5월만 표시)
  const isMay2026 = calYear === 2026 && calMonth === 4
  const currentMonthHardCards = isMay2026 ? HARD_LOG_CARDS : []
  const currentMonthDotDays   = isMay2026 ? DOT_DAYS : {}

  // 활성 패널 높이에 맞게 wrap 높이 동적 조정
  useLayoutEffect(() => {
    const panel = panelRefsEl.current[tabIdx]
    if (!panel || !wrapRef.current) return
    wrapRef.current.style.height = panel.offsetHeight + 'px'
  }, [tabIdx, selectedDay, savedItems])

  useEffect(() => {
    const items = getSavedItems()
    setSavedItems(items)
  }, [])

  // 현재 보이는 달의 저장 날짜
  useEffect(() => {
    const dates = new Set()
    savedItems.forEach(item => {
      const p = item.date.split('-')
      if (parseInt(p[0]) === calYear && parseInt(p[1]) - 1 === calMonth)
        dates.add(parseInt(p[2]))
    })
    setSavedDates(dates)
  }, [savedItems, calYear, calMonth])

  // calendar derived
  const visibleHardCards  = currentMonthHardCards.filter(c => c.day === selectedDay)
  const visibleSavedCards = savedItems.filter(item => {
    const p = item.date.split('-')
    return parseInt(p[0]) === calYear && parseInt(p[1]) - 1 === calMonth && parseInt(p[2]) === selectedDay
  })
  const totalCount  = visibleHardCards.length + visibleSavedCards.length
  const label       = isMay2026 && DAY_LABELS[selectedDay] ? DAY_LABELS[selectedDay] : `${calMonth + 1}월 ${selectedDay}일`
  const dividerText = `${label}의 기록${totalCount > 0 ? ` (${totalCount})` : ''}`

  // feed derived
  const feedTotalCount  = 42 + savedItems.length
  const sortedSavedItems = [...savedItems].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="screen">
      <div className="scroll-area">
        <main className="log-main">

          {/* ── 헤더 ── */}
          <header className="log-page-header">
            <div className="log-page-title">내가 쌓은 시간들</div>
          </header>

          {/* ── 탭 ── */}
          <nav className="log-tabs-nav">
            {TAB_LABELS.map((label, i) => (
              <button
                key={i}
                className={`log-tab-btn${tabIdx === i ? ' log-tab-btn--active' : ''}`}
                onClick={() => setTabIdx(i)}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* ── 슬라이더 ── */}
          <div
            className="log-slider-wrap"
            ref={wrapRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{ userSelect: 'none' }}
          >
            <div className="log-slider" style={{ transform: `translateX(calc(-${tabIdx} * 100% / 3))` }}>

              {/* ────── Panel 0: 캘린더 ────── */}
              <div className="log-panel" ref={el => panelRefsEl.current[0] = el}>
                <div className="log-contents log-contents--cal">

                  <div className="calendar">
                    <div className="cal-header">
                      <button className="cal-nav-btn" onClick={() => moveCal(-1)}><img src="/images/cal_prev.svg" alt="이전달" /></button>
                      <div className="cal-month">{calYear}년 {calMonth + 1}월</div>
                      <button className="cal-nav-btn" onClick={() => moveCal(1)}><img src="/images/cal_next.svg" alt="다음달" /></button>
                    </div>

                    <div className="cal-grid">
                      {['일','월','화','수','목','금','토'].map(d => (
                        <div key={d} className="cal-dow">{d}</div>
                      ))}
                      {prevDays.map(n => (
                        <div key={`prev-${n}`} className="cal-day cal-day--prev">
                          <span className="cal-num">{n}</span>
                        </div>
                      ))}
                      {Array.from({ length: daysInMonth }, (_, i) => {
                        const day  = i + 1
                        const dots = currentMonthDotDays[day] || []
                        const savedDot = savedDates.has(day)
                        return (
                          <div
                            key={day}
                            className={`cal-day${selectedDay === day ? ' cal-day--selected' : ''}`}
                            onClick={() => setSelectedDay(day)}
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
                          <p className="cal-log-title">{item.title}</p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>

              {/* ────── Panel 1: 로그 피드 ────── */}
              <div className="log-panel" ref={el => panelRefsEl.current[1] = el}>
                <div className="log-contents log-contents--feed">

                  <div className="filter-area">
                    <span className="filter-count">총 {feedTotalCount}개의 기록</span>
                    <div className="filter-sort">
                      <span className="filter-label">최신순</span>
                      <img src="/images/log_filter_arrow.svg" alt="정렬" className="filter-arrow" />
                    </div>
                  </div>

                  <div className="articles">
                    {sortedSavedItems.length > 0 && (
                      <>
                        <div className="saved-section-header">
                          <span className="saved-section-label">저장된 항목 ({sortedSavedItems.length})</span>
                        </div>
                        {sortedSavedItems.map((item, i) => (
                          <div
                            key={i}
                            className="article article--saved"
                            onClick={() => item.href && navigate('/' + item.href)}
                            style={item.href ? { cursor: 'pointer' } : undefined}
                          >
                            <div className="feed-meta">
                              <span className="article-date">{formatDate(item.date)}</span>
                              <span className="article-badge badge--blue">[저장] {item.type}</span>
                            </div>
                            <p className="feed-text">{item.title}</p>
                          </div>
                        ))}
                      </>
                    )}

                    <div className="article">
                      <div className="feed-meta">
                        <span className="article-date">2026. 05. 08</span>
                        <span className="article-badge badge--gold">[인강] 피그마 기초</span>
                      </div>
                      <p className="feed-text">오토레이아웃에서 Hug 속성 쓸 때 패딩 주의할 것.<br />여백 계산이 헷갈림.</p>
                      <div className="article-img-box">
                        <img src="/images/log_card_img.png" alt="참고 이미지" />
                      </div>
                    </div>

                    <div className="article">
                      <div className="feed-meta">
                        <span className="article-date">2026. 05. 06</span>
                        <span className="article-badge badge--sage">[도서] UX 심리학</span>
                      </div>
                      <p className="feed-text">사용자는 기다리지 않는다. 로딩 애니메이션의 중요성 파악.</p>
                    </div>

                    <div className="article">
                      <div className="feed-meta">
                        <span className="article-date">2026. 05. 02</span>
                        <span className="article-badge badge--orange">[프로젝트] 포트폴리오</span>
                      </div>
                      <p className="feed-text">내러티브 중심의 케이스 스터디 작성 중. 불필요한 시각적 장식보다는 문제 해결 과정에 집중하기로 함.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* ────── Panel 2: 프로젝트 ────── */}
              <div className="log-panel" ref={el => panelRefsEl.current[2] = el}>
                <div className="log-contents log-contents--proj">

                  <div className="section">
                    <h2 className="section-title section-title--dark">항해 중인 궤적 (2)</h2>
                    <div className="card-ongoing">
                      <div className="proj-card-img-box">
                        <img src="/images/project_figma_icon.png" alt="피그마 아이콘" />
                      </div>
                      <div className="card-body">
                        <p className="proj-card-title">피그마 오토레이아웃 마스터 클래스</p>
                        <div className="proj-progress-track">
                          <div className="proj-progress-fill proj-progress-fill--gold"></div>
                        </div>
                        <p className="card-meta">총 12개의 기록이 담겨있어요</p>
                      </div>
                    </div>
                    <div className="card-ongoing">
                      <div className="proj-card-img-box">
                        <img src="/images/daily_book_cover.png" alt="Lean 스타트업" />
                      </div>
                      <div className="card-body">
                        <p className="proj-card-title">Lean 스타트업 완독하기</p>
                        <div className="proj-progress-track">
                          <div className="proj-progress-fill proj-progress-fill--sage"></div>
                        </div>
                        <p className="card-meta">총 8개의 기록이 담겨있어요</p>
                      </div>
                    </div>
                  </div>

                  <div className="section">
                    <h2 className="section-title section-title--gray">빛을 발한 성좌들 (1)</h2>
                    <div className="card-completed">
                      <div className="card-completed-img">
                        <img src="/images/project_completed_icon.svg" alt="완료 아이콘" />
                      </div>
                      <div className="card-completed-body">
                        <p className="proj-card-title">나만의 포트폴리오 1차 완성</p>
                        <p className="card-meta">총 24개의 기록 • 2026.04.10 완료</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
          {/* ── /슬라이더 ── */}

        </main>
      </div>

      <BottomNav active="log" />
    </div>
  )
}
