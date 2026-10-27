import React from 'react';
import { AlertTriangleIcon } from './Icons';
import { Translations } from '../utils/translations';

interface FatigueBannerProps {
  currentHours: number;
  threshold: number;
  t: Translations;
  onTakeBreak: () => void;
  workerName?: string;
  role: 'worker' | 'employer';
}

export const FatigueBanner: React.FC<FatigueBannerProps> = ({
  currentHours,
  threshold,
  t,
  onTakeBreak,
  workerName,
  role,
}) => {
  const isExceeded = currentHours >= threshold;

  if (!isExceeded) {
    return null;
  }

  const excess = (currentHours - threshold).toFixed(1);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="mb-6 rounded-xl border-2 border-amber-400 bg-amber-50/90 p-4 shadow-sm transition-all animate-pulse sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white shadow">
            <AlertTriangleIcon className="h-6 w-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-amber-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                Fatigue Hazard Alert
              </span>
              <span className="text-xs font-semibold text-amber-900">
                Safe Threshold: {threshold}h | Recorded: {currentHours.toFixed(1)}h (+{excess}h overtime risk)
              </span>
            </div>
            <h3 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
              {t.fatigueWarningTitle}
            </h3>
            <p className="mt-1 text-sm text-slate-700">
              {role === 'worker'
                ? `${t.fatigueWarningDesc} Attention ${workerName || 'Worker'}: Continuing to operate heavy tools, scaffolding, or lab assets without an interval significantly elevates injury rates.`
                : `Supervisor Alert: Active worker (${workerName || 'Staff'}) has exceeded maximum safe continuous duty. Decent Work Standard mandates immediate rotation or scheduled 45-min relief.`}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs font-medium text-amber-950">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                Mandatory Hydration & Shaded Rest
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                1.5x Premium Overtime Applicable
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                Audit Logged for Fair Compliance
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:self-center">
          <button
            type="button"
            onClick={onTakeBreak}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-95"
          >
            Acknowledge & Take Break
          </button>
        </div>
      </div>
    </div>
  );
};
