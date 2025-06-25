import React, { useMemo } from 'react'
import Color from 'color'

type AvatarProps = {
  firstName: string
  lastName?: string
  size?: number
}

export function Avatar({ firstName, lastName, size = 40 }: AvatarProps) {
  const initials = useMemo(() => {
    if (!firstName) return ''
    if (lastName && lastName.trim().length > 0) {
      return firstName.trim().charAt(0).toUpperCase() + lastName.trim().charAt(0).toUpperCase()
    }
    return firstName.trim().slice(0, 2).toUpperCase()
  }, [firstName, lastName])

  const baseColor = useMemo(() => {
    const hue = Math.floor(Math.random() * 360)
    return Color.hsl(hue, 60, 50)
  }, [])

  const backgroundColor = baseColor.lighten(0.9).hex()
  const textColor = baseColor.darken(0.25).hex()

  return (
    <div
      className="flex select-none items-center justify-center rounded-full font-bold leading-none"
      style={{
        width: size,
        height: size,
        backgroundColor,
        color: textColor,
        fontSize: size * 0.4,
        fontFamily: 'Arial, sans-serif'
      }}
      title={`${firstName} ${lastName ?? ''}`.trim()}
      aria-label={`Avatar for ${firstName} ${lastName ?? ''}`.trim()}
    >
      {initials}
    </div>
  )
}
