import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/data_insight.css'

export default function DataInsightPage() {
  const navigate = useNavigate()

  return (
    <div className="app-container di-app">
      <main className="di-main">
        <header className="di-header">
          <button className="di-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            <img src="/images/ic_back_btn.svg" className="di-header__back-icon" alt="뒤로가기" />
          </button>
          <span className="di-header__title">4주차 커리큘럼</span>
        </header>

        <div className="di-editorial">
          <h2 className="di-editorial__heading">데이터 분석</h2>
          <p className="di-editorial__desc">수집된 인터뷰 데이터를 기반으로 핵심 페인포인트(Pain Point)를<br />분석합니다.</p>
        </div>

        <div className="di-guide">
          <div className="di-guide__row">
            <div className="di-guide__icon-wrap">
              <img src="/images/icon_guide_tip.svg" className="di-guide__icon" alt="" />
            </div>
            <div className="di-guide__content">
              <span className="di-guide__label">[가이드]</span>
              <p className="di-guide__text">인터뷰 로우(Raw) 데이터를 검토하여<br />사용자의 행동 패턴과 니즈를 파악해 보세요.</p>
            </div>
          </div>
        </div>

        <section className="di-section">
          <h3 className="di-section__heading">[데이터 분석 단계]</h3>
          <div className="di-steps">
            <div className="di-step di-step--faded">
              <div className="di-step__badge di-step__badge--gray">1</div>
              <div className="di-step__body">
                <span className="di-step__label di-step__label--muted">로우 데이터 검토</span>
                <img src="/images/icon_step_arrow.svg" className="di-step__icon" alt="" />
              </div>
            </div>
            <div className="di-step di-step--active">
              <div className="di-step__badge di-step__badge--dark">2</div>
              <div className="di-step__body">
                <span className="di-step__label">핵심 키워드 도출</span>
                <img src="/images/icon_step_arrow_active.svg" className="di-step__icon" alt="" />
              </div>
            </div>
            <div className="di-step di-step--faded">
              <div className="di-step__badge di-step__badge--gray">3</div>
              <div className="di-step__body">
                <span className="di-step__label di-step__label--muted">최종 인사이트 정리</span>
                <img src="/images/icon_step_arrow_inactive.svg" className="di-step__icon" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="di-section">
          <h3 className="di-section__heading di-section__heading--tag">Keyword Tag Cloud</h3>
          <div className="di-tag-cloud">
            <span className="di-tag di-tag--light" style={{ left: '20.1%', top: '24px' }}>복잡한 결제 과정</span>
            <span className="di-tag di-tag--dark" style={{ left: '54.9%', top: '24px' }}>낮은 접근성</span>
            <span className="di-tag di-tag--light" style={{ left: '22.1%', top: '71px' }}>정보 불일치</span>
            <span className="di-tag di-tag--dim" style={{ left: '49.7%', top: '71px' }}>부족한 피드백</span>
            <span className="di-tag di-tag--light" style={{ left: '21.2%', top: '118px' }}>느린 로딩 속도</span>
            <span className="di-tag di-tag--light" style={{ left: '53.0%', top: '118px' }}>불친절한 UI</span>
          </div>
        </section>

        <div className="di-cta">
          <button className="di-cta__btn" onClick={() => navigate('/portfolio-detail')}>분석 완료하고 제출하기</button>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
