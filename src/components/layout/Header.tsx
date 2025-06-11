'use client'

import { Group, Avatar, ActionIcon, Burger } from '@mantine/core'
import { IconBell, IconCommand, IconPlus } from '@tabler/icons-react'

interface DashboardHeaderProps {
  opened: boolean
  toggle: () => void
}

export default function DashboardHeader({
  opened,
  toggle,
}: DashboardHeaderProps) {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Group>
      <Group>
        <ActionIcon variant="default" size="lg">
          <IconBell size={18} />
        </ActionIcon>
        <ActionIcon variant="default" size="lg">
          <IconCommand size={18} />
        </ActionIcon>
        <ActionIcon variant="default" size="lg">
          <IconPlus size={18} />
        </ActionIcon>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png"
          alt="it's me"
          radius="xl"
        />
      </Group>
    </Group>
  )
} 