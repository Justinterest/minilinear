'use client'

import { Button, Paper, Text, Group, Avatar } from '@mantine/core'
import { useState } from 'react'
import { signOut } from '@/lib/auth'
import { User } from '@supabase/supabase-js'

interface UserProfileProps {
  user: User
}

export default function UserProfile({ user }: UserProfileProps) {
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    try {
      setLoading(true)
      await signOut()
      window.location.reload()
    } catch (error) {
      console.error('登出失败:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder>
      <Group justify="space-between">
        <Group>
          <Avatar
            src={user.user_metadata?.avatar_url}
            alt={user.user_metadata?.full_name || user.email}
            radius="xl"
          />
          <div>
            <Text fw={500}>{user.user_metadata?.full_name || '用户'}</Text>
            <Text size="sm" c="dimmed">
              {user.email}
            </Text>
          </div>
        </Group>
        <Button
          variant="outline"
          color="red"
          loading={loading}
          onClick={handleSignOut}
        >
          登出
        </Button>
      </Group>
    </Paper>
  )
} 