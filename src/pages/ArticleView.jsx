import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, Globe, MessageCircle, BookOpen, Clock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { mockArticles } from '../data/mockArticles';

export function ArticleView() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    if (isFocusMode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
    return () => document.body.classList.remove('focus-mode');
  }, [isFocusMode]);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Fetch article
    const savedArticles = JSON.parse(localStorage.getItem('geopolicy-articles') || '[]');
    const foundArticle = [...savedArticles, ...mockArticles].find(a => String(a.id) === String(id));
    setArticle(foundArticle);

    if (foundArticle) {
      // Record view
      const allViews = JSON.parse(localStorage.getItem('geopolicy-article-views') || '{}');
      allViews[id] = (allViews[id] || 0) + 1;
      localStorage.setItem('geopolicy-article-views', JSON.stringify(allViews));
    }

    // Progress bar logic
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  if (!article) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Article Not Found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>Return Home</Link>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = encodeURIComponent(article.title);

  const summary = article.strategicSummary || {
    takeaway: `An in-depth analysis focusing on the key trends, strategic policies, and global implications of ${article.category || 'this topic'}.`,
    risk: 'Potential regulatory adjustments, market friction, and shifting geopolitical alignments between key international actors.',
    impact: 70
  };

  return (
    <div className={`article-container ${isFocusMode ? 'focus-mode-active' : ''}`}>
      {/* Progress Bar */}
      <div className="reading-progress-container">
        <div className="reading-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <Link to="/" className="back-link">
        <ArrowLeft size={18} /> Back to Insights
      </Link>

      <article className="article-content">
        <header className="article-header">
          <div className="article-meta-top">
            <span className="category-tag">{article.category}</span>
            <span className="separator">•</span>
            <span className="read-time"><Clock size={14} /> {article.readTime} min read</span>
            <button 
              className={`focus-toggle ${isFocusMode ? 'active' : ''}`} 
              onClick={() => setIsFocusMode(!isFocusMode)}
              title="Toggle Focus Mode"
            >
              {isFocusMode ? <EyeOff size={16} /> : <Eye size={16} />}
              <span>{isFocusMode ? 'Exit Focus' : 'Focus Mode'}</span>
            </button>
          </div>
          
          <h1 className="article-title">{article.title}</h1>
          
          <div className="author-card">
            <div className="avatar avatar-md">{article.authorInitials}</div>
            <div className="author-info">
              <div className="author-name">{article.author}</div>
              <div className="publish-date">
                {new Date(article.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        </header>

        {/* Strategic Summary Box */}
        <div className="strategic-summary">
            <div className="summary-badge">Strategic Analysis</div>
            <div className="summary-grid">
                <div className="summary-item">
                    <span className="summary-label">Key Takeaway</span>
                    <p>{summary.takeaway}</p>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Global Impact</span>
                    <div className="impact-meter">
                      <div className="impact-fill" style={{ width: `${summary.impact}%` }}></div>
                    </div>
                    <p>{summary.impact >= 85 ? 'Critical' : summary.impact >= 75 ? 'High' : 'Medium'} ({(summary.impact / 10).toFixed(1)}/10)</p>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Primary Risk</span>
                    <p>{summary.risk}</p>
                </div>
            </div>
        </div>

        <img src={article.coverImage || article.image} alt={article.title} className="article-hero-image" />

        <div 
          className="article-body" 
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />

        {/* Comments Section */}
        <section className="comments-section">
          <h3>Analysis & Discussion</h3>
          <form className="comment-form" onSubmit={(e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const text = e.target.comment.value;
            if (!name || !text) return;
            
            const newComment = {
              id: Date.now(),
              name,
              text,
              date: new Date().toISOString()
            };
            
            const allComments = JSON.parse(localStorage.getItem(`comments-${article.id}`) || '[]');
            const updatedComments = [newComment, ...allComments];
            localStorage.setItem(`comments-${article.id}`, JSON.stringify(updatedComments));
            
            e.target.reset();
            // Trigger a re-render
            window.location.reload(); 
          }}>
            <input type="text" name="name" placeholder="Your Name" required />
            <textarea name="comment" placeholder="Add your analysis or perspective..." required></textarea>
            <button type="submit" className="btn btn-primary">Post Comment</button>
          </form>

          <div className="comments-list">
            {JSON.parse(localStorage.getItem(`comments-${article.id}`) || '[]').map(comment => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.name}</span>
                  <span className="comment-date">{new Date(comment.date).toLocaleDateString()}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sharing Section */}
        <footer className="article-footer">
          <h3>Share this analysis</h3>
          <div className="share-buttons">
            <a 
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="share-btn twitter"
              title="Share on X"
            >
              <Globe size={20} />
            </a>
            <a 
              href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="share-btn whatsapp"
              title="Share on WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="share-btn linkedin"
              title="Share on LinkedIn"
            >
              <BookOpen size={20} />
            </a>
          </div>
        </footer>
      </article>
    </div>
  );
}
