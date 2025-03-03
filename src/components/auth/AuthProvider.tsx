'use client'

import useLogout from "@/hooks/useLogout"
import { useUserStore } from "@/stores/userStore"
import { ReactNode, useEffect } from "react"

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { user, isRefreshing, refreshToken, clearUser } = useUserStore()
    const logout = useLogout()

    useEffect(() => {
        if (!user) return

        const tokenExpiryTime = user.exp * 1000
        if (Date.now() >= tokenExpiryTime) {
            clearUser()
            return
        }

        const refreshThreshold = 10 * 60 * 1000 // 10 minutes
        const timeUntilRefresh = tokenExpiryTime - Date.now() - refreshThreshold

        if (timeUntilRefresh <= 0) {
            if (!isRefreshing) refreshToken()
            return
        }

        const timer = setTimeout(() => {
            if (!isRefreshing) refreshToken()
        }, timeUntilRefresh)

        return () => clearTimeout(timer)
    }, [user, isRefreshing, refreshToken, logout])

    return <>{children}</>
}

export default AuthProvider
