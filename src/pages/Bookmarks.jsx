import React from 'react';
import { useStore } from '../store/useStore';
import { Bookmark } from 'lucide-react';

export function Bookmarks() {
  const { bookmarks } = useStore();

  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
        <Bookmark size={32} /> Your Bookmarks
      </h1>
      
      {bookmarks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-4xl) 0', color: 'var(--text-tertiary)' }}>
          <Bookmark size={64} style={{ margin: '0 auto', marginBottom: 'var(--space-md)', opacity: 0.5 }} />
          <h3>No bookmarks yet.</h3>
          <p>Save articles to read them later.</p>
        </div>
      ) : (
        <p>You have {bookmarks.length} bookmarked article(s).</p>
      )}
    </div>
  );
}
