'use client'

import { Tables } from '@/types/database.types'
import { useState, useMemo } from 'react'
import FeaturedBanner from './FeaturedBanner'
import CategoryFilter from './CategoryFilter'
import ProductList from './ProductList'

type Product = Tables<'products'> & {
  profiles: Pick<Tables<'profiles'>, 'username' | 'location'>
}

export default function ProductListClient({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 조회수가 가장 많은 상품 선택
  const featuredProduct = useMemo(() => {
    if (products.length === 0) return null
    // 조회수 기준 내림차순 정렬 후 첫 번째 상품
    const sortedByViews = [...products].sort((a, b) => b.view_count - a.view_count)
    return sortedByViews[0]
  }, [products])

  // 카테고리 필터링
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products
    return products.filter(product => product.category === selectedCategory)
  }, [products, selectedCategory])

  return (
    <>
      <FeaturedBanner product={featuredProduct} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="mb-4 text-sm text-gray-600">
        {selectedCategory === 'all'
          ? `전체 ${filteredProducts.length}개의 상품`
          : `${filteredProducts.length}개의 상품`
        }
      </div>

      <ProductList products={filteredProducts} />
    </>
  )
}
