import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/portfolio_detail.css'

export default function PortfolioDetailPage() {
  const navigate = useNavigate()

  return (
    <div className="app-container pd-app">
      <main className="pd-main">
        <header className="pd-header">
          <div className="pd-header__left">
            <button className="pd-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
              <img src="/images/ic_back_btn.svg" className="pd-header__back-icon" alt="뒤로가기" />
            </button>
            <span className="pd-header__title">포트폴리오 상세</span>
          </div>
        </header>

        <section className="pd-section">
          <div className="pd-project-card">
            <div className="pd-project-card__image">
              <img src="/images/portfolio_hero-2f67e1.png" className="pd-project-card__img" alt="Brand Identity V2" />
              <span className="pd-project-card__badge">Latest</span>
            </div>
          </div>
          <div className="pd-project-info">
            <span className="pd-project-info__date">OCT 2023</span>
            <h2 className="pd-project-info__title">Brand Identity V2</h2>
            <p className="pd-project-info__desc">건축적 미니멀리즘을 기반으로 한 브랜드 리뉴얼 프로젝트입니다. 모노톤의 대비를 통해 브랜드의 신뢰도와 전문성을 강조했습니다.</p>
          </div>
        </section>

        <section className="pd-section">
          <h3 className="pd-section__label">Attachments</h3>
          <div className="pd-file-list">
            <div className="pd-file-item">
              <div className="pd-file-item__left">
                <img src="/images/icon_file_figma.svg" className="pd-file-item__icon" alt="" />
                <div className="pd-file-item__info">
                  <span className="pd-file-item__name">Design_System_Main.fig</span>
                  <span className="pd-file-item__meta">42.8 MB • Cloud Linked</span>
                </div>
              </div>
              <img src="/images/icon_file_action.svg" className="pd-file-item__action" alt="" />
            </div>
            <div className="pd-file-item">
              <div className="pd-file-item__left">
                <img src="/images/icon_file_pdf.svg" className="pd-file-item__icon" alt="" />
                <div className="pd-file-item__info">
                  <span className="pd-file-item__name">Project_Guidelines.pdf</span>
                  <span className="pd-file-item__meta">2.1 MB • Document</span>
                </div>
              </div>
              <img src="/images/icon_file_action.svg" className="pd-file-item__action" alt="" />
            </div>
          </div>
        </section>

        <section className="pd-section">
          <h3 className="pd-section__label">피드백 히스토리</h3>
          <div className="pd-timeline">
            <div className="pd-node">
              <div className="pd-node__dot pd-node__dot--active"></div>
              <div className="pd-node__header">
                <span className="pd-node__author">UX Architect</span>
                <span className="pd-node__date">2023.10.12</span>
              </div>
              <div className="pd-node__bubble">
                <p className="pd-node__text">"타이포그래피의 계층 구조가 명확해졌습니다. 다만 모바일 환경에서의 가독성을 위해 본문 텍스트의 행간을 0.1cm 정도 더 확보하는 것을 제안합니다."</p>
              </div>
            </div>
            <div className="pd-node pd-node--inactive">
              <div className="pd-node__dot"></div>
              <div className="pd-node__header">
                <span className="pd-node__author">Lead Designer</span>
                <span className="pd-node__date">2023.09.28</span>
              </div>
              <div className="pd-node__bubble pd-node__bubble--faded">
                <p className="pd-node__text">"전반적인 톤앤매너는 훌륭하나, 심볼의 곡률이 폰트와 다소 이질감이 느껴집니다. 라운드 값을 통일해보세요."</p>
              </div>
            </div>
          </div>
        </section>

        <div className="pd-cta">
          <button className="pd-cta__btn">전문가 피드백 요청하기</button>
        </div>
      </main>
      <BottomNav />
      <div className="pd-home-indicator"></div>
    </div>
  )
}
