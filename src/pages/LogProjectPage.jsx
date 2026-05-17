import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/common.css'
import '../styles/log_project.css'

export default function LogProjectPage() {
  return (
    <div className="screen">
      <div className="scroll-area">
        <div className="project-page">
          <main className="log-proj-main">

            <header className="header">
              <div className="header-title">내가 쌓은 시간들</div>
            </header>

            <nav className="tabs">
              <Link to="/log" className="tab">캘린더</Link>
              <Link to="/log/feed" className="tab">로그 피드</Link>
              <Link to="/log/project" className="tab tab--active">프로젝트</Link>
            </nav>

            <div className="contents">

              {/* 진행 중인 프로젝트 */}
              <div className="section">
                <h2 className="section-title section-title--dark">항해 중인 궤적 (2)</h2>

                <div className="card-ongoing">
                  <div className="card-img-box">
                    <img src="/images/project_figma_icon.png" alt="피그마 아이콘" />
                  </div>
                  <div className="card-body">
                    <p className="card-title">피그마 오토레이아웃 마스터 클래스</p>
                    <div className="progress-track">
                      <div className="progress-fill progress-fill--gold"></div>
                    </div>
                    <p className="card-meta">총 12개의 기록이 담겨있어요</p>
                  </div>
                </div>

                <div className="card-ongoing">
                  <div className="card-img-box">
                    <img src="/images/daily_book_cover.png" alt="Lean 스타트업" />
                  </div>
                  <div className="card-body">
                    <p className="card-title">Lean 스타트업 완독하기</p>
                    <div className="progress-track">
                      <div className="progress-fill progress-fill--sage"></div>
                    </div>
                    <p className="card-meta">총 8개의 기록이 담겨있어요</p>
                  </div>
                </div>
              </div>

              {/* 완료된 프로젝트 */}
              <div className="section">
                <h2 className="section-title section-title--gray">빛을 발한 성좌들 (1)</h2>

                <div className="card-completed">
                  <div className="card-completed-img">
                    <img src="/images/project_completed_icon.svg" alt="완료 아이콘" />
                  </div>
                  <div className="card-completed-body">
                    <p className="card-title">나만의 포트폴리오 1차 완성</p>
                    <p className="card-meta">총 24개의 기록 • 2026.04.10 완료</p>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

      <BottomNav active="log" />
    </div>
  )
}
