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

    // Normalize coordinates (-1 to 1)
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);

    // Calculate rotation angles (invert X rotation for standard physical behavior)
    const rotateX = -normY * maxAngle;
    const rotateY = normX * maxAngle;

    // Apply transformation
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
  };

  const handleMouseLeave = () => {
    const el = elementRef.current;
    if (!el) return;
    
    // Smooth reset of rotation when cursor leaves element
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
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
        ...style
      }}
    >
      {children}
    </div>
  );
}
