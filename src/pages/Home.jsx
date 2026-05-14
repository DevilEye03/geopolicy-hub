import React from 'react';
import { Link } from 'react-router-dom';
import { ArticleCard } from '../components/ui/ArticleCard';
import { GeopoliticsMap } from '../components/ui/GeopoliticsMap';

const mockArticles = [
// ... (mock articles stay same)
];

export function Home() {
  const [articles, setArticles] = React.useState(mockArticles);
  const [selectedRegion, setSelectedRegion] = React.useState(null);

  React.useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem('geopolicy-articles') || '[]');
    let allArticles = [...savedArticles, ...mockArticles];
    
    if (selectedRegion) {
      allArticles = allArticles.filter(a => 
        a.region?.toLowerCase() === selectedRegion.toLowerCase() ||
        a.category?.toLowerCase() === selectedRegion.toLowerCase() ||
        a.tags?.some(t => t.toLowerCase() === selectedRegion.toLowerCase())
      );
    }
    
    setArticles(allArticles);
  }, [selectedRegion]);

  return (
    <div>
      <section style={{ padding: 'var(--space-3xl) 0', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: 'var(--text-6xl)', marginBottom: 'var(--space-md)' }}>Understand the World.</h1>
        <p style={{ fontSize: 'var(--text-xl)', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', marginBottom: 'var(--space-xl)' }}>
          Expert analysis on geopolitics, international relations, laws, and policies that shape our global future.
        </p>
      </section>

      <GeopoliticsMap 
        selectedRegion={selectedRegion} 
        onRegionSelect={setSelectedRegion} 
      />

      <section style={{ padding: 'var(--space-2xl) 0' }}>
        <h2 style={{ marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <span style={{ width: '4px', height: '24px', background: 'var(--accent-primary)', display: 'inline-block', borderRadius: 'var(--radius-sm)' }}></span>
          {selectedRegion ? `Analysis for ${selectedRegion.replace('-', ' ')}` : 'Featured Insights'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
          {articles.length > 0 ? (
            articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: 'var(--space-3xl)', color: 'var(--text-tertiary)' }}>
              No articles found for this region yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
