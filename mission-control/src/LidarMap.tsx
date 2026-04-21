import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Generates a synthetic point cloud representing a terrain/environment
function PointCloud({ rotationSpeed }: { rotationSpeed: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = 20000;

  // Create a terrain-like structure
  const positions = useMemo(() => {
    // We use a simple seeded random to avoid purity issues in useMemo
    let seed = 1;
    const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Scatter points in a radius
      const r = random() * 20;
      const theta = random() * 2 * Math.PI;

      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);

      // Terrain height (y) using sine waves for bumps + some noise
      let y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 1.5;

      // Add some "obstacles" (taller clusters)
      if (random() > 0.98) {
          y += random() * 4 + 1;
      }

      // Add a central flat area for the robot
      if (r < 3) {
          y = random() * 0.2;
      }

      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [particleCount]);

  const colors = useMemo(() => {
      const arr = new Float32Array(particleCount * 3);
      for(let i=0; i < particleCount; i++) {
          const y = positions[i * 3 + 1];
          // Color based on height (intensity)
          const color = new THREE.Color();
          if (y > 2) color.setHex(0xef4444); // Red for high obstacles
          else if (y > 0.5) color.setHex(0xf59e0b); // Yellow for medium
          else color.setHex(0x10b981); // Green for floor/low

          // Add a subtle fade based on distance from center for a more realistic scanner look
          const distSq = positions[i*3]*positions[i*3] + positions[i*3+2]*positions[i*3+2];
          const fade = Math.max(0.1, 1 - distSq / 400); // 20^2

          arr[i*3] = color.r * fade;
          arr[i*3+1] = color.g * fade;
          arr[i*3+2] = color.b * fade;
      }
      return arr;
  }, [positions, particleCount]);


  // Simulate scanner sweep
  useFrame((_, delta) => {
    if (pointsRef.current) {
        pointsRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Represent the robot's position and scanning laser
function ScannerEffect() {
    const sweepRef = useRef<THREE.Mesh>(null);
    const coneRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (sweepRef.current) {
            sweepRef.current.rotation.y += delta * 5; // Fast spin
        }
        if (coneRef.current) {
            coneRef.current.rotation.y -= delta * 2;
        }
    });

    return (
        <group>
            {/* Robot Core Marker */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial color="#06b6d4" wireframe />
            </mesh>

            {/* Lidar Sweep Volume */}
            <mesh ref={sweepRef} position={[0, 0, 0]}>
                <cylinderGeometry args={[20, 20, 0.1, 32, 1, true, 0, Math.PI / 4]} />
                <meshBasicMaterial color="#10b981" transparent opacity={0.15} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* Secondary sweeping cone for visual depth */}
            <mesh ref={coneRef} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[20, 40, 32, 1, true, 0, Math.PI / 8]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.05} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    );
}

function CameraController({ viewMode }: { viewMode: string }) {
    const { camera } = useThree();
    const controlsRef = useRef<OrbitControlsImpl>(null);

    useEffect(() => {
        if (viewMode === 'top-down') {
            camera.position.set(0, 30, 0);
            camera.lookAt(0, 0, 0);
        } else if (viewMode === 'first-person') {
            camera.position.set(0, 1, 5);
            camera.lookAt(0, 0, -10);
        } else {
            // Free-cam / Default
            camera.position.set(10, 15, 10);
            camera.lookAt(0, 0, 0);
        }

        if (controlsRef.current) {
           controlsRef.current.target.set(0,0,0);
           controlsRef.current.update();
        }
    }, [viewMode, camera]);

    return (
      <OrbitControls
        ref={controlsRef}
        enablePan={viewMode === 'free'}
        enableZoom={true}
        enableRotate={viewMode === 'free'}
        maxDistance={40}
        minDistance={2}
      />
    );
}

export default function LidarMap() {
  const [viewMode, setViewMode] = useState('free');
  const [rotationSpeed, setRotationSpeed] = useState(0.1);

  return (
    <div className="w-full h-full relative bg-background font-mono rounded-2xl overflow-hidden">
        {/* Subtle radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-background to-background pointer-events-none" />

        <div className="absolute top-6 left-6 z-10 bg-surface/80 p-5 border border-surfaceHighlight rounded-xl text-xs text-textMuted backdrop-blur-md shadow-xl">
            <h3 className="text-primary-400 font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-glow-primary" />
                LIDAR TELEMETRY
            </h3>
            <div className="space-y-1">
                <p className="flex justify-between gap-4">POINTS: <span className="text-primary-400 font-bold">20,000</span></p>
                <p className="flex justify-between gap-4">SWEEP RATE: <span className="text-primary-400 font-bold">10Hz</span></p>
                <p className="flex justify-between gap-4">RANGE: <span className="text-primary-400 font-bold">20m</span></p>
                <p className="mt-2 text-textFaint">MODE: 3D SLAM Mapping</p>
            </div>

            <div className="mt-4 border-t border-surfaceHighlight pt-4">
               <h4 className="text-textMain font-bold mb-2">VIEW CONTROLS</h4>
               <div className="flex flex-col gap-2">
                 <button
                   onClick={() => setViewMode('free')}
                   className={`px-3 py-1.5 border rounded-lg text-left transition-colors ${viewMode === 'free' ? 'border-primary-500 text-primary-400 bg-primary-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)_inset]' : 'border-surfaceHighlight hover:border-textFaint'}`}
                 >
                   Free Camera
                 </button>
                 <button
                   onClick={() => setViewMode('top-down')}
                   className={`px-3 py-1.5 border rounded-lg text-left transition-colors ${viewMode === 'top-down' ? 'border-primary-500 text-primary-400 bg-primary-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)_inset]' : 'border-surfaceHighlight hover:border-textFaint'}`}
                 >
                   Top-Down View
                 </button>
                 <button
                   onClick={() => setViewMode('first-person')}
                   className={`px-3 py-1.5 border rounded-lg text-left transition-colors ${viewMode === 'first-person' ? 'border-primary-500 text-primary-400 bg-primary-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)_inset]' : 'border-surfaceHighlight hover:border-textFaint'}`}
                 >
                   First-Person View
                 </button>
               </div>
            </div>

            <div className="mt-4 border-t border-surfaceHighlight pt-4">
                <h4 className="text-textMain font-bold mb-2 flex justify-between">
                  <span>ROTATION</span>
                  <span className="text-primary-400">{rotationSpeed.toFixed(2)}x</span>
                </h4>
                <input
                  type="range"
                  min="-0.5"
                  max="0.5"
                  step="0.05"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                  className="w-full accent-primary-500 h-1.5 bg-surfaceHighlight rounded-lg appearance-none cursor-pointer"
                />
            </div>
        </div>

      <Canvas>
        <color attach="background" args={['#0a0a0c']} />

        <ScannerEffect />
        <PointCloud rotationSpeed={rotationSpeed} />
        <CameraController viewMode={viewMode} />

        {/* Helper grids with better styling */}
        <gridHelper args={[40, 40, '#064e3b', '#121216']} position={[0, -2, 0]} />
        <axesHelper args={[5]} />

        {/* Post Processing for glowing points */}
        <EffectComposer >
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={2.0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
