import { useEffect } from 'react'

type KeyCombination = {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
  preventDefault?: boolean
}

const useOnKeyPress = (combination: KeyCombination, callback: () => void) => {
  useEffect(() => {
    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform)

    const handleKeyPress = (event: KeyboardEvent) => {
      const { key, ctrlKey, shiftKey, altKey, metaKey } = event

      const matches =
        key === combination.key &&
        (combination.ctrl ? (isMac ? metaKey : ctrlKey) : true) &&
        (combination.shift ? shiftKey : true) &&
        (combination.alt ? altKey : true) &&
        (combination.meta ? metaKey : true)

      if (matches) {
        if (combination.preventDefault) {
          event.preventDefault()
        }
        callback()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [combination, callback])
}

export default useOnKeyPress
