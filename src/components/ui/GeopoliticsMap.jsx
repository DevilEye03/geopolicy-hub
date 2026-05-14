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
      <div className="map-header">
        <h3>Interactive Strategic Map</h3>
        <p>Explore analysis by global region</p>
      </div>
      
      <div className="map-wrapper">
        <svg viewBox="0 0 100 100" className="world-map-svg">
          {/* Simplified World Map Shapes */}
          {regions.map((region) => (
            <path
              key={region.id}
              d={region.path}
              fill={selectedRegion === region.id ? region.color : (hoveredRegion === region.id ? `${region.color}99` : 'var(--bg-tertiary)')}
              stroke="var(--border-primary)"
              strokeWidth="0.5"
              className={`map-region ${selectedRegion === region.id ? 'active' : ''}`}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => onRegionSelect(region.id === selectedRegion ? null : region.id)}
            >
              <title>{region.name}</title>
            </path>
          ))}
        </svg>

        <div className="map-legend">
          {regions.map((region) => (
            <button
              key={region.id}
              className={`legend-item ${selectedRegion === region.id ? 'active' : ''}`}
              onClick={() => onRegionSelect(region.id === selectedRegion ? null : region.id)}
            >
              <span className="legend-dot" style={{ background: region.color }}></span>
              {region.name}
            </button>
          ))}
        </div>
      </div>
      
      {selectedRegion && (
        <div className="region-info-toast">
          Filtering by <strong>{regions.find(r => r.id === selectedRegion)?.name}</strong>
          <button className="clear-btn" onClick={() => onRegionSelect(null)}>✕</button>
        </div>
      )}
    </div>
  );
}
