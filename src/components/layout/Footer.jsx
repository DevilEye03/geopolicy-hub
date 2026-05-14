import React from 'react';
import { Rss, Mail, Globe, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const subscribers = JSON.parse(localStorage.getItem('geopolicy-subscribers') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('geopolicy-subscribers', JSON.stringify(subscribers));
    }
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* ... (existing sections) ... */}
        {/* ... (I'll keep the actual sections in the replacement below) ... */}
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
            <Link to="/categories" style={{ color: 'var(--text-secondary)' }}>Geopolitics</Link>
            <Link to="/categories" style={{ color: 'var(--text-secondary)' }}>Relations</Link>
            <Link to="/categories" style={{ color: 'var(--text-secondary)' }}>Laws</Link>
            <Link to="/categories" style={{ color: 'var(--text-secondary)' }}>Policies</Link>
            <Link to="/categories" style={{ color: 'var(--text-secondary)' }}>Tech</Link>
            <Link to="/categories" style={{ color: 'var(--text-secondary)' }}>Health</Link>
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
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 'var(--space-xs)' }}>
            <input 
              type="email" 
              placeholder="your@email.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', color: 'var(--text-primary)', flex: 1 }} 
            />
            <button type="submit" className="btn btn-primary" style={{ padding: 'var(--space-sm) var(--space-md)' }}>
              {isSubscribed ? '✓' : 'Subscribe'}
            </button>
          </form>
          {isSubscribed && <p style={{ color: 'var(--accent-primary)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-xs)' }}>Thanks for subscribing!</p>}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-primary)', paddingTop: 'var(--space-md)' }}>
        <p>&copy; {new Date().getFullYear()} GeoPolicy Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}
