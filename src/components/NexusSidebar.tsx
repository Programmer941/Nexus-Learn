import { NavLink, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  GraduationCap, 
  Play, 
  ClipboardCheck,
  Home,
  Users,
  Settings
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
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "My Classes", url: "/classes", icon: BookOpen },
  { title: "Assignments", url: "/assignments", icon: ClipboardCheck },
  { title: "Grades", url: "/grades", icon: Play },
  { title: "Schedule", url: "/schedule", icon: Users },
];

const quickAccessItems = [
  { title: "Teacher View", url: "/teacher", icon: GraduationCap },
];

export function NexusSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const getNavClass = (path: string) => 
    isActive(path) 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          {state !== "collapsed" && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">Nexus Learn</h1>
              <p className="text-xs text-sidebar-foreground/70">Academic Excellence</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 font-serif">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${getNavClass(item.url)}`}
                    >
                      <item.icon className="w-4 h-4" />
                      {state !== "collapsed" && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 font-serif">
            Quick Access
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickAccessItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${getNavClass(item.url)}`}
                    >
                      <item.icon className="w-4 h-4" />
                      {state !== "collapsed" && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {state !== "collapsed" && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/settings"
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${getNavClass('/settings')}`}
                    >
                      <Settings className="w-4 h-4" />
                      <span className="font-medium">Settings</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}