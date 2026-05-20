import { useEffect, useRef } from 'react'
import '../styles/space.css'

export default function SpaceBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth < 431) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // 2K/레티나 대응 - devicePixelRatio 적용
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const W = () => window.innerWidth
    const H = () => window.innerHeight

    // 별 150개로 축소
    const numStars = 150
    const stars = Array.from({ length: numStars }, () => ({
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

  return (
    <div className="space-bg">
      <canvas ref={canvasRef} className="space-canvas" />
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className="shooting-star" />
      ))}
    </div>
  )
}
