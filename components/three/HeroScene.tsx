"use client";
// ============================================================
// HEROSCENE.TSX — v3
// Fix: WebGL context loss handled (THREE.WebGLRenderer: Context Lost)
// Fix: reduced geometry complexity for mobile perf
// Fix: proper cleanup on unmount
// ============================================================

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Shared mouse ref
function useMouse() {
    const ref = useRef({ x: 0, y: 0 });
    useEffect(() => {
        const fn = (e: MouseEvent) => {
            ref.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
            ref.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", fn, { passive: true });
        return () => window.removeEventListener("mousemove", fn);
    }, []);
    return ref;
}

// ── Torus knot ────────────────────────────────────────────
function TorusKnot({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
    const solidRef    = useRef<THREE.Mesh>(null);
    const wireRef     = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        const rx = t * 0.18 + mouse.current.y * 0.12;
        const ry = t * 0.26 + mouse.current.x * 0.12;
        if (solidRef.current) { solidRef.current.rotation.x = rx; solidRef.current.rotation.y = ry; }
        if (wireRef.current)  { wireRef.current.rotation.x  = rx; wireRef.current.rotation.y  = ry; }
    });

    // Fewer segments on mobile for performance
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const segs     = isMobile ? [100, 16] : [160, 20];

    return (
        <group position={[2.2, 0, -1.5]}>
            {/* Solid purple */}
            <mesh ref={solidRef}>
                <torusKnotGeometry args={[1.0, 0.32, segs[0], segs[1], 2, 3]} />
                <meshStandardMaterial
                    color="#6d28d9"
                    emissive="#3b0764"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.6}
                    roughness={0.3}
                    metalness={0.4}
                />
            </mesh>
            {/* Wireframe overlay */}
            <mesh ref={wireRef}>
                <torusKnotGeometry args={[1.0, 0.32, segs[0], segs[1], 2, 3]} />
                <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.15} />
            </mesh>
        </group>
    );
}

// ── Orbiting sphere companions ─────────────────────────────
function Orb({ r, speed, offset, color, size }: {
    r: number; speed: number; offset: number; color: string; size: number;
}) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.elapsedTime * speed + offset;
        ref.current.position.x = 2.2 + Math.cos(t) * r;
        ref.current.position.y = Math.sin(t) * r * 0.55;
        ref.current.position.z = -1.5 + Math.sin(t * 0.65) * 0.4;
    });
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[size, 10, 10]} />
            <meshBasicMaterial color={color} transparent opacity={0.75} />
        </mesh>
    );
}

// ── Particle cloud ────────────────────────────────────────
function Particles({ count, mouse }: {
    count: number;
    mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
    const ref = useRef<THREE.Points>(null);

    const geo = useMemo(() => {
        const g   = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3]     = (Math.random() - 0.5) * 24;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
            const t        = Math.random();
            col[i * 3]     = 0.42 + t * 0.35;
            col[i * 3 + 1] = 0.08 + t * 0.72;
            col[i * 3 + 2] = 0.65 + t * 0.32;
        }
        g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        g.setAttribute("color",    new THREE.BufferAttribute(col, 3));
        return g;
    }, [count]);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.elapsedTime;
        ref.current.rotation.y = t * 0.025 + mouse.current.x * 0.005;
        ref.current.rotation.x = t * 0.012 + mouse.current.y * 0.005;
    });

    return (
        <points ref={ref} geometry={geo}>
            <pointsMaterial size={0.03} vertexColors transparent opacity={0.6} sizeAttenuation depthWrite={false} />
        </points>
    );
}

// ── WebGL context loss recovery ───────────────────────────
function ContextHandler() {
    const { gl } = useThree();
    useEffect(() => {
        const canvas = gl.domElement;
        const onLost = (e: Event) => {
            e.preventDefault();
            console.warn("[Three.js] WebGL context lost — will restore");
        };
        const onRestored = () => {
            console.info("[Three.js] WebGL context restored");
        };
        canvas.addEventListener("webglcontextlost",     onLost,     false);
        canvas.addEventListener("webglcontextrestored", onRestored, false);
        return () => {
            canvas.removeEventListener("webglcontextlost",     onLost);
            canvas.removeEventListener("webglcontextrestored", onRestored);
        };
    }, [gl]);
    return null;
}

// ── Main Canvas export ─────────────────────────────────────
export default function HeroScene() {
    const mouse  = useMouse();
    const mobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count  = mobile ? 500 : 2200;

    return (
        <Canvas
            camera={{ position: [0, 0, 6.5], fov: 58 }}
            style={{ position: "absolute", inset: 0, background: "transparent" }}
            dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)}
            // powerPreference: high-performance helps prevent context loss
            gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
            frameloop="always"
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[4, 4, 4]}   intensity={1.2} color="#a855f7" />
            <pointLight position={[-4, -3, 3]} intensity={0.7} color="#22d3ee" />

            <Suspense fallback={null}>
                <ContextHandler />
                <Particles count={count} mouse={mouse} />
                <TorusKnot   mouse={mouse} />
                <Orb r={1.85} speed={0.72} offset={0}   color="#a855f7" size={0.11} />
                <Orb r={2.25} speed={0.52} offset={2.1} color="#22d3ee" size={0.08} />
                <Orb r={1.6}  speed={0.88} offset={4.3} color="#c084fc" size={0.07} />
            </Suspense>
        </Canvas>
    );
}
