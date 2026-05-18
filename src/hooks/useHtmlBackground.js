import { useEffect } from 'react'

export default function useHtmlBackground(imageUrl, bgColor = '#ffffff') {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    // safe-area가 bgColor와 일치하도록 html/body 배경 동적 설정
    html.style.backgroundColor = bgColor
    body.style.backgroundColor = bgColor

    return () => {
      html.style.backgroundColor = ''
      body.style.backgroundColor = ''
    }
  }, [bgColor])
}
