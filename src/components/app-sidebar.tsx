"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
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

const data = {
  user: {
    name: "Administrator",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "RCD",
      logo: GalleryVerticalEnd,
      plan: "Reality Marketing Corp",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const userType = 1
  const groups = getHomeRoutes(pathname, userType ?? 0)

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }

    toast({
      title: "Login Successful",
      variant: "default",
      description: `Successfully logged out.`,
    });
    
    //logout(); // Zustand
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          groups={groups}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} onLogout={handleLogout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
