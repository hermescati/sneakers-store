'use client'

import toast from '@/components/base/Toast';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const useLogout = () => {
    const router = useRouter()

    const logout = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
                {
                    method: 'POST',
                    credentials: 'include'
                }
            )
            if (!response.ok) throw new Error('Logout failed')

            toast.success('Successfully logged out.')
            router.refresh()
        } catch (error) {
            console.error('Error during logout:', error)
            toast.error("Couldn't logout. Please try again!")
        }
    }, [router])

    return logout
};

export default useLogout