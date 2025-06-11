import { ActionIcon, Badge, Box, Group, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import type { IssueWithRelations } from "@/types/database";
import { IssueCard } from "./IssueCard";

type GroupedIssues = Record<string, IssueWithRelations[]>;

interface BoardViewProps {
  groupedIssues: GroupedIssues;
  statusOrder: string[];
  statusIcons: Record<string, React.ReactNode>;
  statusLabels: Record<string, string>;
}

export function BoardView({
  groupedIssues,
  statusOrder,
  statusIcons,
  statusLabels,
}: BoardViewProps) {
  return (
    <Group
      align="stretch"
      wrap="nowrap"
      px="md"
      style={{
        overflowX: "auto",
        paddingBottom: "1rem",
        height: "100%",
      }}
    >
      {statusOrder.map((status) => {
        const statusIssues = groupedIssues[status] || [];
        return (
          <Box
            key={status}
            style={{
              width: 280,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Group py="xs" px="xs" justify="space-between">
              <Group>
                {statusIcons[status]}
                <Text size="sm" fw={500}>
                  {statusLabels[status]}
                </Text>
                <Badge variant="light" color="gray" size="sm">
                  {statusIssues.length}
                </Badge>
              </Group>
              <ActionIcon variant="subtle" size="sm" color="gray">
                <IconPlus size={14} />
              </ActionIcon>
            </Group>
            <Stack
              gap="sm"
              style={{
                flexGrow: 1,
                overflowY: "auto",
                paddingRight: "4px",
                minHeight: 0,
              }}
            >
              {statusIssues.length > 0 ? (
                statusIssues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))
              ) : (
                <Box p="md" style={{ textAlign: "center" }}>
                  <Text size="sm" c="dimmed">
                    Empty
                  </Text>
                </Box>
              )}
            </Stack>
          </Box>
        );
      })}
    </Group>
  );
}
