import { createClient } from '@/lib/supabase/server'
import ProductList from '@/components/products/ProductList'
import { redirect } from 'next/navigation'

export const revalidate = 0

export default async function MyProductsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      profiles:user_id (
        username,
        location
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">내 상품</h1>
      <ProductList products={products || []} />
    </div>
  )
}
