import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/growth.css'

export default function GrowthPage() {
  return (
    <div className="app-container grw-app">
      <main className="grw-main">

        <section className="grw-action">
          <div className="grw-action__card">
            <div className="grw-action__badge">
              <span className="grw-action__badge-line"></span>
              <span className="grw-action__badge-text">IMMEDIATE ACTION</span>
            </div>
            <h2 className="grw-action__title">포트폴리오 업데이트가 필요합니다</h2>
            <p className="grw-action__desc">최근 완료한 '디자인 시스템 구축' 프로젝트에 대한<br />멘토의 피드백이 도착했습니다.</p>
            <Link to="/feedback-detail" className="grw-action__btn">피드백 확인하기</Link>
            <img src="/images/ic_lightning_bg.svg" className="grw-action__bg-icon" alt="" />
          </div>
        </section>

        <section className="grw-section">
          <div className="grw-section__header">
            <div className="grw-section__title-wrap">
              <h2 className="grw-section__title">성장 리포트</h2>
              <span className="grw-section__subtitle">2023년 10월 4주차 데이터</span>
            </div>
            <div className="grw-section__dots">
              <span className="grw-dot grw-dot--active"></span>
              <span className="grw-dot"></span>
            </div>
          </div>
          <Link to="/growth-report" className="grw-report-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <div className="grw-report-card__top">
              <div className="grw-report-card__value-wrap">
                <span className="grw-report-card__value">+12%</span>
                <img src="/images/ic_trend_up.svg" className="grw-report-card__trend-icon" alt="" />
              </div>
              <span className="grw-report-card__label">SKILL VELOCITY</span>
            </div>
            <div className="grw-chart">
              <div className="grw-chart__bar" style={{ height: '40%' }}></div>
              <div className="grw-chart__bar" style={{ height: '60%' }}></div>
              <div className="grw-chart__bar" style={{ height: '50%' }}></div>
              <div className="grw-chart__bar" style={{ height: '90%' }}></div>
              <div className="grw-chart__bar" style={{ height: '75%' }}></div>
              <div className="grw-chart__bar" style={{ height: '65%' }}></div>
              <div className="grw-chart__bar grw-chart__bar--gold" style={{ height: '85%' }}></div>
            </div>
          </Link>
        </section>

        <section className="grw-section">
          <h2 className="grw-section__title">포트폴리오 아카이브</h2>
          <Link to="/archive" className="grw-archive">
            <div className="grw-archive__card grw-archive__card--full">
              <div className="grw-archive__card-header">
                <img src="/images/ic_folder_play.svg" className="grw-archive__icon" alt="" />
                <span className="grw-archive__date">OCT 2023</span>
              </div>
              <h3 className="grw-archive__card-title">Brand Identity V2</h3>
              <p className="grw-archive__card-desc">최종 결과물 및 가이드라인 포함</p>
            </div>
            <div className="grw-archive__grid">
              <div className="grw-archive__card grw-archive__card--half">
                <img src="/images/ic_image.svg" className="grw-archive__icon" alt="" />
                <h3 className="grw-archive__card-title">UI Prototype</h3>
              </div>
              <div className="grw-archive__card grw-archive__card--half">
                <img src="/images/ic_document.svg" className="grw-archive__icon" alt="" />
                <h3 className="grw-archive__card-title">Case Study</h3>
              </div>
            </div>
          </Link>
        </section>

        <section className="grw-section">
          <div className="grw-section__header">
            <h2 className="grw-section__title">피드백 인박스</h2>
            <a href="#" className="grw-section__link">모두 읽음</a>
          </div>
          <div className="grw-list">
            <Link to="/feedback-detail" className="grw-list__item grw-list__item--white">
              <div className="grw-list__thumb">
                <img src="/images/img_mentor_1.png" alt="" />
              </div>
              <div className="grw-list__content">
                <div className="grw-list__content-header">
                  <span className="grw-list__name">J.young</span>
                  <span className="grw-list__time">2h ago</span>
                </div>
                <p className="grw-list__text">레이아웃의 비대칭적 활용이 훌륭합니다. 다…</p>
              </div>
            </Link>
            <Link to="/feedback-detail" className="grw-list__item grw-list__item--gray">
              <div className="grw-list__thumb">
                <img src="/images/img_mentor_2.png" alt="" />
              </div>
              <div className="grw-list__content">
                <div className="grw-list__content-header">
                  <span className="grw-list__name">Im Jayoung</span>
                  <span className="grw-list__time">Yesterday</span>
                </div>
                <p className="grw-list__text">컬러 팔레트가 매우 일관적입니다. 다음 단…</p>
              </div>
            </Link>
          </div>
        </section>

        <section className="grw-section">
          <div className="grw-section__header">
            <h2 className="grw-section__title">내 로그</h2>
            <span className="grw-section__link">전체보기</span>
          </div>
          <div className="grw-list">
            <div className="grw-list__item grw-list__item--white">
              <div className="grw-list__thumb grw-list__thumb--dark"></div>
              <div className="grw-list__content">
                <div className="grw-list__content-header">
                  <span className="grw-list__name">어렵다 Title</span>
                  <span className="grw-list__time">26.04.14</span>
                </div>
                <p className="grw-list__text">오늘은 UI/UX를 만들어가는 기준을 공부함. 내일...</p>
              </div>
            </div>
            <div className="grw-list__item grw-list__item--gray">
              <div className="grw-list__thumb grw-list__thumb--gray"></div>
              <div className="grw-list__content">
                <div className="grw-list__content-header">
                  <span className="grw-list__name">20260413 공부 첫날</span>
                  <span className="grw-list__time">Yesterday</span>
                </div>
                <p className="grw-list__text">UI/UX가 뭔지 개념 정리함. 이제 조금 알...</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <BottomNav />
    </div>
  )
}
