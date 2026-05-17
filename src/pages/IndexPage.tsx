import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/global.css'
import '../styles/index.css'

export default function IndexPage() {
  const navigate = useNavigate()
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const starPaths = document.querySelectorAll<SVGPathElement>('.star-particles path')
    const starStates = Array.from(starPaths).map(el => ({
      el,
      duration: 2 + Math.random() * 4,
      offset: Math.random() * 5,
    }))

    function tick(timestamp: number) {
      const t = timestamp / 1000
      starStates.forEach(s => {
        const phase = ((t + s.offset) % s.duration) / s.duration
        const opacity = 0.1 + 0.9 * Math.pow(Math.sin(phase * Math.PI), 2)
        s.el.style.opacity = String(opacity)
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const timer = setTimeout(() => {
      navigate('/login')
    }, 4000)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(timer)
    }
  }, [navigate])

  return (
    <div className="app-container">
      <div className="splash">
        <svg className="splash__bg" viewBox="0 0 430 1103" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="paint0_linear_367_9771" x1="215" y1="0" x2="430" y2="1302.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1A1C1E"/>
              <stop offset="1" stopColor="#243444"/>
            </linearGradient>
            <clipPath id="clip0_367_9771"><rect width="430" height="1103" fill="white"/></clipPath>
            <clipPath id="clip1_367_9771"><rect width="430" height="1103" fill="white"/></clipPath>
          </defs>
          <g clipPath="url(#clip0_367_9771)">
            <g clipPath="url(#clip1_367_9771)">
              <path d="M430 0H0V1103H430V0Z" fill="url(#paint0_linear_367_9771)"/>
              <g className="ring-group ring-cw-1">
                <path d="M215 331.373C469.051 331.373 675 151.221 675 -71.0086C675 -293.238 469.051 -473.391 215 -473.391C-39.051 -473.391 -245 -293.238 -245 -71.0086C-245 151.221 -39.051 331.373 215 331.373Z" fill="#E5C185" fillOpacity="0.1"/>
                <path d="M215 201.191C380.685 201.191 515 79.3231 515 -71.0086C515 -221.34 380.685 -343.208 215 -343.208C49.3146 -343.208 -85 -221.34 -85 -71.0086C-85 79.3231 49.3146 201.191 215 201.191Z" fill="#E5C185" fillOpacity="0.08"/>
              </g>
              <g className="ring-group ring-ccw-1">
                <path d="M215 366.878C413.823 366.878 575 229.114 575 59.1738C575 -110.766 413.823 -248.53 215 -248.53C16.1775 -248.53 -145 -110.766 -145 59.1738C-145 229.114 16.1775 366.878 215 366.878Z" fill="#E5C185" fillOpacity="0.07"/>
                <path d="M215 248.53C330.98 248.53 425 163.752 425 59.1738C425 -45.4047 330.98 -130.182 215 -130.182C99.0202 -130.182 5 -45.4047 5 59.1738C5 163.752 99.0202 248.53 215 248.53Z" fill="#E5C185" fillOpacity="0.06"/>
              </g>
              <g className="ring-group ring-cw-2">
                <path d="M370 284.034C485.98 284.034 580 193.958 580 82.8433C580 -28.2714 485.98 -118.348 370 -118.348C254.02 -118.348 160 -28.2714 160 82.8433C160 193.958 254.02 284.034 370 284.034Z" fill="#E5C185" fillOpacity="0.06"/>
                <path d="M370 189.356C430.751 189.356 480 141.669 480 82.8434C480 24.0179 430.751 -23.6695 370 -23.6695C309.249 -23.6695 260 24.0179 260 82.8434C260 141.669 309.249 189.356 370 189.356Z" fill="#E5C185" fillOpacity="0.05"/>
              </g>
              <g className="ring-group ring-ccw-2">
                <path d="M55 307.704C159.934 307.704 245 228.225 245 130.182C245 32.14 159.934 -47.3391 55 -47.3391C-49.9341 -47.3391 -135 32.14 -135 130.182C-135 228.225 -49.9341 307.704 55 307.704Z" fill="#E5C185" fillOpacity="0.055"/>
                <path d="M55 218.943C107.467 218.943 150 179.204 150 130.182C150 81.1612 107.467 41.4217 55 41.4217C2.53295 41.4217 -40 81.1612 -40 130.182C-40 179.204 2.53295 218.943 55 218.943Z" fill="#E5C185" fillOpacity="0.04"/>
              </g>
              <g className="ring-group ring-cw-3">
                <path d="M215 414.217C308.888 414.217 385 345.335 385 260.365C385 175.395 308.888 106.513 215 106.513C121.112 106.513 45 175.395 45 260.365C45 345.335 121.112 414.217 215 414.217Z" fill="#E5C185" fillOpacity="0.07"/>
                <path d="M215 337.291C261.944 337.291 300 302.85 300 260.365C300 217.88 261.944 183.439 215 183.439C168.056 183.439 130 217.88 130 260.365C130 302.85 168.056 337.291 215 337.291Z" fill="#E5C185" fillOpacity="0.06"/>
                <path d="M215 295.869C235.987 295.869 253 279.973 253 260.365C253 240.756 235.987 224.86 215 224.86C194.013 224.86 177 240.756 177 260.365C177 279.973 194.013 295.869 215 295.869Z" fill="#E5C185" fillOpacity="0.055"/>
              </g>
              <g className="ring-group ring-ccw-3">
                <path d="M130 579.903C218.366 579.903 290 521.619 290 449.721C290 377.823 218.366 319.539 130 319.539C41.6344 319.539 -30 377.823 -30 449.721C-30 521.619 41.6344 579.903 130 579.903Z" fill="#E5C185" fillOpacity="0.041"/>
              </g>
              <g className="ring-group ring-cw-4">
                <path d="M320 538.482C397.32 538.482 460 488.145 460 426.051C460 363.958 397.32 313.621 320 313.621C242.68 313.621 180 363.958 180 426.051C180 488.145 242.68 538.482 320 538.482Z" fill="#E5C185" fillOpacity="0.04"/>
              </g>
              <path d="M245.771 431.692C429.445 385.488 564.565 271.326 547.57 176.705C530.576 82.0836 367.903 42.8337 184.229 89.0378C0.555934 135.242 -134.564 249.403 -117.57 344.025C-100.576 438.646 62.0978 477.896 245.771 431.692Z" stroke="white" strokeOpacity="0.1" strokeWidth="0.6"/>
              <path d="M0 177.521C100 76.926 200 136.1 215 260.365" stroke="#E5C185" strokeOpacity="0.19" strokeWidth="0.7" strokeLinecap="round"/>
              <path d="M215 260.365C285 201.191 385 127.815 430 80.4764" stroke="#E5C185" strokeOpacity="0.16" strokeWidth="0.65" strokeLinecap="round"/>
              <g className="star-particles">
                <path d="M61.6002 418.512C61.8211 418.512 62.0002 418.3 62.0002 418.038C62.0002 417.777 61.8211 417.565 61.6002 417.565C61.3793 417.565 61.2002 417.777 61.2002 418.038C61.2002 418.3 61.3793 418.512 61.6002 418.512Z" fill="#E5C185" fillOpacity="0.196"/>
                <path d="M397.6 404.428C397.876 404.428 398.1 404.164 398.1 403.837C398.1 403.51 397.876 403.245 397.6 403.245C397.323 403.245 397.1 403.51 397.1 403.837C397.1 404.164 397.323 404.428 397.6 404.428Z" fill="#E5C185" fillOpacity="0.13"/>
                <path d="M146.6 232.351C147.208 232.351 147.7 231.768 147.7 231.049C147.7 230.33 147.208 229.747 146.6 229.747C145.992 229.747 145.5 230.33 145.5 231.049C145.5 231.768 145.992 232.351 146.6 232.351Z" fill="white" fillOpacity="0.157"/>
                <path d="M265.6 434.37C266.042 434.37 266.4 433.947 266.4 433.424C266.4 432.901 266.042 432.477 265.6 432.477C265.158 432.477 264.8 432.901 264.8 433.424C264.8 433.947 265.158 434.37 265.6 434.37Z" fill="white" fillOpacity="0.216"/>
                <path d="M386.6 248.565C387.042 248.565 387.4 248.141 387.4 247.618C387.4 247.095 387.042 246.671 386.6 246.671C386.158 246.671 385.8 247.095 385.8 247.618C385.8 248.141 386.158 248.565 386.6 248.565Z" fill="white" fillOpacity="0.209"/>
              </g>
              <path d="M38 44.9721L52 61.5408L38 78.1094L24 61.5408L38 44.9721Z" stroke="#CBD5E0" strokeOpacity="0.32" strokeWidth="0.7"/>
              <path d="M215 20.2374C215.608 20.2374 216.1 19.6546 216.1 18.9356C216.1 18.2166 215.608 17.6338 215 17.6338C214.393 17.6338 213.9 18.2166 213.9 18.9356C213.9 19.6546 214.393 20.2374 215 20.2374Z" fill="#E5C185" fillOpacity="0.5"/>
            </g>
          </g>
        </svg>

        <div className="splash__stars" id="stars" aria-hidden="true"></div>

        <div className="splash__content">
          <div className="splash__logo">
            <img src="/images/logo_route_goldwhite.svg" alt="ROUTE 로고" width="96" height="96" />
          </div>
          <div className="splash__brand">ROUTE</div>
          <div className="splash__tagline">
            <p className="splash__tagline-text">
              멈춰있는 커리어를 움직이는<br />
              실행의 궤적 : 루트
            </p>
            <div className="splash__tagline-line"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
