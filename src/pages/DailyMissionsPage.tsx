import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/daily_missions.css'

export default function DailyMissionsPage() {
  const navigate = useNavigate()

  const items = [
    { icon: 'ic_mission_orientation', category: 'Orientation', title: '[오리엔테이션] Root 서비스 100% 활용 가이드' },
    { icon: 'ic_mission_goal', category: 'Goal Setting', title: '[목표 설정] 12주 뒤 나의 모습 상상하며 목표 작성' },
    { icon: 'ic_mission_community', category: 'Community', title: '[커뮤니티] 함께 성장할 동료들에게 인사 나누기' },
    { icon: 'ic_mission_profile', category: 'Profile Update', title: '[내 정보 업데이트] 관심 직군 상세 키워드설정', last: true },
  ]

  return (
    <div className="app-container">
      <main className="dm-main">
        <header className="dm-header">
          <div className="dm-header__container">
            <button className="dm-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
              <img src="/images/ic_back_btn.svg" className="dm-header__back-icon" alt="뒤로가기" />
            </button>
            <span className="dm-header__title">오늘의 미션 전체</span>
          </div>
        </header>

        <div className="dm-overview">
          <span className="dm-overview__label">Overview</span>
          <h2 className="dm-overview__title">지속 가능한 성장을 위한<br />핵심 과제 리스트</h2>
        </div>

        <div className="dm-list">
          {items.map((item, i) => (
            <div key={i} className={`dm-item${(item as any).last ? ' dm-item--last' : ''}`}>
              <div className="dm-item__left">
                <div className="dm-item__icon-wrap">
                  <img src={`/images/${item.icon}.svg`} className="dm-item__icon" alt="" />
                </div>
                <div className="dm-item__text">
                  <span className="dm-item__category">{item.category}</span>
                  <span className="dm-item__title">{item.title}</span>
                </div>
              </div>
              <img src="/images/ic_arrow_right.svg" className="dm-item__arrow" alt="" />
            </div>
          ))}
        </div>

        <div className="dm-insight-wrap">
          <div className="dm-insight">
            <img src="/images/ic_insight_quote.svg" className="dm-insight__quote" alt="" />
            <div className="dm-insight__body">
              <h3 className="dm-insight__title">오늘의 인사이트</h3>
              <p className="dm-insight__desc">작은 미션들이 모여 거대한 커리어의 변화를 만듭니다.<br />오늘 당신의 첫 번째 체크를 응원합니다.</p>
            </div>
          </div>
        </div>

        <div className="dm-bottom">
          <button className="dm-cta">
            <img src="/images/ic_edit.svg" className="dm-cta__icon" alt="" />
            미션 추가/수정
          </button>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
