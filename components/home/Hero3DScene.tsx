'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function FloatingOrganicSphere({ position, color, scale = 1, speed = 1 }: { position: [number, number, number]; color: string; scale?: number; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t / 2) * 0.2;
      meshRef.current.rotation.y = Math.cos(t / 2) * 0.2;
    }
  });

  return (
    <Float speed={2 * speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>
    </Float>
  );
}

function FloatingRing({ position, color, scale = 1, rotation = [0, 0, 0] }: { position: [number, number, number]; color: string; scale?: number; rotation?: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ringRef} position={position} scale={scale} rotation={rotation as [number, number, number]}>
        <torusGeometry args={[1.2, 0.45, 24, 48]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.02}
        />
      </mesh>
    </Float>
  );
}

export function Hero3DScene() {
  return (
    <div className="w-full h-full min-h-[23.75rem] sm:min-h-[28.75rem] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFDF7" />
        <pointLight position={[-4, -2, 2]} intensity={0.8} color="#F4E4A5" />

        {/* Soft floating nature shapes resembling wooden stacking rings and silicone spheres */}
        <FloatingRing position={[-1.2, 0.4, 0]} color="#B9D5C4" scale={0.85} rotation={[0.5, 0.4, 0.2]} />
        <FloatingOrganicSphere position={[1.4, 0.8, -0.5]} color="#F3C6B3" scale={0.9} speed={0.9} />
        <FloatingOrganicSphere position={[-0.2, -1.2, 0.5]} color="#F4E4A5" scale={0.75} speed={1.2} />
        <FloatingOrganicSphere position={[1.1, -1.1, 0.2]} color="#23483B" scale={0.65} speed={0.8} />
        <FloatingRing position={[0.6, 1.3, -1]} color="#D8E5F0" scale={0.65} rotation={[-0.3, 0.6, 0.4]} />

        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.35}
          scale={8}
          blur={2.5}
          far={4}
          color="#23483B"
        />
      </Canvas>
    </div>
  );
}
