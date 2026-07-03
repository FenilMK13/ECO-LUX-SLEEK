"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import type { Group, Mesh } from "three";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

function CabinetStack(props: ThreeElements["group"]) {
  const group = useRef<Group>(null);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.35 - group.current.rotation.y) * 0.03;
    group.current.rotation.x += (-pointer.y * 0.12 - group.current.rotation.x) * 0.03;
  });

  return (
    <group {...props} ref={group}>
      {/* Base cabinet — matte graphite */}
      <mesh position={[0, -0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.9, 1.1]} />
        <meshPhysicalMaterial color="#2b2b2a" roughness={0.55} metalness={0.15} clearcoat={0.35} />
      </mesh>

      {/* Countertop — brushed titanium */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.35, 0.06, 1.18]} />
        <meshPhysicalMaterial color="#c7c7c2" roughness={0.28} metalness={0.85} />
      </mesh>

      {/* Wall cabinet — soft ivory */}
      <mesh position={[0, 1.05, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.7, 0.4]} />
        <meshPhysicalMaterial color="#f5f5f2" roughness={0.6} metalness={0.05} clearcoat={0.2} />
      </mesh>

      {/* Handle bar — champagne gold */}
      <mesh position={[0, -0.55, 0.58]} castShadow>
        <boxGeometry args={[2.6, 0.03, 0.03]} />
        <meshStandardMaterial color="#b6935f" roughness={0.35} metalness={0.9} />
      </mesh>

      {/* Chimney hood — dark stone */}
      <mesh position={[0, 0.55, -0.35]} castShadow>
        <cylinderGeometry args={[0.28, 0.4, 0.55, 32]} />
        <meshPhysicalMaterial color="#1a1a19" roughness={0.4} metalness={0.65} />
      </mesh>

      {/* Splashback pane — smoked glass */}
      <mesh position={[0, 0.4, -0.55]} castShadow>
        <boxGeometry args={[3.0, 0.85, 0.04]} />
        <meshPhysicalMaterial
          color="#e8ecef"
          roughness={0.08}
          metalness={0.1}
          transparent
          opacity={0.35}
          transmission={0.6}
          thickness={0.4}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

function FloatingPuck({ position, color }: { position: [number, number, number]; color: string }) {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.15;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh} position={position} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.06, 48]} />
        <meshPhysicalMaterial color={color} roughness={0.25} metalness={0.9} />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, 2, -2]} intensity={0.35} color="#cddce8" />
      <pointLight position={[2, 1, 3]} intensity={0.4} color="#f5e6cf" />

      <CabinetStack position={[0, -0.2, 0]} />
      <FloatingPuck position={[-2.4, 1.0, 1.9]} color="#b6935f" />
      <FloatingPuck position={[2.4, 1.6, 1.6]} color="#8e8e8a" />

      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.35}
        scale={8}
        blur={2.8}
        far={3}
        color="#111111"
      />
    </>
  );
}

export function KitchenScene() {
  const prefersReduced = useReducedMotion();

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [5.4, 2.4, 6.8], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={prefersReduced ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
