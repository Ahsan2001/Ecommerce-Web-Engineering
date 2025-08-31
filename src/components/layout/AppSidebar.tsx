import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Home,
  FolderOpen
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Products", url: "/dashboard/products", icon: Package },
  { title: "Categories", url: "/dashboard/categories", icon: FolderOpen },
  { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { logout, user } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth";

  return (
    <Sidebar
      className="border-r bg-gradient-card shadow-lg transition-smooth"
      collapsible="icon"
    >
      <SidebarContent>
        <div className="px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-semibold text-black">Admin Panel</h2>
                <p className="text-xs text-black">Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-2 text-xs font-medium text-white uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title} className="px-3">
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span className="ml-3 text-white">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        {!collapsed && (
          <div className="mb-4">
            <div className="flex items-center gap-3 p-3 bg-sidebar-accent rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-white truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        )}
        <Button
          variant="outline"
          size={collapsed ? "icon" : "sm"}
          onClick={logout}
          className="w-full justify-start"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}