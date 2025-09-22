"use client"

import { getHomeBreadcrumb } from "@/routes/getHomeBreadcrumb";
import { getHomeRoutes } from "@/routes/homeRoutes";
import { AppSidebar } from "@/routes/Sidebar";
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
        company={{ name: "RCD Inc", description: "System", logoUrl: "/logo-vector.png" }}
        user={{ name: "John Doe", email: "johndoe@email.com" }}
      />
      <SidebarInset className="bg-sidebar p-2">
        <div className="flex flex-col h-full rounded-xl border bg-background">
          <header className="flex h-12 items-center gap-1 px-4 border-b">
            <SidebarTrigger />
            <div className="mx-2 h-4 w-px bg-border" />
            <div className="flex items-center text-base text-muted-foreground">
              <div className="text-sm">{getHomeBreadcrumb(pathname)}</div>
            </div>
          </header>
          <main className="flex-1 px-2 py-5">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
