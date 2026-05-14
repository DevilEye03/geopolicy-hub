import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useStore } from '../../store/useStore';

export function MainLayout() {
  const { theme } = useStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-container">
      <Navbar 
        onOpenSidebar={() => setSidebarOpen(true)} 
        onOpenSearch={() => setSearchOpen(true)} 
      />
      
      {/* Search Modal Placeholder */}
      {isSearchOpen && (
        <div className="modal-overlay active" onClick={() => setSearchOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <input type="text" placeholder="Search articles, tags, categories..." style={{ width: '100%', padding: 'var(--space-md)', fontSize: 'var(--text-lg)', background: 'var(--bg-input)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)' }} autoFocus />
          </div>
        </div>
      )}

      {/* Mobile Sidebar Placeholder */}
      {isSidebarOpen && (
        <div className="modal-overlay active" onClick={() => setSidebarOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '280px', height: '100%', margin: 0, position: 'absolute', left: 0, top: 0, borderRadius: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xl)' }}>
              <h3>Menu</h3>
              <button className="btn" onClick={() => setSidebarOpen(false)}>Close</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <a href="/">Home</a>
              <a href="/write">Write</a>
              <a href="/categories">Categories</a>
              <a href="/dashboard">Dashboard</a>
            </div>
          </div>
        </div>
      )}

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
