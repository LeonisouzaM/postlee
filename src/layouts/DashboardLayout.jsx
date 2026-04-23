import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Palette, Settings, MessageSquarePlus, LogOut, Menu, X } from 'lucide-react';
import CreatePostModal from '../components/dashboard/CreatePostModal';

const navItems = [
  { icon: LayoutDashboard, label: 'Visão Geral', path: '/app' },
  { icon: CalendarDays, label: 'Calendário / Fila', path: '/app/calendar' },
  { icon: Palette, label: 'DNA da Marca', path: '/app/brand' },
  { icon: Settings, label: 'Configurações', path: '/app/settings' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-zinc-900/50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-zinc-200 
        flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-inner">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-semibold tracking-tight text-zinc-900 text-lg">
              Postlee<span className="text-indigo-500 font-normal">.ai</span>
            </span>
          </div>
          <button className="ml-auto md:hidden text-zinc-400" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Create Post Button */}
        <div className="p-4">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full btn-primary bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
          >
            <MessageSquarePlus size={18} />
            <span className="font-medium">Novo Carrossel</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={18} className={isActive ? 'text-indigo-600' : 'text-zinc-400'} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-zinc-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-indigo-700">LM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 truncate">Leoni Medeiros</p>
              <p className="text-xs text-zinc-500 truncate">Plano Plus</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors w-full px-2">
            <LogOut size={14} /> Sair da conta
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar (Mobile only) */}
        <header className="md:hidden h-16 bg-white border-b border-zinc-200 flex items-center px-4 sticky top-0 z-30">
          <button className="text-zinc-600 p-2 -ml-2" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <span className="font-semibold text-zinc-900 ml-2">Postlee.ai</span>
        </header>

        {/* Global Page Header Area (Optional, handled by Outlet pages) */}
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>

      <CreatePostModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
}
