"use client"

import * as React from "react"
import { useEffect, useState, useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { GalleryVerticalEnd } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { getHomeRoutes } from "@/routes/homeRoutes"
import { getCurrentUser, logoutUser, type UserItem } from "@/services/auth/auth.api"
import { toast } from "./ui/use-toast"
import { useAuth } from "@/store/useAuth"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const [user, setUser] = useState<UserItem | null>(null)
  const [loading, setLoading] = useState(true)

  const userType = 1
  const groups = getHomeRoutes(pathname, userType ?? 0)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchCurrentUser = async () => {
      try {
        setLoading(true)
        const res = await getCurrentUser({ signal: controller.signal })
        if (isMounted) setUser(res)
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch current user:", err)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCurrentUser()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const displayUser = useMemo(() => {
    if (!user) {
      return { userName: "Guest", position: "Unknown" }
    }
    return user
  }, [user])

  const handleLogout = async () => {
    sessionStorage.setItem("loggingOut", "true")
    try {
      await logoutUser()
      await fetch("/api/auth/logout", { method: "POST" })
      toast({
        title: "Logout Successful",
        description: "Successfully logged out.",
      })
      setTimeout(() => router.push("/"), 100)
      setTimeout(() => {
        logout()
        sessionStorage.removeItem("auth-storage")
        sessionStorage.removeItem("loggingOut")
      }, 600)
    } catch (error) {
      console.error("Logout failed:", error)
      toast({
        title: "Logout Failed",
        description: "Something went wrong while logging out.",
        variant: "destructive",
      })
    }
  }

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
        <NavMain groups={groups} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: displayUser.userName ?? "No Name",
            email: displayUser.position?.toLowerCase() ?? "No Position",
          }}
          onLogout={handleLogout}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
