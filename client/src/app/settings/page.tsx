'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Settings, Lock, Sliders, Bell, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [leverageCap, setLeverageCap] = useState(20);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex bg-[#030407] min-h-screen text-gray-100 selection:bg-auratrade-purple selection:text-white font-mono">
      <Sidebar />

      <main className="flex-1 p-10 overflow-y-auto max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-[#131929]">
          <div>
            <h1 className="text-xl font-black tracking-wide text-white">SYSTEM SETTINGS</h1>
            <p className="text-xs text-auratrade-lavender mt-0.5">RISK PARAMETERS & EXECUTION PREFERENCES</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-auratrade-indigo text-xs font-bold text-white shadow-lg hover:bg-auratrade-purple transition-all"
          >
            {saved ? <CheckCircle2 size={15} className="text-emerald-400" /> : <Settings size={15} />}
            {saved ? 'Preferences Saved' : 'Save Configurations'}
          </button>
        </header>

        <div className="space-y-6">
          {/* Risk Engine Card */}
          <div className="bg-[#0D111A] border border-[#1E2538] rounded-3xl p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
              <Sliders size={15} className="text-auratrade-lavender" />
              Margin & Leverage Risk Guardrails
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Global Leverage Ceiling</span>
                  <span className="text-white font-bold">{leverageCap}X</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={leverageCap}
                  onChange={(e) => setLeverageCap(Number(e.target.value))}
                  className="w-full accent-auratrade-purple cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="bg-[#0D111A] border border-[#1E2538] rounded-3xl p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
              <Bell size={15} className="text-auratrade-lavender" />
              Telemetry & Notification Protocols
            </h3>

            <div className="flex items-center justify-between py-2">
              <div>
                <span className="text-sm font-bold text-white block">Execution Alert Emails</span>
                <span className="text-xs text-gray-500">Receive dispatch updates when orders fill or liquidate.</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-auratrade-purple cursor-pointer rounded"
              />
            </div>
          </div>

          {/* API Security Card */}
          <div className="bg-[#0D111A] border border-[#1E2538] rounded-3xl p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
              <Lock size={15} className="text-auratrade-lavender" />
              Backend API Gateway Link
            </h3>

            <div className="space-y-3">
              <label className="text-xs text-gray-500 block">Express Gateway Endpoint</label>
              <input
                type="text"
                disabled
                value="http://localhost:5000/api/v1"
                className="w-full bg-[#05060A] border border-[#1E2538] rounded-xl px-4 py-3 text-xs text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}