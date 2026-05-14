import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, Twitter, MessageCircle, Linkedin, Clock, User, ArrowLeft } from 'lucide-react';

const mockArticles = [
  {
    id: '1',
    title: 'The Shift in Global Supply Chains Post-2025',
    content: `<p>In the wake of recent geopolitical realignments, multinational corporations are fundamentally rethinking their approach to global supply chains. The long-standing model of prioritizing cost-efficiency above all else is giving way to a new paradigm focused on resilience, redundancy, and regionalization.</p>
        <h2>The Catalyst for Change</h2>
        <p>The vulnerabilities of highly centralized supply networks were exposed by a series of compounding crises. As nations increasingly leverage economic interdependence for strategic advantage, corporate leaders recognize that securing supply lines is now a matter of national security as much as it is a business imperative.</p>
        <blockquote>
          "Resilience is no longer a buzzword; it is the fundamental metric by which future operational success will be measured."
        </blockquote>
        <h2>Regional Hubs over Global Networks</h2>
        <p>We are witnessing a shift towards 'nearshoring' and 'friendshoring'—where production facilities are relocated closer to primary markets or to allied nations. This minimizes exposure to sudden tariffs, export controls, or logistical choke points.</p>`,
    category: 'Geopolitics',
    readTime: 8,
    author: 'Dr. Elena Rostova',
    authorInitials: 'ER',
    coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80',
    publishedAt: '2025-05-10T10:00:00Z'
  },
  // Add other mocks if needed
];

export function ArticleView() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Fetch article
    const savedArticles = JSON.parse(localStorage.getItem('geopolicy-articles') || '[]');
    const foundArticle = [...savedArticles, ...mockArticles].find(a => a.id === id);
    setArticle(foundArticle);

    // Progress bar logic
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
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

  return (
    <div className="article-container">
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
          </div>
          
          <h1 className="article-title">{article.title}</h1>
          
          <div className="author-card">
            <div className="avatar avatar-md">{article.authorInitials}</div>
            <div className="author-info">
              <div className="author-name">{article.author}</div>
              <div className="publish-date">
                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        </header>

        <img src={article.coverImage || article.image} alt={article.title} className="article-hero-image" />

        <div 
          className="article-body" 
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />

        {/* Sharing Section */}
        <footer className="article-footer">
          <h3>Share this analysis</h3>
          <div className="share-buttons">
            <a 
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="share-btn twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="share-btn whatsapp"
            >
              <MessageCircle size={20} />
            </a>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="share-btn linkedin"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </footer>
      </article>
    </div>
  );
}
