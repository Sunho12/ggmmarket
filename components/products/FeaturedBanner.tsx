'use client'

import { Tables } from '@/types/database.types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Product = Tables<'products'> & {
  profiles: Pick<Tables<'profiles'>, 'username' | 'location'>
}

export default function FeaturedBanner({ product }: { product: Product | null }) {
  const router = useRouter()

  if (!product) return null

  const thumbnail = product.images?.[0]
  const formattedPrice = product.price.toLocaleString('ko-KR')

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="relative w-full h-80 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl overflow-hidden cursor-pointer mb-8 hover:shadow-xl transition-shadow"
    >
      <div className="absolute inset-0 flex items-center">
        <div className="w-1/2 p-8">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
              🔥 오늘의 추천
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 line-clamp-2">
            {product.title}
          </h2>
          <p className="text-4xl font-bold text-primary-600 mb-4">
            {formattedPrice}원
          </p>
          <p className="text-gray-600 line-clamp-2 mb-4">
            {product.description || '상품 설명이 없습니다.'}
          </p>
          <p className="text-sm text-gray-500">
            📍 {product.location || product.profiles?.location || '위치 정보 없음'}
          </p>
        </div>

        {thumbnail && (
          <div className="w-1/2 h-full relative">
            <Image
              src={thumbnail}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </div>
  )
}
