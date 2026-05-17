import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/detail_magazine.css'

const STORAGE_KEY = 'route_saved_magazine1'

export default function DetailMag1Page() {
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
      localStorage.setItem(STORAGE_KEY + '_title', '실무에서 바로 쓰는 피그마 오토레이아웃 활용 팁 10가지')
      localStorage.setItem(STORAGE_KEY + '_type', '매거진')
      localStorage.setItem(STORAGE_KEY + '_href', 'detail/mag/1')
      setSaved(true)
      showToast('로그에 저장되었습니다')
    }
  }

  const CONTENT_ITEMS = [
    { title: '01. 버튼 패딩 설정 최적화', body: '버튼의 크기를 고정하지 않고 오토레이아웃의 패딩 값을 사용하여 텍스트 길이에 따라 유동적으로 변하는 컴포넌트를 구성하는 방법입니다.', img: '/images/mag_content1_img.svg' },
    { title: '02. 텍스트 길이에 대응하는 카드 레이아웃', body: '콘텐츠의 양에 따라 높이가 자동으로 조절되는 카드 시스템을 구축하여 반응형 디자인의 효율성을 높이는 전략을 알아봅니다.', img: '/images/mag_content2_img.svg' },
    { title: '03. Packed vs Space between 활용', body: '요소들 사이의 간격을 일정하게 유지할지, 혹은 가용한 전체 공간을 채울지에 따라 적절한 정렬 방식을 선택하는 기준을 제시합니다.', img: '/images/mag_content3_img.svg' },
    { title: '04. Absolute Position으로 자유로운 배치', body: '오토레이아웃 내부에서도 특정 요소를 절대 좌표로 고정하여 뱃지나 알림 아이콘 등을 자연스럽게 배치하는 고급 기술입니다.', img: '/images/mag_content4_img.svg' },
    { title: '05. Wrap 기능을 활용한 그리드 구현', body: '화면 너비에 따라 아이템이 자동으로 다음 줄로 넘어가는 Wrap 기능을 사용하여 복잡한 그리드 레이아웃을 손쉽게 관리하는 법을 배웁니다.', img: '/images/mag_content5_img.svg' },
    { title: '06. Min/Max Width로 제약 조건 설정', body: '디자인이 너무 커지거나 작아지지 않도록 최소/최대 너비와 높이를 설정하여 기기별 최적화된 시각적 균형을 유지하는 방법입니다.', img: '/images/mag_content6_img.svg' },
    { title: '07. Z-index와 아바타 스택 정렬', body: '여러 개의 요소가 겹치는 아바타 스택 등의 디자인에서 레이어 순서(Canvas Stacking)를 조정하여 원하는 순서로 겹치게 만드는 팁입니다.', img: '/images/mag_content7_img.svg' },
    { title: '08. Baseline Alignment로 텍스트 정렬', body: '크기가 다른 텍스트들이 섞여 있을 때, 폰트의 기준선(Baseline)을 맞춰 시각적으로 훨씬 깔끔하고 정돈된 느낌을 주는 정렬법입니다.', img: '/images/mag_content8_img.svg' },
    { title: '09. 중첩(Nesting) 구조 설계 원칙', body: '복잡한 UI를 구성할 때 오토레이아웃을 효율적으로 중첩하여 유지보수가 쉽고 확장이 용이한 컴포넌트 구조를 설계하는 핵심 원칙입니다.', img: '/images/mag_content9_img.svg' },
    { title: '10. Component Properties 연동', body: '오토레이아웃과 컴포넌트 속성을 연동하여 디자인 시스템 내에서 하나의 원본으로 수십 개의 변형을 제어하는 워크플로우를 완성합니다.', img: '/images/mag_content10_img.svg' },
  ]

  return (
    <div className="screen">
      <div className="scroll-area">
        <main className="mag-main">

          <header className="detail-header">
            <button className="header-btn" onClick={() => navigate(-1)}>
              <img src="/images/detail_btn_back.svg" alt="뒤로가기" />
            </button>
            <div className="header-title">매거진</div>
            <button className="header-btn" onClick={toggleBookmark}>
              <img
                src={saved ? '/images/detail_btn_bookmark.svg' : '/images/mag_btn_bookmark.svg'}
                alt="북마크"
              />
            </button>
          </header>

          <div className="contents">

            {/* 섹션 헤더 */}
            <section className="section-header">
              <div className="header-title-box">
                <div className="section-tag">
                  <span className="tag">#Figma</span>
                  <span className="tag">#오토레이아웃</span>
                  <span className="tag">#실무팁</span>
                </div>
                <div className="text-box">
                  <h1 className="hero-title">실무에서 바로 쓰는 피그마<br />오토레이아웃 활용 팁 10가지</h1>
                  <p className="hero-subtitle">디자인 효율을 극대화하고 협업을 매끄럽게 만드는 오토레이아웃의 핵심 기능과 실무 활용 사례를 정리했습니다.</p>
                </div>
              </div>
              <div className="header-img-box">
                <img src="/images/mag_header_img.svg" alt="커버 이미지" className="cover-img" />
              </div>
            </section>

            {/* 본문 10개 섹션 */}
            <section className="section-content">
              {CONTENT_ITEMS.map((item, i) => (
                <div className="content-box" key={i}>
                  <div className="content-text-box">
                    <h2 className="content-title">{item.title}</h2>
                    <p className="content-body">{item.body}</p>
                  </div>
                  <div className="content-img-box">
                    <img src={item.img} alt={item.title} />
                  </div>
                </div>
              ))}
            </section>

          </div>
        </main>
      </div>

      {/* 북마크 토스트 */}
      <div className={`bookmark-toast${toastVisible ? '' : ' is-hidden'}`}>
        <span className="toast-text">{toast}</span>
      </div>
    </div>
  )
}
