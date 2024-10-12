'use client'

import { useAuth } from '@/hooks/use-auth'
import { User } from '@/types/payload'
import { useRouter } from 'next/navigation'
import DropdownMenu, { DropdownItem } from '../base/DropdownMenu'

interface UserAccountProps {
  user: User
}

const UserAccount = ({ user }: UserAccountProps) => {
  const router = useRouter()

  const { logout } = useAuth()

  const dropdownItems: DropdownItem[] = [
    { value: 'email', label: user.email, type: 'header' },
    {
      value: 'dashboard',
      label: 'Retailer Dashboard',
      icon: 'mage:dashboard',
      action: () => router.push('/admin')
    },
    {
      value: 'logout',
      label: 'Log out',
      icon: 'fluent:power-20-regular',
      action: logout
    }
  ]

  return (
    <DropdownMenu
      id="account-dropdown"
      title="My account"
      items={dropdownItems}
    />
  )
}

export default UserAccount
