import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getEvents() {
    const payload = await getPayload({ config: configPromise })

    const {
        docs: events,
        hasNextPage,
        nextPage
    } = await payload.find({
        collection: 'events',
        depth: 1
    })

    return {
        events,
        nextPage: hasNextPage && nextPage
    }
}