import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/log_write.css'

type TabType = 'log' | 'lecture' | 'book' | 'project'

interface TabConfig {
  titleLabel: string
  titlePH: string
  descPH: string
  heroCap: string
  heroImg: string
  linkLabel?: string
  showLink: boolean
  showFile: boolean
  showLogDate: boolean
  showDur: boolean
  showReminder: boolean
}

const TAB_CONFIG: Record<TabType, TabConfig> = {
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

const TAB_LABELS: [string, TabType][] = [
  ['로그', 'log'],
  ['인강/강의', 'lecture'],
  ['도서/아티클', 'book'],
  ['프로젝트', 'project'],
]

export default function LogWritePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('log')
  const [heroImgSrc, setHeroImgSrc] = useState('/images/log_hero_img.svg')
  const [heroCap, setHeroCap] = useState('탭하여 오늘의 항해 순간을 담아보세요')
  const [heroCapVisible, setHeroCapVisible] = useState(true)
  const [fileName, setFileName] = useState('파일을 선택해주세요')
  const [reminderActive, setReminderActive] = useState(true)
  const [reminderTime] = useState('오전 9:00')
  const heroFileRef = useRef<HTMLInputElement>(null)
  const projectFileRef = useRef<HTMLInputElement>(null)

  const cfg = TAB_CONFIG[activeTab]

  const handleTabSelect = (type: TabType) => {
    setActiveTab(type)
    const c = TAB_CONFIG[type]
    setHeroImgSrc(c.heroImg)
    setHeroCap(c.heroCap)
    setHeroCapVisible(true)
    setReminderActive(true)
  }

  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setHeroImgSrc(URL.createObjectURL(file))
    setHeroCapVisible(false)
  }

  const handleProjectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={heroFileRef}
        style={{ display: 'none' }}
        onChange={handleHeroUpload}
      />
      <input
        type="file"
        ref={projectFileRef}
        style={{ display: 'none' }}
        onChange={handleProjectFile}
      />

      <div className="screen">
        <div className="scroll-area">
          <div className="log-container">

            <header className="log-header">
              <div className="log-title">새로운 항로 등록</div>
              <button className="log-close" onClick={() => navigate(-1)}>
                <img src="/images/log_btn_close.svg" alt="닫기" />
              </button>
            </header>

            <div className="log-contents">

              {/* 히어로 썸네일 */}
              <div className="hero-section">
                <div className="hero-illustration" onClick={() => heroFileRef.current?.click()}>
                  <img src={heroImgSrc} alt="" id="hero-img" />
                  <div className="hero-upload-overlay">
                    <span className="hero-upload-label">사진 변경</span>
                  </div>
                  {heroCapVisible && (
                    <span className="hero-caption">{heroCap}</span>
                  )}
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
                  <div className="date-box date-box--full">
                    <span className="date-text">
                      {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </span>
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
                      <img src="/images/log_calendar.svg" alt="" className="file-icon" />
                    </div>
                  </div>
                )}
                <div className="input-group">
                  <label className="input-label">{cfg.titleLabel}</label>
                  <div className="input-box">
                    <input type="text" placeholder={cfg.titlePH} />
                  </div>
                </div>
              </div>

              {/* 설명 입력 */}
              <div className="section-inputs">
                <div className="input-group">
                  <label className="input-label">간단한 설명 (선택)</label>
                  <div className="input-box input-box--textarea">
                    <textarea placeholder={cfg.descPH} rows={3}></textarea>
                  </div>
                </div>
              </div>

              {/* 기간 설정 */}
              {cfg.showDur && (
                <div className="section-duration">
                  <div className="section-label">목표 기간을 설정해 주세요</div>
                  <div className="date-row">
                    <div className="date-box">
                      <span className="date-text date-placeholder">시작일 선택</span>
                      <img src="/images/log_calendar.svg" alt="" className="calendar-icon" />
                    </div>
                    <span className="date-sep">~</span>
                    <div className="date-box">
                      <span className="date-text date-placeholder">종료일 선택</span>
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
                    <div className="reminder-time-row">
                      <span className="reminder-time-label">알림 시간</span>
                      <span className="reminder-time-display">{reminderTime}</span>
                    </div>
                  )}
                </div>
              )}

              {/* 제출 버튼 */}
              <button className="submit-btn" onClick={() => navigate('/log')}>계획 추가하기</button>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
