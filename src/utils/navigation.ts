"use client"

import { NavRoute } from "@/components/base/DropdownMenu"
import useLogout from "@/hooks/use-logout"
import { User } from '@/types/payload'
import React from "react"
import ThemeToggle from "../components/theme/ThemeToggle"

interface NavRoutesConfig {
    includeProfile?: boolean
    includeDashboard?: boolean
    includeOrders?: boolean
    includeTheme?: boolean
    includeLogout?: boolean
}

export const getNavRoutes = (
    user: User | null,
    config: NavRoutesConfig = {}
): NavRoute[] => {
    const logout = useLogout()
    const routes: NavRoute[] = []

    const {
        includeProfile = true,
        includeDashboard = true,
        includeOrders = true,
        includeTheme = true,
        includeLogout = true
    } = config

    if (user) {
        if (includeProfile) {
            routes.push({
                value: 'profile',
                title: user.firstName,
                subtitle: user.email,
                icon: 'solar:settings-outline',
                route: '/profile'
            })
        }

        if (includeDashboard) {
            routes.push({
                value: 'dashboard',
                title: 'Admin Dashboard',
                icon: 'mage:dashboard',
                route: '/admin'
            })
        }

        if (includeOrders) {
            routes.push({
                value: 'orders',
                title: 'My Orders',
                icon: 'mage:box',
                route: '/orders'
            })
        }
    }

    if (includeTheme) {
        routes.push({
            value: 'theme',
            title: 'Theme',
            component: React.createElement(ThemeToggle),
        })
    }

    if (user && includeLogout) {
        routes.push({
            value: 'logout',
            title: 'Log out',
            icon: 'fluent:power-20-regular',
            action: logout
        })
    }

    return routes
}
