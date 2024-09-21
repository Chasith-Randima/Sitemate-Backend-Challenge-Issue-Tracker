"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const items = [
  { label: 'Dashboard', svg: 'dashboard' },
];

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(event.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div id="sidebar" className="relative flex">
      <div className={`${isExpanded ? 'w-64' : 'w-16'} bg-gray-800 text-white z-20 transition-width duration-300`}>
        <div className="p-4 flex items-center justify-center cursor-pointer" onClick={toggleSidebar}>
          {isExpanded ?   <Link href="/" className="flex items-center space-x-2 border-4 border-white rounded-full p-2">
      <span className="text-xl font-bold text-blue-600">Sitemate</span>
      <span className="text-sm text-white">Issue Tracker</span>
    </Link> : <Image src="/sitemate-logo.png" alt="Logo" width={isExpanded ? 24 : 32} height={isExpanded ? 24 : 32} />}
        </div>
        <nav className="mt-6">
          {items.map(({ label, svg }) => (
            <div key={label}>
              <div
                className={`flex items-center justify-${isExpanded ? 'between' : 'center'} py-2 px-4 bg-gray-700 cursor-pointer`}
                onClick={() => {
                  if (!isExpanded) toggleSidebar();
                }}
              >
                <div className="flex items-center">
                  <Image src={`/${svg}.svg`} alt={label} width={20} height={20} />
                  {isExpanded && <span className="ml-3">{label}</span>}
                </div>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

