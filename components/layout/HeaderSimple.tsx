'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function HeaderSimple() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => router.push('/')} className="flex items-center space-x-2 cursor-pointer">
            <span className="text-2xl">🍠</span>
            <span className="text-xl font-bold text-gray-900">고구마마켓</span>
          </button>

          <nav className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/products/new')}
              className="btn-primary"
            >
              상품 등록
            </button>
            <button
              onClick={() => router.push('/my-products')}
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              내 상품
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              로그아웃
            </button>
            <button
              onClick={() => router.push('/login')}
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              로그인
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="btn-primary"
            >
              회원가입
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
