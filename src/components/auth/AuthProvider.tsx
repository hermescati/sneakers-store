'use client'

import React, { ReactNode, useEffect } from "react"
import { useUserStore } from "@/stores/userStore"

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { user, isRefreshing, refreshToken } = useUserStore()

    useEffect(() => {
        if (!user) return

        const refreshThreshold = 10 * 60 * 1000 // 10 minutes
        const tokenExpiryTime = user.exp * 1000
        const timeUntilRefresh = tokenExpiryTime - Date.now() - refreshThreshold

        if (timeUntilRefresh <= 0) {
            if (!isRefreshing) {
                refreshToken()
            }
        } else {
            const timer = setTimeout(() => {
                if (!isRefreshing) {
                    refreshToken()
                }
            }, timeUntilRefresh)

            return () => clearTimeout(timer)
        }
    }, [user, isRefreshing, refreshToken])

    return <>{children}</>
};

export default AuthProvider
