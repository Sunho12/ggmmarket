import { createClient } from '@/lib/supabase/server'
import ProductDetail from '@/components/products/ProductDetail'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      profiles:user_id (*)
    `)
    .eq('id', id)
    .single()

  if (!product) {
    notFound()
  }

  // Increment view count
  await supabase.rpc('increment_product_view_count', {
    product_id: id,
  })

  // Check if current user is the owner
  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === product.user_id

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductDetail product={product} isOwner={isOwner} />
    </div>
  )
}
