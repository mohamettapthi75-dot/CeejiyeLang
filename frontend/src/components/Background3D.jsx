import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#6366f1"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#a855f7"
          emissiveIntensity={0.2}
          roughness={0}
        />
      </mesh>
    </Float>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-dark">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d2ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <group position={[2, 1, 0]}>
          <AnimatedSphere />
        </group>

        <group position={[-3, -2, -1]} scale={0.5}>
          <AnimatedSphere />
        </group>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark" />
    </div>
  );
};

export default Background3D;
