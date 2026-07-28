'use client';

import React from 'react';
import { speakText, stopSpeech } from '@/lib/services/tts';
import { Volume2, VolumeX, Eye, Sparkles, Building2, User, ShieldCheck } from 'lucide-react';
import { UserRole } from '@/lib/types/schema';

interface Props {
  userRole: UserRole;
  simplifiedMode: boolean;
  onToggleSimplified: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export const AccessibleHeader: React.FC<Props> = ({
  userRole,
  simplifiedMode,
  onToggleSimplified,
  highContrast,
  onToggleHighContrast
}) => {
  return (
    <header className="bg-dark-card/95 backdrop-blur-md border-b border-dark-border sticky top-0 z-40 px-4 lg:px-8 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & DD Friendly Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 via-emerald-500 to-accent-cyan flex items-center justify-center text-dark-base font-black text-2xl shadow-xl shadow-brand-500/20 shrink-0">
            L
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-white">Menu LENZ</h1>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30">
                Accessible Mode
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Woodlane Residential Care • Accessible Visual Companion
            </p>
          </div>
        </div>

        {/* DD Accessibility Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Read Aloud Audio Narration Button */}
          <button
            onClick={() => speakText("Welcome to Menu LENZ. Accessible visual meal companion for Woodlane Residential Care.")}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-dark-border text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
            title="Read Aloud Page Summary"
          >
            <Volume2 className="w-4 h-4 text-brand-400" />
            <span className="hidden sm:inline">Read Aloud</span>
          </button>

          {/* Stop Audio Button */}
          <button
            onClick={() => stopSpeech()}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-dark-border transition-colors"
            title="Mute Audio"
          >
            <VolumeX className="w-4 h-4" />
          </button>

          {/* High Contrast / Large Text Toggle */}
          <button
            onClick={onToggleHighContrast}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
              highContrast
                ? 'bg-amber-500 text-dark-base border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 border-dark-border hover:bg-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{highContrast ? 'High Contrast: ON' : 'High Contrast'}</span>
          </button>

          {/* Simplified Mode Toggle */}
          <button
            onClick={onToggleSimplified}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
              simplifiedMode
                ? 'bg-brand-500 text-dark-base border-brand-400 shadow-lg shadow-brand-500/20'
                : 'bg-slate-800 text-slate-300 border-dark-border hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{simplifiedMode ? 'Simple View: ON' : 'Simple View'}</span>
          </button>

          {/* Role Indicator */}
          <div className="bg-slate-900 border border-dark-border px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-500" />
            <span className="font-bold text-slate-200">{userRole}</span>
          </div>

        </div>

      </div>
    </header>
  );
};
