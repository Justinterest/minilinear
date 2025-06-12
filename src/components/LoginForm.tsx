"use client";

import { Button, Paper, Text, Stack, Center, Anchor } from "@mantine/core";
import { useState } from "react";
import { signInWithGoogle } from "@/lib/auth";

export default function LoginForm() {
  const [loading, setLoading] = useState<"google" | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setLoading("google");
      await signInWithGoogle();
    } catch (error) {
      console.error("Google 登录失败:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <Center
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--mantine-color-gray-0)",
      }}
    >
      <Paper
        style={{ width: "100%", maxWidth: 360, background: "transparent" }}
      >
        <Stack align="center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none">
              <circle cx="128" cy="128" r="128" fill="#1A1A1A"></circle>
              <path
                d="M74.24 191.84L181.76 84.32"
                stroke="#fff"
                strokeWidth="16"
                strokeLinecap="round"
              ></path>
              <path
                d="M81.92 153.6L163.84 71.68"
                stroke="#fff"
                strokeWidth="16"
                strokeLinecap="round"
              ></path>
              <path
                d="M89.6 115.36L146.08 58.88"
                stroke="#fff"
                strokeWidth="16"
                strokeLinecap="round"
              ></path>
              <path
                d="M112.64 191.84L174.08 130.4"
                stroke="#fff"
                strokeWidth="16"
                strokeLinecap="round"
              ></path>
              <path
                d="M120.32 153.6L156.16 117.76"
                stroke="#fff"
                strokeWidth="16"
                strokeLinecap="round"
              ></path>
            </g>
          </svg>
          <Text size="xl" fw={600} ta="center" mt="md">
            登录到 Linear
          </Text>

          <Stack gap="sm" w="100%" mt="xl">
            <Button
              fullWidth
              size="md"
              loading={loading === "google"}
              onClick={handleGoogleLogin}
              style={{ backgroundColor: "#5E6AD2", height: 44 }}
              leftSection={
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="white"
                    d="M12.24 10.285V14.4h6.815c-.273 1.636-1.89 2.882-3.832 2.882-2.314 0-4.196-1.89-4.196-4.2s1.882-4.2 4.196-4.2c1.09 0 2.082.436 2.818 1.136l2.314-2.314C17.718 5.436 15.273 4.2 12.24 4.2c-4.432 0-8.023 3.59-8.023 8s3.59 8 8.023 8c4.61 0 7.646-3.14 7.646-7.755 0-.527-.045-1.05-.136-1.545H12.24z"
                  />
                </svg>
              }
            >
              使用 Google 继续
            </Button>
            <Text size="xs" c="dimmed" ta="center">
              您上次使用 Google 登录
            </Text>
          </Stack>

          <Stack gap="sm" w="100%" mt="md">
            <Button
              fullWidth
              variant="default"
              size="md"
              style={{ height: 44 }}
            >
              使用邮箱继续
            </Button>
            <Button
              fullWidth
              variant="default"
              size="md"
              style={{ height: 44 }}
            >
              使用 SAML SSO 继续
            </Button>
            <Button
              fullWidth
              variant="default"
              size="md"
              style={{ height: 44 }}
            >
              使用 Passkey 登录
            </Button>
          </Stack>
          <Text size="xs" c="dimmed" ta="center" mt="lg">
            没有帐户？{" "}
            <Anchor href="#" size="xs" c="dimmed" underline="always">
              注册
            </Anchor>{" "}
            或{" "}
            <Anchor href="#" size="xs" c="dimmed" underline="always">
              了解更多
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Center>
  );
}
