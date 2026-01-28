'use client'

import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { useState, ChangeEvent } from 'react'

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  userId: string
}

export default function ImageUpload({ images, onChange, userId }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      console.log('Uploading image:', file.name, 'User ID:', userId)
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/${Date.now()}.${fileExt}`
      console.log('File path:', fileName)

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Supabase upload error:', uploadError)
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName)

      console.log('Upload successful, URL:', publicUrl)
      return publicUrl
    } catch (err) {
      console.error('Upload error:', err)
      return null
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const files = Array.from(e.target.files)
    const maxImages = 5

    console.log('Files selected:', files.length, 'Current images:', images.length)

    if (images.length + files.length > maxImages) {
      setError(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`)
      return
    }

    setUploading(true)
    setError(null)

    try {
      const uploadPromises = files.map(file => uploadImage(file))
      const uploadedUrls = await Promise.all(uploadPromises)
      const validUrls = uploadedUrls.filter((url): url is string => url !== null)

      console.log('Valid URLs:', validUrls)
      onChange([...images, ...validUrls])
    } catch (err) {
      console.error('File change error:', err)
      setError('이미지 업로드에 실패했습니다.')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = async (index: number) => {
    const imageUrl = images[index]
    const fileName = imageUrl.split('/').slice(-2).join('/')

    try {
      await supabase.storage
        .from('product-images')
        .remove([fileName])

      const newImages = images.filter((_, i) => i !== index)
      onChange(newImages)
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        상품 이미지 (최대 5개)
      </label>

      <div className="grid grid-cols-5 gap-2 mb-2">
        {images.map((url, index) => (
          <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={url}
              alt={`Product image ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}

        {images.length < 5 && (
          <label className="relative aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-600 flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            {uploading ? (
              <div className="text-gray-400">...</div>
            ) : (
              <div className="text-gray-400 text-3xl">+</div>
            )}
          </label>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}
