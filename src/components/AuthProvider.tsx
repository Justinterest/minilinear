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

  console.log("loading", loading);

  if (loading) {
    return <LoadingOverlay visible={loading} loaderProps={{ type: "bars" }} />;
  }

  return <>{children}</>;
}
