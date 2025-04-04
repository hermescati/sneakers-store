"use client"

import ThemeToggle from "@/components/theme/ThemeToggle"
import routes from "@/lib/routes"
import { useUserStore } from "@/stores/userStore"
import { createElement, ReactNode, useMemo } from "react"
import useLogout from "./useLogout"

interface NavMenuItem {
    value: string
    title: string
    subtitle?: string,
    icon?: string
    route?: string
    action?: VoidFunction
    component?: ReactNode
}

const useNavigationMenu = () => {
    const logout = useLogout()
    const { user } = useUserStore()

    const menuItems = useMemo<NavMenuItem[]>(() => {
        const items: NavMenuItem[] = []

        if (user) {
            items.push({
                value: 'profile',
                title: 'Profile',
                subtitle: user.email,
                icon: 'solar:settings-outline',
                route: routes.profile
            })

            if (user.role === 'admin') {
                items.push({
                    value: 'dashboard',
                    title: 'Admin Dashboard',
                    icon: 'mage:dashboard',
                    route: routes.admin
                })
            }

            items.push({
                value: 'orders',
                title: 'My Orders',
                icon: 'mage:box',
                route: routes.orders.home
            })

        }

        items.push({
            value: 'theme',
            title: 'Theme',
            component: createElement(ThemeToggle),
        })

        if (user) {
            items.push({
                value: 'logout',
                title: 'Log out',
                icon: 'fluent:power-20-regular',
                action: logout
            })
        }

        return items
    }, [user])

    return menuItems
}

export default useNavigationMenu