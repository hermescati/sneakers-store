import SneakersPage from '@/components/product/SneakersPage'
import { filterProducts } from '@/services/products'

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function Page({ searchParams }: PageProps) {
  const queryParams = await searchParams
  return <SneakersPage searchParams={queryParams} fetchCallback={filterProducts} />
}
