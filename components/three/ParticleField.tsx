"use client";
// ============================================================
// PARTICLEFIELD.TSX — v2
// Fixed: bufferAttribute usage for R3F v8+
// Fixed: FloatingOrb position type
// Added: adaptive particle count for performance
// ============================================================

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Particle cloud ─────────────────────────────────────────
function Particles({ count }: { count: number }) {
    const ref = useRef<THREE.Points>(null);
    const mouse = useRef({ x: 0, y: 0 });

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 22;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
            const t = Math.random();
            // Gradient from purple (#a855f7) to cyan (#22d3ee)
            col[i * 3] = 0.44 + t * 0.3;  // R
            col[i * 3 + 1] = 0.1 + t * 0.72; // G
            col[i * 3 + 2] = 0.65 + t * 0.3;  // B
        }
        return [pos, col];
    }, [count]);

    useEffect(() => {
        const onMouse = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", onMouse, { passive: true });
        return () => window.removeEventListener("mousemove", onMouse);
    }, []);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.elapsedTime;
        ref.current.rotation.y = t * 0.035 + mouse.current.x * 0.008;
        ref.current.rotation.x = t * 0.018 + mouse.current.y * 0.008;
    });

    const geo = useMemo(() => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        return g;
    }, [positions, colors]);

    return (
        <points ref={ref} geometry={geo}>
            <pointsMaterial
                size={0.032}
                vertexColors
                transparent
                opacity={0.75}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

// ── Floating soft orb ──────────────────────────────────────
function Orb({
    x, y, z, radius, color, speed,
}: {
    x: number; y: number; z: number; radius: number; color: string; speed: number;
}) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.elapsedTime * speed;
        ref.current.position.y = y + Math.sin(t) * 0.55;
        ref.current.position.x = x + Math.cos(t * 0.65) * 0.35;
    });
    return (
        <mesh ref={ref} position={[x, y, z]}>
            <sphereGeometry args={[radius, 12, 12]} />
            <meshBasicMaterial color={color} transparent opacity={0.12} />
        </mesh>
    );
}

// ── Exported canvas ────────────────────────────────────────
export default function ParticleField() {
    const count = typeof window !== "undefined" && window.innerWidth < 768 ? 700 : 2800;

    return (
        <Canvas
            camera={{ position: [0, 0, 5.5], fov: 58 }}
            style={{ position: "absolute", inset: 0, background: "transparent" }}
            dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1}
        >
            <Suspense fallback={null}>
                <Particles count={count} />
                <Orb x={-3.2} y={1.2} z={-2.5} radius={1.4} color="#a855f7" speed={0.38} />
                <Orb x={3.5} y={-1.0} z={-3.0} radius={0.9} color="#22d3ee" speed={0.48} />
                <Orb x={0.5} y={2.5} z={-4.0} radius={1.8} color="#7c3aed" speed={0.28} />
            </Suspense>
        </Canvas>
    );
}