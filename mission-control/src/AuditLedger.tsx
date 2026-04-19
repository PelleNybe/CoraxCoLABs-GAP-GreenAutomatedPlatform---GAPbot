import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// synthetic Ledger Events
const EVENT_TYPES = [
    { type: 'SENSOR_READING', severity: 'info', icon: '📡' },
    { type: 'OBJECT_DETECTED', severity: 'warn', icon: '👁️' },
    { type: 'KINEMATICS_ADJUST', severity: 'info', icon: '🦾' },
    { type: 'PATH_RECALCULATION', severity: 'warn', icon: '🗺️' },
    { type: 'SYSTEM_SYNC', severity: 'success', icon: '☁️' },
    { type: 'EDGE_INFERENCE', severity: 'info', icon: '🧠' },
    { type: 'COLLISION_AVOIDANCE', severity: 'critical', icon: '⚠️' }
];

interface LogEntry {
    id: string;
    timestamp: string;
    type: string;
    severity: string;
    icon: string;
    hash: string;
    payload: string;
}

const generateHash = () => {
    return Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

export default function AuditLedger() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Auto-scroll to bottom unless paused
  useEffect(() => {
      if(!isPaused && containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
  }, [logs, isPaused]);

  // Simulate incoming secured ledger entries
  useEffect(() => {
    const addLog = () => {
      if (isPaused) return;

      const event = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
      const newLog: LogEntry = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        type: event.type,
        severity: event.severity,
        icon: event.icon,
        hash: generateHash(),
        payload: `[DATA_PACKET_${Math.floor(Math.random() * 9999)}] Size: ${Math.floor(Math.random() * 512)}KB | Sig: Valid`
      };

      setLogs((prev) => [...prev.slice(-49), newLog]); // Keep max 50 logs for performance
    };

    const interval = setInterval(addLog, 1200); // New log every 1.2s

    // Initial burst
    for(let i=0; i<10; i++) addLog();

    return () => clearInterval(interval);
  }, [isPaused]);


  const getSeverityStyle = (severity: string) => {
      switch(severity) {
          case 'success': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
          case 'warn': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
          case 'critical': return 'text-rose-500 bg-rose-500/10 border-rose-500/20 font-bold';
          case 'info':
          default: return 'text-zinc-300 bg-zinc-800/30 border-zinc-700/50';
      }
  }

  const filteredLogs = logs.filter(log => {
      const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
      const matchesSearch = log.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            log.payload.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            log.hash.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSeverity && matchesSearch;
  });

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col font-mono text-sm relative">
        {/* Header Bar */}
        <div className="h-14 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between px-6 z-10 shrink-0 backdrop-blur">
            <div className="flex items-center gap-4">
                <h3 className="text-zinc-100 font-bold tracking-widest flex items-center gap-2">
                    <span className="text-emerald-500">🕸️ IMMUTABLE LEDGER</span>
                </h3>
                <span className="text-zinc-500 text-xs px-2 py-0.5 border border-zinc-700 rounded bg-zinc-800">
                    NETWORK: <span className="text-zinc-300">GAP-PRIVATE-NET</span>
                </span>
            </div>

            <div className="flex items-center gap-4">
                 <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`px-3 py-1 rounded text-xs transition-colors border ${
                        isPaused ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                    }`}
                 >
                    {isPaused ? '▶️ RESUME STREAM' : '⏸️ PAUSE STREAM'}
                 </button>
                 <div className="flex items-center gap-2 text-xs text-zinc-400">
                     NODE STATUS
                     <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
                 </div>
            </div>
        </div>

        {/* Filter Bar */}
        <div className="h-12 border-b border-zinc-800 bg-zinc-900/50 flex items-center px-6 gap-4 z-10 shrink-0 backdrop-blur text-xs">
            <div className="flex items-center gap-2">
                <span className="text-zinc-500">SEVERITY:</span>
                <select
                    className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded px-2 py-1 outline-none focus:border-emerald-500"
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                >
                    <option value="all">ALL</option>
                    <option value="info">INFO</option>
                    <option value="success">SUCCESS</option>
                    <option value="warn">WARN</option>
                    <option value="critical">CRITICAL</option>
                </select>
            </div>

            <div className="flex-1 flex items-center gap-2">
                <span className="text-zinc-500">SEARCH:</span>
                <input
                    type="text"
                    placeholder="Filter logs by type, payload, or hash..."
                    className="w-full max-w-md bg-zinc-950 border border-zinc-800 text-zinc-300 rounded px-3 py-1 outline-none focus:border-emerald-500 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="text-zinc-500">
                MATCHES: <span className="text-emerald-400">{filteredLogs.length}</span> / {logs.length}
            </div>
        </div>

        {/* Matrix Rain / Cryptographic overlay effect */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-overlay" />

        {/* Log Stream Container */}
        <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-4 space-y-2 relative z-0 scroll-smooth"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#3f3f46 #18181b' }}
        >
            <AnimatePresence initial={false}>
                {filteredLogs.map((log) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={`flex flex-col border rounded p-3 gap-2 backdrop-blur-sm ${getSeverityStyle(log.severity)}`}
                    >
                        {/* Top row: Icon, Type, Time */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{log.icon}</span>
                                <span className="font-bold tracking-wider">{log.type}</span>
                            </div>
                            <span className="text-xs font-mono opacity-70">{log.timestamp}</span>
                        </div>

                        {/* Middle row: Payload */}
                        <div className="pl-8 text-xs font-mono opacity-90 break-words">
                            &gt; {log.payload}
                        </div>

                        {/* Bottom row: Cryptographic Hash */}
                        <div className="pl-8 mt-1 pt-2 border-t border-inherit flex items-center gap-2 opacity-60">
                            <span className="text-[10px] uppercase font-bold shrink-0">TX_HASH:</span>
                            <span className="text-[10px] truncate select-all">{log.hash}</span>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {!isPaused && filteredLogs.length === logs.length && (
                 <div className="py-2 text-center text-xs text-emerald-500/50 animate-pulse">
                     WAITING FOR NEXT BLOCK...
                 </div>
            )}
        </div>

         {/* Footer status */}
         <div className="h-8 bg-zinc-900 border-t border-zinc-800 flex items-center px-4 text-[10px] justify-between text-zinc-500 shrink-0">
             <span>LATEST BLOCK: {logs.length > 0 ? logs[logs.length-1].id.toUpperCase() : '---'}</span>
             <span>CRYPTOGRAPHIC SIGNATURES: VERIFIED</span>
             <span>CONSENSUS: REACHED (12/12 NODES)</span>
         </div>
    </div>
  );
}
