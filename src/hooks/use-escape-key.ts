import { useEffect } from 'react'

const useOnEscapeKey = (onEscape: () => void) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape()
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [onEscape])
}

export default useOnEscapeKey
