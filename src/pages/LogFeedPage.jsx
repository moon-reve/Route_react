import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/common.css'
import '../styles/log_feed.css'

function getSavedItems() {
  const items = []
  Object.keys(localStorage).filter(k =>
    k.startsWith('route_saved_') && !k.includes('_date') && !k.includes('_title') && !k.includes('_type') && !k.includes('_href')
  ).forEach(k => {
    if (localStorage.getItem(k) !== 'true') return
    const dateStr = localStorage.getItem(k + '_date')
    if (!dateStr) return
    items.push({
      key: k,
      date: dateStr,
      title: localStorage.getItem(k + '_title') || '',
      type: localStorage.getItem(k + '_type') || '',
      href: localStorage.getItem(k + '_href') || '',
    })
  })
  items.sort((a, b) => b.date.localeCompare(a.date))
  return items
}

function formatDate(dateStr) {
  const p = dateStr.split('-')
  return `${p[0]}. ${p[1]}. ${p[2]}`
}

export default function LogFeedPage() {
  const navigate = useNavigate()
  const [savedItems, setSavedItems] = useState([])

  useEffect(() => {
    setSavedItems(getSavedItems())
  }, [])

  const totalCount = 42 + savedItems.length

  return (
    <div className="screen">
      <div className="scroll-area">
        <div className="feed-page">
          <main className="log-feed-main">

            <header className="header">
              <div className="header-title">내가 쌓은 시간들</div>
            </header>

            <nav className="tabs">
              <Link to="/log" className="tab">캘린더</Link>
              <Link to="/log/feed" className="tab tab--active">로그 피드</Link>
              <Link to="/log/project" className="tab">프로젝트</Link>
            </nav>

            <div className="contents">

              <div className="filter-area">
                <span className="filter-count">총 {totalCount}개의 기록</span>
                <div className="filter-sort">
                  <span className="filter-label">최신순</span>
                  <img src="/images/log_filter_arrow.svg" alt="정렬" className="filter-arrow" />
                </div>
              </div>

              <div className="articles">

                {/* 저장된 항목 */}
                {savedItems.length > 0 && (
                  <>
                    <div className="saved-section-header">
                      <span className="saved-section-label">저장된 항목 ({savedItems.length})</span>
                    </div>
                    {savedItems.map((item, i) => (
                      <div
                        key={i}
                        className="article article--saved"
                        onClick={() => item.href && navigate('/' + item.href)}
                        style={item.href ? { cursor: 'pointer' } : undefined}
                      >
                        <div className="article-meta">
                          <span className="article-date">{formatDate(item.date)}</span>
                          <span className="article-badge badge--blue">[저장] {item.type}</span>
                        </div>
                        <p className="article-text">{item.title}</p>
                      </div>
                    ))}
                  </>
                )}

                {/* 하드코딩 아티클들 */}
                <div className="article">
                  <div className="article-meta" style={{ width: '97px' }}>
                    <span className="article-date">2026. 05. 08</span>
                    <span className="article-badge badge--gold">[인강] 피그마 기초</span>
                  </div>
                  <p className="article-text">오토레이아웃에서 Hug 속성 쓸 때 패딩 주의할 것.<br />여백 계산이 헷갈림.</p>
                  <div className="article-img-box">
                    <img src="/images/log_card_img.png" alt="참고 이미지" />
                  </div>
                </div>

                <div className="article">
                  <div className="article-meta" style={{ width: '92px' }}>
                    <span className="article-date">2026. 05. 06</span>
                    <span className="article-badge badge--sage">[도서] UX 심리학</span>
                  </div>
                  <p className="article-text">사용자는 기다리지 않는다. 로딩 애니메이션의 중요성 파악.</p>
                </div>

                <div className="article">
                  <div className="article-meta" style={{ width: '115px' }}>
                    <span className="article-date">2026. 05. 02</span>
                    <span className="article-badge badge--orange">[프로젝트] 포트폴리오</span>
                  </div>
                  <p className="article-text">내러티브 중심의 케이스 스터디 작성 중. 불필요한 시각적 장식보다는 문제 해결 과정에 집중하기로 함.</p>
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
