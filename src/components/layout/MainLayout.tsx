import { AppShell } from "@mantine/core";

import AuthGuard from "../AuthGuard";
import DashboardSidebar from "./Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AppShell
        navbar={{
          width: { base: 100, md: 280 },
          breakpoint: "sm",
          collapsed: { mobile: true },
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
