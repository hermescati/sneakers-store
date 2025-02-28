'use server'

import { getPayloadClient } from '@/lib/payload'
import {
  ForgotPassSchema,
  LoginSchema,
  RegistrationSchema,
  ResetPassSchema
} from '@/lib/validators'
import { AuthUser } from '@/stores/userStore'
import { PayloadError, ServerResponse } from '@/types'
import { User } from '@/types/payload'
import { cookies } from 'next/headers'
import { User as PayloadUser } from 'payload'

export async function createUser(input: RegistrationSchema): Promise<ServerResponse<string>> {
  const { name, email, password } = input
  const payload = await getPayloadClient()

  const { docs: users } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } }
  })

  if (users.length !== 0) {
    return { code: 409, message: 'This email is already in use. Maybe login?' }
  }

  try {
    const [firstName, lastName] = name.split(' ')

    await payload.create({
      collection: 'users',
      data: {
        firstName,
        lastName: lastName || '',
        email,
        password,
        role: 'user'
      }
    })

    return {
      code: 201,
      message: 'Account created successfully.',
      data: email
    }
  } catch (error) {
    console.error(error)
    return { code: 500, message: 'Something went wrong. Please try again!' }
  }
}

export async function verifyUser(token: string): Promise<ServerResponse> {
  const payload = await getPayloadClient()

  try {
    const isVerified = await payload.verifyEmail({
      collection: 'users',
      token
    })

    if (!isVerified) {
      return { code: 403, message: 'Invalid or expired verification token.' }
    }

    return { code: 200, message: 'User verified successfully.' }
  } catch (error) {
    console.error(error)

    if (error instanceof Error && error.name === 'APIError') {
      return { code: 403, message: error.message }
    }

    return { code: 500, message: 'Something went wrong. Please try again!' }
  }
}

async function setTokenCookie(token: string, exp?: number): Promise<number> {
  const expiration = exp ?? Math.floor(Date.now() / 1000) + 3600; // 1 hour

  (await cookies()).set({
    name: 'payload-token',
    value: token,
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(expiration * 1000),
  })

  return expiration
}

async function getTokenCookie(): Promise<string | null> {
  const nextCookies = await cookies()
  return nextCookies.get('payload-token')?.value ?? null
}

export async function userLogin(input: LoginSchema): Promise<ServerResponse<AuthUser>> {
  const { email, password } = input
  const payload = await getPayloadClient()

  try {
    const { user, token, exp } = await payload.login({
      collection: 'users',
      data: { email, password }
    })

    if (!token) {
      return { code: 401, message: 'Invalid email or password.' }
    }

    const expiration = await setTokenCookie(token, exp)
    const data: AuthUser = { ...user, token, exp: expiration }

    return {
      code: 200,
      message: 'Signed in successfully.',
      data: data
    }
  } catch (error) {
    console.error(error)

    if (error instanceof Error && error.name === 'AuthenticationError') {
      return { code: 401, message: error.message }
    }

    return { code: 500, message: 'Something went wrong. Please try again!' }
  }
}

export async function refreshToken(): Promise<ServerResponse<AuthUser>> {
  const token = await getTokenCookie()

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/refresh-token`, {
      method: 'POST',
      headers: { Authorization: `JWT ${token}` }
    })

    if (!response.ok) {
      const message = await response.text()
      return { code: response.status, message: `Failed to refresh token: ${message}` }
    }

    const { user, refreshedToken, exp } = await response.json()

    if (!refreshedToken) {
      return { code: 401, message: 'Failed to refresh token. Please log in again.' }
    }

    const expiration = await setTokenCookie(refreshedToken, exp)
    const data: AuthUser = { ...(user as PayloadUser), token: refreshedToken, exp: expiration }

    return {
      code: 200,
      message: 'Token refreshed successfully.',
      data: data
    }
  } catch (error) {
    console.error(error)
    return { code: 500, message: 'Something went wrong. Please try again!' }
  }
}

export async function forgotPassword(input: ForgotPassSchema): Promise<ServerResponse<string>> {
  const { email } = input
  const payload = await getPayloadClient()

  try {
    await payload.forgotPassword({
      collection: 'users',
      data: { email }
    })

    return {
      code: 400,
      message: 'Password reset email sent successfully.',
      data: email
    }
  } catch (error) {
    console.log(error)
    return { code: 500, message: 'Something went wrong. Please try again!' }
  }
}

export async function resetPassword(token: string, input: ResetPassSchema): Promise<ServerResponse> {
  const { password } = input
  const payload = await getPayloadClient()

  try {
    await payload.resetPassword({
      collection: 'users',
      data: { token, password },
      overrideAccess: true
    })

    return { code: 200, message: 'Password reset successful.' }
  } catch (error) {
    console.log(error)

    if (error instanceof Error && error.message === 'Token is either invalid or has expired.') {
      return { code: 403, message: error.message }
    }

    return { code: 500, message: 'Something went wrong. Please try again!' }
  }
}

// FIXME: Remove this method
export async function getUser() {
  const nextCookies = await cookies()
  const token = nextCookies.get('payload-token')?.value

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