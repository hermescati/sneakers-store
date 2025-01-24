'use client'

import { useEffect, useState } from "react"
import Button from "./base/Button"

type Theme = 'light' | 'dark' | 'system'

const ThemeToggle = () => {
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        const savedTheme = document.cookie.split('; ').find(row => row.startsWith('theme='))?.split('=')[1]
        if (savedTheme) setTheme(savedTheme as Theme)
    }, [])

    const applyTheme = (newTheme: Theme) => {
        setTheme(newTheme)
        document.cookie = `theme=${newTheme}; path=/; max-age=31536000`
        document.body.classList.remove('light', 'dark')
        document.body.classList.add(newTheme)
    }

    return (
        <Button
            size="icon"
            variant="ghost"
            icon={theme === 'dark' ? "solar:moon-stars-outline" : 'solar:sun-line-duotone'}
            className="p-2.5 lg:p-2 inline-flex items-center justify-center rounded-full text-2xl hover:bg-primary-100 lg:hover:bg-transparent text-primary-900 lg:text-primary-600 hover:text-primary-900"
            onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
        />
    )
}

export default ThemeToggle
