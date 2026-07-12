"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ArticleCard } from '../components/ui/ArticleCard';
import { GeopoliticsMap } from '../components/ui/GeopoliticsMap';
import { mockArticles } from '../data/mockArticles';

function HomeContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [articles, setArticles] = React.useState(mockArticles);
  const [selectedRegion, setSelectedRegion] = React.useState(initialCategory || null);

  React.useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedRegion(cat);
  }, [searchParams]);

  React.useEffect(() => {
    async function fetchArticles() {
      try {
        const { db } = await import('../lib/firebase');
        const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
        const q = query(collection(db, 'articles'), orderBy('publishedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedArticles = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        let allArticles = [...fetchedArticles, ...mockArticles];
        
        if (selectedRegion) {
          allArticles = allArticles.filter(a => 
            a.region?.toLowerCase() === selectedRegion.toLowerCase() ||
            a.category?.toLowerCase() === selectedRegion.toLowerCase() ||
            a.tags?.some(t => t.toLowerCase() === selectedRegion.toLowerCase())
          );
        }
        
        setArticles(allArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        // Fallback
        let allArticles = [...mockArticles];
        if (selectedRegion) {
          allArticles = allArticles.filter(a => 
            a.region?.toLowerCase() === selectedRegion.toLowerCase() ||
            a.category?.toLowerCase() === selectedRegion.toLowerCase() ||
            a.tags?.some(t => t.toLowerCase() === selectedRegion.toLowerCase())
          );
        }
        setArticles(allArticles);
      }
    }
    
    fetchArticles();
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
          <Link href="/write" className="btn btn-primary" style={{ padding: 'var(--space-md) var(--space-2xl)' }}>Start Writing</Link>
          <Link href="/categories" className="btn" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', padding: 'var(--space-md) var(--space-2xl)' }}>Explore Analysis</Link>
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
            <Link href="/categories" style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>View all topics →</Link>
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
              <Link href="/write" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>Draft Article</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
