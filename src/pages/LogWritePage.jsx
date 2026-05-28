import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/common.css'
import '../styles/log_write.css'

const TAB_CONFIG = {
  log: {
    titleLabel: '제목 (필수)',
    titlePH: '오늘은 어떤 기록을 해볼까요',
    descPH: '왜 이렇게 했는지, 무엇을 느꼈는지 — 나중에 면접 준비할 때 가장 도움이 될 기록이에요',
    heroCap: '탭하여 오늘의 항해 순간을 담아보세요',
    heroImg: '/images/log_hero_img.svg',
    showLink: false, showFile: false, showLogDate: true, showDur: false, showReminder: false,
  },
  lecture: {
    titleLabel: '항로 이름 (필수)',
    titlePH: '예) 피그마 오토레이아웃 마스터 클래스',
    descPH: '이 항로에 대해 간단히 설명해 주세요',
    heroCap: '링크를 입력하면 썸네일이 자동으로 채워져요',
    heroImg: '/images/log_hero_img.svg',
    linkLabel: '학습할 링크 (선택)',
    showLink: true, showFile: false, showLogDate: false, showDur: true, showReminder: true,
  },
  book: {
    titleLabel: '타이틀 (필수)',
    titlePH: '타이틀을 적어주세요',
    descPH: '이 책에 대해 간단히 설명해 주세요',
    heroCap: '책 한 권이 나의 항로가 됩니다',
    heroImg: '/images/log_hero_book_img.svg',
    showLink: false, showFile: false, showLogDate: false, showDur: true, showReminder: true,
  },
  project: {
    titleLabel: '프로젝트 타이틀 (필수)',
    titlePH: '프로젝트 타이틀을 적어주세요',
    descPH: '프로젝트의 소개를 간단히 적어주세요',
    heroCap: '완성이 아닌 과정도 빛나는 궤적입니다',
    heroImg: '/images/log_hero_project_img.svg',
    linkLabel: '프로젝트 링크 (선택)',
    showLink: true, showFile: true, showLogDate: false, showDur: true, showReminder: true,
  },
}

const TAB_LABELS = [
  ['로그', 'log'],
  ['인강/강의', 'lecture'],
  ['도서/아티클', 'book'],
  ['프로젝트', 'project'],
]

const AMPM   = ['오전', '오후']
const HOURS  = ['01','02','03','04','05','06','07','08','09','10','11','12']
const MINS   = ['00','05','10','15','20','25','30','35','40','45','50','55']
const DAYS   = ['일','월','화','수','목','금','토']

function formatDate(y, m, d) {
  return `${y}. ${String(m + 1).padStart(2,'0')}. ${String(d).padStart(2,'0')}.`
}

/* ── 드럼 컬럼 컴포넌트 ── */
function DrumCol({ items, selectedIndex, onChange }) {
  const ITEM_H = 36
  const colRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const el = colRef.current
    if (!el) return
    el.scrollTop = selectedIndex * ITEM_H
  }, [selectedIndex])

  const handleScroll = useCallback(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const el = colRef.current
      if (!el) return
      const idx = Math.round(el.scrollTop / ITEM_H)
      const clamped = Math.max(0, Math.min(idx, items.length - 1))
      el.scrollTop = clamped * ITEM_H
      onChange(clamped)
    }, 120)
  }, [items.length, onChange])

  return (
    <div className="drum-col" ref={colRef} onScroll={handleScroll}>
      {items.map((item, i) => (
        <div key={i} className={`drum-item${i === selectedIndex ? ' drum-item--selected' : ''}`}>{item}</div>
      ))}
    </div>
  )
}

export default function LogWritePage() {
  const navigate   = useNavigate()
  const { state }  = useLocation()
  const editItem   = state?.editItem ?? null   // 수정 모드: { key, title, content, tag, date }
  const [toastVisible,   setToastVisible]   = useState(false)
  const [emptyModal,     setEmptyModal]     = useState(false)
  const [leaveModal,     setLeaveModal]     = useState(false)

  const handleBack = () => {
    const title   = logTitleRef.current?.value?.trim() ?? ''
    const content = logContentRef.current?.value?.trim() ?? ''
    if (title || content) {
      setLeaveModal(true)
    } else {
      navigate(-1)
    }
  }
  const [activeTab, setActiveTab]         = useState('log')
  const [logTag, setLogTag]               = useState(null)
  const logTitleRef   = useRef('')
  const logContentRef = useRef('')
  const [heroImgSrc, setHeroImgSrc]       = useState('/images/log_hero_img.svg')
  const [heroCap, setHeroCap]             = useState('탭하여 오늘의 항해 순간을 담아보세요')
  const [heroCapVisible, setHeroCapVisible] = useState(true)
  const [fileName, setFileName]           = useState('파일을 선택해주세요')
  const [reminderActive, setReminderActive] = useState(true)

  /* ── 캘린더 ── */
  const today = new Date()
  const [calOpen, setCalOpen]       = useState(false)
  const [calTarget, setCalTarget]   = useState(null) // 'log' | 'start' | 'end'
  const [calYear, setCalYear]       = useState(today.getFullYear())
  const [calMonth, setCalMonth]     = useState(today.getMonth())
  const [calPos, setCalPos]         = useState({ top: 0, left: 0 })
  const [logDate, setLogDate]       = useState(formatDate(today.getFullYear(), today.getMonth(), today.getDate()))
  const [startDate, setStartDate]   = useState('시작일 선택')
  const [endDate, setEndDate]       = useState('종료일 선택')

  /* ── 드럼 피커 ── */
  const [timeOpen, setTimeOpen]     = useState(false)
  const [timePos, setTimePos]       = useState({ top: 0, left: 0 })
  const [ampmIdx, setAmpmIdx]       = useState(0)
  const [hourIdx, setHourIdx]       = useState(8)  // 09시
  const [minIdx, setMinIdx]         = useState(0)  // 00분
  const timeDisplay = `${AMPM[ampmIdx]} ${HOURS[hourIdx]}:${MINS[minIdx]}`

  const heroFileRef    = useRef(null)
  const projectFileRef = useRef(null)

  const cfg = TAB_CONFIG[activeTab]

  /* ── 탭 전환 ── */
  const handleTabSelect = (type) => {
    setActiveTab(type)
    const c = TAB_CONFIG[type]
    setHeroImgSrc(c.heroImg)
    setHeroCap(c.heroCap)
    setHeroCapVisible(true)
    setReminderActive(true)
    setStartDate('시작일 선택')
    setEndDate('종료일 선택')
    setCalOpen(false)
    setTimeOpen(false)
  }

  /* ── 히어로 업로드 ── */
  const handleHeroUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setHeroImgSrc(URL.createObjectURL(file))
    setHeroCapVisible(false)
  }

  const handleProjectFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
  }

  /* ── 캘린더 열기 ── */
  const openCal = (target, anchorRef) => {
    if (calOpen && calTarget === target) { setCalOpen(false); return }
    setCalTarget(target)
    const rect = anchorRef.current?.getBoundingClientRect() || { bottom: 0, top: 0, left: 0 }
    let top = rect.bottom + 8
    let left = rect.left
    if (left + 276 > window.innerWidth) left = window.innerWidth - 284
    if (top + 280 > window.innerHeight) top = rect.top - 290
    setCalPos({ top, left })
    setCalYear(today.getFullYear())
    setCalMonth(today.getMonth())
    setCalOpen(true)
  }

  const selectDay = (d) => {
    const formatted = formatDate(calYear, calMonth, d)
    if (calTarget === 'log')   setLogDate(formatted)
    if (calTarget === 'start') setStartDate(formatted)
    if (calTarget === 'end')   setEndDate(formatted)
    setCalOpen(false)
  }

  const moveCal = (dir) => {
    let m = calMonth + dir, y = calYear
    if (m > 11) { m = 0; y++ }
    if (m < 0)  { m = 11; y-- }
    setCalMonth(m); setCalYear(y)
  }

  const renderCalDays = () => {
    const firstDay    = new Date(calYear, calMonth, 1).getDay()
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
    const cells = []

    // 현재 선택된 날짜 파악
    const currentVal = calTarget === 'log' ? logDate : calTarget === 'start' ? startDate : endDate
    const isPickerSelected = currentVal && currentVal !== '시작일 선택' && currentVal !== '종료일 선택'
    const selectedD = isPickerSelected ? parseInt(currentVal.split('. ')[2]) : null
    const selectedMatchesMonth = isPickerSelected && parseInt(currentVal.split('. ')[0]) === calYear && parseInt(currentVal.split('. ')[1]) - 1 === calMonth

    // 종료일 선택 시 시작일 이전 날짜 비활성화
    let minDate = null
    if (calTarget === 'end' && startDate !== '시작일 선택') {
      const parts = startDate.split('. ')
      minDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
    }

    for (let i = 0; i < firstDay; i++)
      cells.push(<span key={`e${i}`} className="write-cal-day write-cal-day--disabled" />)
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = selectedMatchesMonth && selectedD === d
      const thisDate = new Date(calYear, calMonth, d)
      const isBeforeMin = minDate && thisDate < minDate
      cells.push(
        <span
          key={d}
          className={`write-cal-day${isSelected ? ' write-cal-day--selected' : ''}${isBeforeMin ? ' write-cal-day--disabled' : ''}`}
          onClick={isBeforeMin ? undefined : () => selectDay(d)}
        >{d}</span>
      )
    }
    return cells
  }

  /* ── 드럼 피커 열기 ── */
  const timeRowRef = useRef(null)
  const openTime = () => {
    if (timeOpen) { setTimeOpen(false); return }
    const rect = timeRowRef.current?.getBoundingClientRect() || { top: 0, left: 0, bottom: 0 }
    const popupH = 168  // drum(108) + confirm(44) + padding
    let top = rect.top - popupH - 8
    if (top < 8) top = rect.bottom + 8
    let left = rect.left
    if (left + 280 > window.innerWidth) left = window.innerWidth - 288
    setTimePos({ top, left })
    setTimeOpen(true)
  }

  /* ── 바깥 클릭 시 닫기 ── */
  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest('.cal-popup-wrap') && !e.target.closest('.date-box'))
        setCalOpen(false)
      if (!e.target.closest('.time-popup-wrap') && !e.target.closest('.reminder-time-row'))
        setTimeOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  /* ── ref for date boxes ── */
  const logDateRef   = useRef(null)
  const startDateRef = useRef(null)
  const endDateRef   = useRef(null)

  return (
    <>
      <input type="file" accept="image/*" ref={heroFileRef} style={{ display:'none' }} onChange={handleHeroUpload} />
      <input type="file" ref={projectFileRef} style={{ display:'none' }} onChange={handleProjectFile} />

      <div className="screen">
        <div className="scroll-area">
          <div className="log-container">

            <header className="log-header">
              <div className="log-title">새로운 항로 등록</div>
              <button className="log-close" onClick={handleBack}>
                <img src="/images/log_btn_close.svg" alt="닫기" />
              </button>
            </header>

            <div className="log-write-contents">

              {/* 히어로 썸네일 */}
              <div className="log-hero-section">
                <div className="hero-illustration" onClick={() => heroFileRef.current?.click()}>
                  <img src={heroImgSrc} alt="" id="hero-img" />
                  <div className="hero-upload-overlay">
                    <span className="hero-upload-label">사진 변경</span>
                  </div>
                  {heroCapVisible && <span className="hero-caption">{heroCap}</span>}
                </div>
              </div>

              {/* 항로 유형 선택 */}
              <div className="section-resource">
                <div className="section-label">어떤 형태의 항로인가요?</div>
                <div className="resource-tabs">
                  {TAB_LABELS.map(([label, type]) => (
                    <div
                      key={type}
                      className={`resource-tab${activeTab === type ? ' resource-tab--active' : ''}`}
                      onClick={() => handleTabSelect(type)}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* 날짜 선택 (로그 탭) */}
              {cfg.showLogDate && (
                <div className="section-log-date">
                  <div className="section-label">날짜</div>
                  <div className="date-box date-box--full" ref={logDateRef} onClick={() => openCal('log', logDateRef)}>
                    <span className="date-text">{logDate}</span>
                    <img src="/images/log_calendar.svg" alt="" className="calendar-icon" />
                  </div>
                </div>
              )}

              {/* 기본 정보 입력 */}
              <div className="section-inputs">
                {cfg.showLink && (
                  <div className="input-group">
                    <label className="input-label">{cfg.linkLabel || '링크 (선택)'}</label>
                    <div className="input-box">
                      <input type="url" placeholder="URL을 붙여넣으면 제목이 자동 입력돼요" />
                    </div>
                  </div>
                )}
                {cfg.showFile && (
                  <div className="input-group">
                    <label className="input-label">파일 업로드 (선택)</label>
                    <div className="input-box input-box--file" onClick={() => projectFileRef.current?.click()}>
                      <span className="file-name-text">{fileName}</span>
                      <img src="/images/log_write_upload.svg" alt="" className="file-icon" />
                    </div>
                  </div>
                )}
                {/* 로그 탭 태그 선택 */}
                {activeTab === 'log' && (
                  <div className="log-tag-row">
                    {['인강', '도서', '매거진', '프로젝트'].map(tag => (
                      <button
                        key={tag}
                        className={`log-tag-chip${logTag === tag ? ' log-tag-chip--active' : ''}`}
                        onClick={() => setLogTag(prev => prev === tag ? null : tag)}
                        data-tag={tag}
                        type="button"
                      >{tag}</button>
                    ))}
                  </div>
                )}
                <div className="input-group">
                  <label className="input-label">{cfg.titleLabel}</label>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder={cfg.titlePH}
                      ref={logTitleRef}
                      defaultValue={editItem?.title ?? ''}
                    />
                  </div>
                </div>
              </div>

              {/* 설명 입력 */}
              <div className="section-inputs">
                <div className="input-group">
                  <label className="input-label">간단한 설명 (선택)</label>
                  <div className="input-box input-box--textarea">
                    <textarea
                      placeholder={cfg.descPH}
                      rows={3}
                      ref={logContentRef}
                      defaultValue={editItem?.content ?? ''}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* 기간 설정 */}
              {cfg.showDur && (
                <div className="section-duration">
                  <div className="section-label">목표 기간을 설정해 주세요</div>
                  <div className="date-row">
                    <div className="date-box" ref={startDateRef} onClick={() => openCal('start', startDateRef)}>
                      <span className={`date-text${startDate === '시작일 선택' ? ' date-placeholder' : ''}`}>{startDate}</span>
                      <img src="/images/log_calendar.svg" alt="" className="calendar-icon" />
                    </div>
                    <span className="date-sep">~</span>
                    <div className="date-box" ref={endDateRef} onClick={() => openCal('end', endDateRef)}>
                      <span className={`date-text${endDate === '종료일 선택' ? ' date-placeholder' : ''}`}>{endDate}</span>
                      <img src="/images/log_calendar.svg" alt="" className="calendar-icon" />
                    </div>
                  </div>
                </div>
              )}

              {/* 리마인더 */}
              {cfg.showReminder && (
                <div className="section-reminder" data-active={reminderActive ? 'true' : 'false'}>
                  <div className="reminder-row">
                    <span className="reminder-text">매일 지정된 시간에 리마인드 받기</span>
                    <div
                      className={`toggle-switch${reminderActive ? ' toggle-switch--active' : ''}`}
                      onClick={() => setReminderActive(prev => !prev)}
                    ></div>
                  </div>
                  {reminderActive && (
                    <div className="reminder-time-row" ref={timeRowRef} onClick={openTime}>
                      <span className="reminder-time-label">알림 시간</span>
                      <span className="reminder-time-display">{timeDisplay}</span>
                    </div>
                  )}
                </div>
              )}

              {/* 제출 버튼 — 로그 탭만 활성화 */}
              <button
                className="submit-btn"
                onClick={() => {
                  if (activeTab !== 'log') return
                  const title   = logTitleRef.current?.value?.trim() ?? ''
                  const content = logContentRef.current?.value?.trim() ?? ''
                  if (!title && !content) {
                    setEmptyModal(true)
                    return
                  }
                  if (editItem?.key && localStorage.getItem(editItem.key) === 'true') {
                    localStorage.setItem(editItem.key + '_title', title)
                    localStorage.setItem(editItem.key + '_text', content)
                  } else {
                    const key = `route_saved_log_${Date.now()}`
                    localStorage.setItem(key, 'true')
                    localStorage.setItem(key + '_date', logDate.replace(/\. /g, '-').replace('.', ''))
                    localStorage.setItem(key + '_title', title)
                    localStorage.setItem(key + '_type', logTag || '로그')
                    localStorage.setItem(key + '_text', content)
                    localStorage.setItem(key + '_href', '')
                    localStorage.setItem(key + '_source', 'log')
                  }
                  setToastVisible(true)
                  setTimeout(() => { setToastVisible(false); navigate('/log') }, 1500)
                }}
                disabled={activeTab !== 'log'}
                data-hint={activeTab === 'log' ? 'true' : 'false'}
                style={{ opacity: activeTab !== 'log' ? 0.4 : 1, cursor: activeTab !== 'log' ? 'not-allowed' : 'pointer' }}
              >추가하기</button>

            </div>
          </div>
        </div>
      </div>

      {/* ── 캘린더 팝업 ── */}
      {calOpen && (
        <div
          className="cal-popup-wrap"
          style={{ position:'fixed', top: calPos.top, left: calPos.left, zIndex: 400 }}
        >
          <div className="write-cal-header">
            <button className="write-cal-nav" onClick={() => moveCal(-1)}>‹</button>
            <span className="write-cal-title">{calYear}년 {calMonth + 1}월</span>
            <button className="write-cal-nav" onClick={() => moveCal(1)}>›</button>
          </div>
          <div className="write-cal-days">
            {DAYS.map(d => <span key={d}>{d}</span>)}
          </div>
          <div className="write-cal-grid">
            {renderCalDays()}
          </div>
        </div>
      )}

      {/* ── 드럼 피커 팝업 ── */}
      {timeOpen && (
        <div
          className="time-popup-wrap"
          style={{ position:'fixed', top: timePos.top, left: timePos.left, zIndex: 400 }}
        >
          <div className="drum-wrapper">
            <div className="drum-fade-top" />
            <div className="drum-fade-bottom" />
            <div className="drum-line drum-line--top"><span/><span/><span/></div>
            <div className="drum-line drum-line--bottom"><span/><span/><span/></div>
            <DrumCol items={AMPM}  selectedIndex={ampmIdx} onChange={setAmpmIdx} />
            <DrumCol items={HOURS} selectedIndex={hourIdx} onChange={setHourIdx} />
            <DrumCol items={MINS}  selectedIndex={minIdx}  onChange={setMinIdx}  />
          </div>
          <button className="drum-confirm" onClick={() => setTimeOpen(false)}>확인</button>
        </div>
      )}

      {/* 저장 토스트 */}
      <div className={`bookmark-toast${toastVisible ? '' : ' is-hidden'}`}>
        <span className="toast-text">로그가 저장되었습니다</span>
      </div>

      {/* 나가기 확인 모달 */}
      {leaveModal && (
        <div className="modal-overlay is-open" onClick={() => setLeaveModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <p className="dm-modal-title">작성 중인 내용이 있어요.<br/>나가시겠습니까?</p>
            <div className="modal-btns">
              <button className="modal-btn modal-btn--gray" onClick={() => setLeaveModal(false)}>취소</button>
              <button className="modal-btn modal-btn--charcoal" onClick={() => navigate(-1)}>나가기</button>
            </div>
          </div>
        </div>
      )}

      {/* 빈 내용 경고 모달 */}
      {emptyModal && (
        <div className="modal-overlay is-open" onClick={() => setEmptyModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <p className="dm-modal-title">내용을 입력해주세요</p>
            <div className="modal-btns">
              <button className="modal-btn modal-btn--charcoal" onClick={() => setEmptyModal(false)}>확인</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
