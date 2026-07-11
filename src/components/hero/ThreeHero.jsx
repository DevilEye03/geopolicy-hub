import React from 'react';

const ThreeHeroSceneCanvas = React.lazy(() => import('./ThreeHeroSceneCanvas'));

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

function HeroFallback() {
  return (
    <div className="hero-fallback-visual" aria-hidden="true">
      <span className="hero-fallback-core" />
      <span className="hero-fallback-ring hero-fallback-ring--one" />
      <span className="hero-fallback-ring hero-fallback-ring--two" />
    </div>
  );
}

export function ThreeHero() {
  const [canRender3D, setCanRender3D] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const updateFlags = () => {
      const reducedMotion = motionQuery.matches;
      setCanRender3D(!reducedMotion && supportsWebGL());
      setIsMobile(mobileQuery.matches);
    };

    updateFlags();
    motionQuery.addEventListener('change', updateFlags);
    mobileQuery.addEventListener('change', updateFlags);

    return () => {
      motionQuery.removeEventListener('change', updateFlags);
      mobileQuery.removeEventListener('change', updateFlags);
    };
  }, []);

  return (
    <div className="hero-visual-shell" role="presentation">
      {canRender3D ? (
        <React.Suspense fallback={<HeroFallback />}>
          <ThreeHeroSceneCanvas isMobile={isMobile} />
        </React.Suspense>
      ) : (
        <HeroFallback />
      )}
    </div>
  );
}
