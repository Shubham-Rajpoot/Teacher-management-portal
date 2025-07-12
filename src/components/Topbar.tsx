import React from 'react';
import { Search, Bell, Settings, Menu } from 'lucide-react';

const Topbar: React.FC = () => {
  return (
    <div className="w-full bg-slate-950 shadow-md flex items-center justify-between px-6 py-3 sticky top-0 z-50 border-b border-gray-200">
      
     
      
      <div className="hidden md:flex items-center bg-gray-800 px-3 py-2 rounded-full w-80">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search teachers, schedules, qualifications..."
          className="ml-2 bg-transparent focus:outline-none w-full text-sm text-white placeholder-gray-400"
        />
      </div>

      <div className="flex items-center gap-4">
        
        <div className="relative">
          <button className="p-2 text-gray-300 hover:text-white transition-colors duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>

    
        <button className="p-2 text-gray-300 hover:text-white transition-colors duration-200">
          <Settings className="w-5 h-5" />
        </button>

  
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold">
            A
          </div>
          <div className="hidden sm:block text-white">
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs text-gray-400">Administrator</div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Topbar;
