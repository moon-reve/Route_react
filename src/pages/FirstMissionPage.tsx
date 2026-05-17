import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/first_mission.css'

export default function FirstMissionPage() {
  const navigate = useNavigate()
  const [checks, setChecks] = useState([false, false])

  const toggleCheck = (i: number) => {
    setChecks(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  return (
    <div className="app-container fm-app">
      <header className="fm-header">
        <button className="fm-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/images/ic_back_btn.svg" className="fm-header__back-icon" alt="뒤로가기" />
        </button>
        <span className="fm-header__title">첫 번째 미션 상세</span>
      </header>

      <main className="fm-main">
        <section className="fm-hero">
          <img src="/images/bg_mission_hero.svg" className="fm-hero__bg" alt="" />
          <div className="fm-hero__overlay">
            <span className="fm-hero__badge">ORIENTATION</span>
            <h1 className="fm-hero__title">[오리엔테이션]<br />Root 서비스<br />100% 활용 가이드 확인하기</h1>
          </div>
        </section>

        <div className="fm-steps">
          <div className="fm-step">
            <div className="fm-step__head">
              <div className="fm-step__num">1</div>
              <span className="fm-step__title">서비스 활용 가이드 영상 시청</span>
            </div>
            <div className="fm-step__body">
              <div className="fm-video">
                <div className="fm-video__play">
                  <div className="fm-video__play-btn"></div>
                </div>
                <span className="fm-video__duration">04:15</span>
              </div>
            </div>
          </div>

          <div className="fm-divider"></div>

          <div className="fm-step">
            <div className="fm-step__head">
              <div className="fm-step__num">2</div>
              <span className="fm-step__title">필수 체크리스트 확인하기</span>
            </div>
            <div className="fm-step__body">
              <div className="fm-checklist">
                {['프로필 정보 업데이트 완료', '알림 설정 활성화 확인'].map((label, i) => (
                  <div key={i} className="fm-check-item" onClick={() => toggleCheck(i)}>
                    <div className={`fm-check__circle${checks[i] ? ' fm-check__circle--done' : ''}`}>
                      {checks[i] && <div className="fm-check__mark"></div>}
                    </div>
                    <span className={`fm-check__label${checks[i] ? ' fm-check__label--done' : ''}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fm-divider"></div>

          <div className="fm-step">
            <div className="fm-step__head">
              <div className="fm-step__num">3</div>
              <span className="fm-step__title">서비스 이용 중 궁금한 점 문의 방법 숙지</span>
            </div>
            <div className="fm-step__body">
              <p className="fm-step__desc">메뉴 하단의 '1:1 문의하기' 버튼을 통해 상시 전문가 상담을 받으실 수 있습니다.</p>
            </div>
          </div>
        </div>

        <section className="fm-memo">
          <span className="fm-memo__label">REFLECTION MEMO</span>
          <textarea className="fm-memo__input" placeholder="오늘의 각오 한 마디"></textarea>
        </section>

        <div className="fm-cta-wrap">
          <button className="fm-cta" onClick={() => navigate('/home')}>미션 완료 체크하기</button>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
