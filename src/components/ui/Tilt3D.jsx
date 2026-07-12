"use client";
import React, { useRef } from 'react';

export function Tilt3D({ children, maxAngle = 10, scale = 1.02, className = '', style = {} }) {
  const elementRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = elementRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    
    // Position of mouse relative to element center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);

    const rotateX = -normY * maxAngle;
    const rotateY = normX * maxAngle;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

    // Glare effect
    const glareEl = el.querySelector('.tilt-glare');
    if (glareEl) {
      const angle = Math.atan2(y, x) * (180 / Math.PI) - 90;
      glareEl.style.transform = `translateY(${y * 0.1}px) translateX(${x * 0.1}px)`;
      glareEl.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%)`;
      glareEl.style.opacity = Math.max(Math.abs(normX), Math.abs(normY)) * 0.5;
    }
  };

  const handleMouseLeave = () => {
    const el = elementRef.current;
    if (!el) return;
    
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    const glareEl = el.querySelector('.tilt-glare');
    if (glareEl) {
      glareEl.style.opacity = 0;
    }
  };

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-3d-wrapper ${className}`}
      style={{
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
        ...style
      }}
    >
      <div 
        className="tilt-glare" 
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease',
          opacity: 0,
          borderRadius: 'inherit',
          zIndex: 10
        }}
      />
      {children}
    </div>
  );
}
