import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingMenu } from '../ui/FloatingMenu';
import { useStore } from '../../store/useStore';

export function MainLayout() {
  const { theme } = useStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const savedArticles = JSON.parse(localStorage.getItem('geopolicy-articles') || '[]');
      const filtered = savedArticles.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
      );
      setResults(filtered.slice(0, 5));
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="app-container">
      <div className={`bg-pattern ${theme === 'dark' ? 'pattern-grid' : 'pattern-dots'}`}></div>
      {/* Global Pulse News Ticker */}
      <div className="news-ticker-container">
        <div className="ticker-label">Global Pulse</div>
        <div className="ticker-wrapper">
          <div className="ticker-content">
            <span className="ticker-item">G7 Summit begins in Rome...</span>
            <span className="ticker-item">New Trade Accords signed in Singapore...</span>
            <span className="ticker-item">Oil prices stabilize following OPEC+ meeting...</span>
            <span className="ticker-item">Bilateral talks resumed between ASEAN leaders...</span>
            <span className="ticker-item">Major tech breakthrough announced in Silicon Valley...</span>
            {/* Repeat items for seamless scrolling */}
            <span className="ticker-item">G7 Summit begins in Rome...</span>
            <span className="ticker-item">New Trade Accords signed in Singapore...</span>
            <span className="ticker-item">Oil prices stabilize following OPEC+ meeting...</span>
          </div>
        </div>
      </div>

      <Navbar 
        onOpenSidebar={() => setSidebarOpen(true)} 
        onOpenSearch={() => setSearchOpen(true)} 
      />
      
      {/* Search Modal */}
      {isSearchOpen && (
        <div className="modal-overlay active" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
          <div className="search-modal-content" onClick={e => e.stopPropagation()}>
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Search articles, topics, or authors..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus 
              />
            </div>
            
            {results.length > 0 && (
              <div className="search-results">
                {results.map(article => (
                  <Link 
                    key={article.id} 
                    to={`/article/${article.id}`} 
                    className="search-result-item"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  >
                    <div className="result-info">
                      <span className="result-category">{article.category}</span>
                      <h4 className="result-title">{article.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            {searchQuery.length > 1 && results.length === 0 && (
              <div className="search-no-results">No matches found for "{searchQuery}"</div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="modal-overlay active" onClick={() => setSidebarOpen(false)}>
          <div className="sidebar-content" onClick={e => e.stopPropagation()}>
            <div className="sidebar-header">
              <span className="brand-text">GeoPolicy<span className="brand-accent">Hub</span></span>
              <button className="close-btn" onClick={() => setSidebarOpen(false)}>✕</button>
            </div>
            <div className="sidebar-links">
              <Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link>
              <Link to="/write" onClick={() => setSidebarOpen(false)}>Write</Link>
              <Link to="/categories" onClick={() => setSidebarOpen(false)}>Categories</Link>
              <Link to="/dashboard" onClick={() => setSidebarOpen(false)}>Dashboard</Link>
              <Link to="/bookmarks" onClick={() => setSidebarOpen(false)}>Bookmarks</Link>
            </div>
          </div>
        </div>
      )}

      <main className="main-content">
        <Outlet />
      </main>

      <FloatingMenu />
      <Footer />
    </div>
  );
}
