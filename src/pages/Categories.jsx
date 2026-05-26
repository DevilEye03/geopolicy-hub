import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Users, Scale, FileText, Shield, TrendingUp, Cpu, HeartPulse, Zap, Handshake } from 'lucide-react';

const categoryData = [
  { 
    name: 'Geopolitics', 
    icon: Globe, 
    description: 'Analyzing global power dynamics and territorial relationships.',
    color: '#4F46E5'
  },
  { 
    name: 'International Relations', 
    icon: Users, 
    description: 'Interactions between sovereign states and intergovernmental organizations.',
    color: '#10B981'
  },
  { 
    name: 'Laws & Legislation', 
    icon: Scale, 
    description: 'Legal frameworks and international law developments.',
    color: '#F59E0B'
  },
  { 
    name: 'Policies', 
    icon: FileText, 
    description: 'Domestic and international policy analysis and impact.',
    color: '#EF4444'
  },
  { 
    name: 'Defense & Security', 
    icon: Shield, 
    description: 'Strategic military analysis and global security threats.',
    color: '#8B5CF6'
  },
  { 
    name: 'Global Economy', 
    icon: TrendingUp, 
    description: 'Financial systems, trade agreements, and global market trends.',
    color: '#EC4899'
  },
  { 
    name: 'Science & Tech', 
    icon: Cpu, 
    description: 'Technological innovation and its geopolitical implications.',
    color: '#06B6D4'
  },
  { 
    name: 'Health', 
    icon: HeartPulse, 
    description: 'Global health crises, healthcare policy, and biotechnology.',
    color: '#F97316'
  },
  { 
    name: 'Energy & Climate', 
    icon: Zap, 
    description: 'Energy security and global climate change responses.',
    color: '#84CC16'
  },
  { 
    name: 'Diplomacy', 
    icon: Handshake, 
    description: 'Bilateral negotiations, treaties, and international mediation efforts.',
    color: '#14B8A6'
  }
];

export function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    // Navigate home with the category parameter
    navigate(`/?category=${encodeURIComponent(categoryName)}`);
    // Force a scroll to the results section after a short delay
    setTimeout(() => {
        window.scrollTo({ top: 600, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="categories-page">
      <header className="page-header">
        <div className="hero-tag">Directory</div>
        <h1 className="hero-title text-gradient">Explore Knowledge</h1>
        <p className="hero-subtitle">Deep dive into specialized fields of global analysis</p>
      </header>

      <div className="categories-grid">
        {categoryData.map((cat, idx) => (
          <div 
            key={idx} 
            className="category-card" 
            style={{ '--accent': cat.color, cursor: 'pointer' }}
            onClick={() => handleCategoryClick(cat.name)}
          >
            <div className="category-icon-wrapper">
              <cat.icon size={28} />
            </div>
            <div className="category-card-content">
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
              <button 
                className="category-action-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(cat.name);
                }}
              >
                Explore Category →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
