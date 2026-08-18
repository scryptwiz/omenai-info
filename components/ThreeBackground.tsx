"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  // Generate random positions for the particles
  const positions = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      positions[i * 3] = (Math.random() - 0.5) * 15;
      // eslint-disable-next-line react-hooks/purity
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      // eslint-disable-next-line react-hooks/purity
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;

      // Add subtle mouse interaction
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;

      ref.current.rotation.x += (mouseY - ref.current.rotation.x) * 0.05;
      ref.current.rotation.y += (mouseX - ref.current.rotation.y) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#b08d40" // Gold color
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen hidden md:block">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
