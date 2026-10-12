"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function YomiTotem({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const group = ref.current;
    if (!group) return;
    const p = reducedMotion ? 0.1 : progress;
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, 0.14 + p * 0.28, 5, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, -0.45 + p * Math.PI * 1.35, 5, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, -0.08 + p * 0.14, 5, delta);
    group.position.x = THREE.MathUtils.damp(group.position.x, 0.12 - p * 0.36, 5, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, -0.08 + p * 0.08, 5, delta);
    const scale = THREE.MathUtils.damp(group.scale.x, 1 + p * 0.28, 5, delta);
    group.scale.setScalar(scale);
  });

  return <group ref={ref}>
    <mesh rotation={[0.32, 0.2, 0]} castShadow>
      <boxGeometry args={[0.84, 1.72, 0.28]} />
      <meshStandardMaterial color="#111111" metalness={0.12} roughness={0.68} />
    </mesh>
    <mesh position={[0, 0.2, 0.22]} rotation={[0.65, 0, 0.12]}>
      <torusKnotGeometry args={[0.24, 0.075, 120, 16]} />
      <meshStandardMaterial color="#d9f154" metalness={0.1} roughness={0.35} />
    </mesh>
    <mesh position={[0.03, -0.55, 0.21]} rotation={[0.4, 0.7, 0]}>
      <sphereGeometry args={[0.17, 24, 24]} />
      <meshStandardMaterial color="#f6f5f1" roughness={0.45} />
    </mesh>
  </group>;
}

export function ScrollModel() {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
      setProgress(Math.max(0, Math.min(window.scrollY / Math.max(window.innerHeight * 1.8, 1), 1)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    media.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      media.removeEventListener("change", update);
    };
  }, []);

  return <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#e4ff70_0,transparent_34%),linear-gradient(135deg,#f6f5f1_20%,#b7b7b1_100%)]">
    <Canvas camera={{ position: [1.25, 0.5, 3.1], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} shadows>
      <ambientLight intensity={1.4} />
      <directionalLight castShadow position={[3, 4, 3]} intensity={2.2} />
      <YomiTotem progress={progress} reducedMotion={reducedMotion} />
      <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.4, 48]} />
        <meshStandardMaterial color="#111111" transparent opacity={0.12} />
      </mesh>
    </Canvas>
    <p className="absolute bottom-5 right-5 max-w-44 border border-black bg-[#f6f5f1] p-2 text-[10px] uppercase leading-tight">Escultura geométrica YOMI: objeto 3D abstracto y sustituible.</p>
  </div>;
}
