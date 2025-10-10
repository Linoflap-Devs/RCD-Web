"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { getHomeRoutes } from "@/routes/homeRoutes"
import { usePathname, useRouter } from "next/navigation"
import { logoutUser } from "@/services/auth/auth.api"
import { toast } from "./ui/use-toast"
import { useAuth } from "@/store/useAuth"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const userType = 1
  const groups = getHomeRoutes(pathname, userType ?? 0)
  const { user, logout } = useAuth();

  // fallback
  const displayUser = user ?? {
    userName: "Guest",
    position: "Unknown",
  }

  const handleLogout = async () => {
    sessionStorage.setItem("loggingOut", "true");

    try {
      // Call API to clear HTTP-only token cookie
      await fetch("/api/auth/logout", { method: "POST" });

      await logoutUser?.();
    } catch (error) {
      console.error("Logout failed:", error);
    }

    toast({
      title: "Logout Successful",
      variant: "default",
      description: "Successfully logged out.",
    });

    setTimeout(() => {
      router.push("/");
    }, 100);

    setTimeout(() => {
      logout();
      sessionStorage.removeItem("auth-storage");
      sessionStorage.removeItem("loggingOut");
    }, 600);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={[
            {
              name: "RCD",
              logo: GalleryVerticalEnd,
              plan: "Realty Marketing Corp.",
            },
          ]}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          groups={groups}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: displayUser.userName ?? "No Name",
            email: displayUser.position?.toLowerCase() ?? "No Position",
            //avatar: "/avatars/shadcn.jpg",
          }}
          onLogout={handleLogout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
