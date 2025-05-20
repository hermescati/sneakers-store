'use client'

import ThemeToggle from '@/components/theme/ThemeToggle'
import routes from '@/lib/routes'
import { useUserStore } from '@/stores/userStore'
import { NavMenuItem } from '@/types'
import { createElement, useMemo } from 'react'
import useLogout from './useLogout'

const useNavMenuItems = () => {
  const logout = useLogout()
  const { user } = useUserStore()

  const menuItems = useMemo<NavMenuItem[]>(() => {
    const items: NavMenuItem[] = []

    if (user) {
      items.push({
        value: 'profile',
        title: 'Profile',
        subtitle: user.email,
        icon: 'solar:settings-outline',
        route: routes.profile
      })

      if (user.role === 'admin') {
        items.push({
          value: 'dashboard',
          title: 'Admin Dashboard',
          icon: 'mage:dashboard',
          route: routes.admin
        })
      }

      items.push({
        value: 'wishlist',
        title: 'Wishlist',
        icon: 'solar:heart-outline',
        route: routes.wishlist
      })

      items.push({
        value: 'orders',
        title: 'My Orders',
        icon: 'mage:box',
        route: routes.orders.home
      })
    }

    items.push({
      value: 'theme',
      title: 'Theme',
      component: createElement(ThemeToggle, { headless: true }),
      class: 'hidden lg:block'
    })

    if (user) {
      items.push({
        value: 'logout',
        title: 'Log out',
        icon: 'fluent:power-20-regular',
        action: logout
      })
    }

    return items
  }, [user])

  return menuItems
}

export default useNavMenuItems
