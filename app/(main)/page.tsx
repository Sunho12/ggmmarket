import { createClient } from '@/lib/supabase/server'
import ProductListClient from '@/components/products/ProductListClient'

export const revalidate = 0

export default async function HomePage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      profiles:user_id (
        username,
        location
      )
    `)
    .eq('status', 'available')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">🍠 고구마마켓</h1>
      <ProductListClient products={products || []} />
    </div>
  )
}
