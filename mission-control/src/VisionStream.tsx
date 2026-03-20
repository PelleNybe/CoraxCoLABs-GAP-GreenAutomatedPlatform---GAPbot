import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock detections
const DETECTIONS = [
  { class: 'Person', conf: 0.98, color: '#10b981', type: 'biological', threatLevel: 'low', action: 'monitor' },
  { class: 'Obstacle', conf: 0.85, color: '#f59e0b', type: 'physical', threatLevel: 'medium', action: 'avoid' },
  { class: 'Plant (Healthy)', conf: 0.92, color: '#3b82f6', type: 'biological', threatLevel: 'none', action: 'log' },
  { class: 'Weed', conf: 0.78, color: '#ef4444', type: 'biological', threatLevel: 'high', action: 'eliminate' },
  { class: 'Tool', conf: 0.65, color: '#8b5cf6', type: 'physical', threatLevel: 'none', action: 'ignore' }
];

export default function VisionStream() {
  const [boxes, setBoxes] = useState<{id:string;class:string;conf:number;color:string;type:string;x:number;y:number;w:number;h:number;threatLevel:string;action:string}[]>([]);
  const [selectedBox, setSelectedBox] = useState<{id:string;class:string;conf:number;color:string;type:string;x:number;y:number;w:number;h:number;threatLevel:string;action:string} | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Simulate real-time stream processing
  useEffect(() => {
    if (isPaused) return;

    const generateBoxes = () => {
      // Keep selected box if it exists, otherwise regenerate all
      let newBoxes = selectedBox ? [selectedBox] : [];

      const numBoxes = Math.floor(Math.random() * 3) + (selectedBox ? 0 : 1);

      for (let i = 0; i < numBoxes; i++) {
        const detection = DETECTIONS[Math.floor(Math.random() * DETECTIONS.length)];
        // Add slightly wandering coordinates
        newBoxes.push({
          id: Math.random().toString(),
          ...detection,
          x: Math.random() * 60 + 10, // 10% to 70% width
          y: Math.random() * 60 + 10, // 10% to 70% height
          w: Math.random() * 20 + 10,
          h: Math.random() * 20 + 10,
        });
      }

      // If we have a selected box, jitter its position slightly to simulate tracking
      if (selectedBox) {
         newBoxes = newBoxes.map(b => {
             if (b.id === selectedBox.id) {
                 return {
                     ...b,
                     x: b.x + (Math.random() - 0.5) * 2,
                     y: b.y + (Math.random() - 0.5) * 2
                 }
             }
             return b;
         });
         setSelectedBox(newBoxes.find(b => b.id === selectedBox.id) || null);
      }

      setBoxes(newBoxes);
    };

    const interval = setInterval(generateBoxes, 800);
    generateBoxes();
    return () => clearInterval(interval);
  }, [isPaused, selectedBox]);

  const handleBoxClick = (box: {id:string;class:string;conf:number;color:string;type:string;x:number;y:number;w:number;h:number;threatLevel:string;action:string}) => {
      if (selectedBox && selectedBox.id === box.id) {
          setSelectedBox(null);
          setIsPaused(false);
      } else {
          setSelectedBox(box);
          setIsPaused(true); // Pause stream when inspecting
      }
  };

  return (
    <div className="w-full h-full relative bg-zinc-950 flex font-mono overflow-hidden">

      {/* Main Video Stream Area */}
      <div className="flex-1 relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1599059021750-82716ae2b661?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex flex-col">
        {/* Overlay for cinematic effect */}
        <div className="absolute inset-0 bg-black/40 backdrop-grayscale-[0.5]" />

        {/* Scan line effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 pointer-events-none mix-blend-overlay" />

        {!isPaused && (
            <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-0 h-[20%] bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent pointer-events-none"
            />
        )}

        {/* Header Overlay */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-zinc-950 to-transparent z-20 flex justify-between items-center px-6 pointer-events-none">
            <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-bold tracking-widest text-sm">ECO-MIND / YOLOv8 INFERENCE</span>
                <span className={`px-2 py-0.5 rounded text-xs border ${isPaused ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
                    {isPaused ? 'PAUSED' : '30 FPS'}
                </span>
                <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-xs border border-zinc-700">HAILO-8L NPU</span>
            </div>
            <div className="text-zinc-500 text-xs text-right">
            LATENCY: {isPaused ? '--' : '12'}ms<br/>
            CONFIDENCE THRESHOLD: 0.60
            </div>
        </div>

        {/* Bounding Boxes */}
        {boxes.map((box) => (
          <motion.div
            key={box.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleBoxClick(box)}
            className={`absolute border-2 flex flex-col justify-start cursor-pointer transition-colors ${selectedBox && selectedBox.id !== box.id ? 'opacity-30' : 'opacity-100 z-30'}`}
            style={{
              left: `${box.x}%`,
              top: `${box.y}%`,
              width: `${box.w}%`,
              height: `${box.h}%`,
              borderColor: selectedBox?.id === box.id ? '#ffffff' : box.color,
              boxShadow: selectedBox?.id === box.id ? `0 0 15px ${box.color}80, 0 0 15px ${box.color}80 inset` : `0 0 10px ${box.color}40 inset, 0 0 10px ${box.color}40`
            }}
          >
            {/* Box Label */}
            <div
                className="absolute -top-6 left-[-2px] px-2 py-1 text-[10px] font-bold text-white whitespace-nowrap flex items-center gap-2"
                style={{ backgroundColor: selectedBox?.id === box.id ? '#ffffff' : box.color, color: selectedBox?.id === box.id ? '#000000' : '#ffffff' }}
            >
              <span className="uppercase">{box.class}</span>
              <span>{(box.conf * 100).toFixed(0)}%</span>
            </div>

            {/* Crosshairs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" style={{ border: `1px solid ${selectedBox?.id === box.id ? '#ffffff' : box.color}` }}>
                <div className="absolute top-1/2 left-0 w-full h-[1px]" style={{ backgroundColor: selectedBox?.id === box.id ? '#ffffff' : box.color }} />
                <div className="absolute left-1/2 top-0 h-full w-[1px]" style={{ backgroundColor: selectedBox?.id === box.id ? '#ffffff' : box.color }} />
            </div>
          </motion.div>
        ))}

        {/* Footer Info Bar */}
        <div className="mt-auto h-12 bg-zinc-900 border-t border-zinc-800 flex items-center px-4 text-xs z-20 justify-between text-zinc-400">
            <div className="flex gap-6">
                <span>RES: 1920x1080</span>
                <span>ENCODER: H.265</span>
                <span>MODEL: ecomind-v2-nano.pt</span>
            </div>
            <div className="flex gap-2 items-center">
                <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
                {isPaused ? 'STREAM PAUSED' : 'RECORDING'}
            </div>
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
          {selectedBox && (
              <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 320, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="bg-zinc-900 border-l border-zinc-800 z-30 flex flex-col overflow-hidden"
              >
                  <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
                      <h3 className="text-zinc-100 font-bold flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedBox.color }} />
                          TARGET LOCKED
                      </h3>
                      <button onClick={() => { setSelectedBox(null); setIsPaused(false); }} className="text-zinc-500 hover:text-white">✕</button>
                  </div>

                  <div className="p-4 space-y-6 overflow-y-auto">
                      {/* Classification Info */}
                      <div>
                          <div className="text-xs text-zinc-500 mb-1">CLASSIFICATION</div>
                          <div className="text-2xl font-bold uppercase" style={{ color: selectedBox.color }}>{selectedBox.class}</div>
                          <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-zinc-400">CONFIDENCE:</span>
                              <span className="text-lg font-bold text-zinc-200">{(selectedBox.conf * 100).toFixed(1)}%</span>
                          </div>
                           <div className="w-full h-1 bg-zinc-800 rounded overflow-hidden mt-1">
                               <div className="h-full" style={{ width: `${selectedBox.conf * 100}%`, backgroundColor: selectedBox.color }} />
                           </div>
                      </div>

                      {/* AI Assessment */}
                      <div className="space-y-3 bg-zinc-950 p-3 rounded border border-zinc-800/50">
                          <div className="flex justify-between text-xs">
                              <span className="text-zinc-500">TYPE</span>
                              <span className="uppercase text-zinc-300">{selectedBox.type}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                              <span className="text-zinc-500">THREAT LEVEL</span>
                              <span className="uppercase font-bold" style={{
                                  color: selectedBox.threatLevel === 'high' ? '#ef4444' :
                                         selectedBox.threatLevel === 'medium' ? '#f59e0b' :
                                         selectedBox.threatLevel === 'low' ? '#10b981' : '#71717a'
                              }}>{selectedBox.threatLevel}</span>
                          </div>
                          <div className="flex justify-between text-xs border-t border-zinc-800 pt-2">
                              <span className="text-zinc-500">RECOMMENDED ACTION</span>
                              <span className="uppercase text-emerald-400">{selectedBox.action}</span>
                          </div>
                      </div>

                      {/* Spatial Data */}
                      <div>
                          <div className="text-xs text-zinc-500 mb-2">SPATIAL COORDINATES (REL)</div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 font-mono">
                              <div className="bg-zinc-950 p-2 rounded border border-zinc-800">X: {selectedBox.x.toFixed(2)}</div>
                              <div className="bg-zinc-950 p-2 rounded border border-zinc-800">Y: {selectedBox.y.toFixed(2)}</div>
                              <div className="bg-zinc-950 p-2 rounded border border-zinc-800">W: {selectedBox.w.toFixed(2)}</div>
                              <div className="bg-zinc-950 p-2 rounded border border-zinc-800">H: {selectedBox.h.toFixed(2)}</div>
                          </div>
                      </div>

                      {/* Tracking ID */}
                      <div className="pt-4 border-t border-zinc-800">
                           <div className="text-xs text-zinc-500 mb-1">TRACKING ID</div>
                           <div className="text-xs text-zinc-300 font-mono break-all">{selectedBox.id}</div>
                      </div>

                      <button className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-xs transition-colors">
                          EXECUTE ACTION ({selectedBox.action.toUpperCase()})
                      </button>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>

    </div>
  );
}
