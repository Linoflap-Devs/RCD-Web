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
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "../components/ui/dropdown-menu"
import { Button } from "../components/ui/button"
import { LogOut, MoreVertical, User2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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

interface UserDetails {
  name: string
  email: string
}

interface AppSidebarProps {
  groups: SidebarGroupData[]
  company?: {
    name: string
    description: string
    logoUrl?: string
  }
  user?: UserDetails
}

export function AppSidebar({ groups, company, user }: AppSidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarContent>
        {company && (
          <div className={(isCollapsed ? "flex h-14 items-center justify-center" : "p-4 pt-8 flex h-14 items-center")}>
            <div className="flex items-center gap-2">
              {company.logoUrl && (
                <div className={(isCollapsed ? "w-[20px] h-[20px] bg-primary rounded-md flex items-center justify-center" : "w-[35px] h-[35px] bg-primary rounded-md flex items-center justify-center")}>
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    width={30}
                    height={30}
                    className={cn(isCollapsed ? "object-contain justify-center" : "object-contain")}
                  />
                </div>
              )}
              {!isCollapsed && (
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold">{company.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {company.description}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

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
                            className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${sub.active
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

        {user && (
          <div className="mt-auto p-2 pb-4">
            <div className="flex items-center gap-3">
              <Avatar
                className={cn(isCollapsed
                  ? "h-5 w-5 flex-shrink-0 m-0"
                  : "flex-shrink-0"
                )}
              >
                <AvatarImage src="" />
                <AvatarFallback
                  className={cn(isCollapsed
                    ? "bg-primary text-primary-foreground text-sm p-2"
                    : "bg-primary text-primary-foreground text-base"
                  )}
                >
                  RC
                </AvatarFallback>
              </Avatar>
              
              {!isCollapsed && (
                <>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="ml-7 h-7 sm:h-8 w-7 sm:w-8 p-0"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 sm:h-4 w-3.5 sm:w-4" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      align="end"
                      side="right" // "top" | "right" | "bottom" | "left"
                      className="w-40 p-2 text-xs sm:text-sm"
                    >
                      <div className="flex flex-col gap-2 p-1">
                        <Link
                          href={`/home/profile`}
                          className="flex items-center gap-2 hover:text-sidebar-accent-foreground"
                        >
                          <User2 className="h-5 w-5 text-sidebar-foreground" />
                          User Profile
                        </Link>

                        <div className="border-t my-1" />

                        <button
                          className="flex items-center gap-2 text-destructive hover:text-sidebar-accent-foreground text-left"
                          // onClick={onLogout}
                        >
                          <LogOut className="h-5 w-5 text-sidebar-foreground" />
                          Logout
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </>
              )}
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
