"use client"

import { cn } from "@/utils"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import IconButton from "../base/IconButton"

const ThemeToggle = ({ floating }: { floating: boolean }) => {
    const [isMounted, setIsMounted] = useState(false)
    const { theme, resolvedTheme, setTheme } = useTheme()

    const themeOptions: { value: string; icon: string }[] = [
        { value: "system", icon: "solar:devices-outline" },
        { value: "light", icon: "solar:sun-line-duotone" },
        { value: "dark", icon: "solar:moon-stars-outline" },
    ]

    const activeIndex = themeOptions.findIndex(({ value }) => value === theme)
    const resolvedThemeIcon = themeOptions.find(({ value }) => value === resolvedTheme)?.icon as string

    useEffect(() => setIsMounted(true), [])

    if (!isMounted) return null

    return (
        <div className="relative flex flex-col gap-2 group">
            {floating &&
                <IconButton
                    icon={resolvedThemeIcon}
                    className="p-1.5 hover:text-foreground hover:bg-transparent active:bg-transparent active:shadow-none" />
            }

            <div className={cn(
                "border border-border bg-background rounded-full",
                { "hidden group-hover:block absolute top-9 left-1/2 -translate-x-1/2 z-40 shadow-md": floating }
            )}>
                <div className="relative w-full flex items-center">
                    <div
                        className="absolute top-0 left-0 h-full w-1/3 rounded-full transition-all duration-300 shadow-[0_0_0_1px_theme(colors.border)]"
                        style={{ transform: `translateX(${activeIndex * 100}%)` }}
                    />
                    {themeOptions.map(({ value, icon }) => (
                        <IconButton
                            key={value}
                            icon={icon}
                            onClick={() => setTheme(value)}
                            className={cn("text-xl",
                                { "text-foreground": value === theme }
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ThemeToggle
