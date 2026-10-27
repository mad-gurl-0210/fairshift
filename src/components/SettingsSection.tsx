import React from 'react';
import { Role, Sector, Language } from '../types';
import { Translations } from '../utils/translations';
import { SettingsIcon, AlertTriangleIcon, CheckCircleIcon, ShieldIcon } from './Icons';

interface SettingsSectionProps {
  fatigueThreshold: number;
  onUpdateFatigueThreshold: (newThreshold: number) => void;
  baseHourlyRate: number;
  onUpdateBaseRate: (newRate: number) => void;
  overtimeMultiplier: number;
  onUpdateOvertimeMultiplier: (newMult: number) => void;
  role: Role;
  onRoleChange: (newRole: Role) => void;
  sector: Sector;
  onSectorChange: (newSector: Sector) => void;
  language: Language;
  onLanguageChange: (newLang: Language) => void;
  onResetDemoData: () => void;
  t: Translations;
  currentHours: number;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  fatigueThreshold,
  onUpdateFatigueThreshold,
  baseHourlyRate,
  onUpdateBaseRate,
  overtimeMultiplier,
  onUpdateOvertimeMultiplier,
  role,
  onRoleChange,
  sector,
  onSectorChange,
  language,
  onLanguageChange,
  onResetDemoData,
  t,
  currentHours,
}) => {
  const isCurrentlyExceeded = currentHours >= fatigueThreshold;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
            {t.navSettings}
          </h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-800 border border-slate-300">
            Interactive Thresholds
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          Configure safety parameters, overtime multipliers, and fatigue hazard triggers. All changes take effect in real time across the session.
        </p>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Fatigue Threshold Configuration Card */}
        <div
          className={`rounded-2xl border-2 p-6 shadow-sm transition-all sm:p-7 ${
            isCurrentlyExceeded
              ? 'border-amber-400 bg-amber-50/50'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${
                  isCurrentlyExceeded ? 'bg-amber-500 animate-pulse' : 'bg-slate-900'
                }`}
              >
                <AlertTriangleIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Fatigue Warning Limit
                </h3>
                <p className="text-xs text-slate-500">
                  Daily continuous duty threshold
                </p>
              </div>
            </div>

            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold ${
                isCurrentlyExceeded
                  ? 'bg-amber-500 text-white animate-bounce'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {isCurrentlyExceeded ? '⚠️ ALERT TRIGGERED' : 'SAFE'}
            </span>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Maximum Safe Shift Hours:</span>
                <span className="font-mono text-base font-black text-emerald-700">
                  {fatigueThreshold.toFixed(1)} {t.hoursUnit}
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="12"
                step="0.5"
                value={fatigueThreshold}
                onChange={(e) => onUpdateFatigueThreshold(parseFloat(e.target.value))}
                className="mt-2 h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600"
              />
              <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                <span>6.0 hrs (Strict)</span>
                <span>8.0 hrs (Standard ILO)</span>
                <span>12.0 hrs (Extended)</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-700 space-y-1.5">
              <p className="font-bold text-slate-900">
                Current Recorded Work Duration: <span className="text-emerald-700">{currentHours.toFixed(1)} hrs</span>
              </p>
              <p className="text-[11px] text-slate-600">
                {isCurrentlyExceeded
                  ? `Exceeded by ${(currentHours - fatigueThreshold).toFixed(1)} hrs. The platform displays active fatigue warning badges and flags supervisor duty sheets.`
                  : 'Currently within safe physiological limits. No fatigue flags raised.'}
              </p>
              <div className="text-[10px] text-slate-400 font-medium">
                Standard: Decent Work Safe Hours Directive (ILO R116)
              </div>
            </div>
          </div>
        </div>

        {/* 2. Wage & Compensation Settings */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <ShieldIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Base Wage & Overtime Multipliers
              </h3>
              <p className="text-xs text-slate-500">
                Transparent remuneration parameters
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="base-rate" className="block text-xs font-bold text-slate-700">
                Base Hourly Wage ({t.currencySymbol} / hour)
              </label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-500">{t.currencySymbol}</span>
                <input
                  id="base-rate"
                  type="number"
                  min="300"
                  max="2000"
                  step="50"
                  value={baseHourlyRate}
                  onChange={(e) => onUpdateBaseRate(parseFloat(e.target.value) || 600)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="overtime-multiplier" className="block text-xs font-bold text-slate-700">
                Mandatory Overtime Multiplier
              </label>
              <select
                id="overtime-multiplier"
                value={overtimeMultiplier}
                onChange={(e) => onUpdateOvertimeMultiplier(parseFloat(e.target.value))}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:outline-none"
              >
                <option value="1.5">1.5x Hourly Rate (Standard Decent Work Law)</option>
                <option value="2.0">2.0x Hourly Rate (Hazardous / Holiday Shift)</option>
              </select>
              <p className="mt-1 text-[11px] text-slate-500">
                Overtime rate is calculated as: {t.currencySymbol}{(baseHourlyRate * overtimeMultiplier).toFixed(0)} / hr
              </p>
            </div>
          </div>
        </div>

        {/* 3. Role & Sector Preferences */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <h3 className="text-base font-black text-slate-900 mb-1">
            Role & Industry Sector Preferences
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Switch your active persona or working environment
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Active User Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onRoleChange('worker')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    role === 'worker'
                      ? 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold">Worker View</div>
                  <div className="text-[11px] text-slate-500">Check in/out, payslips, report hazard</div>
                </button>
                <button
                  type="button"
                  onClick={() => onRoleChange('employer')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    role === 'employer'
                      ? 'border-slate-900 bg-slate-900 text-white font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold">Employer / Admin</div>
                  <div className="text-[11px] text-slate-400">Triage reports, audit shifts, site safety</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Active Sector</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onSectorChange('construction')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    sector === 'construction'
                      ? 'border-amber-500 bg-amber-50/80 text-amber-950 font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold">Construction</div>
                  <div className="text-[11px] text-slate-500">Scaffolding, Cranes, Flyovers</div>
                </button>
                <button
                  type="button"
                  onClick={() => onSectorChange('college')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    sector === 'college'
                      ? 'border-blue-500 bg-blue-50/80 text-blue-950 font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold">College Sector</div>
                  <div className="text-[11px] text-slate-500">Science Labs, Library, Facilities</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Demo Data & Session Reset */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <h3 className="text-base font-black text-slate-900 mb-1">
            Demo State & Prompt Wars 2026 Session
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Manage your local in-memory session. No external database or credentials required.
          </p>

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
              <span>In-Memory React State Active</span>
            </div>
            <p>
              All interactions (clock-in, clock-out, hazard reports, status changes, payslip simulations) update live within this browser tab.
            </p>
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={onResetDemoData}
              className="rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 hover:bg-red-100 transition-colors"
            >
              Reset Session to Initial Demo State
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
