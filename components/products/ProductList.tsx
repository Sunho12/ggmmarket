import { Tables } from '@/types/database.types'
import ProductCard from './ProductCard'

type Product = Tables<'products'> & {
  profiles: Pick<Tables<'profiles'>, 'username' | 'location'>
}

export default function ProductList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-6xl mb-4 block">🍠</span>
        <p className="text-gray-600">등록된 상품이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
