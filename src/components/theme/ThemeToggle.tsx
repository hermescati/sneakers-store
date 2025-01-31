"use client"

import { cn } from "@/utils"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Button from "../base/Button"
import { Icon } from '@iconify/react'

const ThemeToggle = ({ floating }: { floating: boolean }) => {
    const [isMounted, setIsMounted] = useState(false)
    const { theme, resolvedTheme, setTheme } = useTheme()

    const themeOptions: { value: string; icon: string }[] = [
        { value: "system", icon: "solar:devices-outline" },
        { value: "light", icon: "solar:sun-line-duotone" },
        { value: "dark", icon: "solar:moon-stars-outline" },
    ]

    const activeIndex = themeOptions.findIndex(({ value }) => value === theme)

    useEffect(() => setIsMounted(true), [])

    if (!isMounted) return null

    return (
        <div className="relative flex flex-col gap-2 group">
            {floating &&
                <div className="w-10 h-10 flex items-center justify-center cursor-pointer text-primary-700 hover:text-foreground">
                    <Icon icon={resolvedTheme === "dark" ? "solar:moon-stars-outline" : "solar:sun-line-duotone"} className="text-2xl" />
                </div>
            }

            <div className={cn(
                "border border-border bg-background rounded-full",
                { "hidden group-hover:block absolute top-10 left-1/2 -translate-x-1/2 z-20 shadow-md": floating }
            )}>
                <div className="relative w-full flex items-center">
                    <div
                        className="absolute top-0 left-0 h-full w-1/3 rounded-full transition-all duration-300 shadow-[0_0_0_1px_theme(colors.border)]"
                        style={{ transform: `translateX(${activeIndex * 100}%)` }}
                    />
                    {themeOptions.map(({ value, icon }) => (
                        <Button
                            key={value}
                            size="icon"
                            variant="ghost"
                            icon={icon}
                            onClick={() => setTheme(value)}
                            className={cn(
                                "p-2 inline-flex items-center justify-center rounded-full active:bg-transparent hover:bg-transparent text-lg text-primary-600 hover:text-foreground",
                                {
                                    "text-foreground": value === theme,
                                    "lg:text-xl": floating
                                }
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ThemeToggle
