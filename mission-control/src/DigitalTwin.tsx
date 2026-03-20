import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, Line, Box, Sphere, MeshDistortMaterial, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';

// A conceptual representation of the GAPbot (Hexapod)
function GAPbot({ position = [0, 0, 0], rotation = [0, 0, 0] }: { position?: [number, number, number], rotation?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Subtle hovering and rotation animation
  useFrame((state) => {
    if (groupRef.current) {
       groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 0.5;
       // Slow rotation
       groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if(coreRef.current) {
        coreRef.current.rotation.x = state.clock.elapsedTime * 0.8;
        coreRef.current.rotation.z = state.clock.elapsedTime * 0.6;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          {/* Central Chassis / Main Body */}
          <Box args={[1.5, 0.4, 1]} castShadow receiveShadow>
            <meshStandardMaterial color="#1a1a1f" metalness={0.9} roughness={0.1} envMapIntensity={2} />
          </Box>

          {/* Top Dome / Lidar Array */}
          <Sphere args={[0.3, 32, 32]} position={[0, 0.35, 0]} castShadow>
             <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} wireframe transparent opacity={0.6} />
          </Sphere>

          {/* Energy Core (EcoMind processor representation) */}
          <Sphere ref={coreRef} args={[0.2, 32, 32]} position={[0, 0, 0]}>
            <MeshDistortMaterial color="#059669" emissive="#10b981" emissiveIntensity={4} distort={0.5} speed={5} roughness={0.2} metalness={0.8} />
          </Sphere>

          {/* 6 Legs (Abstract representation) */}
          {[
            [-0.8, -0.2, 0.6], [0, -0.2, 0.7], [0.8, -0.2, 0.6],
            [-0.8, -0.2, -0.6], [0, -0.2, -0.7], [0.8, -0.2, -0.6]
          ].map((pos, idx) => (
            <group key={idx} position={pos as [number, number, number]}>
               {/* Thigh */}
               <Box args={[0.1, 0.5, 0.1]} position={[0, -0.2, 0]} rotation={[0, 0, pos[0] > 0 ? -0.5 : 0.5]} castShadow>
                   <meshStandardMaterial color="#27272a" metalness={0.9} roughness={0.2} envMapIntensity={1.5} />
               </Box>
               {/* Calf */}
               <Box args={[0.05, 0.6, 0.05]} position={[pos[0] > 0 ? 0.2 : -0.2, -0.6, 0]} rotation={[0, 0, pos[0] > 0 ? 0.2 : -0.2]} castShadow>
                   <meshStandardMaterial color="#3f3f46" metalness={0.8} roughness={0.3} />
               </Box>
               {/* Foot Pad */}
                <Sphere args={[0.08, 16, 16]} position={[pos[0] > 0 ? 0.3 : -0.3, -0.9, 0]} castShadow>
                   <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={1.5} roughness={0.1} />
                </Sphere>
            </group>
          ))}

          {/* Sensor Array Lines */}
          <Line points={[[-0.75, 0.2, 0.5], [-1.5, 0.5, 1]]} color="#10b981" lineWidth={3} dashed dashScale={10} dashSize={0.5} dashOffset={0} />
          <Line points={[[0.75, 0.2, -0.5], [1.5, 0.5, -1]]} color="#10b981" lineWidth={3} dashed dashScale={10} dashSize={0.5} dashOffset={0} />
      </Float>
    </group>
  );
}

export default function DigitalTwin() {
  return (
    <div className="w-full h-full relative bg-background rounded-2xl overflow-hidden">
        <div className="absolute top-6 left-6 z-10 bg-surfaceHighlight/40 p-5 rounded-2xl border border-white/5 backdrop-blur-xl shadow-2xl">
            <h3 className="text-primary-400 font-bold mb-3 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shadow-glow-primary animate-pulse" />
                Live Twin Status
            </h3>
            <div className="space-y-2 text-xs text-textMuted font-mono">
                <p className="flex justify-between gap-8 border-b border-surfaceHighlight pb-1">Status: <span className="text-primary-400 font-bold">NOMINAL</span></p>
                <p className="flex justify-between gap-8 border-b border-surfaceHighlight pb-1">Mode: <span className="text-textMain">Autonomy V3</span></p>
                <p className="flex justify-between gap-8 border-b border-surfaceHighlight pb-1">Posture: <span className="text-textMain">Defensive C-2</span></p>
                <p className="flex justify-between gap-8 pb-1">Actuators: <span className="text-primary-400">18/18 O/L</span></p>
            </div>
        </div>

      <Canvas shadows camera={{ position: [6, 4, 8], fov: 35 }}>
        <color attach="background" args={['#0a0a0c']} />

        <fog attach="fog" args={['#0a0a0c', 10, 30]} />

        {/* Cinematic Lighting */}
        <ambientLight intensity={0.4} />
        <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={10} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} color="#10b981" />
        <pointLight position={[-5, 5, -5]} intensity={5} color="#06b6d4" />
        <rectAreaLight width={5} height={5} color="#10b981" intensity={5} position={[0, -2, 0]} lookAt={[0, 0, 0]} />

        {/* The Robot */}
        <GAPbot />

        {/* Realistic Ground Shadows */}
        <ContactShadows position={[0, -0.5, 0]} opacity={0.8} scale={10} blur={2} far={4} color="#000000" />

        {/* Environment Grid */}
        <Grid
          infiniteGrid
          fadeDistance={25}
          sectionColor="#064e3b"
          cellColor="#121216"
          sectionSize={2}
          cellSize={0.5}
          sectionThickness={1.5}
          cellThickness={0.5}
          position={[0, -0.5, 0]}
        />

        <Environment preset="studio" environmentIntensity={0.5} background blur={0.8} />

        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2 - 0.05}
          autoRotate
          autoRotateSpeed={0.8}
          enableDamping
          dampingFactor={0.05}
        />

        {/* Post Processing for Cinematic Look */}
        <EffectComposer  multisampling={4}>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
            <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

      </Canvas>
    </div>
  );
}
