import MainContainer from '@/components/MainContainer'
import ProductCard from '@/components/product/ProductCard'
import { getProducts } from '@/services/products'

const Products = async () => {
  const { products } = await getProducts({ limit: 32 })

  return (
    <MainContainer className="grid grid-cols-12 gap-x-12 py-6">
      <div className="flex col-span-3">Filters Panel</div>
      <ul className="grid grid-cols-5 col-span-9 gap-2">
        {products.map((product, index) => (
          <li key={product.id}>
            <ProductCard product={product} index={index} />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default Products
