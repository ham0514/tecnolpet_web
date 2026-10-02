import { useEffect, useState } from 'react'
import { applyTheme, resolveTheme, type Theme } from '../theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'dark'
    const current = document.documentElement.dataset.theme
    return current === 'light' || current === 'dark' ? current : resolveTheme()
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = (next: Theme) => {
    setThemeState(next)
  }

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, setTheme, toggleTheme }
}
