import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/login.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="screen">
      {/* 배경 */}
      <img className="login-bg" src="/images/login_bg.svg" alt="" />

      {/* 메인 콘텐츠 */}
      <main className="login-main">

        {/* 헤더 섹션 */}
        <section className="header-section">
          <div className="logo-row">
            <img src="/images/login_logo.svg" alt="Route 로고" className="logo-img" />
            <span className="logo-text">Route</span>
          </div>
          <h1 className="heading">새로운 커리어를<br />찾아보세요</h1>
          <p className="subtext">개인화된 성장 구조와 구조적 통찰력을 확인하세요.</p>
        </section>

        {/* 액션 섹션 */}
        <section className="action-section">
          <button className="login-btn login-btn-kakao" onClick={() => navigate('/home')}>
            <img src="/images/ic_kakao.svg" alt="" className="btn-icon" />
            <span>카카오톡으로 로그인</span>
          </button>

          <button className="login-btn login-btn-google" onClick={() => navigate('/home')}>
            <img src="/images/ic_google.svg" alt="" className="btn-icon" />
            <span>구글로 로그인</span>
          </button>

          <div className="footer-link">
            <button className="link-btn" onClick={() => setModalOpen(true)}>다른 방법으로 로그인</button>
          </div>
        </section>
      </main>

      {/* 오버레이 */}
      {modalOpen && (
        <div className="overlay active" onClick={() => setModalOpen(false)} />
      )}

      {/* 로그인 모달 */}
      <div className={`modal${modalOpen ? ' active' : ''}`}>
        <div className="modal-handle"></div>

        <h2 className="modal-title">다른 방법으로 로그인</h2>

        <div className="modal-buttons">
          <button className="login-btn login-btn-line" onClick={() => navigate('/home')}>
            <img src="/images/ic_line.svg" alt="" className="btn-icon" />
            <span>LINE으로 로그인</span>
          </button>

          <button className="login-btn login-btn-linkedin" onClick={() => navigate('/home')}>
            <img src="/images/ic_linkedin.svg" alt="" className="btn-icon" />
            <span>LinkedIn으로 로그인</span>
          </button>

          <button className="login-btn login-btn-github" onClick={() => navigate('/home')}>
            <img src="/images/ic_github.svg" alt="" className="btn-icon" />
            <span>GitHub로 로그인</span>
          </button>

          <button className="login-btn login-btn-phone" onClick={() => navigate('/home')}>
            <img src="/images/ic_phone.svg" alt="" className="btn-icon" />
            <span>휴대폰/이메일로 로그인</span>
          </button>
        </div>

        <div className="guest-section">
          <button className="guest-btn" onClick={() => navigate('/home')}>비회원으로 둘러보기</button>
        </div>
      </div>
    </div>
  )
}
