'use client';

import React from 'react';
import { speakText } from '@/lib/services/tts';
import { Calendar, Cpu, HeartPulse, ShoppingBag, QrCode, Shield, Volume2 } from 'lucide-react';

export type ModuleId = 'CANVAS' | 'INGEST' | 'COMPLIANCE' | 'ECOSYSTEM' | 'QR_LOG' | 'RBAC';

interface Props {
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  simplifiedMode?: boolean;
}

export const IconModuleBar: React.FC<Props> = ({ activeModule, onSelectModule, simplifiedMode }) => {
  const modules: Array<{
    id: ModuleId;
    title: string;
    shortTitle: string;
    desc: string;
    icon: React.ElementType;
    color: string;
    bgGlow: string;
    borderActive: string;
    audioCue: string;
  }> = [
    {
      id: 'CANVAS',
      title: '30-Day Meal Planner',
      shortTitle: 'Meal Planner',
      desc: 'Drag & drop visual meals with cooking steps',
      icon: Calendar,
      color: 'from-emerald-500 to-green-600 text-emerald-400',
      bgGlow: 'bg-emerald-500/10 hover:bg-emerald-500/20',
      borderActive: 'border-emerald-500 shadow-emerald-500/20',
      audioCue: 'Opening 30-Day Meal Planner. Drag and drop meals into daily slots.'
    },
    {
      id: 'INGEST',
      title: 'AI Note Reader',
      shortTitle: 'AI Kitchen Note',
      desc: 'Scan handwritten kitchen notes & PDFs',
      icon: Cpu,
      color: 'from-cyan-500 to-blue-600 text-cyan-400',
      bgGlow: 'bg-cyan-500/10 hover:bg-cyan-500/20',
      borderActive: 'border-cyan-500 shadow-cyan-500/20',
      audioCue: 'Opening AI Note Reader. Upload kitchen notes for instant My25 validation.'
    },
    {
      id: 'COMPLIANCE',
      title: 'Dietary Safety',
      shortTitle: 'Resident Safety',
      desc: 'Allergen lockouts & texture modification alerts',
      icon: HeartPulse,
      color: 'from-rose-500 to-pink-600 text-rose-400',
      bgGlow: 'bg-rose-500/10 hover:bg-rose-500/20',
      borderActive: 'border-rose-500 shadow-rose-500/20',
      audioCue: 'Opening Dietary Safety Monitor. Checking allergens and pureed texture safety.'
    },
    {
      id: 'ECOSYSTEM',
      title: 'LENZ Shop & Budget',
      shortTitle: 'Shop & Wallet',
      desc: 'Consolidated list, inventory & household wallet',
      icon: ShoppingBag,
      color: 'from-amber-500 to-orange-600 text-amber-400',
      bgGlow: 'bg-amber-500/10 hover:bg-amber-500/20',
      borderActive: 'border-amber-500 shadow-amber-500/20',
      audioCue: 'Opening LENZ Shopping Suite. View grocery lists, local store prices, and budget.'
    },
    {
      id: 'QR_LOG',
      title: 'QR Meal Pass',
      shortTitle: 'Meal Pass',
      desc: 'Dynamic QR codes for quick meal verification',
      icon: QrCode,
      color: 'from-purple-500 to-violet-600 text-purple-400',
      bgGlow: 'bg-purple-500/10 hover:bg-purple-500/20',
      borderActive: 'border-purple-500 shadow-purple-500/20',
      audioCue: 'Opening Dynamic QR Meal Pass. Scan QR code to verify served meals.'
    },
    {
      id: 'RBAC',
      title: 'Security & Staff',
      shortTitle: 'Security Roles',
      desc: 'Role-based authorization & permission gate',
      icon: Shield,
      color: 'from-slate-400 to-slate-600 text-slate-300',
      bgGlow: 'bg-slate-800/60 hover:bg-slate-800',
      borderActive: 'border-slate-400 shadow-slate-400/20',
      audioCue: 'Opening Security and Staff Role Gate.'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          Selectable Feature Modules
        </span>
        <span className="text-[11px] text-slate-500 font-mono">
          Tap any module icon to switch view
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = activeModule === m.id;

          return (
            <button
              key={m.id}
              onClick={() => {
                onSelectModule(m.id);
                speakText(m.audioCue);
              }}
              className={`p-4 rounded-2xl border transition-all duration-200 text-left flex flex-col justify-between min-h-[120px] relative overflow-hidden group shadow-lg ${
                isActive
                  ? `bg-slate-900 ${m.borderActive} shadow-xl scale-[1.03] ring-2 ring-white/10`
                  : `bg-dark-card border-dark-border ${m.bgGlow} hover:scale-[1.01]`
              }`}
            >
              {/* Top Row: Icon + Audio Prompt Trigger */}
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white shadow-md font-bold shrink-0`}>
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(m.audioCue);
                    }}
                    title="Listen to Module Name"
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-3 space-y-0.5">
                <h3 className={`font-bold transition-colors ${
                  simplifiedMode ? 'text-base text-white' : 'text-xs text-slate-100'
                }`}>
                  {simplifiedMode ? m.shortTitle : m.title}
                </h3>
                {!simplifiedMode && (
                  <p className="text-[10px] text-slate-400 line-clamp-1">
                    {m.desc}
                  </p>
                )}
              </div>

              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-accent-cyan" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
