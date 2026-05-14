import React from 'react';

export function Categories() {
  const categories = ['Geopolitics', 'International Relations', 'Laws & Legislation', 'Policies', 'Diplomacy', 'Global Economy', 'Defense & Security'];

  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-xl)' }}>Explore by Category</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-md)' }}>
        {categories.map((cat, idx) => (
          <div key={idx} style={{ 
            padding: 'var(--space-xl)', 
            background: 'var(--bg-elevated)', 
            border: '1px solid var(--border-primary)', 
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            transition: 'var(--transition-fast)'
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
          onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
          >
            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>{cat}</h3>
            <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-xs)' }}>Explore latest analysis</p>
          </div>
        ))}
      </div>
    </div>
  );
}
