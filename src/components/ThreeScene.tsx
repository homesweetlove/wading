import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, RoundedBox, Cylinder, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function WeddingCake() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Base Plate */}
      <Cylinder args={[1.8, 1.9, 0.1, 32]} position={[0, -1.4, 0]}>
        <meshStandardMaterial color="#c5a059" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Bottom Tier */}
      <Cylinder args={[1.5, 1.5, 0.8, 32]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
      </Cylinder>
      {/* Bottom Lace/Pearl decoration */}
      {Array.from({ length: 16 }).map((_, i) => (
        <Sphere key={`p1-${i}`} args={[0.06, 16, 16]} position={[
          Math.cos((i / 16) * Math.PI * 2) * 1.55,
          -0.65,
          Math.sin((i / 16) * Math.PI * 2) * 1.55
        ]}>
          <meshStandardMaterial color="#f5f2ed" roughness={0.1} />
        </Sphere>
      ))}

      {/* Middle Tier */}
      <Cylinder args={[1.1, 1.1, 0.7, 32]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#fcfcfc" roughness={0.3} />
      </Cylinder>
      {/* Middle Gold Ribbon */}
      <Torus args={[1.12, 0.04, 16, 100]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#c5a059" metalness={0.8} />
      </Torus>
      {/* Middle Pearls */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Sphere key={`p2-${i}`} args={[0.05, 16, 16]} position={[
          Math.cos((i / 12) * Math.PI * 2) * 1.15,
          0.1,
          Math.sin((i / 12) * Math.PI * 2) * 1.15
        ]}>
          <meshStandardMaterial color="#f5f2ed" roughness={0.1} />
        </Sphere>
      ))}

      {/* Top Tier */}
      <Cylinder args={[0.7, 0.7, 0.6, 32]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </Cylinder>
      
      {/* Topper - Rings with Heart */}
      <group position={[0, 1, 0]}>
        <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
          <Torus args={[0.2, 0.02, 16, 100]} position={[-0.15, 0, 0]} rotation={[0, 0.5, 0]}>
            <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
          </Torus>
          <Torus args={[0.2, 0.02, 16, 100]} position={[0.15, 0, 0]} rotation={[0, -0.5, 0]}>
            <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
          </Torus>
          {/* Small Heart Topper */}
          <Text
            position={[0, 0.4, 0]}
            fontSize={0.4}
            color="#ff4d4d"
          >
            ❤️
          </Text>
        </Float>
      </group>

      {/* Floating Flowers/Petals around cake */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={`f-${i}`} speed={2 + Math.random()} rotationIntensity={2} floatIntensity={1}>
          <Text
            position={[
              Math.cos((i / 12) * Math.PI * 2) * 2,
              Math.sin(i) * 1.5,
              Math.sin((i / 12) * Math.PI * 2) * 2
            ]}
            fontSize={0.2}
          >
            🌸
          </Text>
        </Float>
      ))}
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 2, 6], fov: 40 }} dpr={[1, 2]}>
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={1} />
          <WeddingCake />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
}
