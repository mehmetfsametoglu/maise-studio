"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { CupMesh } from "@/components/cup-mesh";
import type { BizKey } from "@/lib/config-data";

function ClinicDrop({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, -0.05, 0]} scale={[1, 1.25, 1]}>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshPhysicalMaterial color={color} roughness={0.15} clearcoat={1} metalness={0.05} transmission={0.15} thickness={0.6} />
      </mesh>
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.14, 0.2, 0.32, 24]} />
        <meshPhysicalMaterial color={"#f1e6d3"} roughness={0.3} clearcoat={0.6} />
      </mesh>
    </group>
  );
}

function HotelGem({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });
  return (
    <group ref={ref}>
      <mesh rotation={[0.3, 0, 0.15]}>
        <icosahedronGeometry args={[0.68, 0]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.55}
          clearcoat={1}
          clearcoatRoughness={0.1}
          flatShading
        />
      </mesh>
    </group>
  );
}

function CafeCup({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.32;
  });
  return (
    <group ref={ref} scale={0.85}>
      <CupMesh withSaucer steam />
      <pointLight position={[0, 0.5, 1]} intensity={0.3} color={color} />
    </group>
  );
}

export function PreviewObject({ biz, accent }: { biz: BizKey; accent: string }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2} color={"#ffe3bb"} />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color={accent} />
      <pointLight position={[0, 0, 3]} intensity={0.6} color={"#ffffff"} />

      <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.7}>
        {biz === "cafe" && <CafeCup color={accent} />}
        {biz === "clinic" && <ClinicDrop color={accent} />}
        {biz === "hotel" && <HotelGem color={accent} />}
      </Float>
    </>
  );
}
