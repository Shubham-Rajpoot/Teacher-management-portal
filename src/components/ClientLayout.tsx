'use client';

import { useSidebar } from '@/context/SidebarContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <Topbar />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
