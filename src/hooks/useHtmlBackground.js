import { useEffect } from 'react'

export default function useHtmlBackground(imageUrl) {
  useEffect(() => {
    const screen = document.querySelector('.screen')
    if (!screen) return
    screen.style.setProperty('--page-bg-image', `url('${imageUrl}')`)

    return () => {
      screen.style.removeProperty('--page-bg-image')
    }
  }, [imageUrl])
}
