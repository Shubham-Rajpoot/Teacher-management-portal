'use client';
import React from 'react';
import { useSidebar } from '@/context/SidebarContext';

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useSidebar();
  return (
    <main
      className={`transition-all duration-300 ease-in-out w-full px-6 pt-6 ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      }`}
    >
      {children}
    </main>
  );
};

export default MainContent;