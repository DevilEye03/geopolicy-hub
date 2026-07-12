"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Share2, Globe, MessageCircle, BookOpen, Clock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Tilt3D } from '../../../components/ui/Tilt3D';

export default function ArticleView() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFocusMode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
    return () => document.body.classList.remove('focus-mode');
  }, [isFocusMode]);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchArticleData() {
      try {
        const { db } = await import('../../../lib/firebase');
        const { doc, getDoc, collection, getDocs, addDoc, updateDoc, increment, query, orderBy } = await import('firebase/firestore');
        
        // Fetch article
        const docRef = doc(db, 'articles', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() });
          
          // Increment views
          await updateDoc(docRef, {
            views: increment(1)
          });

          // Fetch comments
          const commentsRef = collection(db, 'articles', id, 'comments');
          const q = query(commentsRef, orderBy('date', 'desc'));
          const commentsSnap = await getDocs(q);
          const fetchedComments = commentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          setComments(fetchedComments);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticleData();

    // Progress bar logic
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const text = e.target.comment.value;
    if (!name || !text) return;
    
    try {
      const { db } = await import('../../../lib/firebase');
      const { collection, addDoc } = await import('firebase/firestore');
      
      const newComment = {
        name,
        text,
        date: new Date().toISOString()
      };
      
      const commentsRef = collection(db, 'articles', id, 'comments');
      const docRef = await addDoc(commentsRef, newComment);
      
      setComments([{ id: docRef.id, ...newComment }, ...comments]);
      e.target.reset();
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment.");
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px 0' }}><h2>Loading Analysis...</h2></div>;
  }

  if (!article) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Article Not Found</h2>
        <Link href="/" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>Return Home</Link>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
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

      <Link href="/" className="back-link">
        <ArrowLeft size={18} /> Back to Insights
      </Link>

      <article className="article-content">
        <header className="article-header">
          <div className="article-meta-top">
            <span className="category-tag">{article.category}</span>
            <span className="separator">•</span>
            <span className="read-time"><Clock size={14} /> {article.readTime} min read</span>
            <span className="separator">•</span>
            <span className="read-time"><Eye size={14} /> {article.views || 1} views</span>
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
        <Tilt3D maxAngle={6} scale={1.01} className="strategic-summary-tilt" style={{ margin: 'var(--space-2xl) 0' }}>
          <div className="strategic-summary" style={{ transformStyle: 'preserve-3d', margin: 0 }}>
              <div className="summary-badge parallax-3d-lg" style={{ top: '-12px' }}>Strategic Analysis</div>
              <div className="summary-grid" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="summary-item">
                      <span className="summary-label parallax-3d-sm">Key Takeaway</span>
                      <p className="parallax-3d-md" style={{ margin: 0 }}>{summary.takeaway}</p>
                  </div>
                  <div className="summary-item">
                      <span className="summary-label parallax-3d-sm">Global Impact</span>
                      <div className="impact-meter parallax-3d-md" style={{ margin: 'var(--space-xs) 0' }}>
                        <div className="impact-fill" style={{ width: `${summary.impact}%` }}></div>
                      </div>
                      <p className="parallax-3d-lg" style={{ margin: 0 }}>{summary.impact >= 85 ? 'Critical' : summary.impact >= 75 ? 'High' : 'Medium'} ({(summary.impact / 10).toFixed(1)}/10)</p>
                  </div>
                  <div className="summary-item">
                      <span className="summary-label parallax-3d-sm">Primary Risk</span>
                      <p className="parallax-3d-md" style={{ margin: 0 }}>{summary.risk}</p>
                  </div>
              </div>
          </div>
        </Tilt3D>

        <img src={article.coverImage || article.image} alt={article.title} className="article-hero-image" />

        <div 
          className="article-body" 
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />

        {/* Comments Section */}
        <section className="comments-section">
          <h3>Analysis & Discussion</h3>
          <form className="comment-form" onSubmit={handlePostComment}>
            <input type="text" name="name" placeholder="Your Name" required />
            <textarea name="comment" placeholder="Add your analysis or perspective..." required></textarea>
            <button type="submit" className="btn btn-primary">Post Comment</button>
          </form>

          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.name}</span>
                  <span className="comment-date">{new Date(comment.date).toLocaleDateString()}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
            {comments.length === 0 && <p style={{ color: 'var(--text-tertiary)' }}>No comments yet. Be the first to share your perspective.</p>}
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
