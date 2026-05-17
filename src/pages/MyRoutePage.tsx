import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/my_route.css'

const WEEKS = [
  { week: 1,  title: '시장 분석 및 트렌드 파악', desc: '최신 글로벌 디자인 트렌드 리서치 및 경쟁사 벤치마킹 완료.', tags: ['트렌드 리서치', '벤치마킹'] },
  { week: 2,  title: 'UX 리서치 계획 수립', desc: '유저 인터뷰 가이드 및 리서치 방법론 설계 완료.', tags: ['리서치 계획', '방법론'] },
  { week: 3,  title: '유저 인터뷰 준비', desc: '실제 유저 5인 심층 인터뷰 준비 및 스크리닝 완료.', tags: ['유저 인터뷰', '스크리닝'] },
  { week: 4,  title: '유저 인터뷰 및 인사이트 도출', desc: '페르소나 정의를 위한 실제 유저 5인 인터뷰 진행중. (3/5 완료)', tags: ['유저 인터뷰', '데이터 분석'], tagLinks: ['/user-interview', '/data-insight'] },
  { week: 5,  title: '와이어프레임 및 핵심 기능 정의', desc: '제품의 핵심 가치를 전달하기 위한 Low-fi 설계', tags: ['와이어프레임', 'IA 설계'] },
  { week: 6,  title: '비주얼 디자인 시스템 구축', desc: '컬러, 타이포그래피, 컴포넌트 라이브러리 구성', tags: ['디자인 시스템'] },
  { week: 7,  title: 'UI 상세 설계', desc: '주요 화면 High-fi 목업 제작 및 검토', tags: ['UI 설계', '목업'] },
  { week: 8,  title: '프로토타입 제작', desc: '클릭 가능한 인터랙티브 프로토타입 완성', tags: ['프로토타입'] },
  { week: 9,  title: '사용성 테스트', desc: '프로토타입 기반 유저 테스트 5회 진행 및 분석', tags: ['사용성 테스트'] },
  { week: 10, title: '개선 설계 반영', desc: '테스트 피드백 기반 디자인 수정 및 보완', tags: ['이터레이션'] },
  { week: 11, title: '포트폴리오 케이스 스터디', desc: '프로젝트 전 과정 정리 및 스토리텔링 문서화', tags: ['포트폴리오'] },
  { week: 12, title: '최종 발표 및 커리어 전환', desc: '포트폴리오 발표, 구직 활동 시작 및 네트워킹', tags: ['커리어 전환', '취업 준비'] },
]

function pad(n: number) { return n < 10 ? '0' + n : String(n) }

export default function MyRoutePage() {
  const navigate = useNavigate()
  const currentWeek = parseInt(localStorage.getItem('routeCurrentWeek') || '4', 10)
  const [bsOpen, setBsOpen] = useState(false)
  const [openPast, setOpenPast] = useState<number[]>([])

  const completed = Math.max(currentWeek - 1, 0)
  const pct = Math.round(completed / 12 * 100)

  const getState = (w: number) => {
    if (w < currentWeek) return 'past'
    if (w === currentWeek) return 'active'
    if (w === currentWeek + 1) return 'next'
    return 'future'
  }

  const togglePast = (w: number) => {
    setOpenPast(prev => prev.includes(w) ? prev.filter(x => x !== w) : [...prev, w])
  }

  let futureSeen = 0
  const weeksToRender: number[] = []
  for (let w = 1; w <= 12; w++) {
    const state = getState(w)
    if (state === 'future') {
      futureSeen++
      if (futureSeen === 1) weeksToRender.push(w)
      else if (futureSeen === 2) { weeksToRender.push(-1); break }
    } else {
      weeksToRender.push(w)
    }
  }

  return (
    <div className="app-container mr-app">
      <img src="/images/bg_route_constellation.svg" className="mr-bg" alt="" />
      <main className="mr-main">
        <section className="mr-header">
          <div className="mr-header__inner">
            <span className="mr-header__label">My route</span>
            <h1 className="mr-header__title">커리어 로드맵</h1>
          </div>
        </section>

        <div className="mr-card-wrap">
          <div className="mr-progress-card">
            <div className="mr-progress-card__info">
              <span className="mr-progress-card__rate">완료율 {pct}%</span>
              <span className="mr-progress-card__weeks">{currentWeek} / 12 Weeks</span>
              <span className="mr-progress-card__path">Senior Product Designer Path</span>
            </div>
            <div className="mr-progress-card__orbit">
              <img src="/images/ic_route_orbit.svg" className="mr-orbit__img" alt="" />
              <span className="mr-orbit__label">W{currentWeek}</span>
            </div>
          </div>

          <div className="mr-actions">
            <button className="mr-btn mr-btn--primary" onClick={() => navigate('/route-setting')}>
              <img src="/images/icon_action_add.svg" className="mr-btn__icon" alt="" />
              루트 관리
            </button>
            <button className="mr-btn mr-btn--secondary" onClick={() => navigate('/route-regen')}>
              <img src="/images/icon_refresh.svg" className="mr-btn__icon mr-btn__icon--secondary" alt="" />
              루트 재생성
            </button>
          </div>
        </div>

        <section className="mr-timeline" id="mr-timeline">
          {weeksToRender.map(w => {
            if (w === -1) {
              return (
                <div key="more" className="mr-more">
                  <div className="mr-more__dots"><span></span><span></span><span></span></div>
                  <span className="mr-more__label">UNTIL WEEK 12</span>
                </div>
              )
            }
            const state = getState(w)
            const data = WEEKS[w - 1]
            const isOpen = openPast.includes(w)

            return (
              <div
                key={w}
                className={`mr-week mr-week--${state === 'past' ? 'past mr-week--done' + (isOpen ? ' mr-week--open' : '') : state === 'active' ? 'active' : 'plan'}`}
                onClick={state === 'past' ? () => togglePast(w) : state === 'active' ? () => navigate('/detail-guide') : undefined}
                style={state === 'active' ? { cursor: 'pointer' } : undefined}
              >
                <div className="mr-week__track">
                  <div className={`mr-week__marker mr-week__marker--${state === 'past' ? 'done' : state === 'active' ? 'active' : state === 'next' ? 'next' : 'future'}`}>
                    <span className="mr-week__marker-num">{w}</span>
                  </div>
                  <div className={`mr-week__line${state !== 'past' ? ' mr-week__line--plan' : ''}`}></div>
                </div>
                <div className={`mr-week__body${state === 'next' ? ' mr-week__body--dim-75' : state === 'future' ? ' mr-week__body--dim-50' : ''}`}>
                  <div className="mr-week__head">
                    <span className={`mr-week__label${state === 'active' ? ' mr-week__label--active' : state === 'next' ? ' mr-week__label--next' : state === 'future' ? ' mr-week__label--plan' : ''}`}>
                      WEEK {pad(w)}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className={`mr-badge mr-badge--${state === 'past' ? 'done' : state === 'active' ? 'active' : state === 'next' ? 'next' : 'future'}`}>
                        {state === 'past' ? 'DONE' : state === 'active' ? 'ACTIVE' : state === 'next' ? 'NEXT' : 'PLAN'}
                      </span>
                      {state === 'past' && <span className="mr-week__toggle">▼</span>}
                    </div>
                  </div>
                  <div className={`mr-week__content${state === 'past' ? ' mr-week__content--done' : state === 'active' ? ' mr-week__content--active' : state === 'next' ? ' mr-week__content--next' : ' mr-week__content--plan'}`}>
                    <p className={`mr-week__title${state === 'active' ? ' mr-week__title--active' : state !== 'past' ? ' mr-week__title--plan' : ''}`}>{data.title}</p>
                    {(state !== 'future') && (
                      <p className={`mr-week__desc${state === 'active' ? ' mr-week__desc--active' : state === 'next' ? ' mr-week__desc--plan' : ''}`}>{data.desc}</p>
                    )}
                    {state === 'active' && data.tags.length > 0 && (
                      <div className="mr-week__tags">
                        {data.tags.map((t, i) => {
                          const link = (data as any).tagLinks?.[i]
                          return link
                            ? <Link key={i} className="mr-tag mr-tag--link" to={link} onClick={e => e.stopPropagation()}>{t}</Link>
                            : <span key={i} className="mr-tag">{t}</span>
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      </main>

      <button className={`mr-fab${bsOpen ? ' is-hidden' : ''}`} onClick={() => setBsOpen(true)}>
        <img src="/images/icon_fab_plus.svg" className="mr-fab__icon" alt="" />
      </button>

      <div className={`mr-bs-overlay${bsOpen ? ' is-visible' : ''}`} onClick={() => setBsOpen(false)}></div>
      <div className={`mr-bs${bsOpen ? ' is-open' : ''}`}>
        <div className="mr-bs__handle-wrap"><div className="mr-bs__handle"></div></div>
        <div className="mr-bs__content">
          <div className="mr-bs__action">
            <div className="mr-bs__icon-box"><img src="/images/icon_action_add.svg" className="mr-bs__icon" alt="" /></div>
            <div className="mr-bs__text">
              <p className="mr-bs__title">개인 미션 추가</p>
              <p className="mr-bs__desc">나만의 학습 계획을 로드맵에 더해보세요.</p>
            </div>
          </div>
          <Link to="/daily-log" className="mr-bs__action" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="mr-bs__icon-box"><img src="/images/icon_action_log.svg" className="mr-bs__icon" alt="" /></div>
            <div className="mr-bs__text">
              <p className="mr-bs__title">오늘의 학습 로그</p>
              <p className="mr-bs__desc">공부하며 느낀 점이나 기록을 남겨요.</p>
            </div>
          </Link>
          <div className="mr-bs__action">
            <div className="mr-bs__icon-box"><img src="/images/icon_action_ai.svg" className="mr-bs__icon" alt="" /></div>
            <div className="mr-bs__text">
              <p className="mr-bs__title">AI 가이드 질문</p>
              <p className="mr-bs__desc">로드맵이나 과제에 대해 막히는 부분을 물어보세요.</p>
            </div>
          </div>
          <div className="mr-bs__action">
            <div className="mr-bs__icon-box"><img src="/images/icon_action_pause.svg" className="mr-bs__icon" alt="" /></div>
            <div className="mr-bs__text">
              <p className="mr-bs__title">루트 일시정지</p>
              <p className="mr-bs__desc">잠시 쉬어가고 싶을 때 설정을 변경해요.</p>
            </div>
          </div>
        </div>
        <button className="mr-bs__close" onClick={() => setBsOpen(false)}>
          <img src="/images/icon_fab_plus.svg" className="mr-bs__close-icon" alt="닫기" />
        </button>
      </div>

      <BottomNav active="route" />
    </div>
  )
}
