import React from 'react';
import { Rss, Mail, Globe, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-text" style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', fontFamily: 'var(--font-serif)' }}>GeoPolicy<span style={{ color: 'var(--accent-primary)' }}>Hub</span></span>
          <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-md)' }}>Your premier platform for geopolitics, international relations, laws, and policy analysis.</p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
            <a href="#" style={{ color: 'var(--text-secondary)' }}><Globe size={20} /></a>
            <a href="#" style={{ color: 'var(--text-secondary)' }}><Mail size={20} /></a>
            <a href="#" style={{ color: 'var(--text-secondary)' }}><BookOpen size={20} /></a>
            <a href="#" style={{ color: 'var(--text-secondary)' }}><Rss size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: 'var(--space-md)' }}>Categories</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <Link to="/categories" style={{ color: 'var(--text-secondary)' }}>Geopolitics</Link>
            <Link to="/categories" style={{ color: 'var(--text-secondary)' }}>International Relations</Link>
            <Link to="/categories" style={{ color: 'var(--text-secondary)' }}>Laws & Legislation</Link>
            <Link to="/categories" style={{ color: 'var(--text-secondary)' }}>Policies</Link>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: 'var(--space-md)' }}>Platform</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <Link to="/write" style={{ color: 'var(--text-secondary)' }}>Write an Article</Link>
            <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>Dashboard</Link>
            <Link to="/bookmarks" style={{ color: 'var(--text-secondary)' }}>Bookmarks</Link>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: 'var(--space-md)' }}>Newsletter</h4>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>Get weekly insights on global affairs delivered to your inbox.</p>
          <form style={{ display: 'flex', gap: 'var(--space-xs)' }}>
            <input type="email" placeholder="your@email.com" required style={{ padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', color: 'var(--text-primary)', flex: 1 }} />
            <button type="submit" className="btn btn-primary" style={{ padding: 'var(--space-sm) var(--space-md)' }}>Subscribe</button>
          </form>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-primary)', paddingTop: 'var(--space-md)' }}>
        <p>&copy; {new Date().getFullYear()} GeoPolicy Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}
