import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/detail_card.css'

const STORAGE_KEY = 'route_saved_card1'

export default function DetailCard1Page() {
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [toast, setToast] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => {
    setSaved(localStorage.getItem(STORAGE_KEY) === 'true')
  }, [])

  const showToast = (msg) => {
    setToast(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2000)
  }

  const toggleBookmark = () => {
    if (saved) {
      [STORAGE_KEY, STORAGE_KEY + '_date', STORAGE_KEY + '_title', STORAGE_KEY + '_type', STORAGE_KEY + '_href'].forEach(k => localStorage.removeItem(k))
      setSaved(false)
      showToast('로그에서 삭제되었습니다')
    } else {
      const date = new Date().toISOString().slice(0, 10)
      localStorage.setItem(STORAGE_KEY, 'true')
      localStorage.setItem(STORAGE_KEY + '_date', date)
      localStorage.setItem(STORAGE_KEY + '_title', '헷갈리는 UI/UX 필수 용어')
      localStorage.setItem(STORAGE_KEY + '_type', '아티클')
      localStorage.setItem(STORAGE_KEY + '_href', 'detail/card/1')
      setSaved(true)
      showToast('로그에 저장되었습니다')
    }
  }

  return (
    <div className="screen">
      <div className="scroll-area">
        <main className="detail-main">

          <header className="detail-header">
            <button className="header-btn" onClick={() => navigate(-1)}>
              <img src="/images/detail_btn_back.svg" alt="뒤로가기" />
            </button>
            <div className="header-title">1분 나침반</div>
            <button className="header-btn" onClick={toggleBookmark}>
              <img
                src={saved ? '/images/detail_btn_bookmark.svg' : '/images/mag_btn_bookmark.svg'}
                alt="북마크"
              />
            </button>
          </header>

          {/* 히어로 섹션 */}
          <section className="section-hero">
            <div className="section-header-info">
              <div className="section-tag">
                <span className="tag">#기초사전</span>
                <span className="tag">#UI/UX</span>
              </div>
              <h1 className="hero-title">헷갈리는 UI/UX 필수 용어</h1>
              <p className="hero-subtitle">와이어프레임과 프로토타입, 어떻게 다를까?</p>
            </div>
            <div className="cover-image-box">
              <img src="/images/detail_cover_img.svg" alt="커버 이미지" className="cover-img" />
            </div>
          </section>

          {/* 본문 콘텐츠 */}
          <section className="section-content">

            <div className="article-term">
              <div className="article-text-box">
                <h2 className="article-term-title">1. Wireframe (와이어프레임)</h2>
                <p className="article-body">와이어프레임은 제품의 골격을 그리는 과정입니다. 색상이나 구체적인 그래픽 요소보다는 레이아웃, 정보 구조, 사용자 흐름에 집중하여 설계도면 역할을 수행합니다. 팀원 간의 빠른 구조적 합의를 이끌어내는 데 목적이 있습니다.</p>
              </div>
              <div className="article-img-box">
                <img src="/images/detail_article1_img.svg" alt="Wireframe 일러스트" />
              </div>
            </div>

            <div className="article-term">
              <div className="article-text-box">
                <h2 className="article-term-title">2. Prototype (프로토타입)</h2>
                <p className="article-body">프로토타입은 실제 사용자와의 상호작용을 테스트하기 위해 만들어진 시제품입니다. 클릭이나 스크롤 같은 동작이 구현되어 있어, 개발 전 단계에서 사용성을 검증하고 문제점을 발견하는 데 매우 효과적입니다.</p>
              </div>
              <div className="article-img-box">
                <img src="/images/detail_article2_img.svg" alt="Prototype 일러스트" />
              </div>
            </div>

            <div className="article-term">
              <div className="article-text-box">
                <p className="article-body">결론적으로 와이어프레임은 정적인 '설계도'이며, 프로토타입은 동적인 '시제품'이라고 이해하면 쉽습니다. 기획 초기 단계에서는 와이어프레임으로 구조를 잡고, 디자인이 구체화되면 프로토타입으로 검증합니다.</p>
              </div>
            </div>

          </section>

        </main>
      </div>

      {/* 북마크 토스트 */}
      <div className={`bookmark-toast${toastVisible ? '' : ' is-hidden'}`}>
        <span className="toast-text">{toast}</span>
      </div>
    </div>
  )
}
