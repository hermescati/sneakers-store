'use server'

import { getPayloadClient } from '@/lib/payload'
import {
  ForgotPassSchema,
  LoginSchema,
  RegistrationSchema,
  ResetPassSchema
} from '@/lib/validators'
import { PayloadError, ServerResponse } from '@/types'
import { User } from '@/types/payload'
import { cookies } from 'next/headers'

export async function createUser(input: RegistrationSchema): Promise<ServerResponse> {
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

    return { code: 201, message: 'Account created successfully.', data: email }
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

export async function userLogin(input: LoginSchema): Promise<ServerResponse> {
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

    (await cookies()).set({
      name: 'payload-token',
      value: token,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      expires: exp ? new Date(exp * 1000) : new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
    })

    return { code: 200, message: 'Signed in successfully.', data: user }
  } catch (error) {
    console.error(error)

    if (error instanceof Error && error.name === 'AuthenticationError') {
      return { code: 401, message: error.message }
    }

    return { code: 500, message: 'Something went wrong. Please try again!' }
  }
}

export async function forgotPassword(email: ForgotPassSchema['email']) {
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

export async function resetPassword(token: string, password: ResetPassSchema['password']) {
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