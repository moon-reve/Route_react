import { useState, useEffect, useLayoutEffect, useRef, startTransition } from 'react'
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
      !k.includes('_date') && !k.includes('_title') && !k.includes('_type') && !k.includes('_href') && !k.includes('_text')
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
        text: localStorage.getItem(k + '_text') || '',
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
  { day: 8,  badge: 'log-badge--rose',       badgeText: '[매거진] 아티클',       time: '오후 07:10', text: '2025 디자인 트렌드 아티클 읽음. 모션디자인 섹션 인상적.' },
  { day: 12, badge: 'log-badge--mint',        badgeText: '[도서] Lean 스타트업', time: '오후 04:20', text: '1장 요약. 시각적 위계가 인지 부하에 미치는 영향.' },
  { day: 12, badge: 'log-badge--lavender',   badgeText: '[프로젝트]',            time: '오후 09:00', text: '포트폴리오 리뉴얼 — 앱 기획 완료.\n와이어프레임 작업 시작함.' },
]
const DAY_LABELS = { 8: '5월 8일', 12: '5월 12일' }
const DOT_DAYS   = { 8: ['cal-dot--gold', 'cal-dot--rose'], 12: ['cal-dot--mint', 'cal-dot--lavender'] }

// ── Tab init ─────────────────────────────────────────────────
function getInitialTab(pathname) {
  if (pathname.startsWith('/log/project'))  return 2
  if (pathname.startsWith('/log/feed'))     return 1
  if (pathname.startsWith('/log/feedback')) return 3
  return 0
}

const TAB_LABELS = ['캘린더', '로그 피드', '프로젝트', '피드백']

// ── 피드백 데이터 ─────────────────────────────────────────────
const FEEDBACK_PROJECTS = [
  {
    project: 'Route 앱 프로젝트',
    feedbacks: [
      {
        date: '2026. 05. 20',
        from: '멘토 이지혜',
        badge: 'badge--blue',
        badgeText: '[디자인 피드백]',
        text: '히어로 섹션의 별자리 비주얼이 앱의 컨셉을 잘 살려주고 있어요. 버튼 CTA 문구가 명확해서 전환 유도가 자연스럽습니다.',
      },
      {
        date: '2026. 05. 15',
        from: '멘토 이지혜',
        badge: 'badge--orange',
        badgeText: '[UX 피드백]',
        text: '프리스텝 5단계가 조금 길게 느껴질 수 있어요. 3~4단계로 압축하거나 진행률 표시를 더 명확히 해주면 이탈률을 줄일 수 있을 것 같습니다.',
      },
      {
        date: '2026. 05. 08',
        from: '동료 피드백',
        badge: 'badge--mint',
        badgeText: '[사용성 평가]',
        text: '로그 작성 후 저장 완료 피드백이 없어서 저장됐는지 알기 어려웠어요. 토스트 메시지나 시각적 확인이 있으면 좋겠어요.',
      },
    ],
  },
  {
    project: '포트폴리오 리뉴얼',
    feedbacks: [
      {
        date: '2026. 05. 28',
        from: 'J.young 멘토',
        badge: 'badge--blue',
        badgeText: '[멘토 피드백]',
        text: '앱 기획의 방향성이 명확하고 실현 가능성이 높습니다.',
        href: '/feedback',
      },
      {
        date: '2026. 04. 22',
        from: '멘토 이지혜',
        badge: 'badge--blue',
        badgeText: '[디자인 피드백]',
        text: '케이스 스터디 구조가 명확해요. 문제 정의 → 해결 과정 → 결과 순서가 잘 잡혀 있습니다. 결과 지표를 수치로 넣어주면 더 설득력이 높아질 거예요.',
      },
      {
        date: '2026. 04. 10',
        from: '동료 피드백',
        badge: 'badge--orange',
        badgeText: '[내용 피드백]',
        text: '전반적인 톤앤매너가 일관돼서 좋았어요. 모바일 뷰에서 이미지 비율이 깨지는 부분이 있으니 확인해보세요.',
      },
    ],
  },
]

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
    if (diff > 50 && tabIdx < 3) setTabIdx(tabIdx + 1)
    else if (diff < -50 && tabIdx > 0) setTabIdx(tabIdx - 1)
    touchStartX.current = null
  }
  const handleMouseDown = (e) => { touchStartX.current = e.clientX }
  const handleMouseUp = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.clientX
    if (diff > 50 && tabIdx < 3) setTabIdx(tabIdx + 1)
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

  const deleteSavedItem = (key) => {
    ['', '_date', '_title', '_type', '_text', '_href'].forEach(suffix => {
      localStorage.removeItem(key + suffix)
    })
    setSavedItems(getSavedItems())
  }

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

  // feed derived — 전체 합쳐서 날짜 최신순 정렬
  const feedTotalCount = HARD_LOG_CARDS.length + savedItems.length
  const hardFeedItems  = HARD_LOG_CARDS.map(c => ({
    ...c,
    _type: 'hard',
    _sortKey: `2026-05-${String(c.day).padStart(2, '0')}`,
  }))
  const savedFeedItems = savedItems.map(item => ({ ...item, _type: 'saved' }))
  const sortedSavedItems = [...savedItems].sort((a, b) => b.date.localeCompare(a.date)) // 캘린더용 유지
  const allFeedItems   = [...hardFeedItems, ...savedFeedItems]
    .sort((a, b) => {
      const da = a._sortKey || a.date
      const db = b._sortKey || b.date
      return db.localeCompare(da)
    })

  const BADGE_MAP = {
    'log-badge--gold':       'badge--gold',
    'log-badge--terracotta': 'badge--terracotta',
    'log-badge--rose':       'badge--rose',
    'log-badge--mint':       'badge--mint',
    'log-badge--lavender':   'badge--lavender',
    'log-badge--sage':       'badge--sage',
    'log-badge--orange':     'badge--orange',
  }
  const cardDate = (day) => `2026. 05. ${String(day).padStart(2, '0')}`

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
            <div className="log-slider" style={{ transform: `translateX(calc(-${tabIdx} * 100% / 4))` }}>

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
                            onClick={() => startTransition(() => setSelectedDay(day))}
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
                          style={{ position: 'relative', ...(item.href ? { cursor: 'pointer' } : {}) }}
                          data-hint={item.href ? 'true' : 'false'}
                        >
                          <button
                            className="log-card-delete"
                            onClick={e => { e.stopPropagation(); deleteSavedItem(item.key) }}
                          >×</button>
                          <div className="log-card-top">
                            <span className="log-badge badge--bookmark">[저장] {item.type}</span>
                          </div>
                          <p className="cal-log-title">{item.title}</p>
                          {item.text && <p className="log-text">{item.text}</p>}
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
                    {allFeedItems.map((item, i) => {
                      if (item._type === 'saved') {
                        return (
                          <div
                            key={i}
                            className="article article--saved"
                            onClick={() => item.href && navigate('/' + item.href)}
                            style={{ position: 'relative', ...(item.href ? { cursor: 'pointer' } : {}) }}
                            data-hint={item.href ? 'true' : 'false'}
                          >
                            <button
                              className="log-card-delete"
                              onClick={e => { e.stopPropagation(); deleteSavedItem(item.key) }}
                            >×</button>
                            <div className="feed-meta">
                              <span className="article-date">{formatDate(item.date)}</span>
                              <span className="article-badge badge--blue">[저장] {item.type}</span>
                            </div>
                            <p className="feed-text">{item.title}</p>
                            {item.text && <p className="feed-text" style={{ color: 'var(--gray-700)', fontWeight: 400 }}>{item.text}</p>}
                          </div>
                        )
                      }
                      return (
                        <div className="article" key={i}>
                          <div className="feed-meta">
                            <span className="article-date">{cardDate(item.day)}</span>
                            <span className={`article-badge ${BADGE_MAP[item.badge]}`}>{item.badgeText}</span>
                          </div>
                          <p className="feed-text">{item.text}</p>
                          {item.img && (
                            <div className="article-img-box">
                              <img src={item.img} alt="참고 이미지" />
                            </div>
                          )}
                        </div>
                      )
                    })}
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

              {/* ────── Panel 3: 피드백 ────── */}
              <div className="log-panel" ref={el => panelRefsEl.current[3] = el}>
                <div className="log-contents log-contents--feed">
                  {FEEDBACK_PROJECTS.map((proj, pi) => (
                    <div key={pi}>
                      <div className="saved-section-header">
                        <span className="saved-section-label">{proj.project}</span>
                      </div>
                      {proj.feedbacks.map((fb, fi) => (
                        <div
                          key={fi}
                          className="article"
                          onClick={() => fb.href && navigate(fb.href)}
                          style={fb.href ? { cursor: 'pointer' } : undefined}
                          data-hint={fb.href ? 'true' : 'false'}
                        >
                          <div className="feed-meta">
                            <span className="article-date">{fb.date}</span>
                            <span className={`article-badge ${fb.badge}`}>{fb.badgeText}</span>
                          </div>
                          <p className="feed-text" style={{ fontSize: '12px', color: 'var(--active-border-gray-500)', marginBottom: '4px' }}>{fb.from}</p>
                          <p className="feed-text">{fb.text}</p>
                          {fb.href && (
                            <p style={{ fontSize: '12px', color: 'var(--starline-gold)', fontWeight: 600 }}>상세 보기 →</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
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
