import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/detail_guide.css'

export default function DetailGuidePage() {
  const navigate = useNavigate()
  const [checks, setChecks] = useState([false, false, false, false])

  const toggleCheck = (i: number) => {
    setChecks(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  return (
    <div className="app-container dg-app">
      <main className="dg-main">
        <header className="dg-header">
          <div className="dg-header__left">
            <button className="dg-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
              <img src="/images/ic_back_btn.svg" className="dg-header__back-icon" alt="뒤로가기" />
            </button>
            <span className="dg-header__title">Week 04 상세 가이드</span>
          </div>
        </header>

        <div className="dg-hero">
          <img src="/images/bg_week_hero.png" className="dg-hero__img" alt="" />
          <div className="dg-hero__overlay"></div>
          <div className="dg-hero__content">
            <span className="dg-hero__label">Current Module</span>
            <h2 className="dg-hero__title">시장성 테스트 및<br />유저 인터뷰</h2>
          </div>
        </div>

        <section className="dg-section">
          <div className="dg-section__header">
            <h3 className="dg-section__title">이번 주 핵심 목표</h3>
            <span className="dg-phase-badge">Phase 02</span>
          </div>
          <div className="dg-goals">
            {[
              { num: '01', title: '경쟁 서비스 분석 리포트 완료하기', sub: 'Top 3 경쟁사의 강약점 분석 포함' },
              { num: '02', title: '타겟 페르소나 정의 및 인터뷰 질문지 작성', sub: '핵심 가설 검증을 위한 10가지 문항' },
              { num: '03', title: '실제 유저 5명 섭외 및 인터뷰 진행', sub: '심층 인터뷰 (FGI) 및 관찰 조사' },
              { num: '04', title: '인터뷰 데이터 정리 및 초기 인사이트 도출', sub: 'Affinity Diagram 기법 활용' },
            ].map((g, i) => (
              <div key={i} className="dg-goal-item">
                <div className="dg-goal-item__num">{g.num}</div>
                <div className="dg-goal-item__body">
                  <span className="dg-goal-item__title">{g.title}</span>
                  <span className="dg-goal-item__sub">{g.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dg-section">
          <h3 className="dg-section__title">세부 체크리스트</h3>
          <div className="dg-checklist">
            {[
              '데스크 리서치 자료 수집 (블로그, 뉴스레터 등)',
              '인터뷰 대상자 리크루팅 메시지 발송',
              '인터뷰 녹취록 정리 및 핵심 키워드 태깅',
              '주간 결과 보고용 슬라이드 템플릿 제작',
            ].map((text, i) => (
              <div key={i} className="dg-check-item" onClick={() => toggleCheck(i)}>
                <div className={`dg-check-item__box${checks[i] ? ' dg-check-item__box--checked' : ''}`}></div>
                <span className="dg-check-item__text">{text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="dg-section">
          <h3 className="dg-section__title">관련 아티클 및 레퍼런스</h3>
          <div className="dg-refs">
            <div className="dg-ref-card dg-ref-card--light">
              <div className="dg-ref-card__icon dg-ref-card__icon--light">
                <img src="/images/icon_reference_article.svg" alt="" />
              </div>
              <div className="dg-ref-card__body">
                <span className="dg-ref-card__title">서비스 시장성 분석 노하우</span>
                <span className="dg-ref-card__label">Reference 01</span>
              </div>
            </div>
            <div className="dg-ref-card dg-ref-card--dark">
              <div className="dg-ref-card__icon dg-ref-card__icon--dark">
                <img src="/images/icon_reference_pdf.svg" alt="" />
              </div>
              <div className="dg-ref-card__body">
                <span className="dg-ref-card__title dg-ref-card__title--white">UX 인터뷰 가이드북</span>
                <span className="dg-ref-card__label dg-ref-card__label--gray">PDF Guide</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
