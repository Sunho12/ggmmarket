import HeaderSimple from '@/components/layout/HeaderSimple'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderSimple />
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  )
}
