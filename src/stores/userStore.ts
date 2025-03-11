import toast from "@/components/base/toast/Toast"
import { refreshToken } from "@/services/auth"
import { User } from "payload"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type AuthUser = User & {
    token: string
    exp: number
}

type UserState = {
    user: AuthUser | null,
    isRefreshing: boolean,
    setUser: (user: AuthUser) => void,
    clearUser: VoidFunction,
    refreshToken: () => Promise<void>
}

export const useUserStore = create<UserState>()(
    persist((set, get) => ({
        user: null,
        isRefreshing: false,
        setUser: (user) => {
            set({ user })
        },
        clearUser: () => {
            set({ user: null, isRefreshing: false })
        },   
        refreshToken: async () => {
            const { user, isRefreshing } = get()
            if (!user || isRefreshing) return

            try {
                set({ isRefreshing: true })
                const { code, message, data } = await refreshToken()

                if (code === 200) {
                    set({ user: data })
                    return
                }

                toast.error(message)
            } catch (error) {
                toast.error('An unexpected error occured. Try again later.')
            } finally {
                set({ isRefreshing: false })
            }
        }
    }),
        {
            name: 'user-store',
            storage: createJSONStorage(() => localStorage)
        })
)