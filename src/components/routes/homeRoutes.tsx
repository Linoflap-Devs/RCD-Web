import { House, LayoutDashboard, TabletSmartphone } from "lucide-react";

interface SubItem {
  label: string
  href: string
  active: boolean
  allowedUserTypes: number[]
}

interface RouteItem {
  label: string
  icon: React.ElementType
  href: string
  active: boolean
  allowedUserTypes: number[]
  subItems?: SubItem[]
}

interface SidebarGroupData {
  label: string
  routes: RouteItem[]
}

export const getHomeRoutes = (pathname: string, userType: number): SidebarGroupData[] => {
  const allGroups: SidebarGroupData[] = [
    {
      label: "Main",
      routes: [
        {
          label: "Dashboard",
          icon: House,
          href: "/dashboard",
          active: pathname.startsWith("/dashboard"),
          allowedUserTypes: [1, 3, 4, 5],
        },
        {
          label: "Test",
          icon: TabletSmartphone,
          href: "/test",
          active: pathname.startsWith("/test"),
          allowedUserTypes: [1, 3, 4, 5],
        },
      ],
    },
  ]

  // Filter routes and subItems by userType
  return allGroups
    .map((group) => ({
      ...group,
      routes: group.routes
        .filter((route) => route.allowedUserTypes.includes(userType))
        .map((route) => ({
          ...route,
          subItems: route.subItems?.filter((sub) =>
            sub.allowedUserTypes.includes(userType)
          ),
        })),
    }))
    .filter((group) => group.routes.length > 0) // drop empty groups
}
