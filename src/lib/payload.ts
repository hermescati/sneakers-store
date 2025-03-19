import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const payloadClient = await getPayload({ 
    config: configPromise 
})