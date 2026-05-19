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

// fill 별 — v: keyframe 변형(a~d), flash 위치가 달라서 산발적으로 반짝임
const FILL_STARS = [
  { d: 'M148 62L149.6 66.4L154 68L149.6 69.6L148 74L146.4 69.6L142 68L146.4 66.4Z',        fill: '#D4A853', glow: 'rgba(212,168,83,0.9)',   v:'a', delay: 0.5, dur: 5.2  },
  { d: 'M370 51L371.4 54.6L375 56L371.4 57.4L370 61L368.6 57.4L365 56L368.6 54.6Z',        fill: '#D4A853', glow: 'rgba(212,168,83,0.9)',   v:'c', delay: 1.1, dur: 8.7  },
  { d: 'M272 114L273.1 116.9L276 118L273.1 119.1L272 122L270.9 119.1L268 118L270.9 116.9Z', fill: '#D4A853', glow: 'rgba(212,168,83,0.85)',  v:'b', delay: 3.2, dur: 6.1  },
  { d: 'M92 99L93.4 102.6L97 104L93.4 105.4L92 109L90.6 105.4L87 104L90.6 102.6Z',         fill: '#D4A853', glow: 'rgba(212,168,83,0.85)',  v:'d', delay: 0.8, dur: 11.3 },
  { d: 'M412 353L413.4 356.6L417 358L413.4 359.4L412 363L410.6 359.4L407 358L410.6 356.6Z', fill: '#D4A853', glow: 'rgba(212,168,83,0.9)',   v:'a', delay: 4.5, dur: 7.4  },
  { d: 'M52 486L53.1 488.9L56 490L53.1 491.1L52 494L50.9 491.1L48 490L50.9 488.9Z',        fill: '#8FAF8A', glow: 'rgba(143,175,138,0.9)',  v:'c', delay: 2.1, dur: 9.6  },
  { d: 'M82 623L83.4 626.6L87 628L83.4 629.4L82 633L80.6 629.4L77 628L80.6 626.6Z',        fill: '#8FAF8A', glow: 'rgba(143,175,138,0.9)',  v:'b', delay: 5.5, dur: 5.8  },
  { d: 'M376 681L377.4 684.6L381 686L377.4 687.4L376 691L374.6 687.4L371 686L374.6 684.6Z', fill: '#D4A853', glow: 'rgba(212,168,83,0.9)',   v:'d', delay: 1.7, dur: 8.2  },
  { d: 'M148 693L149.4 696.6L153 698L149.4 699.4L148 703L146.6 699.4L143 698L146.6 696.6Z', fill: '#C4876A', glow: 'rgba(196,135,106,0.9)',  v:'a', delay: 3.8, dur: 6.9  },
  { d: 'M212 768L213.1 770.9L216 772L213.1 773.1L212 776L210.9 773.1L208 772L210.9 770.9Z', fill: '#8FAF8A', glow: 'rgba(143,175,138,0.85)', v:'c', delay: 6.3, dur: 10.1 },
  // 로고 주변 작은 별들
  { d: 'M150 396L151.1 398.9L154 400L151.1 401.1L150 404L148.9 401.1L146 400L148.9 398.9Z', fill: '#D4A853', glow: 'rgba(212,168,83,0.9)',   v:'b', delay: 1.3, dur: 6.4  },
  { d: 'M290 377L290.8 379.2L293 380L290.8 380.8L290 383L289.2 380.8L287 380L289.2 379.2Z', fill: '#C4876A', glow: 'rgba(196,135,106,0.9)',  v:'d', delay: 3.7, dur: 8.1  },
  { d: 'M128 487L128.8 489.2L131 490L128.8 490.8L128 493L127.2 490.8L125 490L127.2 489.2Z', fill: '#8FAF8A', glow: 'rgba(143,175,138,0.9)',  v:'a', delay: 0.9, dur: 5.5  },
  { d: 'M312 462L313.1 464.9L316 466L313.1 467.1L312 470L310.9 467.1L308 466L310.9 464.9Z', fill: '#D4A853', glow: 'rgba(212,168,83,0.9)',   v:'c', delay: 5.1, dur: 7.8  },
  { d: 'M162 572L162.8 574.2L165 575L162.8 575.8L162 578L161.2 575.8L159 575L161.2 574.2Z', fill: '#C4876A', glow: 'rgba(196,135,106,0.85)', v:'a', delay: 2.4, dur: 9.3  },
  { d: 'M288 552L288.8 554.2L291 555L288.8 555.8L288 558L287.2 555.8L285 555L287.2 554.2Z', fill: '#8FAF8A', glow: 'rgba(143,175,138,0.9)',  v:'d', delay: 4.6, dur: 6.7  },
  { d: 'M215 351L216.1 353.9L219 355L216.1 356.1L215 359L213.9 356.1L211 355L213.9 353.9Z', fill: '#D4A853', glow: 'rgba(212,168,83,0.9)',   v:'b', delay: 7.2, dur: 11.8 },
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
