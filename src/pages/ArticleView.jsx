import React from 'react';
import { useParams } from 'react-router-dom';

export function ArticleView() {
  const { id } = useParams();

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: 'var(--space-2xl)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 'var(--weight-bold)', textTransform: 'uppercase' }}>Geopolitics</span>
          <span style={{ color: 'var(--text-tertiary)' }}>•</span>
          <span style={{ color: 'var(--text-secondary)' }}>8 min read</span>
        </div>
        <h1 style={{ fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-lg)' }}>The Shift in Global Supply Chains Post-2025</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', paddingBottom: 'var(--space-md)', borderBottom: '1px solid var(--border-primary)' }}>
          <div className="avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>ER</div>
          <div>
            <div style={{ fontWeight: 'var(--weight-bold)' }}>Dr. Elena Rostova</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Senior Analyst at GeoPolicy Institute</div>
          </div>
        </div>
      </header>

      <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80" alt="Supply chains" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-2xl)' }} />

      <div style={{ fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
        <p>In the wake of recent geopolitical realignments, multinational corporations are fundamentally rethinking their approach to global supply chains. The long-standing model of prioritizing cost-efficiency above all else is giving way to a new paradigm focused on resilience, redundancy, and regionalization.</p>
        
        <h2>The Catalyst for Change</h2>
        <p>The vulnerabilities of highly centralized supply networks were exposed by a series of compounding crises. As nations increasingly leverage economic interdependence for strategic advantage, corporate leaders recognize that securing supply lines is now a matter of national security as much as it is a business imperative.</p>
        
        <blockquote>
          "Resilience is no longer a buzzword; it is the fundamental metric by which future operational success will be measured."
        </blockquote>

        <h2>Regional Hubs over Global Networks</h2>
        <p>We are witnessing a shift towards 'nearshoring' and 'friendshoring'—where production facilities are relocated closer to primary markets or to allied nations. This minimizes exposure to sudden tariffs, export controls, or logistical choke points.</p>
      </div>
    </article>
  );
}
