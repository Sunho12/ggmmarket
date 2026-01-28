import { Tables } from '@/types/database.types'
import Image from 'next/image'
import Link from 'next/link'

type Product = Tables<'products'> & {
  profiles: Pick<Tables<'profiles'>, 'username' | 'location'>
}

export default function ProductCard({ product }: { product: Product }) {
  const thumbnail = product.images?.[0]
  const formattedPrice = product.price.toLocaleString('ko-KR')

  return (
    <Link href={`/products/${product.id}`}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative w-full aspect-square bg-gray-200">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <span className="text-4xl">🍠</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-xl font-bold text-gray-900 mb-2">
            {formattedPrice}원
          </p>
          <p className="text-sm text-gray-600">
            {product.location || product.profiles?.location || '위치 정보 없음'}
          </p>
        </div>
      </div>
    </Link>
  )
}
