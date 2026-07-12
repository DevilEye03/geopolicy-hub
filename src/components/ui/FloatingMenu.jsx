"use client";
import React, { useState } from 'react';
import { Share2, Bookmark, ArrowUp, Plus, X, Globe, MessageCircle, BookOpen } from 'lucide-react';

export function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = "Check out this geopolitical analysis on GeoPolicy Hub";

  return (
    <div className={`floating-menu-container ${isOpen ? 'open' : ''}`}>
      <div className="floating-menu-items">
        <button className="floating-item-btn" onClick={scrollToTop} title="Scroll to Top">
          <ArrowUp size={20} />
        </button>
        <button className="floating-item-btn" title="Bookmark">
          <Bookmark size={20} />
        </button>
        
        {/* Quick Share Options */}
        <div className="floating-share-sub">
            <a href={`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`} target="_blank" rel="noreferrer" className="share-sub-btn whatsapp">
                <MessageCircle size={18} />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noreferrer" className="share-sub-btn twitter">
                <Globe size={18} />
            </a>
        </div>

        <button className="floating-item-btn share-trigger" title="Share">
          <Share2 size={20} />
        </button>
      </div>

      <button className="floating-main-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </button>
    </div>
  );
}
