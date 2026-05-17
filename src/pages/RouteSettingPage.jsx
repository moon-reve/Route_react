import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/route_setting.css'

export default function RouteSettingPage() {
  const navigate = useNavigate()
  const [intensity, setIntensity] = useState('일반')

  return (
    <div className="app-container rs-app">
      <header className="rs-header">
        <button className="rs-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/images/ic_back_btn.svg" className="rs-header__back-icon" alt="뒤로가기" />
        </button>
        <span className="rs-header__title">루트 관리</span>
      </header>

      <main className="rs-main">
        <div className="rs-progress-card">
          <p className="rs-progress-card__eyebrow">CURRENT PROGRESS</p>
          <p className="rs-progress-card__path">Senior Product Designer Path</p>
          <div className="rs-progress-card__bottom">
            <div className="rs-progress-card__bar-wrap">
              <div className="rs-progress-row">
                <span className="rs-progress-row__label">전체 12주 중 4주차 진행 중</span>
                <span className="rs-progress-row__pct">25%</span>
              </div>
              <div className="rs-progress-bar">
                <div className="rs-progress-bar__fill" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <section className="rs-section">
          <h2 className="rs-section__title">주차별 학습 편집</h2>
          <div className="rs-weeks">
            <div className="rs-week rs-week--active">
              <div className="rs-week__info">
                <span className="rs-week__num">Week 04</span>
                <span className="rs-week__task">심층 유저 인터뷰 및 분석</span>
              </div>
              <button className="rs-week__btn rs-week__btn--dark">편집/교체</button>
            </div>
            <div className="rs-week rs-week--inactive">
              <div className="rs-week__info">
                <span className="rs-week__num rs-week__num--dim">Week 05</span>
                <span className="rs-week__task">인포메이션 아키텍처(IA) 설계</span>
              </div>
              <div className="rs-week__actions">
                <button className="rs-week__trash"><img src="/images/icon_timer.svg" className="rs-week__trash-icon" alt="삭제" /></button>
                <button className="rs-week__btn rs-week__btn--light">편집/교체</button>
              </div>
            </div>
            <div className="rs-week rs-week--inactive">
              <div className="rs-week__info">
                <span className="rs-week__num rs-week__num--dim">Week 06</span>
                <span className="rs-week__task">로우파이 와이어프레임 프로토타입</span>
              </div>
              <div className="rs-week__actions">
                <button className="rs-week__trash"><img src="/images/icon_timer.svg" className="rs-week__trash-icon" alt="삭제" /></button>
                <button className="rs-week__btn rs-week__btn--light">편집/교체</button>
              </div>
            </div>
          </div>
        </section>

        <section className="rs-section">
          <h2 className="rs-section__title">로드맵 강도 조절</h2>
          <div className="rs-intensity">
            <div className="rs-intensity__track">
              {['슬로우', '일반', '인텐시브'].map(opt => (
                <button
                  key={opt}
                  className={`rs-intensity__btn${intensity === opt ? ' rs-intensity__btn--active' : ''}`}
                  onClick={() => setIntensity(opt)}
                >{opt}</button>
              ))}
            </div>
          </div>
          <p className="rs-intensity__caption">인텐시브 선택 시 주차별 미션 양이 늘어나며 전체 기간이 단축됩니다.</p>
        </section>

        <section className="rs-section">
          <h2 className="rs-section__title">주차별 산출물 보관함</h2>
          <div className="rs-outcomes">
            <div className="rs-outcome">
              <div className="rs-outcome__icon-box rs-outcome__icon-box--done">
                <img src="/images/icon_folder.svg" className="rs-outcome__icon rs-outcome__icon--done" alt="" />
              </div>
              <div className="rs-outcome__text">
                <p className="rs-outcome__title">Week 01: 시장 분석 리포트</p>
                <p className="rs-outcome__sub">완료됨 • 2023.10.24</p>
              </div>
              <img src="/images/icon_link.svg" className="rs-outcome__arrow" alt="" />
            </div>
            <div className="rs-outcome">
              <div className="rs-outcome__icon-box rs-outcome__icon-box--progress">
                <img src="/images/icon_document.svg" className="rs-outcome__icon rs-outcome__icon--progress" alt="" />
              </div>
              <div className="rs-outcome__text">
                <p className="rs-outcome__title">Week 04: 유저 인터뷰 데이터</p>
                <p className="rs-outcome__sub">진행 중 • 초안 작성됨</p>
              </div>
              <img src="/images/icon_link.svg" className="rs-outcome__arrow" alt="" />
            </div>
          </div>
        </section>

        <div className="rs-danger">
          <button className="rs-danger__btn" onClick={() => navigate('/route-regen')}>현재 로드맵 초기화하기</button>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
