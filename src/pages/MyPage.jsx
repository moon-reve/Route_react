import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/common.css'
import '../styles/my_page.css'

export default function MyPage() {
  const navigate = useNavigate()
  const isGuest = localStorage.getItem('userType') === 'guest'

  return (
    <div className="screen" style={{ position: 'relative' }}>
      <div className="scroll-area">
        <div className="my-page">
          <main className="my-main">

            <header className="header">
              <div className="header-title">마이페이지</div>
            </header>

            {/* 프로필 섹션 */}
            <section className="section-profile">
              <img src="/images/my_profile_photo.svg" alt="프로필 사진" className="profile-photo" />
              <div className="profile-text">
                <p className="mp-profile-name">김루트</p>
                <p className="profile-bio">3년차 UX 디자이너 | 피그마 마스터 항해 중</p>
              </div>
              <button className="edit-btn" data-hint="false">프로필 수정</button>
            </section>

            {/* 성취 섹션 */}
            <section className="section-mastery">
              <div className="mastery-box">
                <img src="/images/my_mastery_bg.svg" alt="" className="mastery-bg" />

                <div className="mastery-title-group">
                  <p className="mastery-sub">지금까지 밝힌 성좌</p>
                  <p className="mastery-main">총 14개의 미션 완료</p>
                </div>

                <div className="my-progress-wrapper">
                  <div className="my-progress-track">
                    <div className="my-progress-fill"></div>
                  </div>
                  <div className="my-progress-dot"></div>
                </div>

                <p className="mastery-caption">전체 목표의 60%를 달성했어요</p>
              </div>
            </section>

            {/* 메뉴 섹션 */}
            <section className="section-menu">
              <div className="menu-item menu-item--first">
                <span className="menu-text">관심 직무 및 목표 설정</span>
                <img src="/images/my_chevron_right.svg" alt="" className="menu-arrow" />
              </div>
              <div className="menu-item">
                <span className="menu-text">알림 설정</span>
                <img src="/images/my_chevron_right.svg" alt="" className="menu-arrow" />
              </div>
              <div className="menu-item">
                <span className="menu-text">계정 관리</span>
                <img src="/images/my_chevron_right.svg" alt="" className="menu-arrow" />
              </div>
              <div className="menu-item">
                <span className="menu-text">앱 정보 및 고객센터</span>
                <img src="/images/my_chevron_right.svg" alt="" className="menu-arrow" />
              </div>
            </section>

          </main>
        </div>
      </div>

      <BottomNav active="my" />

      {/* 비회원 안내 오버레이 */}
      {isGuest && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '24px',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '20px',
            padding: '36px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            maxWidth: '320px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '17px', fontWeight: '700', color: '#C4876A', margin: 0 }}>
              로그인이 필요한 기능이에요
            </p>
            <p style={{ fontSize: '14px', fontWeight: '400', color: '#1A1C1E', margin: 0, lineHeight: '1.6' }}>
              로그인하고 나만의 루트를<br />완성해보세요
            </p>
            <button
              onClick={() => navigate('/login')}
              style={{
                marginTop: '8px',
                width: '100%',
                padding: '14px 0',
                background: '#1A1C1E',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Pretendard, sans-serif',
              }}
            >
              로그인하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
