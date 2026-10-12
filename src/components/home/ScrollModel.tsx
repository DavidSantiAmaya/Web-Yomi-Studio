"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Skateboard } from "@/components/Skateboard";

function Model({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const group = ref.current;
    if (!group) return;
    const p = reducedMotion ? 0.1 : progress;
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, -0.22 + p * 0.45, 5, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, -0.55 + p * Math.PI * 1.55, 5, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, p * 0.16, 5, delta);
    group.position.x = THREE.MathUtils.damp(group.position.x, 0.1 - p * 0.55, 5, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, 0.08 - p * 0.12, 5, delta);
    const scale = THREE.MathUtils.damp(group.scale.x, 1 + p * 0.34, 5, delta);
    group.scale.setScalar(scale);
  });
  return <group ref={ref}><Skateboard deckTextureURLs={["/skateboard/Deck.webp"]} deckTextureURL="/skateboard/Deck.webp" wheelTextureURLs={["/skateboard/SkateWheel1.png"]} wheelTextureURL="/skateboard/SkateWheel1.png" truckColor="#111111" boltColor="#D9F154" pose="side" /></group>;
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
    return () => { window.removeEventListener("scroll", update); media.removeEventListener("change", update); };
  }, []);
  return <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#e4ff70_0,transparent_34%),linear-gradient(135deg,#f6f5f1_20%,#b7b7b1_100%)]">
    <Canvas camera={{ position: [1.8, 0.9, 2.25], fov: 48 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
      <Suspense fallback={null}><Environment files="/hdr/warehouse-256.hdr" environmentIntensity={0.7} /><ambientLight intensity={0.8} /><directionalLight position={[3, 4, 3]} intensity={2} /><Model progress={progress} reducedMotion={reducedMotion} /><ContactShadows position={[0, -0.12, 0]} opacity={0.35} scale={5} /></Suspense>
    </Canvas>
    <p className="absolute bottom-5 right-5 max-w-44 border border-black bg-[#f6f5f1] p-2 text-[10px] uppercase leading-tight">Objeto 3D técnico provisional. Pendiente de modelo final YOMI.</p>
  </div>;
}
