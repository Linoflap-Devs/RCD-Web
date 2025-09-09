"use client"

import { getHomeBreadcrumb } from "@/components/routes/getHomeBreadcrumb";
import { getHomeRoutes } from "@/components/routes/homeRoutes";
import { AppSidebar } from "@/components/routes/Sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const userType = 1

  const groups = getHomeRoutes(pathname, userType ?? 0)

  return (
    <SidebarProvider>
      <AppSidebar
        groups={groups}
        company={{ name: "RCD", description: "System", logoUrl: "/logo-vector.png" }}
        user={{ name: "John Doe", email: "johndoe@email.com" }}
      />
      <SidebarInset>
        <header className="flex h-13 items-center gap-1 border-b px-4">
          <SidebarTrigger />
          <div className="flex items-center text-base text-muted-foreground">
            <div className="font-medium text-foreground text-xs">
              {getHomeBreadcrumb(pathname)}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
