"use client";
import React, { useState } from 'react';

const regions = [
  { id: 'americas', name: 'Americas', path: 'M10,20 L30,20 L30,60 L10,60 Z', color: '#4F46E5' },
  { id: 'europe', name: 'Europe', path: 'M40,20 L55,20 L55,40 L40,40 Z', color: '#10B981' },
  { id: 'africa', name: 'Africa', path: 'M40,45 L55,45 L55,75 L40,75 Z', color: '#F59E0B' },
  { id: 'middle-east', name: 'Middle East', path: 'M56,35 L65,35 L65,50 L56,50 Z', color: '#EF4444' },
  { id: 'indo-pacific', name: 'Indo-Pacific', path: 'M60,20 L90,20 L90,80 L60,80 Z', color: '#8B5CF6' },
];

export function GeopoliticsMap({ onRegionSelect, selectedRegion }) {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  return (
    <div className="geopolitics-map-container">
      <div className="map-header" style={{ textAlign: 'center' }}>
        <div className="summary-badge" style={{ position: 'static', display: 'inline-block', marginBottom: 'var(--space-sm)' }}>Strategic Filtering</div>
        <h2 className="hero-title" style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-xs)' }}>Global Intelligence Network</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Select a strategic region to focus your analysis</p>
      </div>
      
      <div className="map-wrapper" style={{ marginTop: 'var(--space-2xl)' }}>
        <div className="map-svg-container">
            <svg viewBox="0 0 100 60" className="world-map-svg">
            {/* Improved World Map Shapes */}
            {regions.map((region) => (
                <path
                key={region.id}
                d={region.path}
                fill={selectedRegion === region.id ? region.color : (hoveredRegion === region.id ? `${region.color}33` : 'var(--bg-tertiary)')}
                stroke={selectedRegion === region.id ? region.color : 'var(--border-primary)'}
                strokeWidth={selectedRegion === region.id ? "1" : "0.3"}
                className={`map-region ${selectedRegion === region.id ? 'active' : ''}`}
                style={{ 
                    filter: selectedRegion === region.id ? `drop-shadow(0 0 8px ${region.color}66)` : 'none',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => onRegionSelect(region.id === selectedRegion ? null : region.id)}
                >
                <title>{region.name}</title>
                </path>
            ))}
            </svg>
        </div>

        <div className="map-legend-pills">
          {regions.map((region) => (
            <button
              key={region.id}
              className={`legend-pill ${selectedRegion === region.id ? 'active' : ''}`}
              style={{ '--accent': region.color }}
              onClick={() => onRegionSelect(region.id === selectedRegion ? null : region.id)}
            >
              <span className="legend-dot" style={{ background: region.color }}></span>
              {region.name}
            </button>
          ))}
        </div>
      </div>
      
      {selectedRegion && (
        <div className="region-info-toast" style={{ maxWidth: '400px', margin: 'var(--space-xl) auto' }}>
          <span>Viewing intelligence for <strong>{regions.find(r => r.id === selectedRegion)?.name}</strong></span>
          <button className="clear-btn" onClick={() => onRegionSelect(null)}>Reset Filter</button>
        </div>
      )}
    </div>
  );
}
