import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArticleCard } from '../components/ui/ArticleCard';
import { GeopoliticsMap } from '../components/ui/GeopoliticsMap';

const mockArticles = [
  {
    id: '1',
    title: 'The Shift in Global Supply Chains Post-2025',
    excerpt: 'Multinational corporations are fundamentally rethinking their approach to global supply chains in a post-globalization era.',
    category: 'Geopolitics',
    readTime: 8,
    author: 'Dr. Elena Rostova',
    authorInitials: 'ER',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80',
    publishedAt: '2025-05-10T10:00:00Z',
    region: 'indo-pacific'
  },
  {
    id: '2',
    title: 'Digital Sovereignty: New Laws in the EU',
    excerpt: 'The European Union is setting a global precedent with its latest framework on data privacy and AI regulation.',
    category: 'Laws & Legislation',
    readTime: 12,
    author: 'Marcus Thorne',
    authorInitials: 'MT',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80',
    publishedAt: '2025-05-12T14:30:00Z',
    region: 'europe'
  },
  {
    id: '3',
    title: 'Energy Security in the Middle East',
    excerpt: 'As transition to renewables accelerates, traditional energy powers are pivoting their long-term strategies.',
    category: 'Global Economy',
    readTime: 10,
    author: 'Sarah Al-Fayed',
    authorInitials: 'SA',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80',
    publishedAt: '2025-05-14T09:15:00Z',
    region: 'middle-east'
  },
  {
    id: '4',
    title: 'The AI Arms Race: Silicon Geopolitics',
    excerpt: 'How semiconductor supply chains and AI compute power have become the new frontier of national power.',
    category: 'Science & Tech',
    readTime: 15,
    author: 'Chen Wei',
    authorInitials: 'CW',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
    publishedAt: '2025-05-16T11:00:00Z',
    region: 'indo-pacific'
  },
  {
    id: '5',
    title: 'Biotech & Global Health Security',
    excerpt: 'The lessons from the last pandemic are shaping new international treaties on pathogen sharing and vaccine equity.',
    category: 'Health',
    readTime: 9,
    author: 'Dr. Amara Okafor',
    authorInitials: 'AO',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80',
    publishedAt: '2025-05-18T10:30:00Z',
    region: 'africa'
  },
  {
    id: '6',
    title: 'The Lithium Scramble: Energy Transition Risks',
    excerpt: 'As the world shifts to EVs, the race for critical minerals is creating new alliances and tensions in South America.',
    category: 'Energy & Climate',
    readTime: 11,
    author: 'Carlos Ruiz',
    authorInitials: 'CR',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80',
    publishedAt: '2025-05-20T16:00:00Z',
    region: 'americas'
  }
];

export function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');
  
  const [articles, setArticles] = React.useState(mockArticles);
  const [selectedRegion, setSelectedRegion] = React.useState(initialCategory || null);

  React.useEffect(() => {
    // If the URL changes, update the selected region
    const cat = new URLSearchParams(location.search).get('category');
    if (cat) setSelectedRegion(cat);
  }, [location.search]);

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
