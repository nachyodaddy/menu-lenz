'use client';

import React, { useState, useEffect } from 'react';
import { generateInitial30DayPackage, MOCK_WALLET } from '@/lib/store/mock-db';
import { WeeklyMenuPackage, UserRole } from '@/lib/types/schema';
import { VisualPlannerCanvas } from '@/components/planner/VisualPlannerCanvas';
import { NoteIngestionModule } from '@/components/ingestion/NoteIngestionModule';
import { ComplianceMonitor } from '@/components/compliance/ComplianceMonitor';
import { LenzEcosystemDashboard } from '@/components/ecosystem/LenzEcosystemDashboard';
import { QRMealLogger } from '@/components/security/QRMealLogger';
import { RBACController } from '@/components/security/RBACController';
import { AccessibleHeader } from '@/components/navigation/AccessibleHeader';
import { IconModuleBar, ModuleId } from '@/components/navigation/IconModuleBar';
import { fetchBackendState, selectBackendModule, selectBackendRole } from '@/lib/services/api-client';
import {
  Calendar,
  Cpu,
  HeartPulse,
  ShoppingBag,
  QrCode,
  Shield,
  CheckCircle2,
  Building2,
  Sparkles,
  Server,
  FileCheck2
} from 'lucide-react';

export default function MenuLenzDashboard() {
  const [weeklyPackage, setWeeklyPackage] = useState<WeeklyMenuPackage>(generateInitial30DayPackage());
  const [activeTab, setActiveTab] = useState<ModuleId>('CANVAS');
  const [userRole, setUserRole] = useState<UserRole>('ADMIN');
  const [backendConnected, setBackendConnected] = useState<boolean>(false);

  // Accessibility States
  const [simplifiedMode, setSimplifiedMode] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  useEffect(() => {
    // Initial fetch from Node backend server
    fetchBackendState().then(state => {
      if (state) {
        setBackendConnected(true);
        if (state.active_module) {
          setActiveTab(state.active_module as any);
        }
        if (state.active_role) {
          setUserRole(state.active_role as any);
        }
      }
    });
  }, []);

  const handleTabChange = (newTab: ModuleId) => {
    setActiveTab(newTab);
    selectBackendModule(newTab);
  };

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    selectBackendRole(newRole);
  };

  const handleIngestPackageSuccess = (pkg: Partial<WeeklyMenuPackage>) => {
    if (pkg.meal_plan) {
      setWeeklyPackage(prev => ({
        ...prev,
        meal_plan: [...pkg.meal_plan!, ...prev.meal_plan.slice(pkg.meal_plan.length)],
        compliance_status: 'MY25_VALIDATED',
        updated_at: new Date().toISOString()
      }));
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      highContrast ? 'bg-black text-yellow-300 font-bold' : 'bg-dark-base text-slate-100'
    }`}>
      
      {/* DD Friendly Accessible Header */}
      <AccessibleHeader
        userRole={userRole}
        simplifiedMode={simplifiedMode}
        onToggleSimplified={() => setSimplifiedMode(prev => !prev)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(prev => !prev)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
        
        {/* Sleek Icon-Driven Navigation Bar */}
        <IconModuleBar
          activeModule={activeTab}
          onSelectModule={handleTabChange}
          simplifiedMode={simplifiedMode}
        />

        {/* System Status Summary Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-card border border-dark-border p-4 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[11px] text-slate-400 font-medium">My25 Portal Package</span>
              <div className="text-sm font-bold text-brand-400 flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
                Validated (Code: MY25-PASS)
              </div>
            </div>
            <FileCheck2 className="w-6 h-6 text-brand-500/40" />
          </div>

          <div className="bg-dark-card border border-dark-border p-4 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[11px] text-slate-400 font-medium">AI Vision Engine</span>
              <div className="text-sm font-bold text-accent-cyan flex items-center gap-1.5 mt-0.5">
                <Cpu className="w-4 h-4" />
                Gemini Vision Active
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-accent-cyan/40" />
          </div>

          <div className="bg-dark-card border border-dark-border p-4 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[11px] text-slate-400 font-medium">Resident Profiles</span>
              <div className="text-sm font-bold text-slate-200 mt-0.5">
                4 Active (IDDSI Safe)
              </div>
            </div>
            <HeartPulse className="w-6 h-6 text-accent-rose/40" />
          </div>

          <div className="bg-dark-card border border-dark-border p-4 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[11px] text-slate-400 font-medium">Household Wallet</span>
              <div className="text-sm font-bold text-brand-400 font-mono mt-0.5">
                ${MOCK_WALLET.current_balance.toFixed(2)} Balance
              </div>
            </div>
            <ShoppingBag className="w-6 h-6 text-brand-500/40" />
          </div>
        </div>

        {/* Active Module Screen Render */}
        <div className="pt-2">
          {activeTab === 'CANVAS' && (
            <VisualPlannerCanvas
              weeklyPackage={weeklyPackage}
              onPackageUpdate={setWeeklyPackage}
            />
          )}

          {activeTab === 'INGEST' && (
            <NoteIngestionModule
              onIngestSuccess={handleIngestPackageSuccess}
            />
          )}

          {activeTab === 'COMPLIANCE' && (
            <ComplianceMonitor />
          )}

          {activeTab === 'ECOSYSTEM' && (
            <LenzEcosystemDashboard />
          )}

          {activeTab === 'QR_LOG' && (
            <QRMealLogger currentRole={userRole} />
          )}

          {activeTab === 'RBAC' && (
            <RBACController
              currentRole={userRole}
              onRoleChange={handleRoleChange}
            />
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-dark-border bg-dark-card/50 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Menu LENZ Companion App • Built for My25 Residential Management (Woodlane)</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="text-brand-500">Node.js REST Backend (db.json)</span>
            <span>•</span>
            <span className="text-accent-cyan">Web Speech TTS Enabled</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
