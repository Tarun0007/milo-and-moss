'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function StackingArchModel({ color = '#B9D5C4' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Outer Beechwood Arch */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.28, 24, 48, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>

      {/* Middle Arch */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.05, 0.25, 24, 48, Math.PI]} />
        <meshStandardMaterial color="#F3C6B3" roughness={0.35} />
      </mesh>

      {/* Inner Arch */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.65, 0.22, 24, 48, Math.PI]} />
        <meshStandardMaterial color="#F4E4A5" roughness={0.35} />
      </mesh>

      {/* Center Sphere */}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#23483B" roughness={0.25} />
      </mesh>
    </group>
  );
}

export function Product3DViewer({ color = '#B9D5C4' }: { color?: string }) {
  return (
    <div className="relative w-full aspect-square rounded-3xl bg-[#FAF8F3] border border-[#E7E4DC] overflow-hidden">
      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[0.6875rem] font-semibold text-[#23483B] border border-[#E7E4DC] pointer-events-none">
        3D interactive preview — drag to orbit
      </div>

      <Canvas
        camera={{ position: [0, 1.2, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 4]} intensity={1.6} />
        <pointLight position={[-4, -2, 2]} intensity={0.7} color="#F3C6B3" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <StackingArchModel color={color} />
        </Float>

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={5}
          blur={2}
          far={3}
          color="#23483B"
        />

        <OrbitControls enableZoom={true} minDistance={2.5} maxDistance={7} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
