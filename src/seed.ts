import 'dotenv/config'
import { getPayload } from 'payload'
import { findConfig } from 'payload/node'
import sharp from 'sharp'

const BRANDS = ['Nike', 'Adidas', 'New Balance', 'Jordan']

const MODELS: Record<string, string[]> = {
  Nike: ['Dunk Low', 'Air Force 1', 'Air Max 1'],
  Adidas: ['Yeezy Boost 350', 'Samba', 'Campus 00s'],
  'New Balance': ['550', '2002R', '990v6'],
  Jordan: ['Air Jordan 1 Low', 'Air Jordan 4', 'Air Jordan 3']
}

const COLLABORATIONS = [
  { title: 'Off-White x Nike', brands: ['Nike', 'Off-White'] },
  { title: 'Aimé Leon Dore x New Balance', brands: ['New Balance', 'Aimé Leon Dore'] }
]

interface SeedProduct {
  sku: string
  brand: string
  model: string
  nickname: string
  colorway: string
  retail_price: number
  release_date: string
  description: string
  size_category: 'mens' | 'womens' | 'kids'
  stock: { size: number; price: number; quantity: number }[]
  discount?: { type: 'percent_off' | 'amount_off'; value: number }
}

const PRODUCTS: SeedProduct[] = [
  {
    sku: 'DD1391-100',
    brand: 'Nike',
    model: 'Dunk Low',
    nickname: 'Panda',
    colorway: 'White/Black-White',
    retail_price: 110,
    release_date: '2021-03-10',
    description: 'The Nike Dunk Low Panda features a clean white leather base with black overlays.',
    size_category: 'mens',
    stock: [
      { size: 8, price: 130, quantity: 3 },
      { size: 9, price: 125, quantity: 5 },
      { size: 10, price: 140, quantity: 2 },
      { size: 11, price: 135, quantity: 4 },
      { size: 12, price: 150, quantity: 1 }
    ]
  },
  {
    sku: 'DZ5485-612',
    brand: 'Nike',
    model: 'Dunk Low',
    nickname: 'Valentine\'s Day',
    colorway: 'Adobe/Dragon Red/Team Red',
    retail_price: 115,
    release_date: '2024-02-01',
    description: 'A Valentine\'s Day themed Dunk Low with red and pink tones.',
    size_category: 'womens',
    stock: [
      { size: 6, price: 160, quantity: 2 },
      { size: 7, price: 155, quantity: 3 },
      { size: 8, price: 150, quantity: 4 }
    ]
  },
  {
    sku: 'HF4263-100',
    brand: 'Nike',
    model: 'Air Force 1',
    nickname: 'White',
    colorway: 'White/White',
    retail_price: 115,
    release_date: '2023-01-01',
    description: 'The timeless Air Force 1 in triple white.',
    size_category: 'mens',
    stock: [
      { size: 9, price: 120, quantity: 8 },
      { size: 10, price: 120, quantity: 6 },
      { size: 11, price: 120, quantity: 5 }
    ]
  },
  {
    sku: 'HP5590-037',
    brand: 'Adidas',
    model: 'Yeezy Boost 350',
    nickname: 'Onyx',
    colorway: 'Onyx/Onyx/Onyx',
    retail_price: 230,
    release_date: '2023-06-04',
    description: 'The Yeezy Boost 350 V2 Onyx in a sleek all-black Primeknit upper.',
    size_category: 'mens',
    stock: [
      { size: 8, price: 260, quantity: 2 },
      { size: 9, price: 270, quantity: 3 },
      { size: 10, price: 280, quantity: 2 },
      { size: 11, price: 275, quantity: 1 }
    ]
  },
  {
    sku: 'IG7381',
    brand: 'Adidas',
    model: 'Samba',
    nickname: 'OG Cloud White',
    colorway: 'Cloud White/Core Black/Gum',
    retail_price: 100,
    release_date: '2024-01-15',
    description: 'The classic Adidas Samba OG with a white leather upper and gum sole.',
    size_category: 'mens',
    stock: [
      { size: 8, price: 110, quantity: 5 },
      { size: 9, price: 110, quantity: 4 },
      { size: 10, price: 115, quantity: 6 },
      { size: 11, price: 120, quantity: 3 }
    ]
  },
  {
    sku: 'BB550WT1',
    brand: 'New Balance',
    model: '550',
    nickname: 'White Green',
    colorway: 'White/Green',
    retail_price: 110,
    release_date: '2023-03-20',
    description: 'The New Balance 550 with a white leather upper and green accents.',
    size_category: 'mens',
    stock: [
      { size: 8, price: 130, quantity: 3 },
      { size: 9, price: 135, quantity: 4 },
      { size: 10, price: 140, quantity: 2 },
      { size: 11, price: 145, quantity: 3 }
    ]
  },
  {
    sku: 'M2002RXB',
    brand: 'New Balance',
    model: '2002R',
    nickname: 'Protection Pack - Phantom',
    colorway: 'Phantom/Phantom',
    retail_price: 150,
    release_date: '2023-08-10',
    description: 'Part of the Protection Pack series with deconstructed overlays.',
    size_category: 'mens',
    stock: [
      { size: 9, price: 200, quantity: 2 },
      { size: 10, price: 210, quantity: 3 },
      { size: 11, price: 195, quantity: 2 }
    ],
    discount: { type: 'percent_off', value: 10 }
  },
  {
    sku: 'DC0774-060',
    brand: 'Jordan',
    model: 'Air Jordan 1 Low',
    nickname: 'Shadow Toe',
    colorway: 'Black/Medium Grey/White',
    retail_price: 110,
    release_date: '2022-09-01',
    description: 'A clean colourblocked Jordan 1 Low with a shadow grey toe box.',
    size_category: 'mens',
    stock: [
      { size: 8, price: 140, quantity: 2 },
      { size: 9, price: 145, quantity: 3 },
      { size: 10, price: 150, quantity: 4 },
      { size: 11, price: 155, quantity: 2 },
      { size: 12, price: 160, quantity: 1 }
    ]
  },
  {
    sku: 'FV5029-006',
    brand: 'Jordan',
    model: 'Air Jordan 4',
    nickname: 'Bred Reimagined',
    colorway: 'Black/Fire Red/Cement Grey/Summit White',
    retail_price: 210,
    release_date: '2024-02-17',
    description: 'The Air Jordan 4 Bred Reimagined brings back the iconic colourway with premium materials.',
    size_category: 'mens',
    stock: [
      { size: 8, price: 350, quantity: 1 },
      { size: 9, price: 360, quantity: 2 },
      { size: 10, price: 380, quantity: 1 },
      { size: 11, price: 370, quantity: 2 }
    ]
  },
  {
    sku: 'DM0106-100',
    brand: 'Jordan',
    model: 'Air Jordan 3',
    nickname: 'White Cement Reimagined',
    colorway: 'Summit White/Fire Red/Black/Cement Grey',
    retail_price: 200,
    release_date: '2023-03-11',
    description: 'The Air Jordan 3 White Cement Reimagined with a no-Nike Air branding on the heel.',
    size_category: 'mens',
    stock: [
      { size: 9, price: 250, quantity: 2 },
      { size: 10, price: 260, quantity: 3 },
      { size: 11, price: 255, quantity: 2 }
    ]
  }
]

const REVIEWS = [
  { productSku: 'DD1391-100', rating: 5, recommend: true, comment: 'Classic shoe, goes with everything.' },
  { productSku: 'DD1391-100', rating: 4, recommend: true, comment: 'Great quality but runs a bit narrow.' },
  { productSku: 'HP5590-037', rating: 5, recommend: true, comment: 'Most comfortable shoe I own.' },
  { productSku: 'BB550WT1', rating: 4, recommend: true, comment: 'Clean design, takes a bit to break in.' },
  { productSku: 'FV5029-006', rating: 5, recommend: true, comment: 'Worth every penny. The materials are incredible.' },
  { productSku: 'DC0774-060', rating: 3, recommend: false, comment: 'Decent shoe but nothing special for the price.' },
  { productSku: 'IG7381', rating: 5, recommend: true, comment: 'The Samba hype is real. Super versatile.' },
  { productSku: 'DM0106-100', rating: 4, recommend: true, comment: 'Iconic silhouette, leather quality is solid.' }
]

async function createPlaceholderImage(): Promise<Buffer> {
  return sharp({
    create: {
      width: 600,
      height: 600,
      channels: 3,
      background: { r: 230, g: 230, b: 230 }
    }
  })
    .png()
    .toBuffer()
}

async function seed() {
  const configPath = await findConfig()
  const config = await (await import(configPath)).default
  const payload = await getPayload({ config })

  payload.logger.info('Starting seed...')

  // --- Clean existing seed data ---
  payload.logger.info('Cleaning existing data...')
  const collections = ['reviews', 'orders', 'wishlist', 'products', 'events', 'media', 'collaborations', 'models', 'brands'] as const
  for (const collection of collections) {
    await payload.delete({ collection, where: { id: { exists: true } } })
  }
  // Delete non-admin users
  await payload.delete({ collection: 'users', where: { role: { equals: 'user' } } })
  payload.logger.info('  Cleaned existing data')

  // --- Users ---
  const existingAdmin = await payload.find({
    collection: 'users',
    where: { role: { equals: 'admin' } },
    limit: 1
  })

  if (existingAdmin.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: process.env.PAYLOAD_ADMIN_USER_EMAIL || 'admin@sneakers.com',
        password: process.env.PAYLOAD_ADMIN_USER_PASSWORD || 'Admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        _verified: true
      },
      disableVerificationEmail: true
    })
    payload.logger.info('  Created admin user')
  }

  const testUser = await payload.create({
    collection: 'users',
    data: {
      email: 'test@sneakers.com',
      password: 'Test1234',
      firstName: 'Test',
      lastName: 'Customer',
      role: 'user',
      _verified: true
    },
    disableVerificationEmail: true
  })
  payload.logger.info('  Created test user')

  // --- Brands ---
  const brandMap: Record<string, string> = {}

  for (const name of BRANDS) {
    const brand = await payload.create({ collection: 'brands', data: { name } })
    brandMap[name] = brand.id
  }

  // Extra brands for collaborations
  for (const collab of COLLABORATIONS) {
    for (const brandName of collab.brands) {
      if (!brandMap[brandName]) {
        const brand = await payload.create({ collection: 'brands', data: { name: brandName } })
        brandMap[brandName] = brand.id
      }
    }
  }
  payload.logger.info(`  Created ${Object.keys(brandMap).length} brands`)

  // --- Models ---
  const modelMap: Record<string, string> = {}

  for (const [brandName, models] of Object.entries(MODELS)) {
    for (const name of models) {
      const created = await payload.create({
        collection: 'models',
        data: {
          name,
          brand: brandMap[brandName]
        }
      })
      modelMap[name] = created.id
    }
  }
  payload.logger.info(`  Created ${Object.keys(modelMap).length} models`)

  // --- Collaborations ---
  const collabMap: Record<string, string> = {}

  for (const collab of COLLABORATIONS) {
    const created = await payload.create({
      collection: 'collaborations',
      data: {
        title: collab.title,
        brand: collab.brands.map((b) => brandMap[b])
      }
    })
    collabMap[collab.title] = created.id
  }
  payload.logger.info(`  Created ${Object.keys(collabMap).length} collaborations`)

  // --- Placeholder Media ---
  const imageBuffer = await createPlaceholderImage()
  const placeholderMedia = await payload.create({
    collection: 'media',
    data: { user: testUser.id },
    file: {
      data: imageBuffer,
      mimetype: 'image/png',
      name: 'placeholder.png',
      size: imageBuffer.byteLength
    }
  })
  payload.logger.info('  Created placeholder media')

  // --- Products ---
  const productMap: Record<string, string> = {}

  for (const p of PRODUCTS) {
    const created = await payload.create({
      collection: 'products',
      data: {
        sku: p.sku,
        brand: brandMap[p.brand],
        model: modelMap[p.model],
        nickname: p.nickname,
        colorway: p.colorway,
        retail_price: p.retail_price,
        release_date: p.release_date,
        description: p.description,
        size_category: p.size_category,
        stock: p.stock,
        discount: p.discount ?? {},
        images: [{ image: placeholderMedia.id }]
      }
    })
    productMap[p.sku] = created.id
  }
  payload.logger.info(`  Created ${Object.keys(productMap).length} products`)

  // --- Reviews ---
  let reviewCount = 0
  for (const review of REVIEWS) {
    const productId = productMap[review.productSku]
    if (!productId) continue

    await payload.create({
      collection: 'reviews',
      data: {
        product: productId,
        user: testUser.id,
        rating: review.rating,
        recommend: review.recommend,
        comment: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: review.comment, version: 1 }],
                version: 1
              }
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1
          }
        }
      }
    })
    reviewCount++
  }
  payload.logger.info(`  Created ${reviewCount} reviews`)

  payload.logger.info('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
