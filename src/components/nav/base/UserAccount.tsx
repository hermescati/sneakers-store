'use client'

import Button from '@/components/base/Button'
import DropdownMenu, { DropdownItem } from '@/components/base/DropdownMenu'
import { User } from '@/types/payload'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const UserAccount = ({ user }: { user: User | null }) => {
  const router = useRouter()

  const [darkMode, setDarkMode] = useState<boolean>(false)
  const isAdmin = user && user.role === 'admin'

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) throw new Error('Logout failed')
      toast.success('Successfully logged out.')

      router.refresh()
    } catch (error) {
      console.error('Error during logout:', error)
      toast.error("Couldn't logout. Please try again!")
    }
  }

  const dropdownItems: DropdownItem[] = user
    ? [
        { value: 'email', label: user.email, type: 'header' },
        ...(isAdmin
          ? [
              {
                value: 'dashboard',
                label: 'Admin Dashboard',
                icon: 'mage:dashboard',
                action: () => router.push('/admin'),
              },
            ]
          : []),
        {
          value: 'orders',
          label: 'My Orders',
          icon: 'mage:box',
          action: () => router.push('/orders')
        },
        {
          value: 'theme',
          label: darkMode ? 'Light Mode' : 'Dark Mode',
          icon: darkMode
            ? 'solar:sun-line-duotone'
            : 'solar:moon-stars-outline',
          action: () => setDarkMode(!darkMode)
        },
        {
          value: 'logout',
          label: 'Log out',
          icon: 'fluent:power-20-regular',
          action: handleLogout
        }
      ]
    : []

  return (
    <>
      {user ? (
        <DropdownMenu id="account-dropdown" items={dropdownItems}>
          <div className="flex items-center gap-3 mx-3 my-1.5">
            <div className="relative flex justify-center items-center aspect-square border border-primary-300 bg-primary-200 rounded-full w-8 h-8">
              <Icon icon="solar:user-bold-duotone" className="text-xl" />
            </div>
            <h4 className="flex-1 font-semibold text-md text-primary-700">
              Hi, {user.firstName}
            </h4>
          </div>
        </DropdownMenu>
      ) : (
        <Button
          href="/login"
          label="Sign in"
          size="small"
          variant="outline"
          className="border-primary-500 text-primary-600 text-base hover:background-primary-200"
        />
      )}
    </>
  )
}

export default UserAccount
