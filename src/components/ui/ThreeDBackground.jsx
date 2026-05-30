import React, { useEffect, useRef } from 'react';

export function ThreeDBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic sizing based on viewport
    let sphereRadius = Math.min(width, height) * 0.28;
    if (sphereRadius < 150) sphereRadius = 150;
    if (sphereRadius > 260) sphereRadius = 260;

    const PARTICLE_COUNT = 100;
    const points = [];

    // Distribute points uniformly on a sphere shell using Fibonacci spiral math
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;

      points.push({
        x: sphereRadius * Math.sin(phi) * Math.cos(theta),
        y: sphereRadius * Math.sin(phi) * Math.sin(theta),
        z: sphereRadius * Math.cos(phi),
        origX: sphereRadius * Math.sin(phi) * Math.cos(theta),
        origY: sphereRadius * Math.sin(phi) * Math.sin(theta),
        origZ: sphereRadius * Math.cos(phi),
      });
    }

    let rotationX = 0;
    let rotationY = 0;
    let autoSpeedX = 0.0015;
    let autoSpeedY = 0.0018;

    const handleMouseMove = (e) => {
      // Calculate normalized mouse coordinates (-1 to 1)
      const normX = (e.clientX - width / 2) / (width / 2);
      const normY = (e.clientY - height / 2) / (height / 2);
      
      mouseRef.current.targetX = normX * 0.4;
      mouseRef.current.targetY = normY * 0.4;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      sphereRadius = Math.min(width, height) * 0.28;
      if (sphereRadius < 150) sphereRadius = 150;
      if (sphereRadius > 260) sphereRadius = 260;

      // Re-scale point coordinates to new radius
      points.forEach((p, idx) => {
        const phi = Math.acos(-1 + (2 * idx) / PARTICLE_COUNT);
        const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
        p.x = p.origX = sphereRadius * Math.sin(phi) * Math.cos(theta);
        p.y = p.origY = sphereRadius * Math.sin(phi) * Math.sin(theta);
        p.z = p.origZ = sphereRadius * Math.cos(phi);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate current mouse tracking towards target
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Combine auto rotation and mouse position
      rotationX += autoSpeedX + mouseRef.current.y * 0.008;
      rotationY += autoSpeedY + mouseRef.current.x * 0.008;

      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      // Projected points container
      const projected = [];
      const perspective = 800;
      const centerX = width / 2;
      const centerY = height / 2;

      // Retrieve CSS variable colors dynamically
      const style = getComputedStyle(document.documentElement);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      
      const primaryColor = style.getPropertyValue('--accent-primary').trim() || '#3B82F6';
      const secondaryColor = style.getPropertyValue('--accent-secondary').trim() || '#8B5CF6';
      
      // Calculate 3D rotations and project
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotate Y
        let x1 = p.origX * cosY - p.origZ * sinY;
        let z1 = p.origX * sinY + p.origZ * cosY;

        // Rotate X
        let y2 = p.origY * cosX - z1 * sinX;
        let z2 = p.origY * sinX + z1 * cosX;

        // Perspective Projection calculation
        const scale = perspective / (perspective + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        projected.push({
          x: projX,
          y: projY,
          z: z2, // for depth shading
          scale: scale
        });
      }

      // Draw connection edges
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        
        // Connect to a few neighboring points
        let connections = 0;
        for (let j = i + 1; j < projected.length && connections < 2; j++) {
          const p2 = projected[j];
          
          // Distance in projected space
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Only connect nearby points
          if (dist < sphereRadius * 1.1) {
            connections++;
            
            // Shading of lines based on depth (z-index)
            const avgZ = (p1.z + p2.z) / 2;
            const alpha = Math.max(0.01, (1 - avgZ / sphereRadius) * (isDark ? 0.08 : 0.06));
            
            ctx.strokeStyle = i % 2 === 0 ? primaryColor : secondaryColor;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes (particles)
      ctx.globalAlpha = 1;
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        
        // Node opacity based on depth z (front nodes are brighter and larger)
        const alpha = Math.max(0.08, (1 - p.z / sphereRadius) * (isDark ? 0.4 : 0.3));
        const radius = Math.max(1, p.scale * (i % 5 === 0 ? 3.5 : 2));

        ctx.fillStyle = i % 3 === 0 ? secondaryColor : primaryColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Node glow for foreground nodes
        if (p.z < -sphereRadius * 0.4 && i % 4 === 0) {
          ctx.shadowColor = primaryColor;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + 1, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="three-d-canvas-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
