import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MessageCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Tilt3D } from './Tilt3D';

export function ArticleCard({ article }) {
  const { bookmarks, addBookmark, removeBookmark } = useStore();
  const isBookmarked = bookmarks.includes(article.id);

  const toggleBookmark = (e) => {
    e.preventDefault();
    if (isBookmarked) {
      removeBookmark(article.id);
    } else {
      addBookmark(article.id);
    }
  };

  return (
    <Tilt3D maxAngle={12} scale={1.03} className="article-card-tilt-wrapper" style={{ display: 'flex', height: '100%' }}>
      <Link to={`/article/${article.id}`} className="article-card" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <img 
          src={article.image || 'https://images.unsplash.com/photo-1526450616598-f51cb1c26b86?auto=format&fit=crop&q=80'} 
          alt={article.title} 
          className="article-card-image parallax-3d-back" 
        />
        <div className="article-card-content" style={{ transformStyle: 'preserve-3d' }}>
          <div className="parallax-3d-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-primary)', fontWeight: 'var(--weight-bold)', textTransform: 'uppercase', letterSpacing: '1px' }}>{article.category}</span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{article.readTime} min read</span>
          </div>
          <h3 className="parallax-3d-lg" style={{ marginBottom: 'var(--space-xs)', lineHeight: 'var(--leading-tight)' }}>{article.title}</h3>
          <p className="parallax-3d-md" style={{ fontSize: 'var(--text-sm)', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {article.excerpt}
          </p>
          
          <div className="parallax-3d-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-md)', paddingTop: 'var(--space-sm)', borderTop: '1px solid var(--border-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <div className="avatar avatar-sm" style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                {article.authorInitials}
              </div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{article.author}</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <button className="nav-icon-btn" style={{ padding: '4px' }}>
                <MessageCircle size={16} />
              </button>
              <button className="nav-icon-btn" onClick={toggleBookmark} style={{ padding: '4px', color: isBookmarked ? 'var(--accent-primary)' : 'inherit' }}>
                <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </Tilt3D>
  );
}
