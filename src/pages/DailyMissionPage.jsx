import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/daily_mission.css'

const TRASH_ICON = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.25 4.5h13.5M6 4.5V3h6v1.5M7.5 8.25v5.25M10.5 8.25v5.25M3.75 4.5l.75 10.5h9l.75-10.5" stroke="#E53E3E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const INITIAL_CARDS = [
  { id: 'card-0', type: 'video' },
  { id: 'card-1', type: 'book' },
  { id: 'card-2', type: 'project' },
]

export default function DailyMissionPage() {
  const navigate = useNavigate()
  const [cards, setCards] = useState(INITIAL_CARDS)
  const [editMode, setEditMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)

  const toggleEditMode = () => {
    setEditMode(prev => !prev)
    setMenuOpen(false)
  }

  const openDeleteModal = (id) => {
    setDeleteTargetId(id)
  }

  const closeDeleteModal = () => {
    setDeleteTargetId(null)
  }

  const confirmDelete = () => {
    if (deleteTargetId) {
      setCards(prev => prev.filter(c => c.id !== deleteTargetId))
      setDeleteTargetId(null)
    }
  }

  return (
    <div className="screen">
      <div className="scroll-area">
        <div className="daily-container">
          <main className="mission-main">

            <header className="header">
              <button className="btn-back" onClick={() => navigate(-1)}>
                <img src="/images/detail_btn_back.svg" alt="뒤로가기" />
              </button>
              <div className="header-title">5월 8일의 항로</div>
              <div className="menu-wrap">
                <button
                  className="btn-menu"
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(prev => !prev) }}
                >
                  <img src="/images/feedback_btn_chat.svg" alt="메뉴" />
                </button>
                {menuOpen && (
                  <div className="menu-popover is-open" onClick={(e) => e.stopPropagation()}>
                    <button className="menu-popover-btn" onClick={toggleEditMode}>
                      {editMode ? '편집완료' : '편집'}
                    </button>
                  </div>
                )}
              </div>
            </header>

            <div className="contents">
              <h1 className="section-title">오늘의 미션</h1>

              {cards.map(card => {
                if (card.type === 'video') return (
                  <div className="card-video" key={card.id}>
                    {editMode && (
                      <button className="btn-trash is-visible" aria-label="삭제" onClick={() => openDeleteModal(card.id)}>
                        {TRASH_ICON}
                      </button>
                    )}
                    <div className="video-box">
                      <img src="/images/daily_thumbnail.png" alt="썸네일" className="thumbnail" />
                      <img src="/images/daily_play_btn.svg" alt="재생" className="play-btn" />
                    </div>
                    <div className="bottom-box">
                      <div className="card-text">
                        <div className="card-title-row">
                          <span className="badge badge--gold">[인강]</span>
                          <span className="card-title">피그마 오토레이아웃 기초</span>
                        </div>
                        <span className="card-sub">23분 소요</span>
                      </div>
                      <button className="card-btn">강의 들으러 가기</button>
                    </div>
                  </div>
                )

                if (card.type === 'book') return (
                  <div className="card-book" key={card.id}>
                    {editMode && (
                      <button className="btn-trash is-visible" aria-label="삭제" onClick={() => openDeleteModal(card.id)}>
                        {TRASH_ICON}
                      </button>
                    )}
                    <div className="book-img-box">
                      <img src="/images/daily_book_cover.png" alt="도서 커버" />
                    </div>
                    <div className="book-right">
                      <div className="book-info">
                        <span className="badge badge--sage">[도서]</span>
                        <span className="card-title">린 스타트업 - 애시 모리아</span>
                        <span className="card-sub">p.12 ~ p.34</span>
                      </div>
                      <div className="book-btn-box">
                        <button className="card-btn card-btn--sm">이어보기</button>
                      </div>
                    </div>
                  </div>
                )

                if (card.type === 'project') return (
                  <div className="card-project" key={card.id}>
                    {editMode && (
                      <button className="btn-trash is-visible" aria-label="삭제" onClick={() => openDeleteModal(card.id)}>
                        {TRASH_ICON}
                      </button>
                    )}
                    <div className="project-text">
                      <div className="project-title-box">
                        <span className="badge badge--orange">[프로젝트]</span>
                        <span className="card-title">포트폴리오 리뉴얼</span>
                      </div>
                      <div className="project-list">
                        <div className="list-item">
                          <img src="/images/daily_check_done.svg" alt="완료" className="check-icon" />
                          <span className="list-text">앱 기획하기</span>
                        </div>
                        <div className="list-item">
                          <img src="/images/daily_check_done.svg" alt="완료" className="check-icon" />
                          <span className="list-text">와이어프레임 뼈대 구축</span>
                        </div>
                        <div className="list-item">
                          <img src="/images/daily_check_todo.svg" alt="미완료" className="check-icon" />
                          <span className="list-text list-text--todo">브랜딩 컬러 도출</span>
                        </div>
                      </div>
                    </div>
                    <button className="card-btn">작업 시작하기</button>
                  </div>
                )

                return null
              })}
            </div>
          </main>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {deleteTargetId && (
        <div className="modal-overlay is-open">
          <div className="modal-card">
            <p className="modal-title">삭제하시겠습니까?</p>
            <div className="modal-btns">
              <button className="modal-btn modal-btn--gray" onClick={closeDeleteModal}>취소</button>
              <button className="modal-btn modal-btn--charcoal" onClick={confirmDelete}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
