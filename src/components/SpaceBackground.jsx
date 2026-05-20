import { useEffect, useRef } from 'react'
import '../styles/space.css'

const COLORS = ['#d4a853', '#8faf8a', '#e8941a', '#7b9ead', '#c4876a', '#9e90bc', '#47b5a7', '#d4849a']

export default function SpaceBackground() {
  const canvasRef = useRef(null)
  const bgRef     = useRef(null)

  // ── 별 반짝임 (canvas) ──
  useEffect(() => {
    if (window.innerWidth < 431) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width  = window.innerWidth  + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const W = () => window.innerWidth
    const H = () => window.innerHeight

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      length: 1 + Math.random() * 1.5,
      opacity: Math.random(),
      factor: 1,
      increment: Math.random() * 0.015,
    }))

    function drawStar(star) {
      ctx.save()
      ctx.translate(star.x, star.y)
      ctx.rotate(Math.PI / 10)
      if (star.opacity > 1) star.factor = -1
      else if (star.opacity <= 0) {
        star.factor = 1
        star.x = Math.random() * W()
        star.y = Math.random() * H()
      }
      star.opacity += star.increment * star.factor
      ctx.beginPath()
      for (let i = 5; i--;) {
        ctx.lineTo(0, star.length)
        ctx.translate(0, star.length)
        ctx.rotate(Math.PI * 2 / 10)
        ctx.lineTo(0, -star.length)
        ctx.translate(0, -star.length)
        ctx.rotate(-(Math.PI * 6 / 10))
      }
      ctx.lineTo(0, star.length)
      ctx.closePath()
      ctx.fillStyle = `rgba(255, 255, 200, ${star.opacity})`
      ctx.shadowBlur = 4
      ctx.shadowColor = '#fff'
      ctx.fill()
      ctx.restore()
    }

    let animId
    function animate() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W(), H())
      stars.forEach(drawStar)
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // ── 별똥별 (JS 동적 생성) ──
  useEffect(() => {
    if (window.innerWidth < 431) return
    const bg = bgRef.current
    if (!bg) return

    const timeouts = []

    function spawn() {
      const el = document.createElement('span')
      el.className = 'shooting-star-dyn'
      const color    = COLORS[Math.floor(Math.random() * COLORS.length)]
      const duration = (3 + Math.random() * 3).toFixed(2)

      el.style.setProperty('--star-color', color)
      el.style.top             = `${Math.random() * 30}vh`
      el.style.right           = `${(Math.random() * 90).toFixed(1)}vw`
      el.style.animationDuration = `${duration}s`

      bg.appendChild(el)

      el.addEventListener('animationend', () => {
        el.remove()
        // 다음 별똥별은 5~12초 뒤 랜덤 위치에서
        const t = setTimeout(spawn, 5000 + Math.random() * 7000)
        timeouts.push(t)
      }, { once: true })
    }

    // 4개를 서로 다른 초기 딜레이로 시작
    [0, 4000, 9000, 15000].forEach(delay => {
      const t = setTimeout(spawn, delay + Math.random() * 2000)
      timeouts.push(t)
    })

    return () => {
      timeouts.forEach(clearTimeout)
      bg.querySelectorAll('.shooting-star-dyn').forEach(el => el.remove())
    }
  }, [])

  return (
    <div className="space-bg" ref={bgRef}>
      <canvas ref={canvasRef} className="space-canvas" />
    </div>
  )
}
