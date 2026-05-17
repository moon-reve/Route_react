import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/global.css'
import '../styles/archive.css'

export default function ArchivePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('UI 프로토타입')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [activeChip, setActiveChip] = useState('링크')

  return (
    <div className="app-container ar-app">
      <main className="ar-main">
        <header className="ar-header">
          <div className="ar-header__left">
            <button className="ar-header__back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
              <img src="/images/ic_back_btn.svg" className="ar-header__back-icon" alt="뒤로가기" />
            </button>
            <span className="ar-header__title">결과물 보관함</span>
          </div>
        </header>

        <div className="ar-editorial">
          <span className="ar-editorial__label">Archive</span>
          <h1 className="ar-editorial__heading">디자인 에셋 보관함</h1>
        </div>

        <div className="ar-tab-wrap">
          <div className="ar-tabs">
            {['UI 프로토타입', '케이스스터디'].map(tab => (
              <button
                key={tab}
                className={`ar-tab${activeTab === tab ? ' ar-tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >{tab}</button>
            ))}
          </div>
        </div>

        <div className="ar-list">
          <div className="ar-card ar-card--large">
            <div className="ar-card__image">
              <div className="ar-card__image-bg">
                <span className="ar-card__image-label">Interaction Design Preview</span>
              </div>
              <span className="ar-card__badge">Active</span>
            </div>
            <div className="ar-card__body">
              <div className="ar-card__title-wrap">
                <h3 className="ar-card__title">A 서비스 메인 인터랙션 분석</h3>
              </div>
              <p className="ar-card__desc">사용자 전환율 개선을 위한 주요 인터랙션 흐름 및 모션 가이드라인 정리본</p>
              <div className="ar-card__footer">
                <div className="ar-card__type-tags">
                  <span className="ar-card__type-tag">
                    <img src="/images/icon_tag_proto.svg" className="ar-card__type-icon" alt="" />Proto
                  </span>
                  <span className="ar-card__type-tag">
                    <img src="/images/icon_tag_memo.svg" className="ar-card__type-icon" alt="" />Memo
                  </span>
                </div>
                <span className="ar-card__date">MAR 24, 2024</span>
              </div>
            </div>
          </div>

          <div className="ar-card ar-card--standard">
            <div className="ar-card__body ar-card__body--pad">
              <div className="ar-card__title-row">
                <h3 className="ar-card__title">결제 프로세스 개선안 프로토타입</h3>
                <img src="/images/icon_card_arrow.svg" className="ar-card__more-icon" alt="" />
              </div>
              <p className="ar-card__desc">이탈률이 높은 단계에서의 UI 큐레이션 및 간편 결제 UX 심화 분석 아카이브</p>
              <div className="ar-card__meta">
                <div className="ar-card__keywords">
                  <span className="ar-card__keyword">FINTECH</span>
                  <span className="ar-card__keyword">UX</span>
                </div>
                <div className="ar-card__avatars">
                  <div className="ar-avatar ar-avatar--light">JS</div>
                  <div className="ar-avatar ar-avatar--dark">MK</div>
                </div>
              </div>
            </div>
          </div>

          <div className="ar-card ar-card--horizontal">
            <img src="/images/icon_archive_thumb.svg" className="ar-card__thumb" alt="" />
            <div className="ar-card__info">
              <h4 className="ar-card__title-sm">온보딩 UX 리서치 요약</h4>
              <p className="ar-card__modified">최종 수정: 2일 전</p>
            </div>
            <img src="/images/icon_card_chevron.svg" className="ar-card__chevron-sm" alt="" />
          </div>
        </div>
      </main>

      <button className="ar-fab" aria-label="인사이트 추가" onClick={() => setSheetOpen(true)}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V16M4 10H16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      <BottomNav />
      <div className="ar-home-indicator"></div>

      <div className={`ar-overlay${sheetOpen ? ' is-visible' : ''}`} onClick={() => setSheetOpen(false)}></div>
      <div className={`ar-sheet${sheetOpen ? ' is-open' : ''}`}>
        <div className="ar-sheet__handle-wrap"><div className="ar-sheet__handle"></div></div>
        <div className="ar-sheet__header">
          <h2 className="ar-sheet__title">새로운 인사이트 기록</h2>
          <button className="ar-sheet__close" onClick={() => setSheetOpen(false)} aria-label="닫기">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="#1A1C1E" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="ar-sheet__content">
          <div className="ar-sheet__section">
            <span className="ar-sheet__label">카테고리 선택</span>
            <div className="ar-chips">
              {['링크', '이미지', '메모'].map(chip => (
                <button
                  key={chip}
                  className={`ar-chip${activeChip === chip ? ' ar-chip--active' : ''}`}
                  onClick={() => setActiveChip(chip)}
                >{chip}</button>
              ))}
            </div>
          </div>
          <div className="ar-sheet__section">
            <span className="ar-sheet__label">링크(URL) 입력</span>
            <div className="ar-sheet__input">
              <input type="url" className="ar-sheet__input-field" placeholder="https://" />
            </div>
          </div>
          <div className="ar-sheet__section ar-sheet__section--note">
            <span className="ar-sheet__label">한 줄 메모 (선택)</span>
            <div className="ar-sheet__textarea">
              <textarea className="ar-sheet__textarea-field" placeholder="이 레퍼런스의 어떤 점이 인상적이었나요?" rows={3}></textarea>
            </div>
          </div>
          <button className="ar-sheet__save">보관함에 저장하기</button>
        </div>
      </div>
    </div>
  )
}
