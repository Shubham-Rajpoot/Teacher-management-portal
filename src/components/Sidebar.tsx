'use client';
import React from 'react';
import Link from 'next/link';
import { useSidebar } from '@/context/SidebarContext';
import {
  LayoutDashboard,
  User,
  BookOpen,
  CalendarDays,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Teachers', icon: User, href: '/teachers' },
    { label: 'Qualifications', icon: BookOpen, href: '/qualifications' },
    { label: 'Schedules', icon: CalendarDays, href: '/schedules' },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full z-40 px-4 py-6 flex flex-col justify-between
      transition-all duration-300 ease-in-out bg-black text-white shadow-lg
      ${isSidebarOpen ? 'w-64' : 'w-20'}`}
    >
      <div>
        <div className={`text-xl font-bold text-white mb-10 transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
          Teacher Management
        </div>

        <ul className="flex flex-col gap-5">
          {menuItems.map(({ label, icon: Icon, href }) => (
            <li key={label}>
              <Link href={href} className="flex items-center gap-3 hover:text-gray-200 transition-colors duration-200">
                <Icon className="w-5 h-5" />
                {isSidebarOpen && <span>{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mt-6 bg-[#4A148C] hover:bg-[#3F0D7A] text-white px-3 py-1 rounded-md shadow-md flex items-center gap-1 transition-colors duration-200"
        >
          {isSidebarOpen ? (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden md:inline">Collapse</span>
            </>
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        <button className="mt-6 flex items-center gap-3 text-red-300 hover:text-red-100 transition-colors duration-200">
          <LogOut className="w-5 h-5" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
