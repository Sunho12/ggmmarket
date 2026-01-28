'use client'

import { Tables } from '@/types/database.types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Product = Tables<'products'> & {
  profiles: Tables<'profiles'>
}

interface ProductDetailProps {
  product: Product
  isOwner: boolean
}

export default function ProductDetail({ product, isOwner }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const images = product.images || []
  const formattedPrice = product.price.toLocaleString('ko-KR')

  const handleDelete = async () => {
    if (!confirm('정말로 이 상품을 삭제하시겠습니까?')) return

    setDeleting(true)

    try {
      // Delete images from storage
      if (images.length > 0) {
        const fileNames = images.map(url => url.split('/').slice(-2).join('/'))
        await supabase.storage
          .from('product-images')
          .remove(fileNames)
      }

      // Delete product
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id)

      if (error) throw error

      router.push('/my-products')
      router.refresh()
    } catch (err) {
      console.error('Delete error:', err)
      alert('삭제에 실패했습니다.')
    } finally {
      setDeleting(false)
    }
  }

  const getCategoryName = (category: string) => {
    const map: Record<string, string> = {
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
    return map[category] || category
  }

  const getStatusName = (status: string) => {
    const map: Record<string, string> = {
      available: '판매중',
      reserved: '예약중',
      sold: '판매완료',
    }
    return map[status] || status
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            {images.length > 0 ? (
              <div>
                <div className="relative w-full aspect-square bg-gray-100">
                  <Image
                    src={images[currentImageIndex]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 p-2 overflow-x-auto">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-20 flex-shrink-0 border-2 rounded ${
                          index === currentImageIndex ? 'border-primary-600' : 'border-gray-200'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover rounded"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                <span className="text-8xl">🍠</span>
              </div>
            )}
          </div>

          <div className="md:w-1/2 p-6">
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                product.status === 'available' ? 'bg-green-100 text-green-800' :
                product.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {getStatusName(product.status)}
              </span>
            </div>

            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

            <p className="text-3xl font-bold text-gray-900 mb-6">
              {formattedPrice}원
            </p>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex">
                <span className="text-gray-600 w-24">카테고리</span>
                <span className="font-medium">{getCategoryName(product.category)}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24">거래지역</span>
                <span className="font-medium">
                  {product.location || product.profiles?.location || '정보 없음'}
                </span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24">조회수</span>
                <span className="font-medium">{product.view_count}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <h2 className="font-semibold mb-2">판매자 정보</h2>
              <p className="text-sm text-gray-600">
                {product.profiles?.username || product.profiles?.email || '익명'}
              </p>
            </div>

            {isOwner ? (
              <div className="flex gap-2">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="btn-primary flex-1 text-center"
                >
                  수정하기
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn-secondary"
                  disabled={deleting}
                >
                  {deleting ? '삭제 중...' : '삭제하기'}
                </button>
              </div>
            ) : (
              <button className="btn-primary w-full">
                채팅하기
              </button>
            )}
          </div>
        </div>

        {product.description && (
          <div className="border-t border-gray-200 p-6">
            <h2 className="font-semibold mb-3">상품 설명</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
