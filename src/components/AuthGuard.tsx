'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/lib/store/userStore'
import { LoadingOverlay } from '@mantine/core'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <LoadingOverlay visible />
  }

  return <>{children}</>
} 