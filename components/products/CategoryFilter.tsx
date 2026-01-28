'use client'

import { Constants } from '@/types/database.types'

interface CategoryFilterProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const categoryNames: Record<string, string> = {
  all: '전체',
  digital: '디지털기기',
  furniture: '가구/인테리어',
  clothing: '의류',
  books: '도서',
  sports: '스포츠/레저',
  beauty: '뷰티/미용',
  toys: '장난감/취미',
  food: '식품',
  pets: '반려동물',
  home_appliances: '생활가전',
  electronics: '전자기기',
  vehicles: '차량',
  other: '기타',
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const categories = ['all', ...Constants.public.Enums.product_category]

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">카테고리</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {categoryNames[category]}
          </button>
        ))}
      </div>
    </div>
  )
}
