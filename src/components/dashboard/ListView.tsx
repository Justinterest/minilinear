import { ActionIcon, Badge, Box, Group, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import type { IssueWithRelations } from "@/types/database";
import { IssueRow } from "./IssueRow";

type GroupedIssues = Record<string, IssueWithRelations[]>;

interface ListViewProps {
  groupedIssues: GroupedIssues;
  statusOrder: string[];
  statusIcons: Record<string, React.ReactNode>;
  statusLabels: Record<string, string>;
}

export function ListView({
  groupedIssues,
  statusOrder,
  statusIcons,
  statusLabels,
}: ListViewProps) {
  return (
    <Stack gap="md">
      {statusOrder.map((status) => {
        const statusIssues = groupedIssues[status] || [];
        if (statusIssues.length === 0) {
          return null;
        }
        return (
          <Box key={status}>
            <Group
              py="sm"
              px="md"
              bg="gray.1"
              justify="space-between"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <Group>
                {statusIcons[status]}
                <Text size="sm" fw={600}>
                  {statusLabels[status]}
                </Text>
                <Badge variant="light" color="gray" size="sm">
                  {statusIssues.length}
                </Badge>
              </Group>
              <Box>
                <ActionIcon variant="subtle" size="sm" color="gray">
                  <IconPlus size={14} />
                </ActionIcon>
              </Box>
            </Group>
            <Stack gap={0}>
              {statusIssues.map((issue) => (
                <IssueRow key={issue.id} issue={issue} />
              ))}
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
}
