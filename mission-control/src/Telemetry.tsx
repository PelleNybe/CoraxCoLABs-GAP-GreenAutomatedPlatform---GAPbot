import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Battery, Cpu, Zap, Wifi, Activity } from 'lucide-react';

// Mock Data Generators
const genNoise = (base: number, variance: number) => base + (Math.random() - 0.5) * variance;

export default function Telemetry() {
  const [data, setData] = useState({
    cpuTemp: 45,
    npuTemp: 55,
    battery: 88,
    speed: 1.2,
    servos: Array.from({ length: 18 }, (_, i) => ({ id: i, load: 0, temp: 30, angle: 90 })),
    network: { ping: 12, tx: 0, rx: 0 }
  });

  const [historyData, setHistoryData] = useState<{time: string, cpuTemp: number, npuTemp: number, battery: number}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = {
          ...prev,
          cpuTemp: genNoise(48, 4),
          npuTemp: genNoise(62, 8),
          battery: Math.max(0, prev.battery - 0.01),
          speed: Math.max(0, genNoise(1.5, 0.5)),
          network: { ping: genNoise(15, 5), tx: genNoise(250, 100), rx: genNoise(150, 50) },
          servos: prev.servos.map(s => ({
              ...s,
              load: genNoise(40, 30),
              temp: genNoise(35, 5),
              angle: genNoise(90, 45)
          }))
        };

        setHistoryData(hPrev => {
            const newHistory = [...hPrev, {
                time: new Date().toLocaleTimeString().split(' ')[0], // HH:MM:SS
                cpuTemp: newData.cpuTemp,
                npuTemp: newData.npuTemp,
                battery: newData.battery
            }];
            return newHistory.slice(-50); // Keep last 50 points
        });

        return newData;
      });
    }, 500); // 2Hz Update Rate

    return () => clearInterval(interval);
  }, []);

  // Helper for conditional styling
  const getStatusColor = (val: number, warn: number, crit: number) => {
      if (val >= crit) return 'text-status-critical shadow-glow-critical';
      if (val >= warn) return 'text-status-warn';
      return 'text-status-success';
  };

  const getBarColor = (val: number, warn: number, crit: number) => {
    if (val >= crit) return 'bg-status-critical';
    if (val >= warn) return 'bg-status-warn';
    return 'bg-status-success';
  }

  return (
    <div className="w-full h-full p-6 bg-background text-textMain font-mono flex flex-col gap-6 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>

        {/* Core Systems Grid */}
        <div className="grid grid-cols-4 gap-6">
            {/* Battery */}
            <div className="col-span-1 border border-surfaceHighlight bg-surface/80 p-5 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-xs text-textMuted uppercase font-bold tracking-wider">Primary Cell</span>
                   <Battery className={`w-5 h-5 ${getStatusColor(100-data.battery, 60, 80)}`} />
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                    <span className={`text-4xl font-bold ${getStatusColor(100-data.battery, 60, 80)} tracking-tighter`}>
                        {data.battery.toFixed(1)}<span className="text-2xl">%</span>
                    </span>
                </div>
                <div className="text-textFaint mt-1 text-xs">24V LiPo Array</div>
                {/* Visual Bar */}
                <div className="w-full h-2 bg-surfaceHighlight rounded-full mt-4 overflow-hidden ring-1 ring-white/5">
                    <motion.div
                        className={`h-full ${getBarColor(100-data.battery, 60, 80)}`}
                        animate={{ width: `${data.battery}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                </div>
                <div className="absolute -bottom-6 -right-6 opacity-5">
                    <Battery className="w-32 h-32" />
                </div>
            </div>

            {/* RPi 5 CPU */}
            <div className="col-span-1 border border-surfaceHighlight bg-surface/80 p-5 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-xs text-textMuted uppercase font-bold tracking-wider">Core Temp</span>
                   <Cpu className={`w-5 h-5 ${getStatusColor(data.cpuTemp, 70, 85)}`} />
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                    <span className={`text-4xl font-bold ${getStatusColor(data.cpuTemp, 70, 85)} tracking-tighter`}>
                        {data.cpuTemp.toFixed(1)}<span className="text-2xl">°</span>
                    </span>
                </div>
                <div className="text-textFaint mt-1 text-xs">Raspberry Pi 5</div>
                 <div className="w-full h-2 bg-surfaceHighlight rounded-full mt-4 overflow-hidden ring-1 ring-white/5">
                    <motion.div
                        className={`h-full ${getBarColor(data.cpuTemp, 70, 85)}`}
                        animate={{ width: `${(data.cpuTemp / 100) * 100}%` }}
                    />
                </div>
                <div className="absolute -bottom-6 -right-6 opacity-5">
                    <Cpu className="w-32 h-32" />
                </div>
            </div>

            {/* Hailo-8L NPU */}
            <div className="col-span-1 border border-surfaceHighlight bg-surface/80 p-5 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start mb-2 relative z-10">
                   <span className="text-xs text-textMuted uppercase font-bold tracking-wider">NPU Temp</span>
                   <Zap className={`w-5 h-5 ${getStatusColor(data.npuTemp, 80, 95)}`} />
                </div>
                 <div className="flex items-baseline gap-2 mt-2 relative z-10">
                    <span className={`text-4xl font-bold ${getStatusColor(data.npuTemp, 80, 95)} tracking-tighter`}>
                        {data.npuTemp.toFixed(1)}<span className="text-2xl">°</span>
                    </span>
                </div>
                <div className="text-textFaint mt-1 text-xs relative z-10">Hailo-8L (PCIe)</div>
                 <div className="w-full h-2 bg-surfaceHighlight rounded-full mt-4 overflow-hidden relative z-10 ring-1 ring-white/5">
                    <motion.div
                        className={`h-full ${getBarColor(data.npuTemp, 80, 95)}`}
                        animate={{ width: `${(data.npuTemp / 120) * 100}%` }}
                    />
                </div>
                {/* Background pulse if hot */}
                {data.npuTemp > 80 && <div className="absolute inset-0 bg-status-warn/10 animate-pulse z-0" />}
                <div className="absolute -bottom-6 -right-6 opacity-5 z-0">
                    <Zap className="w-32 h-32" />
                </div>
            </div>

            {/* Network / MQTT */}
            <div className="col-span-1 border border-surfaceHighlight bg-surface/80 p-5 rounded-2xl flex flex-col justify-between shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-textMuted uppercase font-bold tracking-wider">Telemetry Link</span>
                    <Wifi className="w-5 h-5 text-primary-400" />
                </div>
                <div className="flex items-center gap-2 text-xs text-textFaint mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-glow-primary" />
                    CONNECTED (MQTT)
                </div>
                <div className="mt-auto space-y-2 text-sm font-mono text-textMuted">
                    <div className="flex justify-between items-end border-b border-surfaceHighlight pb-1">
                        <span className="text-xs">LATENCY</span>
                        <span className="text-primary-400 font-bold">{data.network.ping.toFixed(0)}ms</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-surfaceHighlight pb-1">
                        <span className="text-xs">UPLINK</span>
                        <span className="font-bold">{data.network.tx.toFixed(0)} kbps</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-xs">DOWNLINK</span>
                        <span className="font-bold">{data.network.rx.toFixed(0)} kbps</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Chart and Kinematics Container */}
        <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
            {/* Historical Data Chart */}
            <div className="col-span-2 border border-surfaceHighlight bg-surface/50 rounded-2xl p-5 flex flex-col shadow-lg">
                <h3 className="text-textMain font-bold tracking-widest text-sm mb-6 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary-400" />
                    SYSTEM VITALS HISTORY
                </h3>
                <div className="flex-1 min-h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historyData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1f" vertical={false} />
                            <XAxis dataKey="time" stroke="#52525b" fontSize={10} tickMargin={10} axisLine={false} tickLine={false} />
                            <YAxis stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#121216', borderColor: '#1a1a1f', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                itemStyle={{ color: '#e4e4e7' }}
                            />
                            <Line type="monotone" dataKey="cpuTemp" stroke="#06b6d4" strokeWidth={2} dot={false} name="CPU Temp (°C)" />
                            <Line type="monotone" dataKey="npuTemp" stroke="#f59e0b" strokeWidth={2} dot={false} name="NPU Temp (°C)" />
                            <Line type="monotone" dataKey="battery" stroke="#10b981" strokeWidth={2} dot={false} name="Battery (%)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Kinematics & Actuators (18 Servos) */}
            <div className="col-span-1 border border-surfaceHighlight bg-surface/50 rounded-2xl p-5 flex flex-col shadow-lg overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                <div className="flex justify-between items-end mb-6 border-b border-surfaceHighlight pb-4">
                    <div>
                        <h3 className="text-textMain font-bold tracking-widest text-sm">KINEMATICS MATRIX</h3>
                        <p className="text-[10px] text-textFaint uppercase mt-1 tracking-wider">18x PWM Actuators</p>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-textFaint uppercase tracking-wider mb-1">Velocity</div>
                        <div className="text-xl font-bold text-primary-400">{data.speed.toFixed(2)} <span className="text-xs text-textMuted">m/s</span></div>
                    </div>
                </div>

                {/* 6 Legs x 3 Servos (Coxa, Femur, Tibia) representation */}
                <div className="space-y-4 flex-1">
                    {['FL', 'FR', 'ML', 'MR', 'RL', 'RR'].map((legName, legIdx) => (
                        <div key={legName} className="bg-surfaceHighlight/30 border border-surfaceHighlight/50 rounded-xl p-3">
                            <div className="text-[10px] font-bold text-textMuted mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50" />
                                LEG {legName}
                            </div>
                            <div className="space-y-3">
                                {['COXA', 'FEMUR', 'TIBIA'].map((jointName, jIdx) => {
                                    const servo = data.servos[legIdx * 3 + jIdx];
                                    return (
                                        <div key={jointName} className="relative group">
                                            <div className="flex justify-between text-[9px] mb-1.5 font-bold tracking-wider">
                                                <span className="text-textFaint group-hover:text-textMuted transition-colors">{jointName}</span>
                                                <span className={getStatusColor(servo.load, 70, 90)}>{servo.load.toFixed(0)}%</span>
                                            </div>
                                            {/* Load Bar */}
                                            <div className="w-full h-1.5 bg-surfaceHighlight rounded-full overflow-hidden">
                                                <motion.div
                                                    className={`h-full opacity-80 ${getBarColor(servo.load, 70, 90)}`}
                                                    animate={{ width: `${Math.min(100, Math.max(0, servo.load))}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
