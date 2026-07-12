"use client";
import React, { useEffect, useRef } from 'react';

export function ThreeDBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, screenX: -1000, screenY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic sizing of the 3D globe based on viewport
    let sphereRadius = Math.min(width, height) * 0.26;
    if (sphereRadius < 140) sphereRadius = 140;
    if (sphereRadius > 240) sphereRadius = 240;

    // --- 3D Globe Particle Data ---
    const GLOBE_PARTICLE_COUNT = 90;
    const points = [];
    for (let i = 0; i < GLOBE_PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / GLOBE_PARTICLE_COUNT);
      const theta = Math.sqrt(GLOBE_PARTICLE_COUNT * Math.PI) * phi;

      points.push({
        origX: sphereRadius * Math.sin(phi) * Math.cos(theta),
        origY: sphereRadius * Math.sin(phi) * Math.sin(theta),
        origZ: sphereRadius * Math.cos(phi),
      });
    }

    // --- Antigravity Floating Nodes Data ---
    const FLOATING_NODES_COUNT = 30;
    const floatingNodes = [];
    const codeTokens = ['{ }', '[ ]', '=>', 'const', 'import', 'api', 'git', 'dev', 'hub', 'globe', 'async', 'await', 'push', 'init'];

    for (let i = 0; i < FLOATING_NODES_COUNT; i++) {
      const isToken = Math.random() > 0.4;
      floatingNodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -(0.4 + Math.random() * 0.8), // upward velocity
        vx: (Math.random() - 0.5) * 0.1,  // minor side sway
        size: isToken ? (11 + Math.random() * 6) : (2 + Math.random() * 2),
        type: isToken ? 'token' : 'particle',
        char: isToken ? codeTokens[Math.floor(Math.random() * codeTokens.length)] : '',
        driftFreq: 0.005 + Math.random() * 0.005,
        driftAmp: 0.15 + Math.random() * 0.25,
        driftOffset: Math.random() * Math.PI * 2,
        repelX: 0,
        repelY: 0,
      });
    }

    let rotationX = 0;
    let rotationY = 0;
    const autoSpeedX = 0.0012;
    const autoSpeedY = 0.0015;
    let tick = 0;

    const handleMouseMove = (e) => {
      // Screen coordinates for bubble repulsion
      mouseRef.current.screenX = e.clientX;
      mouseRef.current.screenY = e.clientY;

      // Normalized coordinates for globe tilting
      const normX = (e.clientX - width / 2) / (width / 2);
      const normY = (e.clientY - height / 2) / (height / 2);
      
      mouseRef.current.targetX = normX * 0.35;
      mouseRef.current.targetY = normY * 0.35;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      sphereRadius = Math.min(width, height) * 0.26;
      if (sphereRadius < 140) sphereRadius = 140;
      if (sphereRadius > 240) sphereRadius = 240;

      // Re-scale globe points
      points.forEach((p, idx) => {
        const phi = Math.acos(-1 + (2 * idx) / GLOBE_PARTICLE_COUNT);
        const theta = Math.sqrt(GLOBE_PARTICLE_COUNT * Math.PI) * phi;
        p.origX = sphereRadius * Math.sin(phi) * Math.cos(theta);
        p.origY = sphereRadius * Math.sin(phi) * Math.sin(theta);
        p.origZ = sphereRadius * Math.cos(phi);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // Retrieve theme dynamic variables
      const style = getComputedStyle(document.documentElement);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const primaryColor = style.getPropertyValue('--accent-primary').trim() || '#3B82F6';
      const secondaryColor = style.getPropertyValue('--accent-secondary').trim() || '#8B5CF6';

      // ==========================================
      // LAYER 1: Antigravity Floating Particles & Code
      // ==========================================
      for (let i = 0; i < floatingNodes.length; i++) {
        const node = floatingNodes[i];

        // Horizontal sinusoidal drift
        const sway = Math.sin(tick * node.driftFreq + node.driftOffset) * node.driftAmp;

        // Mouse repulsion vector math
        const dx = node.x - mouseRef.current.screenX;
        const dy = node.y - mouseRef.current.screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180 && mouseRef.current.screenX > 0) {
          const force = (180 - dist) / 180;
          const angle = Math.atan2(dy, dx);
          
          // Repulsion velocity
          node.repelX += Math.cos(angle) * force * 3;
          node.repelY += Math.sin(angle) * force * 3;
        }

        // Apply friction/decay to repulsion force
        node.repelX *= 0.92;
        node.repelY *= 0.92;

        // Apply movements
        node.x += node.vx + sway + node.repelX;
        node.y += node.vy + node.repelY;

        // Reset if floating out of bounds
        if (node.y < -30) {
          node.y = height + 30;
          node.x = Math.random() * width;
          node.repelX = 0;
          node.repelY = 0;
        }
        if (node.x < -30) node.x = width + 30;
        if (node.x > width + 30) node.x = -30;

        // Shading based on vertical height (fade out slightly at the top)
        const verticalFade = Math.min(1, node.y / (height * 0.8));
        const alpha = (node.type === 'token' ? 0.08 : 0.15) * verticalFade * (isDark ? 1 : 0.7);

        ctx.globalAlpha = alpha;
        
        if (node.type === 'token') {
          // Draw code token
          ctx.font = `${node.size}px var(--font-mono), monospace`;
          ctx.fillStyle = i % 2 === 0 ? primaryColor : secondaryColor;
          ctx.fillText(node.char, node.x, node.y);
        } else {
          // Draw glowing dust particle
          ctx.fillStyle = i % 3 === 0 ? secondaryColor : primaryColor;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0; // Reset opacity

      // ==========================================
      // LAYER 2: 3D Rotating Geopolitical Globe
      // ==========================================
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      rotationX += autoSpeedX + mouseRef.current.y * 0.006;
      rotationY += autoSpeedY + mouseRef.current.x * 0.006;

      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      const projected = [];
      const perspective = 800;
      const centerX = width / 2;
      const centerY = height / 2;

      // Project 3D coordinates
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        let x1 = p.origX * cosY - p.origZ * sinY;
        let z1 = p.origX * sinY + p.origZ * cosY;
        let y2 = p.origY * cosX - z1 * sinX;
        let z2 = p.origY * sinX + z1 * cosX;

        const scale = perspective / (perspective + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        projected.push({
          x: projX,
          y: projY,
          z: z2,
          scale: scale
        });
      }

      // Draw connection lines
      ctx.lineWidth = 0.55;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        let connections = 0;
        
        for (let j = i + 1; j < projected.length && connections < 2; j++) {
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < sphereRadius * 1.1) {
            connections++;
            const avgZ = (p1.z + p2.z) / 2;
            const alpha = Math.max(0.01, (1 - avgZ / sphereRadius) * (isDark ? 0.08 : 0.05));
            
            ctx.strokeStyle = i % 2 === 0 ? primaryColor : secondaryColor;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw globe nodes
      ctx.globalAlpha = 1.0;
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.max(0.06, (1 - p.z / sphereRadius) * (isDark ? 0.35 : 0.25));
        const radius = Math.max(1, p.scale * (i % 6 === 0 ? 3.0 : 1.8));

        ctx.fillStyle = i % 3 === 0 ? secondaryColor : primaryColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Node glow overlay for closer points
        if (p.z < -sphereRadius * 0.4 && i % 4 === 0) {
          ctx.shadowColor = primaryColor;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + 0.5, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.fill();
          ctx.shadowBlur = 0;
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
