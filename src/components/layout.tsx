import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col w-full transition-all duration-300 
          ${isSidebarOpen ? (isCollapsed ? 'ml-20' : 'ml-64') : 'ml-0'}`}
      >
        {/* Navbar */}
        <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

        {/* Page Content */}
        <main className="lg:p-6 p-2 lg:pt-16 pt-12 transition-all duration-300 lg:overflow-auto overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
