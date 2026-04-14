import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Button3DProps {
  text: string;
  onClick?: () => void;
  color?: string;
  width?: number;
}

function ButtonMesh({ text, onClick, color = "#c5a059", width = 2 }: Button3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        clicked ? -0.1 : hovered ? 0.05 : 0,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        hovered ? -0.1 : 0,
        0.1
      );
    }
  });

  return (
    <group 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => {
        setHovered(false);
        setClicked(false);
      }}
      onPointerDown={() => setClicked(true)}
      onPointerUp={() => {
        setClicked(false);
        onClick?.();
      }}
    >
      {/* Button Body */}
      <RoundedBox args={[width, 0.6, 0.3]} radius={0.1} smoothness={4}>
        <meshStandardMaterial 
          color={hovered ? "#d4af37" : color} 
          metalness={0.8} 
          roughness={0.2} 
        />
      </RoundedBox>
      
      {/* Button Text */}
      <Text
        position={[0, 0, 0.16]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/notosanskr/v27/Plya4zHs6mve979H85E92FT3m256.woff"
      >
        {text}
      </Text>

      {/* Shadow/Base */}
      <mesh position={[0, -0.05, -0.05]}>
        <boxGeometry args={[width, 0.6, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" opacity={0.5} transparent />
      </mesh>
    </group>
  );
}

export default function Button3D(props: Button3DProps) {
  return (
    <div className="h-16 w-full max-w-[240px] mx-auto">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 2]} fov={50} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <ButtonMesh {...props} />
      </Canvas>
    </div>
  );
}
