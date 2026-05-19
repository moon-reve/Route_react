import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/splash.css'

// SVG 원본 별 경로 그대로 — 큰 중앙별(204,190) 제외
const STROKE_STARS = [
  { d: 'M360 174L363 166L366 174L374 177L366 180L363 188L360 180L352 177Z', stroke: '#D4A853', sw: '1',   glow: 'rgba(212,168,83,0.85)',   delay: 2.2, dur: 7.0 },
  { d: 'M70 260L72 254L74 260L80 262L74 264L72 270L70 264L64 262Z',         stroke: '#D4A853', sw: '0.9', glow: 'rgba(212,168,83,0.8)',    delay: 1.1, dur: 5.8 },
  { d: 'M388 526L390 520L392 526L398 528L392 530L390 536L388 530L382 528Z', stroke: '#D4A853', sw: '0.9', glow: 'rgba(212,168,83,0.8)',    delay: 3.5, dur: 6.2 },
  { d: 'M145 820L148 812L151 820L159 823L151 826L148 834L145 826L137 823Z', stroke: '#8FAF8A', sw: '1',   glow: 'rgba(143,175,138,0.85)',  delay: 1.8, dur: 7.5 },
  { d: 'M32 340L34 334L36 340L42 342L36 344L34 350L32 344L26 342Z',         stroke: '#8FAF8A', sw: '0.9', glow: 'rgba(143,175,138,0.8)',   delay: 0.7, dur: 6.0 },
  { d: 'M290 848L292 842L294 848L300 850L294 852L292 858L290 852L284 850Z', stroke: '#C4876A', sw: '0.9', glow: 'rgba(196,135,106,0.8)',   delay: 2.8, dur: 6.8 },
]

// fill 별 — 크기 키움 (r=7~9), v variant로 산발적
const FILL_STARS = [
  { d: 'M148 59L150.4 65.6L157 68L150.4 70.4L148 77L145.6 70.4L139 68L145.6 65.6Z',        fill: '#D4A853', glow: 'rgba(212,168,83,1)',    v:'a', delay: 0.5, dur: 5.2  }, // r=9
  { d: 'M370 48L372.2 53.8L378 56L372.2 58.2L370 64L367.8 58.2L362 56L367.8 53.8Z',        fill: '#D4A853', glow: 'rgba(212,168,83,1)',    v:'c', delay: 1.1, dur: 8.7  }, // r=8
  { d: 'M272 111L273.9 116.1L279 118L273.9 119.9L272 125L270.1 119.9L265 118L270.1 116.1Z', fill: '#D4A853', glow: 'rgba(212,168,83,0.95)', v:'b', delay: 3.2, dur: 6.1  }, // r=7
  { d: 'M92 96L94.2 101.8L100 104L94.2 106.2L92 112L89.8 106.2L84 104L89.8 101.8Z',        fill: '#D4A853', glow: 'rgba(212,168,83,0.95)', v:'d', delay: 0.8, dur: 11.3 }, // r=8
  { d: 'M412 350L414.2 355.8L420 358L414.2 360.2L412 366L409.8 360.2L404 358L409.8 355.8Z', fill: '#D4A853', glow: 'rgba(212,168,83,1)',    v:'a', delay: 4.5, dur: 7.4  }, // r=8
  { d: 'M52 483L53.9 488.1L59 490L53.9 491.9L52 497L50.1 491.9L45 490L50.1 488.1Z',        fill: '#8FAF8A', glow: 'rgba(143,175,138,1)',   v:'c', delay: 2.1, dur: 9.6  }, // r=7
  { d: 'M82 620L84.2 625.8L90 628L84.2 630.2L82 636L79.8 630.2L74 628L79.8 625.8Z',        fill: '#8FAF8A', glow: 'rgba(143,175,138,1)',   v:'b', delay: 5.5, dur: 5.8  }, // r=8
  { d: 'M376 678L378.2 683.8L384 686L378.2 688.2L376 694L373.8 688.2L368 686L373.8 683.8Z', fill: '#D4A853', glow: 'rgba(212,168,83,1)',    v:'d', delay: 1.7, dur: 8.2  }, // r=8
  { d: 'M148 691L149.9 696.1L155 698L149.9 699.9L148 705L146.1 699.9L141 698L146.1 696.1Z', fill: '#C4876A', glow: 'rgba(196,135,106,1)',   v:'a', delay: 3.8, dur: 6.9  }, // r=7
  { d: 'M212 765L213.9 770.1L219 772L213.9 773.9L212 779L210.1 773.9L205 772L210.1 770.1Z', fill: '#8FAF8A', glow: 'rgba(143,175,138,0.95)',v:'c', delay: 6.3, dur: 10.1 }, // r=7
  // 로고 주변 — r=5~7
  { d: 'M150 393L151.9 398.1L157 400L151.9 401.9L150 407L148.1 401.9L143 400L148.1 398.1Z', fill: '#D4A853', glow: 'rgba(212,168,83,1)',    v:'b', delay: 1.3, dur: 6.4  }, // r=7
  { d: 'M290 371L291.6 375.4L296 377L291.6 378.6L290 383L288.4 378.6L284 377L288.4 375.4Z', fill: '#C4876A', glow: 'rgba(196,135,106,1)',   v:'d', delay: 3.7, dur: 8.1  }, // r=6
  { d: 'M128 485L129.4 488.6L133 490L129.4 491.4L128 495L126.6 491.4L123 490L126.6 488.6Z', fill: '#8FAF8A', glow: 'rgba(143,175,138,1)',   v:'a', delay: 0.9, dur: 5.5  }, // r=5
  { d: 'M312 459L313.9 464.1L319 466L313.9 467.9L312 473L310.1 467.9L305 466L310.1 464.1Z', fill: '#D4A853', glow: 'rgba(212,168,83,1)',    v:'c', delay: 5.1, dur: 7.8  }, // r=7
  { d: 'M162 570L163.4 573.6L167 575L163.4 576.4L162 580L160.6 576.4L157 575L160.6 573.6Z', fill: '#C4876A', glow: 'rgba(196,135,106,0.95)',v:'a', delay: 2.4, dur: 9.3  }, // r=5
  { d: 'M288 549L289.6 553.4L294 555L289.6 556.6L288 561L286.4 556.6L282 555L286.4 553.4Z', fill: '#8FAF8A', glow: 'rgba(143,175,138,1)',   v:'d', delay: 4.6, dur: 6.7  }, // r=6
  { d: 'M215 349L216.6 353.4L221 355L216.6 356.6L215 361L213.4 356.6L209 355L213.4 353.4Z', fill: '#D4A853', glow: 'rgba(212,168,83,1)',    v:'b', delay: 7.2, dur: 11.8 }, // r=6
]

// 점별 — 원본 opacity~1, 빠르고 산발적 (v로 flash 위치 다르게)
const DOT_STARS = [
  { cx: 248, cy: 218, r: 2.1, color: '#D4A853', base: 0.42, v:'b', delay: 1.2, dur: 3.7 },
  { cx: 356, cy: 296, r: 2.1, color: '#D4A853', base: 0.40, v:'a', delay: 0.4, dur: 4.9 },
  { cx: 308, cy: 252, r: 1.7, color: '#D4A853', base: 0.38, v:'d', delay: 2.5, dur: 3.3 },
  { cx: 294, cy: 558, r: 1.7, color: '#D4A853', base: 0.35, v:'c', delay: 0.9, dur: 5.1 },
  { cx: 332, cy: 584, r: 2.1, color: '#D4A853', base: 0.35, v:'a', delay: 3.1, dur: 4.3 },
  { cx:  42, cy: 272, r: 1.7, color: '#D4A853', base: 0.30, v:'b', delay: 1.8, dur: 3.8 },
  { cx: 136, cy: 196, r: 2.1, color: '#8FAF8A', base: 0.40, v:'c', delay: 0.6, dur: 4.6 },
  { cx: 380, cy: 200, r: 1.7, color: '#8FAF8A', base: 0.38, v:'d', delay: 2.0, dur: 3.5 },
  { cx: 160, cy: 708, r: 2.1, color: '#8FAF8A', base: 0.35, v:'a', delay: 1.5, dur: 4.8 },
  { cx:  52, cy: 620, r: 2.1, color: '#C4876A', base: 0.38, v:'b', delay: 0.3, dur: 3.9 },
  { cx: 368, cy: 808, r: 2.1, color: '#C4876A', base: 0.30, v:'d', delay: 2.7, dur: 4.4 },
  { cx: 178, cy: 408, r: 1.7, color: '#C4876A', base: 0.30, v:'c', delay: 1.0, dur: 5.2 },
]

export default function SplashPage() {
  const navigate = useNavigate()


  return (
    <div className="screen" onClick={() => navigate('/onboarding')} style={{ cursor: 'pointer' }}>
      <img className="bg" src="/images/splash_bg.svg" alt="" />

      {/* 트윙클 오버레이 — SVG 원본 경로 그대로 사용 */}
      <svg
        className="splash-star-overlay"
        viewBox="0 0 430 932"
        preserveAspectRatio="xMidYMid slice"
      >
        {STROKE_STARS.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill="none"
            stroke={s.stroke}
            strokeWidth={s.sw}
            strokeLinejoin="round"
            className="splash-star-stroke"
            style={{ animationDelay: s.delay + 's', animationDuration: s.dur + 's', '--glow': s.glow }}
          />
        ))}
        {FILL_STARS.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill={s.fill}
            className={`splash-star-fill splash-fill-${s.v}`}
            style={{ animationDelay: s.delay + 's', animationDuration: s.dur + 's', '--glow': s.glow }}
          />
        ))}
        {DOT_STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.cx} cy={s.cy} r={s.r}
            fill={s.color}
            className={`splash-dot splash-dot-${s.v}`}
            style={{ '--base': s.base, animationDelay: s.delay + 's', animationDuration: s.dur + 's' }}
          />
        ))}
      </svg>

      <div className="title-box">
        <div className="logo">
          <img src="/images/splash_logo.svg" alt="Route Logo" />
          <span className="splash-logo-text">Route</span>
        </div>

        <img className="divider" src="/images/splash_line.svg" alt="" />

        <p className="tagline">멈춰있는 커리어를 움직이는<br />실행의 궤적 : 루트</p>
      </div>
    </div>
  )
}
