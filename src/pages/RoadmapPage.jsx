import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/common.css'
import '../styles/roadmap.css'

const FILTER_CONFIG = {
  '인강': {
    color: '#D4A853',
    items: [
      { title: '왕초보를위한 피그마기초입문', week: 'W01', iconType: 'done', statusLabel: '완료', statusClass: 'roadmap-tag--gold' },
      { title: '일러스트레이터보다 100배 쉬운 캐릭터디자인', week: 'W02', iconType: 'done', statusLabel: '완료', statusClass: 'roadmap-tag--gold' },
      { title: '3분이면 완성 피그마 아이콘 제작', week: 'W03', iconType: 'done', statusLabel: '완료', statusClass: 'roadmap-tag--gold' },
      { title: '오토레이아웃 활용 카드디자인', week: 'W04', iconType: 'active', statusLabel: '진행 중', statusClass: 'roadmap-tag--in-progress' },
      { title: '작업시간 500프로 단축 디자인시스템', week: 'W05', iconType: 'inactive', statusLabel: '예정', statusClass: 'roadmap-tag--plan' },
      { title: '시간 단축과 재사용의 끝판왕 컴포넌트와 베리언트', week: 'W06', iconType: 'inactive', statusLabel: '예정', statusClass: 'roadmap-tag--plan' },
      { title: 'Mobile UI디자인과 오토 레이아웃 실전!', week: 'W07', iconType: 'inactive', statusLabel: '예정', statusClass: 'roadmap-tag--plan' },
      { title: '코딩없이 인터랙티브 끝장내는 프로토타입제작', week: 'W08', iconType: 'inactive', statusLabel: '예정', statusClass: 'roadmap-tag--plan' },
      { title: '트렌드완성! 글래스모피즘 UI', week: 'W09', iconType: 'inactive', statusLabel: '예정', statusClass: 'roadmap-tag--plan' },
      { title: '디자이너 필수 플러그인 Top10 사용법', week: 'W10', iconType: 'inactive', statusLabel: '예정', statusClass: 'roadmap-tag--plan' },
      { title: 'UIUX디자이너 매출 1000억 기업 취업 포트폴리오', week: 'W11', iconType: 'inactive', statusLabel: '예정', statusClass: 'roadmap-tag--plan' },
      { title: 'UIUX디자이너 에이전시 합격 포트폴리오 (당근마켓앱 팀프로젝트 리뉴얼)', week: 'W12', iconType: 'inactive', statusLabel: '예정', statusClass: 'roadmap-tag--plan' },
    ]
  },
  '도서': {
    color: '#47B5A7',
    items: [
      { title: 'UX 심리학', week: 'W01', iconType: 'done', statusLabel: '완료', statusClass: 'roadmap-tag--gold' },
      { title: '린 UX', week: 'W02', iconType: 'done', statusLabel: '완료', statusClass: 'roadmap-tag--gold' },
      { title: '린 스타트업', week: 'W03', iconType: 'unfinished', statusLabel: '미완료', statusClass: 'roadmap-tag--unfinished' },
      { title: '인터랙션 디자인', week: 'W04', iconType: 'inactive', statusLabel: '예정', statusClass: 'roadmap-tag--plan' },
      { title: '포트폴리오 전략', week: 'W06', iconType: 'inactive', statusLabel: '예정', statusClass: 'roadmap-tag--plan' },
    ]
  },
  '매거진': {
    color: '#D4849A',
    items: [
      { title: '디자인 트렌드', week: 'W01', iconType: 'done-sage', statusLabel: '선취득', statusClass: 'roadmap-tag--sage' },
      { title: 'UX 케이스 스터디', week: 'W05', iconType: 'done-sage', statusLabel: '선취득', statusClass: 'roadmap-tag--sage' },
    ]
  },
  '프로젝트': {
    color: '#9E90BC',
    items: [
      { title: '포트폴리오 리뉴얼 - 앱 기획', week: 'W03', iconType: 'done', statusLabel: '완료', statusClass: 'roadmap-tag--gold' },
      { title: '시장 분석 리포트', week: 'W04', iconType: 'inactive', statusLabel: '예정', statusClass: 'roadmap-tag--plan' },
    ]
  }
}

const CHIPS = ['전체', '인강', '도서', '매거진', '프로젝트']

function getIconEl(iconType) {
  if (iconType === 'unfinished') {
    return <div className="item-icon item-icon--unfinished"></div>
  }
  const iconMap = {
    done:      '/images/roadmap_icon_done.svg',
    'done-sage': '/images/roadmap_icon_done_sage.svg',
    active:    '/images/roadmap_icon_active.svg',
    inactive:  '/images/roadmap_icon_inactive.svg',
  }
  return <img src={iconMap[iconType]} className="item-icon" alt="" />
}

export default function RoadmapPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('전체')
  const [openCards, setOpenCards] = useState({})

  const toggleCard = (id) => {
    setOpenCards(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const filterConfig = activeFilter !== '전체' ? FILTER_CONFIG[activeFilter] : null

  const getFilterStats = (config) => {
    const total = config.items.length
    const doneCount = config.items.filter(i => i.iconType === 'done' || i.iconType === 'done-sage').length
    const pct = Math.round(doneCount / total * 100)
    const inProgress = config.items.filter(i => i.iconType === 'active').length
    const unfinished = config.items.filter(i => i.iconType === 'unfinished').length
    const planned = config.items.filter(i => i.iconType === 'inactive').length
    let stats = `완료 ${doneCount}`
    if (inProgress) stats += ` · 진행 중 ${inProgress}`
    if (unfinished) stats += ` · 미완료 ${unfinished}`
    if (planned) stats += ` · 예정 ${planned}`
    return { pct, stats }
  }

  return (
    <div className="screen">
      <div className="scroll-area">
        <main className="roadmap-main">

          <header className="header">
            <div className="header-title">마스터 플랜 아키텍처</div>
          </header>

          <div className="contents">

            {/* 필터 칩 */}
            <div className="chips">
              {CHIPS.map(label => (
                <div
                  key={label}
                  className={`rm-chip${activeFilter === label ? ' rm-chip--active' : ''}`}
                  style={activeFilter === label && filterConfig ? {
                    background: filterConfig.color,
                    borderColor: filterConfig.color,
                    color: '#fff',
                  } : {}}
                  onClick={() => setActiveFilter(label)}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* 상태 바 */}
            <div className="rm-status-bar">
              <div className="status-top">
                <div className="status-pill">
                  <img src="/images/roadmap_dot.svg" alt="" className="pill-dot" />
                  <span className="pill-text">WEEK 4 / 12 진행 중</span>
                </div>
                <span className="status-subtitle">김루트님의 커리어 전환 항로</span>
              </div>
              <div className="status-bottom">
                <div className="status-progress-track">
                  <div className="status-progress-fill"></div>
                </div>
                <span className="status-pct">33%</span>
              </div>
            </div>

            {/* 필터 뷰 */}
            {filterConfig && (() => {
              const { pct, stats } = getFilterStats(filterConfig)
              return (
                <div className="filter-view">
                  <div className="filter-summary-card">
                    <div className="filter-summary-row">
                      <span className="filter-summary-label">{activeFilter}</span>
                      <span className="filter-summary-stats">{stats}</span>
                    </div>
                    <div className="filter-progress-track">
                      <div className="filter-progress-fill" style={{ width: `${pct}%`, background: filterConfig.color }}></div>
                    </div>
                  </div>
                  <div className="filter-list-card">
                    {filterConfig.items.map((item, i) => (
                      <div className="filter-item" key={i}>
                        {getIconEl(item.iconType)}
                        <span className="filter-item-title">{item.title}</span>
                        <span className="filter-week-badge">{item.week}</span>
                        <span className={`roadmap-tag ${item.statusClass}`}>{item.statusLabel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}

            {/* 타임라인 */}
            {activeFilter === '전체' && (
              <div className="roadmap-timeline">

                {/* WEEK 01 — DONE */}
                <div className={`roadmap-card ${openCards['w01'] ? 'roadmap-card--done-open' : 'roadmap-card--done-closed'}`}>
                  {!openCards['w01'] && (
                    <div className="card-head-row done-closed-header" onClick={() => toggleCard('w01')}>
                      <div className="card-head-left">
                        <span className="week-lbl week-lbl--gray">WEEK 01</span>
                        <div className="week-dots">
                          <span className="week-dot week-dot--gold"></span>
                          <span className="week-dot week-dot--mint"></span>
                          <span className="week-dot week-dot--blue"></span>
                        </div>
                      </div>
                      <div className="card-head-right">
                        <span className="badge-done">DONE</span>
                        <span className="chevron chevron--down"></span>
                      </div>
                    </div>
                  )}
                  {openCards['w01'] && (
                    <div className="done-open-content">
                      <div className="card-head card-head--divider" onClick={() => toggleCard('w01')}>
                        <span className="week-lbl week-lbl--dark">WEEK 01</span>
                        <div className="card-head-right">
                          <span className="badge-done">DONE</span>
                          <span className="chevron chevron--up"></span>
                        </div>
                      </div>
                      <div className="card-items">
                        <div className="card-item">
                          <img src="/images/roadmap_icon_done.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <span className="item-title">피그마 기초</span>
                            <div className="item-tags"><span className="roadmap-tag roadmap-tag--gold">인강</span></div>
                          </div>
                        </div>
                        <div className="card-item">
                          <img src="/images/roadmap_icon_done.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <span className="item-title">UX 심리학</span>
                            <div className="item-tags"><span className="roadmap-tag roadmap-tag--mint">도서</span></div>
                          </div>
                        </div>
                        <div className="card-item">
                          <img src="/images/roadmap_icon_done_sage.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <span className="item-title">디자인 트렌드</span>
                            <div className="item-tags">
                              <span className="roadmap-tag roadmap-tag--blue">매거진</span>
                              <span className="roadmap-tag roadmap-tag--sage">선취득</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* WEEK 02 — DONE */}
                <div className={`roadmap-card ${openCards['w02'] ? 'roadmap-card--done-open' : 'roadmap-card--done-closed'}`}>
                  {!openCards['w02'] && (
                    <div className="card-head-row done-closed-header" onClick={() => toggleCard('w02')}>
                      <div className="card-head-left">
                        <span className="week-lbl week-lbl--gray">WEEK 02</span>
                        <div className="week-dots">
                          <span className="week-dot week-dot--gold"></span>
                          <span className="week-dot week-dot--mint"></span>
                        </div>
                      </div>
                      <div className="card-head-right">
                        <span className="badge-done">DONE</span>
                        <span className="chevron chevron--down"></span>
                      </div>
                    </div>
                  )}
                  {openCards['w02'] && (
                    <div className="done-open-content">
                      <div className="card-head card-head--divider" onClick={() => toggleCard('w02')}>
                        <span className="week-lbl week-lbl--dark">WEEK 02</span>
                        <div className="card-head-right">
                          <span className="badge-done">DONE</span>
                          <span className="chevron chevron--up"></span>
                        </div>
                      </div>
                      <div className="card-items">
                        <div className="card-item">
                          <img src="/images/roadmap_icon_done.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <span className="item-title">리액트 기초</span>
                            <div className="item-tags"><span className="roadmap-tag roadmap-tag--gold">인강</span></div>
                          </div>
                        </div>
                        <div className="card-item">
                          <img src="/images/roadmap_icon_done.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <span className="item-title">린 UX</span>
                            <div className="item-tags"><span className="roadmap-tag roadmap-tag--mint">도서</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* WEEK 03 — DONE */}
                <div className={`roadmap-card ${openCards['w03'] ? 'roadmap-card--done-open' : 'roadmap-card--done-closed'}`}>
                  {!openCards['w03'] && (
                    <div className="card-head-row done-closed-header" onClick={() => toggleCard('w03')}>
                      <div className="card-head-left">
                        <span className="week-lbl week-lbl--gray">WEEK 03</span>
                        <div className="week-dots">
                          <span className="week-dot week-dot--lavender"></span>
                          <span className="week-dot week-dot--gold"></span>
                          <span className="week-dot week-dot--mint"></span>
                        </div>
                      </div>
                      <div className="card-head-right">
                        <span className="badge-done">DONE</span>
                        <span className="chevron chevron--down"></span>
                      </div>
                    </div>
                  )}
                  {openCards['w03'] && (
                    <div className="done-open-content">
                      <div className="card-head card-head--divider" onClick={() => toggleCard('w03')}>
                        <span className="week-lbl week-lbl--dark">WEEK 03</span>
                        <div className="card-head-right">
                          <span className="badge-done">DONE</span>
                          <span className="chevron chevron--up"></span>
                        </div>
                      </div>
                      <div className="card-items">
                        <div className="card-item">
                          <img src="/images/roadmap_icon_done.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <div className="item-title-row">
                              <span className="item-title">포트폴리오 리뉴얼 - 앱 기획</span>
                              <Link to="/feedback" className="feedback-btn">피드백 보기</Link>
                            </div>
                            <div className="item-tags"><span className="roadmap-tag roadmap-tag--lavender">프로젝트</span></div>
                          </div>
                        </div>
                        <div className="card-item">
                          <img src="/images/roadmap_icon_done.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <span className="item-title">CSS 고급</span>
                            <div className="item-tags"><span className="roadmap-tag roadmap-tag--gold">인강</span></div>
                          </div>
                        </div>
                        <div className="card-item">
                          <div className="item-icon--unfinished"></div>
                          <div className="item-body">
                            <span className="item-title">린 스타트업</span>
                            <div className="item-tags">
                              <span className="roadmap-tag roadmap-tag--mint">도서</span>
                              <span className="roadmap-tag roadmap-tag--unfinished">미완료</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* WEEK 04 — ACTIVE */}
                <div className={`roadmap-card ${openCards['w04'] === false ? 'roadmap-card--active-closed' : 'roadmap-card--active-open'}`}>
                  {openCards['w04'] === false && (
                    <div className="card-head-row done-closed-header" onClick={() => toggleCard('w04')}>
                      <div className="card-head-left">
                        <span className="week-lbl week-lbl--orange">WEEK 04</span>
                        <div className="week-dots">
                          <span className="week-dot week-dot--orange"></span>
                          <span className="week-dot week-dot--gray"></span>
                          <span className="week-dot week-dot--gray"></span>
                        </div>
                      </div>
                      <div className="card-head-right">
                        <span className="badge-active">ACTIVE</span>
                        <span className="chevron chevron--down"></span>
                      </div>
                    </div>
                  )}
                  {openCards['w04'] !== false && (
                    <div className="done-open-content">
                      <div className="card-head card-head--orange-divider" onClick={() => toggleCard('w04')}>
                        <div className="active-week-group">
                          <div className="active-week-col">
                            <span className="week-lbl week-lbl--orange">WEEK 04</span>
                            <span className="you-are-here">YOU ARE HERE</span>
                          </div>
                          <div className="card-head-right">
                            <span className="badge-active">ACTIVE</span>
                            <span className="chevron chevron--up"></span>
                          </div>
                        </div>
                      </div>
                      <div className="card-items" onClick={() => navigate('/mission')} style={{ cursor: 'pointer' }} data-hint="true">
                        <div className="card-item">
                          <img src="/images/roadmap_icon_active.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <span className="item-title item-title--bold">HTML/CSS 구조</span>
                            <div className="item-tags">
                              <span className="roadmap-tag roadmap-tag--gold">인강</span>
                              <span className="roadmap-tag roadmap-tag--in-progress">진행 중</span>
                            </div>
                          </div>
                        </div>
                        <div className="card-item">
                          <img src="/images/roadmap_icon_inactive.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <span className="item-title item-title--muted">인터랙션 디자인</span>
                            <div className="item-tags">
                              <span className="roadmap-tag roadmap-tag--mint">도서</span>
                              <span className="roadmap-tag roadmap-tag--plan">예정</span>
                            </div>
                          </div>
                        </div>
                        <div className="card-item">
                          <img src="/images/roadmap_icon_inactive.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <span className="item-title item-title--muted">시장 분석 리포트</span>
                            <div className="item-tags">
                              <span className="roadmap-tag roadmap-tag--lavender">프로젝트</span>
                              <span className="roadmap-tag roadmap-tag--plan">예정</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* WEEK 05 — PLAN */}
                <div className={`roadmap-card ${openCards['w05'] ? 'roadmap-card--plan-open' : 'roadmap-card--plan-closed'}`}>
                  {!openCards['w05'] && (
                    <div className="card-head-row done-closed-header" onClick={() => toggleCard('w05')}>
                      <div className="card-head-left">
                        <span className="week-lbl week-lbl--light">WEEK 05</span>
                        <div className="week-dots">
                          <span className="week-dot week-dot--gray"></span>
                          <span className="week-dot week-dot--blue"></span>
                        </div>
                      </div>
                      <div className="card-head-right">
                        <span className="badge-plan">PLAN</span>
                        <span className="chevron chevron--down"></span>
                      </div>
                    </div>
                  )}
                  {openCards['w05'] && (
                    <div className="done-open-content">
                      <div className="card-head card-head--plan-divider" onClick={() => toggleCard('w05')}>
                        <span className="week-lbl week-lbl--light">WEEK 05</span>
                        <div className="card-head-right">
                          <span className="badge-plan">PLAN</span>
                          <span className="chevron chevron--up"></span>
                        </div>
                      </div>
                      <div className="card-items">
                        <div className="card-item">
                          <img src="/images/roadmap_icon_inactive.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <span className="item-title item-title--muted">리액트 컴포넌트</span>
                            <div className="item-tags">
                              <span className="roadmap-tag roadmap-tag--gold">인강</span>
                              <span className="roadmap-tag roadmap-tag--plan">예정</span>
                            </div>
                          </div>
                        </div>
                        <div className="card-item">
                          <img src="/images/roadmap_icon_done_sage.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <span className="item-title item-title--muted">UX 케이스 스터디</span>
                            <div className="item-tags">
                              <span className="roadmap-tag roadmap-tag--blue">매거진</span>
                              <span className="roadmap-tag roadmap-tag--sage">선취득</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* WEEK 06 — PLAN DIM */}
                <div className={`roadmap-card roadmap-card--plan-dim ${openCards['w06'] ? 'roadmap-card--plan-open' : 'roadmap-card--plan-closed'}`}>
                  {!openCards['w06'] && (
                    <div className="card-head-row done-closed-header" onClick={() => toggleCard('w06')}>
                      <div className="card-head-left">
                        <span className="week-lbl week-lbl--lighter">WEEK 06</span>
                        <div className="week-dots">
                          <span className="week-dot week-dot--gray"></span>
                        </div>
                      </div>
                      <div className="card-head-right">
                        <span className="badge-plan badge-plan--dim">PLAN</span>
                        <span className="chevron chevron--down"></span>
                      </div>
                    </div>
                  )}
                  {openCards['w06'] && (
                    <div className="done-open-content">
                      <div className="card-head card-head--plan-divider" onClick={() => toggleCard('w06')}>
                        <span className="week-lbl week-lbl--lighter">WEEK 06</span>
                        <div className="card-head-right">
                          <span className="badge-plan badge-plan--dim">PLAN</span>
                          <span className="chevron chevron--up"></span>
                        </div>
                      </div>
                      <div className="card-items">
                        <div className="card-item">
                          <img src="/images/roadmap_icon_inactive.svg" alt="" className="item-icon" />
                          <div className="item-body">
                            <span className="item-title item-title--muted">포트폴리오 전략</span>
                            <div className="item-tags">
                              <span className="roadmap-tag roadmap-tag--mint">도서</span>
                              <span className="roadmap-tag roadmap-tag--plan">예정</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 남은 기간 */}
                <div className="weeks-remaining">
                  <div className="remaining-card">
                    <div className="remaining-text-group">
                      <span className="remaining-until">UNTIL WEEK 12</span>
                      <span className="remaining-sub">8주 남음 · 미션 계획 대기 중</span>
                    </div>
                  </div>
                  <div className="remaining-goal">
                    <img src="/images/roadmap_goal_icon.svg" alt="" className="goal-icon" />
                    <span className="goal-label">커리어 전환 실현</span>
                  </div>
                </div>

              </div>
            )}

          </div>
        </main>
      </div>

      <BottomNav active="route" />
    </div>
  )
}
