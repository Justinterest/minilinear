"use client";

import { useEffect } from "react";
import {
  Box,
  ScrollArea,
  Text,
  Group,
  NavLink,
  Button,
  Avatar,
  Menu,
  Stack,
  useMantineTheme,
  LoadingOverlay,
  Drawer,
} from "@mantine/core";
import {
  IconInbox,
  IconTarget,
  IconFolder,
  IconEye,
  IconChevronDown,
  IconLink,
  IconUserPlus,
  IconFileImport,
} from "@tabler/icons-react";
import { useUserStore } from "@/lib/store/userStore";
import { useWorkspaceStore } from "@/lib/store/workspaceStore";
import { useGlobalStore } from "@/lib/store/globalStore";

export default function DashboardSidebar() {
  const theme = useMantineTheme();
  const { user, logout } = useUserStore();
  const {
    workspaces,
    currentWorkspace,
    loading,
    fetchWorkspaces,
    setCurrentWorkspace,
  } = useWorkspaceStore();
  const { sidebarOpened, setSidebarOpened } = useGlobalStore();

  useEffect(() => {
    if (user) {
      fetchWorkspaces(user.id, user.user_metadata?.full_name);
    }
  }, [user, fetchWorkspaces]);

  if (loading || !user) {
    return <LoadingOverlay visible />;
  }

  const sidebarcontent = (
    <Box h="100vh" style={{ display: "flex", flexDirection: "column" }}>
      <Box
        p={{ base: "xs", md: "md" }}
        style={{ borderBottom: `1px solid ${theme.colors.gray[2]}` }}
      >
        <Menu width={240} position="bottom-start" offset={5}>
          <Menu.Target>
            <Button
              variant="subtle"
              color="gray"
              fullWidth
              justify="space-between"
              rightSection={<IconChevronDown size={16} />}
              px="xs"
            >
              <Group gap="xs" wrap="nowrap">
                <Avatar color="orange" size="sm" radius="sm">
                  TE
                </Avatar>
                <Text fw={500} size="sm" truncate>
                  {currentWorkspace ? currentWorkspace.name : "选择工作区"}
                </Text>
              </Group>
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {workspaces.map((ws) => (
              <Menu.Item
                key={ws.id}
                onClick={() => setCurrentWorkspace(ws)}
                leftSection={
                  <Avatar color="orange" size="sm" radius="sm">
                    TE
                  </Avatar>
                }
              >
                {ws.name}
              </Menu.Item>
            ))}
            <Menu.Divider />
            <Menu.Item>创建工作区</Menu.Item>
            <Menu.Divider />
            <Menu.Item
              onClick={() => {
                logout();
              }}
            >
              退出登录
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>

      <ScrollArea flex={1} p="sm">
        <Stack gap={0}>
          <NavLink label="Inbox" leftSection={<IconInbox size={18} />} />
          <NavLink label="My issues" leftSection={<IconTarget size={18} />} />

          <Box mt="md">
            <Text size="xs" c="dimmed" px="xs" mb={4} tt="uppercase" fw={600}>
              Workspace
            </Text>
            <NavLink label="Projects" leftSection={<IconFolder size={18} />} />
            <NavLink label="Views" leftSection={<IconEye size={18} />} />
            <NavLink label="More" />
          </Box>

          <Box mt="md">
            <Text size="xs" c="dimmed" px="xs" mb={4} tt="uppercase" fw={600}>
              Your teams
            </Text>
            <NavLink
              label={currentWorkspace?.name || "Team"}
              leftSection={
                <Avatar size={20} radius="sm" color="green">
                  {currentWorkspace?.name?.charAt(0) || "T"}
                </Avatar>
              }
              childrenOffset={28}
              defaultOpened
            >
              <NavLink
                leftSection={<IconTarget size={18} />}
                label="Issues"
                active
                bg={theme.colors.blue[0]}
              />
              <NavLink
                leftSection={<IconFolder size={18} />}
                label="Projects"
              />
              <NavLink leftSection={<IconEye size={18} />} label="Views" />
            </NavLink>
          </Box>

          <Box mt="md">
            <Text size="xs" c="dimmed" px="xs" mb={4} tt="uppercase" fw={600}>
              Try
            </Text>
            <NavLink
              label="Import issues"
              leftSection={<IconFileImport size={18} />}
            />
            <NavLink
              label="Invite people"
              leftSection={<IconUserPlus size={18} />}
            />
            <NavLink label="Link GitHub" leftSection={<IconLink size={18} />} />
          </Box>
        </Stack>
      </ScrollArea>
    </Box>
  );

  return (
    <Box>
      {sidebarcontent}
      <Drawer
        withCloseButton={false}
        opened={sidebarOpened}
        onClose={() => setSidebarOpened(false)}
        styles={{
          inner: {
            width: "80%",
          },
          body: {
            padding: "0",
          },
        }}
      >
        {sidebarcontent}
      </Drawer>
    </Box>
  );
}
