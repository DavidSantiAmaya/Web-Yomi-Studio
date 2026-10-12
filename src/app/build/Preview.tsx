"use client";

import { Canvas } from "@react-three/fiber";

/** Marcador aislado del configurador original; /build redirige al catálogo YOMI. */
export default function Preview() {
  return <Canvas camera={{ position: [0, 0, 3] }}><ambientLight intensity={1.5} /><mesh rotation={[.2, .4, 0]}><boxGeometry args={[1, 1.6, .2]} /><meshStandardMaterial color="#111111" /></mesh></Canvas>;
}
