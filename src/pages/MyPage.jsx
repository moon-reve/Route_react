import BottomNav from '../components/BottomNav'
import '../styles/common.css'
import '../styles/my_page.css'

export default function MyPage() {
  return (
    <div className="screen">
      <div className="scroll-area">
        <div className="my-page">
          <main className="my-main">

            <header className="header">
              <div className="header-title">마이페이지</div>
            </header>

            {/* 프로필 섹션 */}
            <section className="section-profile">
              <img src="/images/my_profile_photo.svg" alt="프로필 사진" className="profile-photo" />
              <p className="profile-name">김루트</p>
              <p className="profile-bio">3년차 UX 디자이너 | 피그마 마스터 항해 중</p>
              <button className="edit-btn">프로필 수정</button>
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
    </div>
  )
}
