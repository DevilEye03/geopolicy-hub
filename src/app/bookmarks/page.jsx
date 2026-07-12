"use client";
import React from 'react';
import { useStore } from '../../store/useStore';
import { Bookmark } from 'lucide-react';
import { ArticleCard } from '../../components/ui/ArticleCard';
import { mockArticles } from '../../data/mockArticles';

export default function Bookmarks() {
  const { bookmarks } = useStore();

  const savedArticles = JSON.parse((typeof window !== 'undefined' ? localStorage.getItem('geopolicy-articles') : null) || '[]');
  const allArticles = [...savedArticles, ...mockArticles];
  const bookmarkedArticles = allArticles.filter(art => bookmarks.includes(art.id));

  return (
    <div className="bookmarks-page">
      <h1 style={{ marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
        <Bookmark size={32} style={{ color: 'var(--accent-primary)' }} /> Your Bookmarks
      </h1>
      
      {bookmarkedArticles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-4xl) 0', color: 'var(--text-tertiary)' }}>
          <Bookmark size={64} style={{ margin: '0 auto', marginBottom: 'var(--space-md)', opacity: 0.5 }} />
          <h3>No bookmarks yet.</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Save articles using the bookmark icon on cards to read them later.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-2xl)' }}>
          {bookmarkedArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
