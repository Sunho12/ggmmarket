import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">🍠 고구마마켓</h1>
          <p className="mt-2 text-gray-600">로그인하고 시작하기</p>
        </div>

        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <LoginForm />

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">계정이 없으신가요? </span>
            <Link href="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
