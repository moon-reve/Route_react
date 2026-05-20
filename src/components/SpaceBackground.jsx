import { useEffect, useRef } from 'react'
import '../styles/space.css'

export default function SpaceBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth < 431) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const numStars = 400
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 1 + Math.random() * 1.5,
      opacity: Math.random(),
      factor: 1,
      increment: Math.random() * 0.02,
    }))

    function drawStar(star) {
      ctx.save()
      ctx.translate(star.x, star.y)
      ctx.rotate(Math.PI / 10)

      if (star.opacity > 1) star.factor = -1
      else if (star.opacity <= 0) {
        star.factor = 1
        star.x = Math.random() * canvas.width
        star.y = Math.random() * canvas.height
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
      ctx.shadowBlur = 5
      ctx.shadowColor = '#fff'
      ctx.fill()
      ctx.restore()
    }

    let animId
    function animate() {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
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
