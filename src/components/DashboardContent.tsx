"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Group,
  Button,
  Stack,
  useMantineTheme,
  LoadingOverlay,
  Menu,
  ActionIcon,
  Burger,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconLayoutList,
  IconPointFilled,
  IconLayoutBoard,
  IconList,
  IconCircleHalf2,
  IconCircleDashed,
  IconSquareHalf,
  IconFilter2,
} from "@tabler/icons-react";
import { useWorkspaceStore } from "@/lib/store/workspaceStore";
import { IssueService } from "@/lib/services/issueService";
import type { IssueWithRelations } from "@/types/database";
import { ListView } from "./dashboard/ListView";
import { BoardView } from "./dashboard/BoardView";
import { useGlobalStore } from "@/lib/store/globalStore";

const statusIcons = {
  todo: <IconPointFilled size={16} color="gray" />,
  in_progress: <IconPointFilled size={16} color="blue" />,
  done: <IconPointFilled size={16} color="green" />,
  canceled: <IconPointFilled size={16} color="red" />,
};

export default function DashboardContent() {
  const { currentWorkspace, loading: workspaceLoading } = useWorkspaceStore();
  const [issues, setIssues] = useState<IssueWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayMode, setDisplayMode] = useState<"list" | "board">("list");
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const { sidebarOpened, setSidebarOpened } = useGlobalStore();

  useEffect(() => {
    if (currentWorkspace) {
      fetchIssues(currentWorkspace.id);
    } else {
      // 如果没有选中的工作区，则清空问题列表
      setIssues([]);
      setLoading(false);
    }
  }, [currentWorkspace]);

  const fetchIssues = async (workspaceId: string) => {
    setLoading(true);
    try {
      const issueList = await IssueService.getWorkspaceIssues(workspaceId);
      setIssues(issueList);
    } catch (error) {
      console.error("Error fetching issues:", error);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  const groupedIssues = issues.reduce((acc, issue) => {
    const status = issue.status || "todo";
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(issue);
    return acc;
  }, {} as Record<string, IssueWithRelations[]>);

  const statusOrder = Object.keys(statusIcons);

  const statusLabels: Record<string, string> = {
    todo: "Todo",
    in_progress: "In Progress",
    done: "Done",
    canceled: "Canceled",
  };

  const controls = (
    <>
      <Group gap="xs" wrap="nowrap">
        <Button
          variant="default"
          size="xs"
          leftSection={<IconList size={14} />}
        >
          All issues
        </Button>
        <Button
          variant="default"
          size="xs"
          leftSection={<IconCircleHalf2 size={14} />}
        >
          Active
        </Button>
        <Button
          variant="default"
          size="xs"
          leftSection={<IconCircleDashed size={14} />}
        >
          Backlog
        </Button>
      </Group>

      <Group visibleFrom="md">
        <ActionIcon variant="subtle" size="xs" color="gray">
          <IconSquareHalf size={14} />
        </ActionIcon>
      </Group>
    </>
  );

  return (
    <Box
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      py={isMobile ? "xs" : "md"}
    >
      <Group
        hiddenFrom="sm"
        px="md"
        pb="xs"
        mb="xs"
        justify="space-between"
        style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
      >
        <Burger
          opened={sidebarOpened}
          onClick={() => setSidebarOpened(!sidebarOpened)}
          hiddenFrom="sm"
          size="sm"
        />
        <ActionIcon variant="subtle" size="xs" color="gray">
          <IconSquareHalf size={14} />
        </ActionIcon>
      </Group>
      <Box
        px="md"
        pb="xs"
        style={{
          borderBottom: "1px solid var(--mantine-color-gray-2)",
        }}
      >
        {isMobile ? (
          <Stack>{controls}</Stack>
        ) : (
          <Group justify="space-between" wrap="nowrap">
            {controls}
          </Group>
        )}
      </Box>

      <Group
        justify="space-between"
        px="md"
        py="xs"
        style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
      >
        <Button
          variant="subtle"
          size="xs"
          c="black"
          leftSection={<IconFilter2 size={14} />}
        >
          Filter
        </Button>

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              variant="default"
              size="xs"
              leftSection={
                displayMode === "list" ? (
                  <IconLayoutList size={14} />
                ) : (
                  <IconLayoutBoard size={14} />
                )
              }
            >
              Display
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Display</Menu.Label>
            <Menu.Item
              leftSection={<IconLayoutList size={14} />}
              onClick={() => setDisplayMode("list")}
            >
              List
            </Menu.Item>
            <Menu.Item
              leftSection={<IconLayoutBoard size={14} />}
              onClick={() => setDisplayMode("board")}
            >
              Board
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Box pos="relative" style={{ flexGrow: 1, overflow: "auto" }}>
        <LoadingOverlay
          visible={loading || workspaceLoading}
          loaderProps={{ type: "bars" }}
        />
        {issues.length > 0 ? (
          displayMode === "list" ? (
            <ListView
              groupedIssues={groupedIssues}
              statusOrder={["in_progress", "todo", "done", "canceled"]}
              statusIcons={statusIcons}
              statusLabels={statusLabels}
            />
          ) : (
            <BoardView
              groupedIssues={groupedIssues}
              statusOrder={statusOrder}
              statusIcons={statusIcons}
              statusLabels={statusLabels}
            />
          )
        ) : !loading ? (
          <Box
            style={{
              border: "1px solid var(--mantine-color-gray-2)",
              borderRadius: "var(--mantine-radius-md)",
            }}
            py="xl"
            mx="md"
          >
            <Text c="dimmed" ta="center" p="xl">
              没有待办事项
            </Text>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
