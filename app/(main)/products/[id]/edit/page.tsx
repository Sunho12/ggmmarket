import { createClient } from '@/lib/supabase/server'
import ProductForm from '@/components/products/ProductForm'
import { notFound, redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) {
    notFound()
  }

  if (product.user_id !== user.id) {
    redirect('/')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">상품 수정</h1>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <ProductForm product={product} userId={user.id} />
      </div>
    </div>
  )
}
