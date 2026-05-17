import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/common.css'
import '../styles/expert_detail.css'

export default function ExpertDetailPage() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <img src="/images/expert_bg.svg" alt="" className="expert-bg" />

      <div className="scroll-area">
        <div className="expert-page">
          <main className="expert-main">

            <header className="header">
              <button className="btn-back" onClick={() => navigate(-1)}>
                <img src="/images/detail_btn_back.svg" alt="뒤로가기" />
              </button>
              <h1 className="header-title">전문가 상세 프로필</h1>
              <div className="header-placeholder"></div>
            </header>

            {/* ① 프로필 섹션 */}
            <section className="profile-section">
              <div className="avatar-wrap">
                <div className="avatar-border">
                  <img src="/images/expert_avatar-44f00a.png" alt="J.young" className="avatar-img" />
                </div>
                <div className="expert-badge">
                  <img src="/images/expert_badge.svg" alt="EXPERT" />
                </div>
              </div>

              <p className="profile-name">J.young</p>
              <p className="profile-role">Senior Product Designer (10yr+)</p>

              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-value">128</span>
                  <span className="stat-label">Mentoring</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-value-row">
                    <span className="stat-value">4.9</span>
                    <img src="/images/expert_star.svg" alt="" className="stat-star" />
                  </div>
                  <span className="stat-label">Rating</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-value">15</span>
                  <span className="stat-label">Articles</span>
                </div>
              </div>
            </section>

            {/* ② 전문 분야 */}
            <section className="expertise-section">
              <p className="section-heading">전문 분야</p>
              <div className="tag-wrap">
                <span className="expert-tag expert-tag--dark">디자인 시스템</span>
                <span className="expert-tag expert-tag--gray">B2B 서비스</span>
                <span className="expert-tag expert-tag--gray">사용성 테스트</span>
                <span className="expert-tag expert-tag--gray">브랜딩</span>
              </div>
            </section>

            {/* ③ 주요 경력 */}
            <section className="experience-section">
              <p className="section-heading">주요 경력</p>
              <div className="timeline">
                <div className="timeline-line"></div>

                <div className="timeline-item">
                  <div className="timeline-dot timeline-dot--active">
                    <img src="/images/expert_company_meta.svg" alt="Meta" />
                  </div>
                  <div className="timeline-content">
                    <p className="career-company">Meta (Seattle)</p>
                    <p className="career-title">Lead Product Designer • 2020 - Present</p>
                    <p className="career-desc">Design System Orchestration & AI Integration</p>
                  </div>
                </div>

                <div className="timeline-item timeline-item--past">
                  <div className="timeline-dot timeline-dot--inactive">
                    <img src="/images/expert_company_coupang.svg" alt="Coupang" />
                  </div>
                  <div className="timeline-content">
                    <p className="career-company">Coupang</p>
                    <p className="career-title">Senior UI/UX Designer • 2016 - 2020</p>
                    <p className="career-desc">Directing Logistics & Checkout Experience</p>
                  </div>
                </div>

                <div className="timeline-item timeline-item--past">
                  <div className="timeline-dot timeline-dot--inactive">
                    <img src="/images/expert_company_plusx.svg" alt="Plus X" />
                  </div>
                  <div className="timeline-content">
                    <p className="career-company">Plus X</p>
                    <p className="career-title">BX & UI Designer • 2013 - 2016</p>
                    <p className="career-desc">Brand Identity Design for Fin-tech Startups</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ④ 멘토링 스타일 */}
            <section className="style-section">
              <p className="section-heading section-heading--gray">멘토링 스타일</p>
              <p className="style-text">단순히 지식을 전달하는 것을 넘어, 실무에서 마주하는 복잡한 문제들을 구조적으로 해결하는 시야를 공유합니다.</p>
              <p className="style-text">비즈니스 임팩트를 고려한 디자인 결정 로직과 커리어성장을 위한 포트폴리오 전략을 1:1 맞춤형으로 가이드해 드립니다.</p>
            </section>

            {/* ⑤ CTA 버튼 */}
            <button className="btn-cta">J.young 멘토에게 1:1 질문하기</button>

          </main>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
