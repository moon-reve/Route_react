import { useNavigate } from 'react-router-dom'
import '../styles/global.css'
import '../styles/onboarding_route_complete.css'

export default function OnboardingCompletePage() {
  const navigate = useNavigate()

  const toolTagMap: Record<string, string> = {
    figma: 'Figma_집중', adobexd: 'AdobeXD_집중', photoshop: 'Photoshop_집중',
    illustrator: 'Illustrator_집중', midjourney: 'Midjourney_집중',
  }
  const timeTagMap: Record<string, string> = {
    immersive: '#주20시간_몰입', parallel: '#주15시간_병행',
    turtle: '#주10시간_거북이', slow: '#슬로우형',
  }
  const domainLabelMap: Record<string, string> = {
    ecommerce: '이커머스/쇼핑', fintech: '핀테크(금융)', health: '헬스케어/운동',
    edutech: '에듀테크(교육)', mobility: '모빌리티(이동)', sns: 'SNS/커뮤니티',
  }

  const toolOrder = ['figma', 'adobexd', 'photoshop', 'illustrator', 'midjourney']
  const selectedTools: string[] = JSON.parse(localStorage.getItem('onb_tools') || '[]')
  const unselected = toolOrder.find(t => !selectedTools.includes(t))
  const time = localStorage.getItem('onb_time') || ''
  const selectedDomains: string[] = JSON.parse(localStorage.getItem('onb_domains') || '[]')

  const tag1 = unselected ? `#${toolTagMap[unselected]}` : '#피그마_집중'
  const tag2 = time && timeTagMap[time] ? timeTagMap[time] : '#주15시간_몰입'
  const domainTags = selectedDomains.length > 0
    ? selectedDomains.map(d => `#${domainLabelMap[d] || d}`)
    : ['#이커머스_도메인']

  return (
    <div className="app-container">
      <main className="rc">
        <section className="rc__hero">
          <div className="rc__hero-top">
            <div className="rc__logo">
              <img src="/images/ic_route_logo_dark.svg" alt="Route" />
            </div>
            <h1 className="rc__heading">축하합니다, 박서준 님!<br />12주 UI/UX 이직 루트가<br />완성 되었습니다.</h1>
          </div>
          <div className="rc__tags">
            <span className="rc__tag">{tag1}</span>
            <span className="rc__tag">{tag2}</span>
            {domainTags.map((t, i) => (
              <span key={i} className="rc__tag">{t}</span>
            ))}
          </div>
        </section>

        <section className="rc__timeline">
          <div className="rc__section-label">12주 커리큘럼 요약</div>
          <div className="rc__phases">
            <div className="rc__phase">
              <div className="rc__phase-track">
                <div className="rc__phase-dot rc__phase-dot--gold"></div>
                <div className="rc__phase-connector rc__phase-connector--gold"></div>
              </div>
              <div className="rc__phase-content">
                <span className="rc__phase-label">Phase 1 (1-4주)</span>
                <span className="rc__phase-desc">기초 역량 및 툴 숙련도 강화</span>
              </div>
            </div>
            <div className="rc__phase">
              <div className="rc__phase-track">
                <div className="rc__phase-dot rc__phase-dot--gray"></div>
                <div className="rc__phase-connector rc__phase-connector--gray"></div>
              </div>
              <div className="rc__phase-content">
                <span className="rc__phase-label">Phase 2 (5-8주)</span>
                <span className="rc__phase-desc">이커머스 실전 클론 디자인 &amp; 분석</span>
              </div>
            </div>
            <div className="rc__phase">
              <div className="rc__phase-track">
                <div className="rc__phase-dot rc__phase-dot--light"></div>
              </div>
              <div className="rc__phase-content">
                <span className="rc__phase-label">Phase 3 (9-12주)</span>
                <span className="rc__phase-desc">최종 포트폴리오 제작 및 피드백</span>
              </div>
            </div>
          </div>
        </section>

        <div className="rc__mission">
          <div className="rc__mission-header">
            <img src="/images/ic_mission_flag.svg" className="rc__mission-icon" alt="" />
            <span className="rc__mission-label">오늘의 첫 미션</span>
          </div>
          <div className="rc__mission-body">
            <p className="rc__mission-title">Day 1 :<br />UI 디자인 트렌드 리서치 및 레퍼런스 수집</p>
            <p className="rc__mission-desc">성공적인 루트의 시작을 위해 현재 시장에서 가장 주목 받는 인터페이스 스타일을 분석합니다.</p>
          </div>
        </div>

        <div className="rc__footer">
          <button className="rc__cta" onClick={() => navigate('/home')}>나의 루트 시작하기</button>
        </div>
      </main>
    </div>
  )
}
