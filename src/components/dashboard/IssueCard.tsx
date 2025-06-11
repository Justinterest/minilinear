import { Avatar, Box, Group, Text } from "@mantine/core";
import type { IssueWithRelations } from "@/types/database";

export function IssueCard({ issue }: { issue: IssueWithRelations }) {
  const assigneeInitial = issue.assignee?.full_name?.charAt(0) || "?";
  return (
    <Box
      p="sm"
      bg="white"
      style={{
        border: "1px solid var(--mantine-color-gray-2)",
        borderRadius: "var(--mantine-radius-md)",
      }}
    >
      <Text size="sm">{issue.title}</Text>
      <Group justify="space-between" mt="sm">
        <Text size="xs" c="dimmed">
          {new Date(issue.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </Text>
        {issue.assignee ? (
          <Avatar size={24} src={issue.assignee.avatar_url} radius="xl">
            {assigneeInitial}
          </Avatar>
        ) : (
          <Avatar size={24} radius="xl" />
        )}
      </Group>
    </Box>
  );
}
