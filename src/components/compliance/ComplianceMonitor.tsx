'use client';
import React, { useState } from 'react';
import { MOCK_RESIDENTS } from '@/lib/store/mock-db';
import { IndividualDietaryProfile, AllergenCategory, TextureModification } from '@/lib/types/schema';
import { ShieldAlert, User, AlertTriangle, CheckCircle2, HeartPulse, Sparkles, Filter, AlertOctagon } from 'lucide-react';

export const ComplianceMonitor: React.FC = () => {
  const [residents, setResidents] = useState<IndividualDietaryProfile[]>(MOCK_RESIDENTS);
  const [selectedResident, setSelectedResident] = useState<IndividualDietaryProfile>(MOCK_RESIDENTS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-dark-card border border-dark-border p-5 rounded-xl flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-accent-rose/10 border border-accent-rose/20 text-accent-rose">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Individual Dietary Compliance & Risk Monitor
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent-rose/20 text-accent-rose border border-accent-rose/30">
                Real-Time Health Engine
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Active allergen enforcement, texture modifications (IDDSI levels), and ingredient substitution rules
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Monitored Residents: {residents.length}</span>
        </div>
      </div>

      {/* Grid: Resident Profile Cards + Deep Audit Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Resident Cards List */}
        <div className="lg:col-span-5 space-y-3">
          {residents.map((res) => {
            const isSelected = res.resident_id === selectedResident.resident_id;
            const hasPureed = res.texture_mods.includes('PUREED');
            const hasAllergens = res.allergens.length > 0;

            return (
              <div
                key={res.resident_id}
                onClick={() => setSelectedResident(res)}
                className={`bg-dark-card border rounded-xl p-4 transition-all cursor-pointer shadow-lg hover:scale-[1.01] ${
                  isSelected
                    ? 'border-brand-500 bg-slate-900/90 shadow-brand-500/10'
                    : 'border-dark-border hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {res.avatar_url ? (
                      <img
                        src={res.avatar_url}
                        alt={res.name}
                        className="w-10 h-10 rounded-full object-cover border border-dark-border"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-slate-100">{res.name}</h3>
                      <p className="text-[11px] text-slate-400">{res.room_number} • {res.house_id}</p>
                    </div>
                  </div>

                  {hasAllergens && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-rose/20 text-accent-rose border border-accent-rose/30 font-bold">
                      {res.allergens.length} Allergen Alert
                    </span>
                  )}
                </div>

                {/* Badges */}
                <div className="mt-3 pt-2 border-t border-dark-border/50 flex flex-wrap gap-1.5">
                  {res.texture_mods.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-accent-cyan/20 text-accent-cyan font-mono font-bold">
                      {t}
                    </span>
                  ))}
                  {res.allergens.map(a => (
                    <span key={a} className="text-[10px] px-2 py-0.5 rounded bg-accent-rose/20 text-accent-rose font-mono">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Audit Panel for Selected Resident */}
        <div className="lg:col-span-7 bg-dark-card border border-dark-border rounded-xl p-6 shadow-xl space-y-6">
          <div className="flex items-start justify-between pb-4 border-b border-dark-border">
            <div className="flex items-center gap-4">
              {selectedResident.avatar_url && (
                <img
                  src={selectedResident.avatar_url}
                  alt={selectedResident.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-500/40"
                />
              )}
              <div>
                <h3 className="text-xl font-bold text-slate-100">{selectedResident.name}</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Resident ID: {selectedResident.resident_id} • {selectedResident.room_number}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 font-mono font-bold border border-brand-500/30">
                ACTIVE MONITORING
              </span>
            </div>
          </div>

          {/* Critical Warnings */}
          {selectedResident.allergens.length > 0 && (
            <div className="bg-accent-rose/10 border border-accent-rose/40 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-accent-rose font-bold text-sm">
                <AlertOctagon className="w-5 h-5" />
                MANDATORY ALLERGEN LOCKOUT
              </div>
              <p className="text-xs text-slate-300">
                The kitchen ingestion engine will strictly block any menu packages containing the following ingredients for {selectedResident.name}:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedResident.allergens.map(a => (
                  <span key={a} className="text-xs px-2.5 py-1 rounded bg-accent-rose/20 text-accent-rose border border-accent-rose/40 font-mono font-bold">
                    🚫 NO {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Texture Modifications */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Required Texture Modifications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedResident.texture_mods.map(tex => (
                <div key={tex} className="bg-slate-900 border border-accent-cyan/30 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-accent-cyan font-mono">{tex}</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {tex === 'PUREED' ? 'IDDSI Level 4 - Smooth, pudding-like, spoon tested.' : 'IDDSI Level 5 - Soft & bite-sized.'}
                    </p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-accent-cyan" />
                </div>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions & Care Notes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Dietary Restrictions & Special Guidelines</h4>
            <div className="bg-slate-950 p-4 rounded-xl border border-dark-border text-xs text-slate-300 space-y-2 font-mono">
              <p>• Restrictions: <strong className="text-brand-400">{selectedResident.restrictions.join(', ')}</strong></p>
              <p>• Clinical Notes: {selectedResident.notes || 'No extra clinical notes recorded.'}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
