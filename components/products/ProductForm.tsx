'use client'

import { createClient } from '@/lib/supabase/client'
import { Tables, Constants } from '@/types/database.types'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import ImageUpload from '../ui/ImageUpload'

type Product = Tables<'products'>

interface ProductFormProps {
  product?: Product
  userId: string
}

export default function ProductForm({ product, userId }: ProductFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(product?.title || '')
  const [description, setDescription] = useState(product?.description || '')
  const [price, setPrice] = useState(product?.price || 0)
  const [category, setCategory] = useState<string>(product?.category || 'other')
  const [location, setLocation] = useState(product?.location || '')
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [status, setStatus] = useState<string>(product?.status || 'available')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const categories = Constants.public.Enums.product_category
  const statuses = Constants.public.Enums.product_status

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (images.length === 0) {
        setError('최소 1개의 이미지를 업로드해주세요.')
        setLoading(false)
        return
      }

      const productData = {
        title,
        description,
        price,
        category: category as Tables<'products'>['category'],
        location,
        images,
        status: status as Tables<'products'>['status'],
        user_id: userId,
      }

      if (product) {
        const { error: updateError } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id)

        if (updateError) throw updateError

        router.push(`/products/${product.id}`)
      } else {
        const { data, error: insertError } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single()

        if (insertError) throw insertError

        router.push(`/products/${data.id}`)
      }

      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '상품 등록에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ImageUpload images={images} onChange={setImages} userId={userId} />

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          제목 *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          placeholder="상품 제목을 입력하세요"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          카테고리 *
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field"
          required
          disabled={loading}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'digital' && '디지털기기'}
              {cat === 'furniture' && '가구/인테리어'}
              {cat === 'clothing' && '의류'}
              {cat === 'books' && '도서'}
              {cat === 'sports' && '스포츠/레저'}
              {cat === 'beauty' && '뷰티/미용'}
              {cat === 'toys' && '장난감/취미'}
              {cat === 'food' && '식품'}
              {cat === 'pets' && '반려동물'}
              {cat === 'home_appliances' && '생활가전'}
              {cat === 'electronics' && '전자기기'}
              {cat === 'vehicles' && '차량'}
              {cat === 'other' && '기타'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium mb-1">
          가격 *
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
          className="input-field"
          placeholder="0"
          min="0"
          required
          disabled={loading}
        />
      </div>

      {product && (
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            상태 *
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input-field"
            required
            disabled={loading}
          >
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st === 'available' && '판매중'}
                {st === 'reserved' && '예약중'}
                {st === 'sold' && '판매완료'}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          설명
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
          placeholder="상품 설명을 입력하세요"
          rows={5}
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-1">
          거래 지역
        </label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input-field"
          placeholder="예) 서울시 강남구"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <button type="submit" className="btn-primary flex-1" disabled={loading}>
          {loading ? '처리 중...' : product ? '수정하기' : '등록하기'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
          disabled={loading}
        >
          취소
        </button>
      </div>
    </form>
  )
}
