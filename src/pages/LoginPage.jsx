import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/login.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="screen">
      {/* 배경 — inline SVG */}
      <svg className="login-bg" viewBox="0 0 430 932" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <clipPath id="lclip"><rect width="430" height="932" fill="white"/></clipPath>
          {/* 고리 마스크 3개 */}
          <mask id="lmask0" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="86" y="457" width="239" height="99">
            <path d="M314.966 457.05L86.374 518.301L96.3785 555.638L324.97 494.387L314.966 457.05Z" fill="white"/>
          </mask>
          <mask id="lmask1" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="105" y="494" width="229" height="95">
            <path d="M324.005 494.646L105.319 553.243L114.71 588.289L333.396 529.693L324.005 494.646Z" fill="white"/>
          </mask>
          <mask id="lmask2" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="103" y="494" width="231" height="101">
            <path d="M323.133 494.88L103.34 553.773L114.207 594.331L334 535.438L323.133 494.88Z" fill="white"/>
          </mask>
        </defs>

        <g clipPath="url(#lclip)">
          <path d="M430 0H0V932H430V0Z" fill="white"/>
          {/* 격자 */}
          <g opacity="0.04">
            <path d="M0 40H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 80H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 120H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 160H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 200H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 240H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 280H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 320H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 360H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 400H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 440H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 480H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 520H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 560H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 600H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 640H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 680H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 720H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 760H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 800H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 840H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 880H430" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M0 920H430" stroke="#1A1C1E" strokeWidth="0.5"/>
            <path d="M40 0V932" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M80 0V932" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M120 0V932" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M160 0V932" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M200 0V932" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M240 0V932" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M280 0V932" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M320 0V932" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M360 0V932" stroke="#1A1C1E" strokeWidth="0.5"/><path d="M400 0V932" stroke="#1A1C1E" strokeWidth="0.5"/>
          </g>
          {/* 정적 점/별 */}
          <path opacity="0.13" d="M61.9998 109.7C62.9387 109.7 63.6998 108.939 63.6998 108C63.6998 107.061 62.9387 106.3 61.9998 106.3C61.0609 106.3 60.2998 107.061 60.2998 108C60.2998 108.939 61.0609 109.7 61.9998 109.7Z" fill="#1A1C1E"/>
          <path opacity="0.12" d="M188 72.8C188.442 72.8 188.8 72.4418 188.8 72C188.8 71.5582 188.442 71.2 188 71.2C187.558 71.2 187.2 71.5582 187.2 72C187.2 72.4418 187.558 72.8 188 72.8Z" fill="#1A1C1E"/>
          <path opacity="0.11" d="M352 132.1C353.16 132.1 354.1 131.16 354.1 130C354.1 128.84 353.16 127.9 352 127.9C350.841 127.9 349.9 128.84 349.9 130C349.9 131.16 350.841 132.1 352 132.1Z" fill="#1A1C1E"/>
          <path opacity="0.13" d="M290 59C290.552 59 291 58.5523 291 58C291 57.4477 290.552 57 290 57C289.448 57 289 57.4477 289 58C289 58.5523 289.448 59 290 59Z" fill="#1A1C1E"/>
          <path opacity="0.12" d="M44.0002 481.3C44.7182 481.3 45.3002 480.718 45.3002 480C45.3002 479.282 44.7182 478.7 44.0002 478.7C43.2822 478.7 42.7002 479.282 42.7002 480C42.7002 480.718 43.2822 481.3 44.0002 481.3Z" fill="#1A1C1E"/>
          <path opacity="0.11" d="M398 542.1C399.16 542.1 400.1 541.16 400.1 540C400.1 538.84 399.16 537.9 398 537.9C396.841 537.9 395.9 538.84 395.9 540C395.9 541.16 396.841 542.1 398 542.1Z" fill="#1A1C1E"/>
          <path opacity="0.12" d="M130 821.7C130.939 821.7 131.7 820.939 131.7 820C131.7 819.061 130.939 818.3 130 818.3C129.061 818.3 128.3 819.061 128.3 820C128.3 820.939 129.061 821.7 130 821.7Z" fill="#1A1C1E"/>
          <path opacity="0.13" d="M340 861C340.552 861 341 860.552 341 860C341 859.448 340.552 859 340 859C339.448 859 339 859.448 339 860C339 860.552 339.448 861 340 861Z" fill="#1A1C1E"/>
          <path opacity="0.38" d="M310 97.7C310.939 97.7 311.7 96.9389 311.7 96C311.7 95.0611 310.939 94.3 310 94.3C309.061 94.3 308.3 95.0611 308.3 96C308.3 96.9389 309.061 97.7 310 97.7Z" fill="#D4A853"/>
          <path opacity="0.32" d="M80.0004 762.1C81.1602 762.1 82.1004 761.16 82.1004 760C82.1004 758.84 81.1602 757.9 80.0004 757.9C78.8406 757.9 77.9004 758.84 77.9004 760C77.9004 761.16 78.8406 762.1 80.0004 762.1Z" fill="#8FAF8A"/>
          <path opacity="0.3" d="M390 781.3C390.718 781.3 391.3 780.718 391.3 780C391.3 779.282 390.718 778.7 390 778.7C389.282 778.7 388.7 779.282 388.7 780C388.7 780.718 389.282 781.3 390 781.3Z" fill="#C4876A"/>
          <path opacity="0.5"  d="M72 308L76 297L80 308L91 312L80 316L76 327L72 316L61 312L72 308Z" stroke="#D4A853" strokeWidth="1.2" strokeLinejoin="round"/>
          <path opacity="0.42" d="M368 220L370 214L372 220L378 222L372 224L370 230L368 224L362 222L368 220Z" stroke="#D4A853" strokeLinejoin="round"/>
          <path opacity="0.42" d="M38 660L40 654L42 660L48 662L42 664L40 670L38 664L32 662L38 660Z" stroke="#8FAF8A" strokeWidth="0.9" strokeLinejoin="round"/>
          <path opacity="0.38" d="M392 420L394 414L396 420L402 422L396 424L394 430L392 424L386 422L392 420Z" stroke="#C4876A" strokeWidth="0.9" strokeLinejoin="round"/>

          {/* ① 뒤 고리 — 행성 본체보다 먼저 렌더 (뒤에 깔림) */}
          <g className="login-ring-back">
            <g mask="url(#lmask0)">
              <path opacity="0.2" d="M220.694 550.548C277.328 535.373 320.081 511.283 316.185 496.742C312.288 482.201 263.219 482.715 206.584 497.89C149.95 513.065 107.198 537.155 111.094 551.696C114.99 566.237 164.06 565.723 220.694 550.548Z" stroke="#1A1C1E" strokeWidth="1.00424" strokeLinecap="round" strokeDasharray="4.3 3.59"/>
            </g>
          </g>

          {/* ② 행성 본체 — 고정 */}
          <path d="M213.64 575.866C242.164 575.866 265.287 552.743 265.287 524.219C265.287 495.695 242.164 472.572 213.64 472.572C185.116 472.572 161.993 495.695 161.993 524.219C161.993 552.743 185.116 575.866 213.64 575.866Z" fill="white" stroke="#1A1C1E" strokeWidth="1.07597"/>

          {/* ③ 위도선 — 고정 */}
          <path opacity="0.12" d="M165.579 515.611C180.882 511.307 196.902 509.872 213.639 511.307C230.377 512.742 246.397 512.024 261.699 509.155" stroke="#1A1C1E" strokeWidth="0.645584" strokeLinecap="round"/>
          <path opacity="0.1"  d="M162.71 524.219C179.926 520.393 196.902 519.198 213.639 520.632C230.377 522.067 247.353 521.35 264.569 518.48" stroke="#1A1C1E" strokeWidth="0.645584" strokeLinecap="round"/>
          <path opacity="0.08" d="M165.579 532.827C181.36 529.957 197.38 529.24 213.639 530.675C229.898 532.109 245.918 531.392 261.699 528.523" stroke="#1A1C1E" strokeWidth="0.645584" strokeLinecap="round"/>
          <path opacity="0.22" d="M168.448 519.198C183.751 515.85 198.815 514.894 213.639 516.328C228.464 517.763 243.527 517.046 258.83 514.176" stroke="#D4A853" strokeWidth="1.29117" strokeLinecap="round"/>
          <path opacity="0.18" d="M169.166 527.805C184.469 524.936 199.293 524.219 213.64 525.653C228.464 527.088 243.289 526.371 258.113 523.501" stroke="#8FAF8A" strokeWidth="0.860779" strokeLinecap="round"/>

          {/* ④ 앞 고리 — 행성 위에 렌더 */}
          <g className="login-ring-front">
            <g mask="url(#lmask1)">
              <path d="M220.694 550.548C277.328 535.373 320.081 511.283 316.185 496.742C312.288 482.201 263.219 482.715 206.584 497.89C149.95 513.065 107.198 537.155 111.094 551.696C114.99 566.237 164.06 565.723 220.694 550.548Z" stroke="white" strokeWidth="4.3039"/>
            </g>
            <g mask="url(#lmask2)">
              <path opacity="0.22" d="M220.694 550.548C277.328 535.373 320.081 511.283 316.185 496.742C312.288 482.201 263.219 482.715 206.584 497.89C149.95 513.065 107.198 537.155 111.094 551.696C114.99 566.237 164.06 565.723 220.694 550.548Z" stroke="#1A1C1E" strokeWidth="1.00424" strokeLinecap="round"/>
            </g>
          </g>

          {/* ⑤ 왼쪽 동그라미 — 고정 */}
          <path
            d="M116.085 504.134C118.065 504.134 119.671 502.528 119.671 500.547C119.671 498.567 118.065 496.961 116.085 496.961C114.104 496.961 112.498 498.567 112.498 500.547C112.498 502.528 114.104 504.134 116.085 504.134Z"
            fill="white" stroke="#1A1C1E" strokeWidth="0.860779"/>

          {/* ⑥ 나머지 장식 — 고정 */}
          <path opacity="0.45" d="M286.089 483.691C286.683 483.691 287.165 483.209 287.165 482.615C287.165 482.02 286.683 481.539 286.089 481.539C285.494 481.539 285.013 482.02 285.013 482.615C285.013 483.209 285.494 483.691 286.089 483.691Z" fill="#D4A853"/>
          <path opacity="0.4"  d="M142.625 479.171C143.101 479.171 143.486 478.786 143.486 478.311C143.486 477.835 143.101 477.45 142.625 477.45C142.15 477.45 141.765 477.835 141.765 478.311C141.765 478.786 142.15 479.171 142.625 479.171Z" fill="#8FAF8A"/>
          <path opacity="0.35" d="M274.611 571.203C275.205 571.203 275.687 570.721 275.687 570.127C275.687 569.533 275.205 569.051 274.611 569.051C274.017 569.051 273.535 569.533 273.535 570.127C273.535 570.721 274.017 571.203 274.611 571.203Z" fill="#C4876A"/>
          <path opacity="0.4"  d="M298.282 492.657L299.717 488.353L301.152 492.657L305.456 494.092L301.152 495.526L299.717 499.83L298.282 495.526L293.979 494.092L298.282 492.657Z" stroke="#D4A853" strokeWidth="0.645584" strokeLinejoin="round"/>
        </g>
      </svg>

      {/* 메인 콘텐츠 */}
      <main className="login-main">

        {/* 헤더 섹션 */}
        <section className="header-section">
          <div className="logo-row">
            <img src="/images/login_logo.svg" alt="Route 로고" className="logo-img" />
            <span className="login-logo-text">Route</span>
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

        <h2 className="login-modal-title">다른 방법으로 로그인</h2>

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
      {/* 별똥별 */}
      <div className="login-stars-wrap">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}
