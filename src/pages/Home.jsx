import React from 'react';
import { Link } from 'react-router-dom';
import { ArticleCard } from '../components/ui/ArticleCard';

const mockArticles = [
  {
    id: '1',
    title: 'The Shift in Global Supply Chains Post-2025',
    excerpt: 'An analysis of how multinational corporations are restructuring their supply lines in response to new geopolitical realities and trade policies in Asia.',
    category: 'Geopolitics',
    readTime: 8,
    author: 'Dr. Elena Rostova',
    authorInitials: 'ER',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Navigating the New Data Privacy Accords',
    excerpt: 'Examining the implications of the latest international agreements on cross-border data flows and what it means for global tech giants.',
    category: 'Laws & Legislation',
    readTime: 12,
    author: 'James T. Wellington',
    authorInitials: 'JW',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    title: 'Climate Diplomacy in the Next Decade',
    excerpt: 'How emerging economies are reshaping the narrative around climate change responsibilities and technological transfers.',
    category: 'Diplomacy',
    readTime: 6,
    author: 'Aisha Rahman',
    authorInitials: 'AR',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9cce?auto=format&fit=crop&q=80'
  }
];

export function Home() {
  return (
    <div>
      <section style={{ padding: 'var(--space-3xl) 0', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: 'var(--text-6xl)', marginBottom: 'var(--space-md)' }}>Understand the World.</h1>
        <p style={{ fontSize: 'var(--text-xl)', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', marginBottom: 'var(--space-xl)' }}>
          Expert analysis on geopolitics, international relations, laws, and policies that shape our global future.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
          <Link to="/write" className="btn btn-primary" style={{ padding: 'var(--space-md) var(--space-xl)' }}>Start Writing</Link>
          <Link to="/categories" className="btn" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', padding: 'var(--space-md) var(--space-xl)' }}>Explore Topics</Link>
        </div>
      </section>

      <section style={{ padding: 'var(--space-2xl) 0' }}>
        <h2 style={{ marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <span style={{ width: '4px', height: '24px', background: 'var(--accent-primary)', display: 'inline-block', borderRadius: 'var(--radius-sm)' }}></span>
          Featured Insights
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
          {mockArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
