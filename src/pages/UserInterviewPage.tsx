import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/user_interview.css'

export default function UserInterviewPage() {
  const navigate = useNavigate()
  const [checks, setChecks] = useState([true, false, false])

  const interviewees = [
    { name: '김민수 님', role: 'Product Designer, A사', avatar: 'avatar_interviewee_1-56586a.png', status: 'done', statusLabel: '완료' },
    { name: '이영희 님', role: 'Marketing Manager, B사', avatar: 'avatar_interviewee_2-56586a.png', status: 'active', statusLabel: '섭외 중' },
    { name: 'TBD', role: '추천 인터뷰이 검색 중', avatar: '', status: 'tbd', statusLabel: '미정' },
  ]

  const done = interviewees.filter(i => i.status === 'done').length
  const total = interviewees.length
  const fillPct = Math.round(done / total * 100)

  return (
    <div className="app-container ui-app">
      <main className="ui-main">
        <header className="ui-header">
          <button className="ui-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            <img src="/images/ic_back_btn.svg" className="ui-header__back-icon" alt="뒤로가기" />
          </button>
          <span className="ui-header__title">유저 인터뷰 및 인사이트 도출</span>
        </header>

        <section className="ui-progress">
          <div className="ui-progress__top">
            <span className="ui-progress__label">현재 진행 상황</span>
            <div className="ui-progress__count">
              <span className="ui-progress__num">{done}</span>
              <span className="ui-progress__denom">/ {total}</span>
              <span className="ui-progress__unit">명 완료</span>
            </div>
          </div>
          <div className="ui-progress__bar">
            <div className="ui-progress__fill" style={{ width: `${fillPct}%` }}></div>
          </div>
        </section>

        <section className="ui-section">
          <div className="ui-section__header">
            <h3 className="ui-section__title">인터뷰이 관리</h3>
            <span className="ui-section__link">전체보기</span>
          </div>
          <div className="ui-interviewee-list">
            {interviewees.map((iv, i) => (
              <div key={i} className={`ui-interviewee${iv.status === 'done' ? ' ui-interviewee--done' : iv.status === 'active' ? ' ui-interviewee--active' : ''}`}>
                <div className="ui-interviewee__left">
                  <div className="ui-interviewee__avatar">
                    {iv.avatar
                      ? <img src={`/images/${iv.avatar}`} alt={iv.name} />
                      : <img src="/images/icon_person_placeholder.svg" alt="TBD" className="ui-interviewee__avatar-placeholder" />}
                  </div>
                  <div className="ui-interviewee__info">
                    <span className="ui-interviewee__name">{iv.name}</span>
                    <span className="ui-interviewee__role">{iv.role}</span>
                  </div>
                </div>
                <span className={`ui-badge ui-badge--${iv.status}`}>{iv.statusLabel}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ui-section">
          <div className="ui-guide-heading">
            <h3 className="ui-section__title">가이드 및 체크리스트</h3>
            <p className="ui-guide-heading__desc">페르소나 정의를 위한 인터뷰를 진행 중입니다.<br />아래 항목을 체크해 주세요.</p>
          </div>
          <div className="ui-checklist">
            {['질문지 확정 및 팀 공유', '녹취 및 촬영 동의서 준비', '사례비(기프트카드) 구매 완료'].map((text, i) => (
              <div key={i} className="ui-check-item" onClick={() => setChecks(prev => prev.map((v, idx) => idx === i ? !v : v))}>
                <div className={`ui-check-item__box${checks[i] ? ' ui-check-item__box--checked' : ''}`}></div>
                <span className="ui-check-item__text">{text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ui-files-section">
          <h3 className="ui-files-section__title">첨부 자료</h3>
          <div className="ui-files">
            <div className="ui-file-upload">
              <img src="/images/icon_upload.svg" className="ui-file-upload__icon" alt="" />
              <span className="ui-file-upload__label">파일 업로드</span>
            </div>
            <div className="ui-file-card">
              <img src="/images/icon_file_attached.svg" className="ui-file-card__icon" alt="" />
              <div className="ui-file-card__info">
                <span className="ui-file-card__name">interview_script.pdf</span>
                <span className="ui-file-card__size">2.4 MB</span>
              </div>
            </div>
          </div>
        </section>

        <div className="ui-cta">
          <button className="ui-cta__btn">인터뷰 기록 추가하기</button>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
