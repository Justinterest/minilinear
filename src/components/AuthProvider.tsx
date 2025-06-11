"use client";

import { useEffect } from "react";
import { useUserStore } from "@/lib/store/userStore";
import { LoadingOverlay } from "@mantine/core";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { init, subscribe, loading } = useUserStore();

  useEffect(() => {
    init();
    return subscribe();
  }, []);

  if (loading) {
    return <LoadingOverlay visible={loading} />;
  }

  return <>{children}</>;
}
