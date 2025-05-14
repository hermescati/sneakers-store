'use client'

import toast from '@/components/base/toast/Toast'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

const useLogout = () => {
  const router = useRouter()
  const { clearUser } = useUserStore()

  const logout = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/logout`, {
        method: 'POST',
        credentials: 'include'
      })
      if (!response.ok) return toast.error(response.statusText)

      clearUser()
      toast.success('User logged out successfully.')
      router.refresh()
    } catch (error) {
      toast.error('An unexpected error occured. Try again later.')
    }
  }, [router])

  return logout
}

export default useLogout
