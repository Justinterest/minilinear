import { Avatar, Group, Text } from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";
import type { IssueWithRelations } from "@/types/database";
import styles from "./issuerow.module.css";

const statusIcons = {
  todo: <IconPointFilled size={16} color="gray" />,
  in_progress: <IconPointFilled size={16} color="blue" />,
  done: <IconPointFilled size={16} color="green" />,
  canceled: <IconPointFilled size={16} color="red" />,
};

export function IssueRow({ issue }: { issue: IssueWithRelations }) {
  const assigneeInitial = issue.assignee?.full_name?.charAt(0) || "?";

  return (
    <Group
      justify="space-between"
      wrap="nowrap"
      py="xs"
      px="md"
      className={styles.issuerow}
    >
      <Group gap="sm" wrap="nowrap" style={{ flex: 1, overflow: "hidden" }}>
        {statusIcons[issue.status as keyof typeof statusIcons] || (
          <IconPointFilled size={16} />
        )}
        <Text size="sm" truncate>
          {issue.title}
        </Text>
      </Group>
      <Group gap="md" wrap="nowrap" justify="flex-end" visibleFrom="xs">
        <Text size="sm" c="dimmed" miw={60}>
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
          <Avatar size={24} radius="xl"></Avatar>
        )}
      </Group>
    </Group>
  );
}
