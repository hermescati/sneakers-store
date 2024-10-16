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
        {
          value: isAdmin ? 'dashboard' : 'orders',
          label: isAdmin ? 'Admin Dashboard' : 'My Orders',
          icon: isAdmin ? 'mage:dashboard' : 'mage:box',
          action: () => router.push(isAdmin ? '/admin' : '/orders')
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
          <div className="flex items-center gap-4 mx-3 my-1.5">
            <div className="relative flex justify-center items-center aspect-square border border-primary-300 bg-primary-200 rounded-full w-10 h-10">
              <Icon icon="solar:user-bold-duotone" className="text-2xl" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-normal text-sm text-primary-600">
                Hi, {user.firstName}
              </span>
              <h4 className="font-semibold text-md text-primary-700">
                {user.firstName + ' ' + user.lastName}
              </h4>
            </div>
          </div>
        </DropdownMenu>
      ) : (
        <Button
          href="/login"
          label="Sign in"
          className="py-4 text-base rounded-2xl"
        />
      )}
    </>
  )
}

export default UserAccount
