import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import '../styles/common.css'
import '../styles/home.css'

const CATEGORY_COLORS = {
  design:    [232, 148, 26],
  dev:       [71,  181, 167],
  plan:      [158, 144, 188],
  marketing: [212, 132, 154],
}

const CHIP_COLOR_MAP = {
  '디자인': [232, 148, 26],
  '개발':   [71, 181, 167],
  '기획':   [158, 144, 188],
  '마케팅': [212, 132, 154],
}

const CAT_MAP = {
  '전체': null,
  '디자인': 'design',
  '개발': 'dev',
  '기획': 'plan',
  '마케팅': 'marketing',
}

const CARDS = [
  { category: 'design', img: '/images/home_card1_img.svg', title: '헷갈리는 UI/UX 필수 용어', text: '와이어프레임 vs 프로토타입\n핵심 용어 정복', href: '/detail/card/1' },
  { category: 'design', img: '/images/home_card2_img.svg', title: '디자인 시스템 기초 가이드', text: '일관성 있는 인터페이스를 위한 시스템 규칙' },
  { category: 'design', img: '/images/home_card3_img.svg', title: '폰트 조합의 황금비율', text: '세리프와 산세리프를 섞어 고급스러운 무드를 만드는 2:1 법칙 가이드' },
  { category: 'design', img: '/images/home_card4_img.svg', title: '그리드 시스템 101', text: '반응형 웹을 위한 12컬럼 그리드와 8px 단위 설계법의 기초' },
  { category: 'dev',    img: '/images/home_card5_img.svg', title: '컴포넌트 단위 사고방식', text: 'React 구조와 효율적인 데이터 흐름 이해' },
  { category: 'dev',    img: '/images/home_card6_img.svg', title: 'Git 핵심 명령어 가이드', text: '협업을 위한 브랜치 관리 및 커밋 기초' },
  { category: 'plan',   img: '/images/home_card7_img.svg', title: 'MVP: 핵심 기능 우선순위', text: '가설 검증을 위한 최소 기능 선별법' },
  { category: 'plan',   img: '/images/home_card8_img.svg', title: '데이터 기반 페르소나 정의', text: '실제 유저 데이터를 활용한 정교한 타겟 설계' },
  { category: 'marketing', img: '/images/home_card9_img.svg', title: '전환율(CVR) 상승 전략', text: '행동을 이끄는 CTA 배치와 컬러 심리' },
  { category: 'marketing', img: '/images/home_card10_img.svg', title: 'SEO 기초 최적화 규칙', text: '검색 엔진 노출을 위한 핵심 구조 가이드' },
]

const ARTICLES = [
  { category: 'design', img: '/images/home_article2_img.svg', title: '실무에서 바로 쓰는 피그마 오토레이아웃 활용 팁 10가지', meta: '툴 가이드 • 2026.05.15', href: '/detail/mag/1' },
  { category: 'design', img: '/images/home_article4_img.svg', title: '비전공자에서 리드 디자이너까지, 30대에 디자인을 시작해 시스템 디자인 전문가가 된 A님의 포트폴리오 전략', meta: '커리어 인터뷰 • 2026.03.22' },
  { category: 'dev',    img: '/images/home_article5_img.svg', title: 'Vercel 기반의 현대적 배포 시스템 구축', meta: '개발 트렌드 • 2026.01.15' },
  { category: 'plan',   img: '/images/home_article3_img.svg', title: '비전공자에서 네카라쿠배 디자이너로 합격한 포트폴리오 분석', meta: '디자인 트렌드 • 2025.11.08' },
  { category: 'plan',   img: '/images/home_article6_img.svg', title: '비즈니스 모델 캔버스로 설계하는 서비스 궤적', meta: '전략 가이드 • 2025.10.05' },
  { category: 'marketing', img: '/images/home_article1_img.svg', title: '생성형 AI 시대, 디자이너는 어떤 경쟁력을 갖춰야 하는가', meta: '인사이트 • 2025.08.14' },
  { category: 'marketing', img: '/images/home_article7_img.svg', title: '경험을 궤적으로 증명하는 퍼스널 브랜딩', meta: '퍼스널 브랜딩 • 2025.07.11' },
]

const CHIPS = ['전체', '디자인', '개발', '기획', '마케팅']

export default function HomePage() {
  const navigate = useNavigate()
  const [currentCategory, setCurrentCategory] = useState(null)
  const [activeChip, setActiveChip] = useState('전체')
  const [visibleArticleCount, setVisibleArticleCount] = useState(3)
  const cardListRef = useRef(null)

  // 드래그 스크롤 (모멘텀 + 엣지 바운스 + 스냅)
  useEffect(() => {
    const el = cardListRef.current
    if (!el) return
    let isDown = false
    let startX = 0
    let scrollLeft = 0
    let velocity = 0
    let lastX = 0
    let animFrame = null

    const getCardWidth = () => {
      const card = el.querySelector('[data-category]') || el.firstElementChild
      return card ? card.offsetWidth + 17 : 280
    }

    const snapToNearest = (vel) => {
      const cardW = getCardWidth()
      const maxScroll = el.scrollWidth - el.clientWidth
      let target = el.scrollLeft

      if (Math.abs(vel) > 3) {
        // 빠른 플릭: 방향으로 한 칸
        target = vel > 0
          ? Math.ceil(el.scrollLeft / cardW) * cardW
          : Math.floor(el.scrollLeft / cardW) * cardW
      } else {
        // 느린 경우: 가장 가까운 카드
        target = Math.round(el.scrollLeft / cardW) * cardW
      }

      target = Math.max(0, Math.min(target, maxScroll))
      el.scrollTo({ left: target, behavior: 'smooth' })
    }

    const stopMomentum = () => {
      if (animFrame) cancelAnimationFrame(animFrame)
      animFrame = null
    }

    const startMomentum = () => {
      stopMomentum()
      const maxScroll = el.scrollWidth - el.clientWidth
      const startVel = velocity

      const step = () => {
        velocity *= 0.88
        const next = el.scrollLeft + velocity

        // 엣지 바운스
        if (next < 0) {
          el.scrollLeft = next * 0.3
          velocity *= -0.4
        } else if (next > maxScroll) {
          el.scrollLeft = maxScroll + (next - maxScroll) * 0.3
          velocity *= -0.4
        } else {
          el.scrollLeft = next
        }

        if (Math.abs(velocity) > 0.8) {
          animFrame = requestAnimationFrame(step)
        } else {
          snapToNearest(startVel)
        }
      }
      animFrame = requestAnimationFrame(step)
    }

    const onMouseDown = (e) => {
      isDown = true
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
      lastX = e.pageX
      velocity = 0
      stopMomentum()
      el.style.scrollSnapType = 'none'
      el.style.cursor = 'grabbing'
      el.style.userSelect = 'none'
    }
    const onEnd = () => {
      if (!isDown) return
      isDown = false
      el.style.cursor = 'grab'
      el.style.userSelect = ''
      startMomentum()
      setTimeout(() => { el.style.scrollSnapType = '' }, 600)
    }
    const onMouseLeave = () => onEnd()
    const onMouseUp = () => onEnd()
    const onMouseMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      velocity = lastX - e.pageX
      lastX = e.pageX
      el.scrollLeft = scrollLeft - (x - startX)
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mousemove', onMouseMove)
    return () => {
      stopMomentum()
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  const handleChip = (label) => {
    setActiveChip(label)
    setCurrentCategory(CAT_MAP[label])
    setVisibleArticleCount(3)
    if (cardListRef.current) cardListRef.current.scrollLeft = 0
  }

  const getCardStyle = (cat) => {
    const rgb = CATEGORY_COLORS[cat] || CATEGORY_COLORS.design
    return {
      border: `1px solid rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.7)`,
    }
  }

  const getCardTextStyle = (cat) => {
    const rgb = CATEGORY_COLORS[cat] || CATEGORY_COLORS.design
    return {
      background: `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.2)`,
    }
  }

  // 카드 필터
  const getVisibleCards = () => {
    if (!currentCategory) {
      // 전체: 카테고리별 첫번째만
      const seen = new Set()
      return CARDS.filter(c => {
        if (seen.has(c.category)) return false
        seen.add(c.category)
        return true
      })
    }
    return CARDS.filter(c => c.category === currentCategory)
  }

  // 아티클 필터
  const getVisibleArticles = () => {
    if (!currentCategory) return ARTICLES.slice(0, visibleArticleCount)
    return ARTICLES.filter(a => a.category === currentCategory)
  }

  const visibleCards = getVisibleCards()
  const visibleArticles = getVisibleArticles()
  const showMoreCard = !currentCategory
  const showReadMore = !currentCategory && visibleArticleCount < ARTICLES.length

  const getChipStyle = (label) => {
    if (activeChip === label && CHIP_COLOR_MAP[label]) {
      const rgb = CHIP_COLOR_MAP[label]
      return {
        background: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`,
        borderColor: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`,
        color: '#fff',
      }
    }
    return {}
  }

  return (
    <div className="screen">
      <div className="scroll-area">
        <main className="home-main">

          <header className="home-header">
            <div className="home-header-logo">
              <img src="/images/home_logo_icon.svg" alt="Route" className="home-logo-icon" />
              <span className="home-logo-text">Route</span>
            </div>
            <img src="/images/home_alert_icon.svg" alt="알림" className="home-alert-icon" />
          </header>

          <div className="contents">

            {/* ① 히어로 + 칩 묶음 */}
            <div className="section-top">
              <section className="section-hero">
                <div className="hero-card">
                  <img className="hero-bg" src="/images/home_hero_bg.svg" alt="" />
                  <div className="hero-text">
                    <span className="hero-label">당신의 커리어,</span>
                    <span className="home-hero-title">아직 그려지지 않은 별자리입니다.</span>
                  </div>
                  <button className="hero-btn" onClick={() => navigate('/pre/1')}>항로 시작하기 →</button>
                </div>
              </section>

              {/* ② 필터 칩 */}
              <section className="section-chips">
                {CHIPS.map(label => (
                  <button
                    key={label}
                    className={`chip${activeChip === label ? ' chip--active' : ''}`}
                    style={getChipStyle(label)}
                    onClick={() => handleChip(label)}
                  >
                    {label}
                  </button>
                ))}
              </section>
            </div>

            {/* ③ 카드 슬라이드 */}
            {visibleCards.length > 0 && (
              <section className="section-cards">
                <h2 className="section-title">새로운 항로를 위한 나침반</h2>
                <div className="card-list" ref={cardListRef} style={{ cursor: 'grab' }}>
                  {visibleCards.map((card, i) => (
                    <div
                      key={i}
                      className="card"
                      style={getCardStyle(card.category)}
                      onClick={() => card.href && navigate(card.href)}
                    >
                      <div className="card-img-box">
                        <img src={card.img} alt="" />
                      </div>
                      <div className="card-text-box" style={getCardTextStyle(card.category)}>
                        <span className="card-title">{card.title}</span>
                        <p className="card-text">{card.text}</p>
                      </div>
                    </div>
                  ))}

                  {showMoreCard && (
                    <div className="card-more-btn">
                      <div className="more-circle">
                        <span className="more-arrow"></span>
                      </div>
                      <span className="card-more-text">더보기</span>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ④ 아티클 리스트 */}
            <section className="section-articles">
              <h2 className="section-title">앞서간 별들의 궤적</h2>

              {visibleArticles.map((article, i) => (
                <div
                  key={i}
                  className="article-item"
                  onClick={() => article.href && navigate(article.href)}
                  style={article.href ? { cursor: 'pointer' } : undefined}
                >
                  <img className="article-img" src={article.img} alt="" />
                  <div className="article-text">
                    <p className="article-title">{article.title}</p>
                    <p className="article-meta">{article.meta}</p>
                  </div>
                </div>
              ))}

              {showReadMore && (
                <button
                  className="read-more-btn"
                  onClick={() => setVisibleArticleCount(prev => prev + 2)}
                >
                  Read more
                </button>
              )}
            </section>

          </div>
        </main>
      </div>

      <BottomNav active="home" />
    </div>
  )
}
