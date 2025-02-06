"use client"

import ThemeToggle from "@/components/theme/ThemeToggle"
import { User } from "@/types/payload"
import { createElement, ReactNode, useEffect, useState } from "react"
import useLogout from "./use-logout"

interface NavMenuItem {
    value: string
    title: string
    subtitle?: string,
    icon?: string
    route?: string
    action?: VoidFunction
    component?: ReactNode
}

const useUserMenu = (user: User | null) => {
    const logout = useLogout()
    const [menuItems, setMenuItems] = useState<NavMenuItem[]>([])

    useEffect(() => {
        const newMenuItems: NavMenuItem[] = []

        if (user) {
            newMenuItems.push({
                value: 'profile',
                title: user.firstName,
                subtitle: user.email,
                icon: 'solar:settings-outline',
                route: '/profile'
            })

            newMenuItems.push({
                value: 'dashboard',
                title: 'Admin Dashboard',
                icon: 'mage:dashboard',
                route: '/admin'
            })

            newMenuItems.push({
                value: 'orders',
                title: 'My Orders',
                icon: 'mage:box',
                route: '/orders'
            })

        }

        newMenuItems.push({
            value: 'theme',
            title: 'Theme',
            component: createElement(ThemeToggle),
        })

        if (user) {
            newMenuItems.push({
                value: 'logout',
                title: 'Log out',
                icon: 'fluent:power-20-regular',
                action: logout
            })
        }

        setMenuItems(newMenuItems)
    }, [user, logout])

    return menuItems
}

export default useUserMenu