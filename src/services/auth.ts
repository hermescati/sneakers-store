'use server'

import {
  TLoginValidationSchema,
  TSignUpValidationSchema
} from '@/lib/validators'
import { User } from '@/types/payload'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { cookies } from 'next/headers'

// TODO: Find a better alternative to Errors, or define an error structure that is solid
// TODO: Better toast messages, more professional
// TODO: Find a way to have a loading state for these service methods
// TODO: Add forgotPassword service method
export async function createUser(input: TSignUpValidationSchema) {
  const { firstName, lastName, email, password } = input
  const payload = await getPayloadHMR({ config: configPromise })

  const { docs: users } = await payload.find({
    collection: 'users',
    where: {
      email: { equals: email }
    }
  })

  if (users.length !== 0) return { code: 409, message: 'UNAUTHORIZED' }

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
  } catch (error) {
    return { code: 400, message: 'BAD_REQUEST' }
  }

  return { code: 201, message: 'CREATED', sentToEmail: email }
}

export async function verifyEmail(token: string) {
  const payload = await getPayloadHMR({ config: configPromise })

  try {
    const isVerified = await payload.verifyEmail({
      collection: 'users',
      token
    })
    if (!isVerified) return { code: 409, message: 'UNAUTHORIZED' }

    return { code: 200, message: 'OK' }
  } catch (error) {
    return { code: 400, message: 'BAD_REQUEST' }
  }
}

export async function userLogin(input: TLoginValidationSchema) {
  const { email, password } = input
  const payload = await getPayloadHMR({ config: configPromise })

  try {
    const { user, token } = await payload.login({
      collection: 'users',
      data: { email, password }
    })

    if (token) {
      cookies().set({
        name: 'payload-token',
        value: token,
        path: '/',
        httpOnly: true,
        sameSite: 'lax'
      })
    }

    return { code: 200, message: 'OK', user }
  } catch (error) {
    return { code: 409, message: 'UNAUTHORIZED' }
  }
}

export async function getUser() {
  const nextCookies = cookies()
  const token = nextCookies.get('payload-token')?.value
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`
      }
    }
  )

  const { user } = (await response.json()) as { user: User | null }
  return { user }
}
