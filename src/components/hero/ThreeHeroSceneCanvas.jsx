import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const pseudoRandom = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

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

function Particles({ isMobile }) {
  const particleRef = useRef(null);
  const count = isMobile ? 120 : 220;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const radius = 1.8 + pseudoRandom(i + 1) * 2.6;
      const angle = pseudoRandom(i + 2) * Math.PI * 2;
      const height = (pseudoRandom(i + 3) - 0.5) * 2.4;
      arr[i3] = Math.cos(angle) * radius;
      arr[i3 + 1] = height;
      arr[i3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!particleRef.current) return;
    particleRef.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={particleRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#60A5FA" size={isMobile ? 0.018 : 0.022} transparent opacity={0.68} sizeAttenuation />
    </points>
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
      <Particles isMobile={isMobile} />
    </Canvas>
  );
}
