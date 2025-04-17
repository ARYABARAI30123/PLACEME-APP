
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/AuthProvider';
import { Home, Briefcase, FileText, Bell, Calendar, MessageSquare, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  toggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  collapsed = false, 
  toggleCollapse 
}) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const baseRoute = user?.role === 'student' ? '/student' : '/admin';
  
  // Navigation items based on user role
  const navItems = [
    { 
      label: 'Home', 
      icon: Home, 
      href: baseRoute 
    },
    { 
      label: 'Opportunities', 
      icon: Briefcase, 
      href: `${baseRoute}/opportunities` 
    },
    // Resume only shows for students
    ...(user?.role === 'student' ? [{ 
      label: 'Resume', 
      icon: FileText, 
      href: `${baseRoute}/resume` 
    }] : []),
    { 
      label: 'Notifications', 
      icon: Bell, 
      href: `${baseRoute}/notifications` 
    },
    { 
      label: 'Reminders', 
      icon: Calendar, 
      href: `${baseRoute}/reminders` 
    },
    { 
      label: 'Chat', 
      icon: MessageSquare, 
      href: `${baseRoute}/chat` 
    },
    { 
      label: 'Settings', 
      icon: Settings, 
      href: `${baseRoute}/settings` 
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <aside className={cn(
      "flex flex-col h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300",
      collapsed ? "w-20" : "w-64",
      className
    )}>
      {/* Logo & Brand */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center">
              <span className="text-white font-semibold">PP</span>
            </div>
            <span className="text-xl font-bold">PlacePortal</span>
          </div>
        )}
        {collapsed && (
          <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center">
            <span className="text-white font-semibold">PP</span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <TooltipProvider key={item.href} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <li>
                    <Link 
                      to={item.href}
                      className={cn(
                        "sidebar-link",
                        isActive(item.href) && "active",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className={cn(
        "border-t p-4",
        collapsed ? "flex flex-col items-center" : "flex items-center justify-between"
      )}>
        <div className={cn(
          "flex items-center",
          collapsed ? "flex-col space-y-2" : "space-x-3"
        )}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-medium text-sm">{user?.name}</span>
              <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
            </div>
          )}
        </div>
        
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className={cn(
                  "text-muted-foreground hover:text-destructive",
                  collapsed && "mt-3"
                )}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side={collapsed ? "right" : "top"}>
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;
