import configPromise from '@payload-config'
import { getPayload } from 'payload'

// export async function getPayloadClient(): Promise<BasePayload> {
//     const payloadClient = await getPayload({ config: configPromise })
//     return payloadClient
// }

export const payloadClient = await getPayload({ config: configPromise })