"use client";

import * as THREE from "three";
import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const CERAMIC = "#f1e6d3";
const COFFEE = "#2c1a10";
const COPPER = "#c8934e";

export const CupMesh = forwardRef<
  THREE.Group,
  {
    hovered?: boolean;
    withSaucer?: boolean;
    steam?: boolean;
    onClick?: (e: any) => void;
    onPointerOver?: () => void;
    onPointerOut?: () => void;
  }
>(function CupMesh(
  { hovered, withSaucer = true, steam = false, onClick, onPointerOver, onPointerOut },
  ref,
) {
  const steamRefs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    if (!steam) return;
    const t = clock.getElapsedTime();
    steamRefs.current.forEach((m, i) => {
      if (!m) return;
      const phase = t * 0.6 + i * 2.1;
      m.position.y = 0.62 + ((phase * 0.15) % 0.9);
      m.position.x = Math.sin(phase * 1.3) * 0.06;
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.22 - ((phase * 0.15) % 0.9) * 0.24);
    });
  });

  return (
    <group
      ref={ref}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* body */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.56, 0.44, 1.05, 48, 1, true]} />
        <meshPhysicalMaterial
          color={CERAMIC}
          roughness={0.32}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
          side={THREE.DoubleSide}
          emissive={hovered ? COPPER : "#000000"}
          emissiveIntensity={hovered ? 0.12 : 0}
        />
      </mesh>

      {/* rim */}
      <mesh position={[0, 0.42, 0]}>
        <torusGeometry args={[0.565, 0.03, 20, 48]} />
        <meshPhysicalMaterial color={CERAMIC} roughness={0.3} clearcoat={0.7} />
      </mesh>

      {/* coffee surface */}
      <mesh position={[0, 0.43, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.54, 48]} />
        <meshPhysicalMaterial color={COFFEE} roughness={0.15} clearcoat={1} />
      </mesh>

      {/* base */}
      <mesh position={[0, -0.63, 0]}>
        <cylinderGeometry args={[0.44, 0.4, 0.06, 48]} />
        <meshPhysicalMaterial color={CERAMIC} roughness={0.32} clearcoat={0.5} />
      </mesh>

      {/* handle */}
      <mesh position={[0.65, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.25, 0.065, 20, 40, Math.PI * 1.3]} />
        <meshPhysicalMaterial color={CERAMIC} roughness={0.32} clearcoat={0.5} />
      </mesh>

      {withSaucer && (
        <mesh position={[0, -0.68, 0]}>
          <cylinderGeometry args={[0.6, 0.62, 0.04, 56]} />
          <meshPhysicalMaterial color={CERAMIC} roughness={0.35} clearcoat={0.5} />
        </mesh>
      )}

      {steam &&
        [0, 1, 2].map((i) => (
          <mesh
            key={i}
            ref={(m) => {
              if (m) steamRefs.current[i] = m;
            }}
            position={[0, 0.6, 0]}
          >
            <planeGeometry args={[0.14, 0.4]} />
            <meshBasicMaterial
              color={"#f1e6d3"}
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>
        ))}
    </group>
  );
});
