'use client';
import React, { useState } from 'react';
import { MOCK_QR_LOGS, MOCK_RESIDENTS, MOCK_MEAL_LIBRARY } from '@/lib/store/mock-db';
import { QRMealLogEntry, UserRole } from '@/lib/types/schema';
import { QrCode, ShieldCheck, CheckCircle2, Clock, UserCheck, Lock, Sparkles, RefreshCw } from 'lucide-react';

interface Props {
  currentRole: UserRole;
}

export const QRMealLogger: React.FC<Props> = ({ currentRole }) => {
  const [logs, setLogs] = useState<QRMealLogEntry[]>(MOCK_QR_LOGS);
  const [selectedResidentId, setSelectedResidentId] = useState('RES-101');
  const [selectedMealId, setSelectedMealId] = useState('MEAL-001');
  const [staffName, setStaffName] = useState('Nurse Sarah Jenkins');
  const [logNotes, setLogNotes] = useState('Pureed Stage 4 texture double-verified prior to meal consumption.');
  const [activeQRHash, setActiveQRHash] = useState<string | null>(null);

  const handleGenerateQR = () => {
    const resident = MOCK_RESIDENTS.find(r => r.resident_id === selectedResidentId);
    const meal = MOCK_MEAL_LIBRARY.find(m => m.id === selectedMealId);

    const newHash = `QR-${selectedResidentId}-${selectedMealId}-${Date.now().toString().slice(-6)}`;
    setActiveQRHash(newHash);

    const newEntry: QRMealLogEntry = {
      log_id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      resident_id: selectedResidentId,
      resident_name: resident?.name || 'Resident',
      meal_id: selectedMealId,
      meal_title: meal?.title || 'Scheduled Meal',
      meal_type: meal?.meal_type || 'DINNER',
      staff_id: 'STF-402',
      staff_name: staffName,
      texture_verified: true,
      notes: logNotes,
      qr_code_hash: newHash
    };

    setLogs(prev => [newEntry, ...prev]);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-dark-card border border-dark-border p-5 rounded-xl flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-accent-purple/10 border border-accent-purple/20 text-accent-purple">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Dynamic QR Meal Logging & Audit Trail
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple border border-accent-purple/30">
                Staff Verification Protocol
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Fast household meal logging via dynamic QR codes with encrypted audit trail
            </p>
          </div>
        </div>
      </div>

      {/* Grid: QR Code Generator & Audit Log Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* QR Code Generator Box */}
        <div className="lg:col-span-5 bg-dark-card border border-dark-border rounded-xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-purple" />
            Generate Dynamic Meal QR Pass
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-400">Select Resident:</label>
              <select
                value={selectedResidentId}
                onChange={(e) => setSelectedResidentId(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-dark-border rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-accent-purple"
              >
                {MOCK_RESIDENTS.map(r => (
                  <option key={r.resident_id} value={r.resident_id}>
                    {r.name} ({r.room_number})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400">Select Served Meal:</label>
              <select
                value={selectedMealId}
                onChange={(e) => setSelectedMealId(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-dark-border rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-accent-purple"
              >
                {MOCK_MEAL_LIBRARY.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.title} ({m.meal_type})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400">Verifying Staff Member:</label>
              <input
                type="text"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-dark-border rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-accent-purple"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400">Care & Texture Verification Notes:</label>
              <textarea
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
                rows={2}
                className="w-full mt-1 bg-slate-900 border border-dark-border rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-accent-purple"
              />
            </div>

            <button
              onClick={handleGenerateQR}
              className="w-full py-3 rounded-xl bg-accent-purple hover:bg-purple-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <QrCode className="w-4 h-4" />
              Generate & Record QR Meal Pass
            </button>
          </div>

          {/* Rendered Visual QR Simulation */}
          {activeQRHash && (
            <div className="bg-slate-950 border border-accent-purple/40 p-4 rounded-xl text-center space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-accent-purple font-mono font-bold">
                Active Dynamic Encrypted Hash
              </span>
              <div className="w-36 h-36 bg-white mx-auto p-2 rounded-xl flex items-center justify-center border-4 border-accent-purple">
                <div className="grid grid-cols-6 gap-1 w-full h-full">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${
                        (i * 7 + activeQRHash.length) % 3 === 0 ? 'bg-black' : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[10px] font-mono text-slate-400">{activeQRHash}</p>
            </div>
          )}
        </div>

        {/* Audit Log History */}
        <div className="lg:col-span-7 bg-dark-card border border-dark-border rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-dark-border">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              Verified Meal Audit Trail
            </h3>
            <span className="text-xs font-mono text-slate-400">{logs.length} Log Entries Recorded</span>
          </div>

          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.log_id} className="bg-slate-900 border border-dark-border p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-100">{log.resident_name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 font-mono">
                      {log.meal_type}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-medium">{log.meal_title}</p>

                <div className="pt-2 border-t border-dark-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-400 gap-1">
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-accent-purple" />
                    Verified by: {log.staff_name}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">Hash: {log.qr_code_hash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
