'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="admin-content flex-1 lg:pl-64">
        <Header onSidebarToggle={() => setSidebarOpen(true)} />
        
        <main className="admin-main p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
