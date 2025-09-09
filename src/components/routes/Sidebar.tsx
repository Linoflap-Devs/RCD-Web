"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { useSidebar } from "@/components/ui/sidebar"

interface SubItem {
  label: string
  href: string
  active: boolean
}

interface RouteItem {
  label: string
  icon: React.ElementType
  href: string
  active: boolean
  subItems?: SubItem[]
}

interface SidebarGroupData {
  label: string
  routes: RouteItem[]
}

interface AppSidebarProps {
  groups: SidebarGroupData[]
  company?: {
    name: string
    description: string
    logoUrl?: string
  }
}

export function AppSidebar({ groups, company }: AppSidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Company header */}
        {company && (
          <div className="px-3 pt-6">
            <div className="flex items-center gap-2">
              {company.logoUrl && (
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              )}
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{company.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {company.description}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sidebar Groups */}
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.routes.map((route) => (
                  <SidebarMenuItem key={route.href}>
                    <SidebarMenuButton asChild isActive={route.active}>
                      <Link href={route.href}>
                        <route.icon className="h-5 w-5" />
                        <span className="text-sm">{route.label}</span>
                      </Link>
                    </SidebarMenuButton>

                    {/* Sub-items */}
                    {route.subItems && route.subItems.length > 0 && (
                      <div className="ml-6 mt-1 space-y-1">
                        {route.subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
                              sub.active
                                ? "bg-muted font-medium text-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
