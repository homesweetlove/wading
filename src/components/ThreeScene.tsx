import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, Cylinder, Torus, Sphere, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function FallingConfetti() {
  const count = 100;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  const particles = useRef<{ pos: THREE.Vector3; speed: number; rot: THREE.Vector3; rotSpeed: THREE.Vector3 }[]>([]);

  if (particles.current.length === 0) {
    for (let i = 0; i < count; i++) {
      particles.current.push({
        pos: new THREE.Vector3((Math.random() - 0.5) * 10, Math.random() * 10, (Math.random() - 0.5) * 10),
        speed: 0.01 + Math.random() * 0.02,
        rot: new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        rotSpeed: new THREE.Vector3(Math.random() * 0.02, Math.random() * 0.02, Math.random() * 0.02)
      });
    }
  }

  useFrame(() => {
    particles.current.forEach((p, i) => {
      p.pos.y -= p.speed;
      p.rot.add(p.rotSpeed);
      if (p.pos.y < -5) p.pos.y = 5;

      dummy.position.copy(p.pos);
      dummy.rotation.set(p.rot.x, p.rot.y, p.rot.z);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.05, 0.05]} />
      <meshStandardMaterial color="#b89352" emissive="#b89352" emissiveIntensity={0.5} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

function WeddingCake() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Base Plate */}
      <Cylinder args={[1.8, 1.9, 0.1, 32]} position={[0, -1.4, 0]}>
        <meshStandardMaterial color="#b89352" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Bottom Tier */}
      <Cylinder args={[1.5, 1.5, 0.8, 32]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.05} />
      </Cylinder>
      {/* Bottom Pearls */}
      {Array.from({ length: 24 }).map((_, i) => (
        <Sphere key={`p1-${i}`} args={[0.05, 16, 16]} position={[
          Math.cos((i / 24) * Math.PI * 2) * 1.55,
          -0.65,
          Math.sin((i / 24) * Math.PI * 2) * 1.55
        ]}>
          <meshStandardMaterial color="#fcfcfc" roughness={0.1} />
        </Sphere>
      ))}

      {/* Middle Tier */}
      <Cylinder args={[1.1, 1.1, 0.7, 32]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#fcfcfc" roughness={0.4} />
      </Cylinder>
      <Torus args={[1.12, 0.03, 16, 100]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#b89352" metalness={0.8} />
      </Torus>

      {/* Top Tier */}
      <Cylinder args={[0.7, 0.7, 0.6, 32]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </Cylinder>
      
      {/* Topper - Rings */}
      <group position={[0, 1, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
          <Torus args={[0.2, 0.02, 16, 100]} position={[-0.12, 0, 0]} rotation={[0, 0.4, 0]}>
            <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.05} />
          </Torus>
          <Torus args={[0.2, 0.02, 16, 100]} position={[0.12, 0, 0]} rotation={[0, -0.4, 0]}>
            <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.05} />
          </Torus>
        </Float>
      </group>

      {/* Elegant Falling Confetti */}
      <FallingConfetti />
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 1.5, 5], fov: 35 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <WeddingCake />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.3} scale={10} blur={2.5} far={4.5} />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
}

