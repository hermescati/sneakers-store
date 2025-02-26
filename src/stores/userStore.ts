
import { User } from "payload"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type UserState = {
    user: User | null,
    setUser: (user: User) => void,
    clearUser: VoidFunction
}

export const useUserStore = create<UserState>()(
    persist((set) => ({
        user: null,
        setUser: (user) => {
            set({ user })
        },
        clearUser: () => {
            set({ user: null })
        }
    }),
        {
            name: 'user-store',
            storage: createJSONStorage(() => localStorage)
        })
)