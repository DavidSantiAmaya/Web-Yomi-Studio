"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Totem({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => { const group = ref.current; if (!group) return; const p = reducedMotion ? 0 : progress; group.rotation.x = THREE.MathUtils.damp(group.rotation.x, .12 + p * .3, 4, delta); group.rotation.y = THREE.MathUtils.damp(group.rotation.y, -.45 + p * Math.PI * 1.25, 4, delta); group.position.x = THREE.MathUtils.damp(group.position.x, .12 - p * .35, 4, delta); group.scale.setScalar(THREE.MathUtils.damp(group.scale.x, 1 + p * .25, 4, delta)); });
  return <group ref={ref}><mesh rotation={[.32, .2, 0]} castShadow><boxGeometry args={[.84, 1.72, .28]} /><meshStandardMaterial color="#111" roughness={.7} /></mesh><mesh position={[0, .2, .22]} rotation={[.65, 0, .12]}><torusKnotGeometry args={[.24, .075, 120, 16]} /><meshStandardMaterial color="#e5e5e5" metalness={.2} roughness={.35} /></mesh><mesh position={[.03, -.55, .21]}><sphereGeometry args={[.17, 24, 24]} /><meshStandardMaterial color="#fff" /></mesh></group>;
}

export function ScrollModel() {
  const [progress, setProgress] = useState(0); const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => { const media = window.matchMedia("(prefers-reduced-motion: reduce)"); const update = () => { setReducedMotion(media.matches); setProgress(Math.min(1, Math.max(0, window.scrollY / Math.max(window.innerHeight * 1.7, 1)))); }; update(); window.addEventListener("scroll", update, { passive: true }); media.addEventListener("change", update); return () => { window.removeEventListener("scroll", update); media.removeEventListener("change", update); }; }, []);
  return <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#ffffff_0,transparent_32%),linear-gradient(135deg,#f5f5f5_20%,#a3a3a3_100%)]"><Canvas camera={{ position: [1.25, .5, 3.1], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} shadows><ambientLight intensity={1.4} /><directionalLight castShadow position={[3, 4, 3]} intensity={2.2} /><Totem progress={progress} reducedMotion={reducedMotion} /><mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><circleGeometry args={[1.4, 48]} /><meshStandardMaterial color="#111" transparent opacity={.12} /></mesh></Canvas><p className="absolute bottom-5 right-5 max-w-44 border border-black bg-white p-2 text-[10px] uppercase leading-tight">Escultura geométrica YOMI: objeto 3D abstracto y sustituible.</p></div>;
}
