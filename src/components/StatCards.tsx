import React from 'react';
import { Role, Sector } from '../types';
import { Translations } from '../utils/translations';
import {
  UsersIcon,
  ClockIcon,
  WalletIcon,
  AlertTriangleIcon,
  ShieldIcon,
  CheckCircleIcon,
} from './Icons';

interface StatCardsProps {
  role: Role;
  sector: Sector;
  workersPresentCount: number;
  totalWorkersCount: number;
  totalHoursWorked: number;
  overtimeHoursWorked: number;
  estimatedEarnings: number;
  openReportsCount: number;
  resolvedReportsCount: number;
  fatigueRisk: boolean;
  fatigueThreshold: number;
  isShiftActive: boolean;
  activeShiftDurationHours: number;
  onNavigateTo: (section: 'attendance' | 'payslips' | 'safety' | 'settings') => void;
  t: Translations;
}

export const StatCards: React.FC<StatCardsProps> = ({
  role,
  sector,
  workersPresentCount,
  totalWorkersCount,
  totalHoursWorked,
  overtimeHoursWorked,
  estimatedEarnings,
  openReportsCount,
  resolvedReportsCount,
  fatigueRisk,
  fatigueThreshold,
  isShiftActive,
  activeShiftDurationHours,
  onNavigateTo,
  t,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {/* 1. Workers Present Card */}
      <div
        onClick={() => onNavigateTo('attendance')}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t.cardWorkersPresent}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
            <UsersIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              {role === 'worker' ? (isShiftActive ? '1 Active' : '0 Active') : `${workersPresentCount}`}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {role === 'worker' ? (isShiftActive ? '(You on clock)' : '(Off clock)') : `/ ${totalWorkersCount} on duty`}
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs">
            {isShiftActive ? (
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                Shift in progress ({activeShiftDurationHours.toFixed(1)}h)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-medium text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                {role === 'worker' ? 'Ready to clock in' : 'Site turnout: 87.5%'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Hours Worked Card */}
      <div
        onClick={() => onNavigateTo('attendance')}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t.cardHoursWorked}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
            <ClockIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">
              {totalHoursWorked.toFixed(1)}
            </span>
            <span className="text-xs font-medium text-slate-500">{t.hoursUnit}</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-600">
            <span>Reg: {(totalHoursWorked - overtimeHoursWorked).toFixed(1)}h</span>
            <span className="font-semibold text-emerald-700">
              +{overtimeHoursWorked.toFixed(1)}h OT
            </span>
          </div>
        </div>
      </div>

      {/* 3. Estimated Earnings Card */}
      <div
        onClick={() => onNavigateTo('payslips')}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t.cardEstimatedEarnings}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
            <WalletIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-extrabold text-emerald-700">{t.currencySymbol}</span>
            <span className="text-2xl font-black text-slate-900">
              {estimatedEarnings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              {role === 'worker' ? 'My Net Est.' : 'Payroll liability'}
            </span>
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-bold text-emerald-700">
              Transparent Pay
            </span>
          </div>
        </div>
      </div>

      {/* 4. Safety Reports Card */}
      <div
        onClick={() => onNavigateTo('safety')}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:border-amber-300 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t.cardSafetyReports}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-600 group-hover:text-white">
            <ShieldIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              {openReportsCount}
            </span>
            <span className="text-xs font-medium text-amber-700">active open</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-600">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircleIcon className="h-3.5 w-3.5" />
              {resolvedReportsCount} resolved
            </span>
            <span className="text-slate-400">Zero-harm goal</span>
          </div>
        </div>
      </div>

      {/* 5. Fatigue Alerts Card */}
      <div
        onClick={() => onNavigateTo('settings')}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md ${
          fatigueRisk
            ? 'border-amber-400 bg-amber-50/60 hover:border-amber-500'
            : 'border-slate-200/90 bg-white hover:border-emerald-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t.cardFatigueAlerts}
          </span>
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              fatigueRisk
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
            }`}
          >
            <AlertTriangleIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl font-black ${
                fatigueRisk ? 'text-amber-700' : 'text-slate-900'
              }`}
            >
              {fatigueRisk ? '⚠️ High Risk' : 'Normal'}
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs">
            <span className="text-slate-500">Threshold: {fatigueThreshold}h/day</span>
            <span
              className={`font-semibold ${
                fatigueRisk ? 'text-amber-800' : 'text-emerald-700'
              }`}
            >
              {fatigueRisk ? 'Break required' : 'Optimal'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
