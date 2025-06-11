import { AppShell } from "@mantine/core";

import AuthGuard from "../AuthGuard";
import DashboardSidebar from "./Sidebar";
import { useGlobalStore } from "@/lib/store/globalStore";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpened } = useGlobalStore();

  return (
    <AuthGuard>
      <AppShell
        navbar={{
          width: { base: 100, md: 280 },
          breakpoint: "sm",
          collapsed: { mobile: !sidebarOpened },
        }}
      >
        {/* <AppShell.Header hiddenFrom="md">
          <DashboardHeader opened={opened} toggle={toggle} />
        </AppShell.Header> */}
        <AppShell.Navbar p={0} bg="lch(96.667% 0 282.863 / 1)">
          <DashboardSidebar />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
}
