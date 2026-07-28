'use client';
import React from 'react';
import { UserRole } from '@/lib/types/schema';
import { Shield, Lock, Eye, KeyRound, CheckCircle } from 'lucide-react';

interface Props {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RBACController: React.FC<Props> = ({ currentRole, onRoleChange }) => {
  const roles: Array<{ id: UserRole; title: string; desc: string; permissions: string[] }> = [
    {
      id: 'ADMIN',
      title: 'System Administrator',
      desc: 'Full system authorization & budget configuration',
      permissions: ['Modify Resident Dietary Profiles', 'Wallet Allowance Re-allocation', 'My25 Schema Configuration', 'Full Audit Export']
    },
    {
      id: 'CAREGIVER_STAFF',
      title: 'Caregiver / House Staff',
      desc: 'Meal prep, QR logging & cooking guide access',
      permissions: ['Dynamic QR Meal Verification', 'Visual Cooking Guide Drawer', 'Gemini Kitchen Note OCR Ingest', 'Dietary Alert Overrides']
    },
    {
      id: 'RESIDENT_HOUSE_MANAGER',
      title: 'Resident / House Manager',
      desc: '30-day visual canvas & household shopping view',
      permissions: ['30-Day Drag & Drop Meal View', 'LENZ Consolidated Shopping List', 'Personal Texture & Preference Settings', 'Read-Only Receipts']
    }
  ];

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-dark-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent-amber/10 border border-accent-amber/20 text-accent-amber">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Role-Based Access Control (RBAC) Gate
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-amber/20 text-accent-amber border border-accent-amber/30">
                Security Safeguard
              </span>
            </h3>
            <p className="text-xs text-slate-400">Strict confidential health data protection & access scoping</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-lg border border-brand-500/20">
          Active Role: {currentRole}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((role) => {
          const isSelected = currentRole === role.id;
          return (
            <div
              key={role.id}
              onClick={() => onRoleChange(role.id)}
              className={`border p-4 rounded-xl transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? 'bg-slate-900 border-brand-500 shadow-lg shadow-brand-500/10'
                  : 'bg-slate-950/60 border-dark-border hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-100">{role.title}</h4>
                {isSelected && <CheckCircle className="w-4 h-4 text-brand-500" />}
              </div>

              <p className="text-[11px] text-slate-400">{role.desc}</p>

              <div className="pt-2 border-t border-dark-border/50 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Permissions:</span>
                {role.permissions.map((p, i) => (
                  <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-brand-500"></span>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
