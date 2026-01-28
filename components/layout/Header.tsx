'use client'

import { useAuth } from '@/lib/hooks/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user, profile, loading, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍠</span>
            <span className="text-xl font-bold text-gray-900">고구마마켓</span>
          </Link>

          <nav className="flex items-center space-x-4">
            {loading ? (
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <>
                <Link
                  href="/products/new"
                  className="btn-primary"
                >
                  상품 등록
                </Link>
                <Link
                  href="/my-products"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  내 상품
                </Link>
                <span className="text-gray-600">
                  {profile?.username || user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary"
                >
                  회원가입
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
