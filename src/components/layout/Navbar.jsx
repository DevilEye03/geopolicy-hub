"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PenSquare, LayoutGrid, BarChart3, Bookmark, Search, Moon, Sun, Menu } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Navbar({ onOpenSidebar, onOpenSearch }) {
  const pathname = usePathname();
  const { theme, toggleTheme, user, isAdmin } = useStore();

  const isActive = (path) => pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <span className="brand-icon">🌐</span>
          <span className="brand-text">GeoPolicy<span className="brand-accent">Hub</span></span>
        </Link>
        
        <div className="navbar-links">
          <Link href="/" className={`nav-link ${isActive('/')}`}>
            <Home size={18} /> Home
          </Link>
          {isAdmin && (
            <Link href="/write" className={`nav-link ${isActive('/write')}`}>
              <PenSquare size={18} /> Write
            </Link>
          )}
          <Link href="/categories" className={`nav-link ${isActive('/categories')}`}>
            <LayoutGrid size={18} /> Categories
          </Link>
          {isAdmin && (
            <Link href="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
              <BarChart3 size={18} /> Dashboard
            </Link>
          )}
          <Link href="/bookmarks" className={`nav-link ${isActive('/bookmarks')}`}>
            <Bookmark size={18} /> Bookmarks
          </Link>
        </div>

        <div className="navbar-actions" style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
          <button className="nav-icon-btn" onClick={onOpenSearch} title="Search">
            <Search size={20} />
          </button>
          <button className="nav-icon-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {isAdmin && user && (
            <Link href="/profile" className="nav-avatar" title="Profile">
              <div className="avatar avatar-sm" style={{ 
                width: '32px', height: '32px', borderRadius: '50%', 
                background: 'var(--accent-primary)', color: 'white', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '14px'
              }}>
                {user.avatar || 'GP'}
              </div>
            </Link>
          )}
          <button className="nav-icon-btn mobile-menu-btn" onClick={onOpenSidebar} style={{ display: 'none' }}>
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
