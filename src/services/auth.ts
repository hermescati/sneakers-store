'use server'

import { getPayloadClient } from '@/lib/payload'
import {
  LoginSchema,
  RegistrationSchema
} from '@/lib/validators'
import { PayloadError, ServerResponse } from '@/types'
import { User } from '@/types/payload'
import { cookies } from 'next/headers'


export async function createUser(input: RegistrationSchema): Promise<ServerResponse> {
  const { firstName, lastName, email, password } = input
  const payload = await getPayloadClient()

  const { docs: users } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } }
  })

  if (users.length !== 0) {
    return { code: 409, message: 'This email is already in use. Maybe login?' }
  }

  try {
    await payload.create({
      collection: 'users',
      data: {
        firstName,
        lastName,
        email,
        password,
        role: 'user'
      }
    })

    return { code: 201, message: 'Account created successfully.', data: email }
  } catch (error) {
    console.error(error)
    return { code: 500, message: 'Something went wrong. Please try again!' }
  }
}

export async function verifyEmail(token: string): Promise<ServerResponse> {
  const payload = await getPayloadClient()

  try {
    const isVerified = await payload.verifyEmail({
      collection: 'users',
      token
    })

    if (!isVerified) {
      return { code: 409, message: 'Invalid or expired verification token.' }
    }

    return { code: 200, message: 'User verified successfully.' }
  } catch (error) {
    console.error(error)
    return { code: 500, message: 'Something went wrong. Please try again!' }
  }
}

export async function getUser() {
  const nextCookies = await cookies()
  const token = nextCookies.get('payload-token')?.value

  // if (!token) {
  //   throw new PayloadError(401, 'User not authenticated.')
  // }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
    { headers: { Authorization: `JWT ${token}` } }
  )

  if (!response.ok) {
    const message = await response.text()
    throw new PayloadError(response.status, 'Failed fetching user data.', message)
  }

  try {
    const data = (await response.json()) as { user: User | null; token?: string; exp?: number }
    return { user: data.user, token: data.token, exp: data.exp }
  } catch (error) {
    throw new PayloadError(500, 'Failed parsing user data.', error)
  }
}

export async function userLogin(input: LoginSchema): Promise<ServerResponse> {
  const { email, password } = input
  const payload = await getPayloadClient()

  try {
    const { user, token } = await payload.login({
      collection: 'users',
      data: { email, password }
    })

    if (!user || !token) {
      return { code: 401, message: 'Invalid email or password.' }
    }

    (await cookies()).set({
      name: 'payload-token',
      value: token,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })

    return { code: 200, message: 'Signed in successfully.', data: user }
  } catch (error) {
    console.error('Login error:', error)

    if (error instanceof Error && error.name === 'AuthenticationError') {
      return { code: 401, message: error.message }
    }

    return { code: 500, message: 'Something went wrong. Please try again!' }
  }
}

export async function userLogout() {
  const nextCookies = await cookies()
  const token = nextCookies.get('payload-token')?.value

  if (!token) {
    throw new PayloadError(401, 'User not authenticated.')
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
    { method: 'POST', credentials: 'include' }
  )

  if (!response.ok) {
    const message = await response.text()
    throw new PayloadError(response.status, 'Error logging out', message)
  }

  return { code: 200, message: 'User logged out successfully.' }
}

export async function forgotPassword(email: string) {
  const payload = await getPayloadClient()

  try {
    await payload.forgotPassword({
      collection: 'users',
      data: { email }
    })

    return { code: 200, message: 'Password reset email sent successfully.' }
  } catch (error) {
    throw new PayloadError(400, 'Error sending password reset email.', error)
  }
}

export async function resetPassword(token: string, password: string) {
  const payload = await getPayloadClient()

  try {
    const { user } = await payload.resetPassword({
      collection: 'users',
      data: { token, password },
      overrideAccess: true
    })

    return { code: 200, message: 'Password reset successful.', user }
  } catch (error) {
    throw new PayloadError(400, 'Password reset failed.', error)
  }
}