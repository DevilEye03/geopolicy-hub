import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

function Globe() {
  const globeRef = useRef(null);

  useFrame((state, delta) => {
    if (!globeRef.current) return;
    globeRef.current.rotation.y += delta * 0.1;
    globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[1.2, 40, 40]} />
        <meshStandardMaterial color="#3B82F6" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh scale={0.92}>
        <sphereGeometry args={[1.2, 30, 30]} />
        <meshStandardMaterial color="#8B5CF6" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export default function ThreeHeroSceneCanvas({ isMobile = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.4], fov: 45 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={1.2} />
      <pointLight position={[-2, -1, 2]} intensity={0.4} color="#8B5CF6" />
      <Globe />
      <Sparkles count={isMobile ? 28 : 56} size={2.6} speed={0.18} color="#60A5FA" scale={[5, 3, 3]} />
    </Canvas>
  );
}
