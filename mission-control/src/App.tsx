import Settings from "./Settings";
import { Settings as SettingsIcon } from "lucide-react";
import Telemetry from './Telemetry';
import AuditLedger from './AuditLedger';
import LidarMap from './LidarMap';
import VisionStream from './VisionStream';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Camera, Box, Key, Compass } from 'lucide-react';
import DigitalTwin from './DigitalTwin';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Digital Twin', icon: Box, id: 'twin' },
    { name: 'Vision Stream', icon: Camera, id: 'vision' },
    { name: 'Lidar Map', icon: Compass, id: 'lidar' },
    { name: 'Audit Ledger', icon: Key, id: 'ledger' },
    { name: 'Telemetry', icon: Activity, id: 'telemetry' },
    { name: 'Settings', icon: SettingsIcon, id: 'settings' }
  ];

  return (
    <div className="flex h-screen w-full bg-background font-mono text-textMain">
      {/* Sidebar */}
      <div className="w-64 border-r border-surfaceHighlight bg-surface/80 flex flex-col backdrop-blur-xl z-10 shadow-xl">
        <div className="p-6 border-b border-surfaceHighlight">
          <h1 className="text-xl font-bold text-primary-400 tracking-wider flex items-center gap-2">
            GAP<span className="text-textMuted">bot</span>
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          </h1>
          <p className="text-xs text-textFaint mt-1 uppercase tracking-widest font-semibold">Mission Control</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab, idx) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(idx)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 relative overflow-hidden ${
                activeTab === idx
                  ? 'bg-primary-500/15 text-primary-400 border border-primary-500/30'
                  : 'text-textMuted hover:bg-surfaceHighlight hover:text-textMain border border-transparent'
              }`}
            >
              <tab.icon className={`w-5 h-5 transition-colors ${activeTab === idx ? 'text-primary-400' : 'text-textFaint'}`} />
              <span className="font-medium z-10 relative">{tab.name}</span>
              {activeTab === idx && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute left-0 w-1 h-full bg-primary-500 rounded-r-full shadow-glow-primary z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
               {activeTab === idx && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent z-0" />
              )}
            </motion.button>
          ))}
        </nav>
        <div className="p-4 border-t border-surfaceHighlight text-xs text-textFaint text-center bg-surfaceHighlight/20">
          <div className="flex items-center justify-center gap-2 mb-1">
             <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-glow-primary" />
             SYSTEM ONLINE
          </div>
          <span className="text-primary-400/80 tracking-widest text-[10px]">SECURE CONNECTION</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surfaceHighlight/30 via-background to-background">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDIwdjIwSDIwdjIweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjAyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-20 pointer-events-none mix-blend-overlay" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="absolute inset-0 p-8 flex flex-col pointer-events-none"
          >
            <div className="mb-6 flex items-center justify-between pointer-events-auto">
              <h2 className="text-2xl font-semibold text-textMain flex items-center gap-3 drop-shadow-md">
                {React.createElement(tabs[activeTab].icon, { className: "w-6 h-6 text-primary-400" })}
                {tabs[activeTab].name}
              </h2>
              <div className="flex items-center gap-3 bg-surfaceHighlight/50 px-3 py-1.5 rounded-full border border-surfaceHighlight backdrop-blur-sm">
                 <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
                </span>
                <span className="text-xs text-primary-400 font-bold tracking-widest">LIVE</span>
              </div>
            </div>

            <div className="flex-1 border border-surfaceHighlight/80 rounded-2xl bg-surface/60 backdrop-blur-xl overflow-hidden relative shadow-2xl pointer-events-auto ring-1 ring-white/5">
                {activeTab === 0 && <DigitalTwin />}
                {activeTab === 1 && <VisionStream />}
                {activeTab === 2 && <LidarMap />}
                {activeTab === 3 && <AuditLedger />}
                {activeTab === 4 && <Telemetry />}
                {activeTab === 5 && <Settings />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
