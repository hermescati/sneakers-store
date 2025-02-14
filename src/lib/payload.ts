import configPromise from '@payload-config'
import { BasePayload, getPayload } from 'payload'

export async function getPayloadClient(): Promise<BasePayload> {
    const payloadClient = await getPayload({ config: configPromise })
    return payloadClient
}