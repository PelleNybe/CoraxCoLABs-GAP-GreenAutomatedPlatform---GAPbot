import { useState } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState('dark');
  const [telemetryRate, setTelemetryRate] = useState(2);
  const [apiKey, setApiKey] = useState('sk-****************************');

  return (
    <div className="w-full h-full p-8 bg-zinc-950 text-zinc-300 font-mono overflow-y-auto">
      <h2 className="text-2xl font-semibold text-emerald-400 mb-8 border-b border-zinc-800 pb-4">Global Configuration</h2>

      <div className="space-y-8 max-w-2xl">
        {/* Theme Settings */}
        <section className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50">
          <h3 className="text-lg font-medium text-zinc-100 mb-4 flex items-center gap-2">
             <span className="text-emerald-500" aria-hidden="true">🎨</span> Interface Theme
          </h3>
          <div className="flex gap-4" role="group" aria-label="Select Interface Theme">
            <button
              onClick={() => setTheme('dark')}
              aria-pressed={theme === 'dark'}
              className={`px-6 py-2 rounded-lg border transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${theme === 'dark' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}
            >
              Dark Mode (Default)
            </button>
            <button
              onClick={() => setTheme('light')}
              aria-pressed={theme === 'light'}
              className={`px-6 py-2 rounded-lg border transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${theme === 'light' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}
            >
              Light Mode (Terminal)
            </button>
          </div>
        </section>

        {/* Telemetry Settings */}
        <section className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50">
          <h3 className="text-lg font-medium text-zinc-100 mb-4 flex items-center gap-2" id="telemetry-rate-label">
             <span className="text-emerald-500" aria-hidden="true">⚡</span> Telemetry Sync Rate
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-zinc-400 mb-2" aria-hidden="true">
              <span>Performance (High CPU)</span>
              <span>Efficiency (Low Battery)</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={telemetryRate}
              aria-labelledby="telemetry-rate-label"
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={telemetryRate}
              onChange={(e) => setTelemetryRate(parseInt(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            />
            <div className="text-right text-sm text-emerald-400 font-bold" aria-live="polite">
              Current Rate: {telemetryRate} Hz
            </div>
          </div>
        </section>

        {/* API Keys */}
        <section className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50">
          <h3 className="text-lg font-medium text-zinc-100 mb-4 flex items-center gap-2">
             <span className="text-emerald-500" aria-hidden="true">🔑</span> Security & API Keys
          </h3>
          <div className="space-y-2">
            <label htmlFor="api-key-input" className="text-sm text-zinc-400 block">Supabase / Cloud Sync Key</label>
            <div className="flex gap-2">
              <input
                id="api-key-input"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                aria-describedby="api-key-help"
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none">
                Regenerate
              </button>
            </div>
            <p id="api-key-help" className="text-xs text-zinc-500 mt-2">Required for syncing local SQLite data to cloud orchestrator.</p>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-rose-950/20 p-6 rounded-xl border border-rose-900/50">
          <h3 className="text-lg font-medium text-rose-400 mb-4">Danger Zone</h3>
          <button className="px-6 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none">
            Factory Reset Node
          </button>
        </section>

      </div>
    </div>
  );
}
