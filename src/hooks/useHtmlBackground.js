import { useEffect } from 'react'

export default function useHtmlBackground(imageUrl) {
  useEffect(() => {
    const html = document.documentElement
    html.style.backgroundImage = `url('${imageUrl}')`
    html.style.backgroundSize = 'cover'
    html.style.backgroundPosition = 'center'
    html.style.backgroundRepeat = 'no-repeat'

    return () => {
      html.style.backgroundImage = ''
      html.style.backgroundSize = ''
      html.style.backgroundPosition = ''
      html.style.backgroundRepeat = ''
    }
  }, [imageUrl])
}
