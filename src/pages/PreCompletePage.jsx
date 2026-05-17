import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/pre_complete.css'

export default function PreCompletePage() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <img src="/images/pre_bg.svg" alt="" className="complete-bg" />

      <div className="scroll-area">
        <div className="main">

          {/* ① 히어로 섹션 */}
          <section className="hero-section">
            <div className="hero-top">
              <div className="route-badge">루트 완성</div>
              <h1 className="hero-title">
                축하합니다, 박서준 님!<br />
                <span className="hero-title--gold">12주 UI/UX 이직 루트</span>가 완성되었습니다.
              </h1>
            </div>
            <div className="tag-group">
              <span className="custom-tag">#피그마_집중</span>
              <span className="custom-tag">#주15시간_몰입</span>
              <span className="custom-tag">#이커머스_도메인</span>
            </div>
          </section>

          {/* ② 12주 커리큘럼 요약 */}
          <section className="curriculum-card">
            <p className="section-heading">12주 커리큘럼 요약</p>
            <div className="timeline">
              <div className="timeline-line timeline-line--gold"></div>
              <div className="timeline-line timeline-line--gray"></div>

              <div className="phase-item">
                <img src="/images/complete_phase1.svg" alt="" className="phase-dot" />
                <div className="phase-text">
                  <p className="phase-label">Phase 1 (1-4주)</p>
                  <p className="phase-desc">기초 역량 및 툴 숙련도 강화</p>
                </div>
              </div>

              <div className="phase-item">
                <img src="/images/complete_phase2.svg" alt="" className="phase-dot" />
                <div className="phase-text">
                  <p className="phase-label">Phase 2 (5-8주)</p>
                  <p className="phase-desc">이커머스 실전 클론 디자인 & 분석</p>
                </div>
              </div>

              <div className="phase-item">
                <img src="/images/complete_phase3.svg" alt="" className="phase-dot" />
                <div className="phase-text">
                  <p className="phase-label">Phase 3 (9-12주)</p>
                  <p className="phase-desc">최종 포트폴리오 제작 및 피드백</p>
                </div>
              </div>
            </div>
          </section>

          {/* ③ 오늘의 첫 미션 */}
          <section className="mission-card">
            <div className="mission-header">
              <div className="mission-header-left">
                <img src="/images/complete_mission_icon.svg" alt="" className="mission-icon" />
                <span className="mission-label">오늘의 첫 미션</span>
              </div>
              <span className="day-badge">Day 1</span>
            </div>
            <div className="mission-body">
              <p className="mission-title">실무가 쉬워지는 필수 용어 카드 읽기</p>
              <p className="mission-desc">"그 용어 뭐였지?" 당황하지 않도록, 꼭 알아야 할 기초 용어 20가지를 카드 형태로 정리해 드립니다.</p>
            </div>
          </section>

          {/* ④ CTA 버튼 */}
          <button className="btn-start" onClick={() => navigate('/home')}>나의 루트 시작하기</button>

        </div>
      </div>
    </div>
  )
}
