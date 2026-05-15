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
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-tag">Global Intelligence Hub</div>
        <h1 className="hero-title text-gradient">Perspective on the <br/>Global Future.</h1>
        <p className="hero-subtitle">
          Join a elite network of analysts and policy makers. Decipher the complexities of geopolitics, trade, and international law.
        </p>
        <div className="hero-cta">
          <Link to="/write" className="btn btn-primary" style={{ padding: 'var(--space-md) var(--space-2xl)' }}>Start Writing</Link>
          <Link to="/categories" className="btn" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', padding: 'var(--space-md) var(--space-2xl)' }}>Explore Analysis</Link>
        </div>
      </section>

      <GeopoliticsMap 
        selectedRegion={selectedRegion} 
        onRegionSelect={setSelectedRegion} 
      />

      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="section-header" style={{ marginBottom: 'var(--space-2xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', margin: 0 }}>
                <span style={{ width: '4px', height: '28px', background: 'var(--accent-primary)', display: 'inline-block', borderRadius: 'var(--radius-sm)' }}></span>
                {selectedRegion ? `Analysis for ${selectedRegion.replace('-', ' ')}` : 'Latest Intelligence'}
            </h2>
            <Link to="/categories" style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>View all topics →</Link>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-2xl)' }}>
          {articles.length > 0 ? (
            articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="empty-state" style={{ textAlign: 'center', gridColumn: '1 / -1', padding: 'var(--space-4xl)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)' }}>
              <h3>No analysis found yet.</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Be the first to share your perspective on this region.</p>
              <Link to="/write" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>Draft Article</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
