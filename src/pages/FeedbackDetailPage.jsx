import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/feedback_detail.css'

const INITIAL_CHECKLIST = [
  { id: 1, text: '경쟁 앱 3개 이상 분석 추가', done: false },
  { id: 2, text: '핵심 차별점 1문장으로 정리', done: false },
  { id: 3, text: '와이어프레임에 사용자 시나리오 연결', done: false },
]

export default function FeedbackDetailPage() {
  const navigate = useNavigate()
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST)
  const [modalOpen, setModalOpen] = useState(false)

  const toggleTask = (id) => {
    setChecklist(prev => prev.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    ))
  }

  return (
    <div className="screen">
      <img src="/images/feedback_bg.svg" alt="" className="feedback-bg" />

      <div className="scroll-area">
        <div className="feedback-page">
          <main className="feedback-main">

            <header className="header">
              <button className="btn-back" onClick={() => navigate(-1)}>
                <img src="/images/detail_btn_back.svg" alt="뒤로가기" />
              </button>
              <h1 className="header-title">피드백 상세 확인</h1>
              <div className="header-placeholder"></div>
            </header>

            <div className="content">

              {/* ① 프로젝트 정보 카드 */}
              <div className="project-card">
                <p className="project-title">포트폴리오 리뉴얼 - 앱 기획 (Week 03)</p>
                <div className="project-meta">
                  <span className="meta-text">제출일: 2026. 05. 08</span>
                  <div className="meta-divider"></div>
                  <span className="meta-text">피드백 도착: 2시간 전</span>
                </div>
              </div>

              {/* ② 멘토 프로필 */}
              <div className="mentor-section">
                <div className="mentor-info">
                  <div className="mentor-avatar">
                    <img src="/images/feedback_mentor_img-54fef9.png" alt="멘토 J.young" />
                  </div>
                  <div className="mentor-text">
                    <div className="mentor-name-row">
                      <span className="mentor-name">J.young</span>
                      <span className="mentor-badge">EXPERT</span>
                    </div>
                    <span className="mentor-role">Senior Product Designer</span>
                  </div>
                </div>
                <div className="chat-wrap">
                  {modalOpen && (
                    <div className="profile-modal is-open" onClick={(e) => e.stopPropagation()}>
                      <button className="profile-modal-btn" onClick={() => navigate('/expert')}>프로필 보기</button>
                    </div>
                  )}
                  <button
                    className="btn-chat"
                    onClick={(e) => { e.stopPropagation(); setModalOpen(prev => !prev) }}
                  >
                    <img src="/images/feedback_btn_chat.svg" alt="질문하기" />
                  </button>
                </div>
              </div>

              {/* ③ 피드백 상세 코멘트 */}
              <div className="comment-section">
                <div className="comment-heading">
                  <p className="comment-label">J.young 멘토가 남긴 피드백</p>
                  <p className="comment-title">앱 기획의 방향성이 명확하고<br />실현 가능성이 높습니다.</p>
                </div>
                <div className="comment-cards">
                  <div className="comment-card comment-card--good">
                    <div className="comment-card-header">
                      <img src="/images/feedback_icon_good.svg" alt="" className="comment-icon" />
                      <span className="comment-card-title">좋은 점</span>
                    </div>
                    <p className="comment-body">앱의 핵심 기능을 명확히 정의하고 사용자 흐름을 논리적으로 구성하셨어요. 특히 온보딩 플로우의 단계별 설계가 탄탄합니다.</p>
                  </div>
                  <div className="comment-card comment-card--improve">
                    <div className="comment-card-header">
                      <img src="/images/feedback_icon_improve.svg" alt="" className="comment-icon" />
                      <span className="comment-card-title">개선 제안</span>
                    </div>
                    <p className="comment-body">다만, 경쟁 앱 분석이 조금 더 구체적이면 좋겠어요.<br />유사 서비스와의 차별점을 명시하면 기획의 설득력이 더욱 높아질 것 같습니다.</p>
                  </div>
                </div>
              </div>

              {/* ④ 추천 개선 과제 */}
              <div className="checklist-section">
                <p className="checklist-title">멘토의 추천 개선 과제</p>
                <div className="checklist">
                  {checklist.map(item => (
                    <div
                      key={item.id}
                      className={`checklist-item${item.done ? ' checklist-item--done' : ''}`}
                      onClick={() => toggleTask(item.id)}
                    >
                      <img
                        src={item.done ? '/images/feedback_icon_task_done.svg' : '/images/feedback_icon_task_todo.svg'}
                        alt=""
                        className="task-icon"
                      />
                      <span className="task-text">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ⑤ 하단 버튼 */}
              <div className="footer-btns">
                <button className="btn-secondary">추가 질문하기</button>
                <button className="btn-primary">피드백 반영 및 업데이트</button>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
