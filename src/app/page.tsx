"use client";

import { useEffect } from "react";
import LoginForm from "@/components/LoginForm";
import { Container, LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useUserStore();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return <LoadingOverlay visible />;
  }

  return (
    <Container size="md">
      <LoginForm />
    </Container>
  );
}
