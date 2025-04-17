
import React, { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/AuthProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-40 md:hidden"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      )}

      {/* Sidebar */}
      {(isMobile && sidebarOpen) || !isMobile ? (
        <Sidebar
          collapsed={!isMobile && sidebarCollapsed}
          toggleCollapse={toggleSidebar}
          className={
            isMobile
              ? "fixed inset-y-0 left-0 z-30 transition-transform transform" +
                (sidebarOpen ? " translate-x-0" : " -translate-x-full")
              : ""
          }
        />
      ) : null}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm z-10 py-4 px-6 flex items-center justify-between">
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mr-4"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <h1 className="text-xl font-semibold text-gray-800">
            {user?.role === 'student' ? 'Student Dashboard' : 'Admin Dashboard'}
          </h1>
          
          <div className="flex items-center space-x-4">
            {/* Additional header elements can go here */}
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
