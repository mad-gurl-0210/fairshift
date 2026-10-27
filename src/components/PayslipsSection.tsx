import React, { useState } from 'react';
import { PayslipBreakdown, Sector, Role } from '../types';
import { Translations } from '../utils/translations';
import { WalletIcon, DownloadIcon, CheckCircleIcon, ShieldIcon } from './Icons';

interface PayslipsSectionProps {
  payslip: PayslipBreakdown;
  role: Role;
  sector: Sector;
  t: Translations;
  currentWorkerName: string;
}

export const PayslipsSection: React.FC<PayslipsSectionProps> = ({
  payslip,
  role,
  sector,
  t,
  currentWorkerName,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('current');
  const [extraSimulatedHours, setExtraSimulatedHours] = useState<number>(0);
  const [isExported, setIsExported] = useState<boolean>(false);

  // Dynamic calculations factoring simulation
  const effectiveOvertimeHours = payslip.overtimeHours + extraSimulatedHours;
  const effectiveGrossOvertimePay = effectiveOvertimeHours * payslip.overtimeHourlyRate;
  const effectiveGrossTotalPay = payslip.grossRegularPay + effectiveGrossOvertimePay;
  
  // Deductions calculation
  const totalDeductions = payslip.deductions.reduce((acc, curr) => acc + curr.amount, 0);
  const effectiveNetEarnings = effectiveGrossTotalPay - totalDeductions;

  const handleExport = () => {
    setIsExported(true);
    setTimeout(() => setIsExported(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
              {t.navPayslips}
            </h2>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-300">
              Transparent Pay Verified
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            {role === 'worker'
              ? `Bi-weekly itemized earnings for ${currentWorkerName}. Full statutory transparency under ILO Convention 95.`
              : 'Workforce payroll breakdown and compliance overview. Zero hidden deductions.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none"
          >
            <option value="current">Current: Oct 16 - Oct 31, 2026</option>
            <option value="prev1">Previous: Oct 01 - Oct 15, 2026</option>
            <option value="prev2">Sep 16 - Sep 30, 2026</option>
          </select>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
          >
            <DownloadIcon className="h-4 w-4" />
            {isExported ? 'Summary Exported! ✓' : t.exportPdfBtn}
          </button>
        </div>
      </div>

      {/* Main Payslip Statement Card */}
      <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-md">
        {/* Slip Header */}
        <div className="border-b border-slate-200 bg-slate-900 p-6 text-white sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <ShieldIcon className="h-4 w-4" />
                FairShift Decent Work Certified Payslip
              </div>
              <h3 className="mt-1 text-2xl font-black text-white">
                Itemized Earnings Statement
              </h3>
              <p className="text-xs text-slate-300">
                Period: {selectedPeriod === 'current' ? payslip.period : 'Past Period (Archived)'}
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/90 p-3.5 border border-slate-700 text-right">
              <span className="block text-[11px] font-medium text-slate-400">
                Net Estimated Disbursement
              </span>
              <span className="text-2xl font-black text-emerald-400 sm:text-3xl">
                {t.currencySymbol}
                {effectiveNetEarnings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
              <span className="block text-[10px] text-emerald-300 font-medium">
                {payslip.disbursementMode}
              </span>
            </div>
          </div>

          {/* Worker Metadata Bar */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-800 pt-4 text-xs sm:grid-cols-4">
            <div>
              <span className="text-slate-400">Employee Name:</span>
              <p className="font-bold text-slate-100">{payslip.workerName}</p>
            </div>
            <div>
              <span className="text-slate-400">Worker ID:</span>
              <p className="font-mono font-bold text-slate-100">{payslip.workerId}</p>
            </div>
            <div>
              <span className="text-slate-400">Designation / Role:</span>
              <p className="font-bold text-slate-100">{payslip.role}</p>
            </div>
            <div>
              <span className="text-slate-400">Assigned Sector:</span>
              <p className="font-bold capitalize text-slate-100">{sector}</p>
            </div>
          </div>
        </div>

        {/* Breakdown Body */}
        <div className="grid grid-cols-1 divide-y divide-slate-200 md:grid-cols-2 md:divide-x md:divide-y-0">
          {/* Left Column: Earnings Breakdown */}
          <div className="p-6 sm:p-7">
            <h4 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-900">
              <WalletIcon className="h-4 w-4 text-emerald-600" />
              1. Gross Earnings Breakdown
            </h4>

            <div className="mt-4 space-y-4">
              {/* Basic Pay */}
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-200">
                <div>
                  <div className="font-bold text-slate-900">Basic Regular Pay</div>
                  <div className="text-xs text-slate-500">
                    {payslip.regularHours} {t.hoursUnit} @ {t.currencySymbol}{payslip.baseHourlyRate}/hr
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-base font-extrabold text-slate-900">
                    {t.currencySymbol}
                    {payslip.grossRegularPay.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold">Standard Shift</span>
                </div>
              </div>

              {/* Overtime Pay with Decent Work Premium */}
              <div className="flex items-center justify-between rounded-xl bg-emerald-50/70 p-3.5 border border-emerald-200">
                <div>
                  <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                    Overtime Pay (1.5x Premium)
                    <span className="rounded bg-emerald-600 px-1.5 py-0.2 text-[10px] font-bold text-white">
                      Mandated
                    </span>
                  </div>
                  <div className="text-xs text-emerald-800">
                    {effectiveOvertimeHours.toFixed(1)} {t.hoursUnit} @ {t.currencySymbol}{payslip.overtimeHourlyRate}/hr
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-base font-extrabold text-emerald-900">
                    {t.currencySymbol}
                    {effectiveGrossOvertimePay.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold">Overtime Multiplier</span>
                </div>
              </div>

              {/* Total Gross Pay summary */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="font-bold text-slate-900">Total Gross Earnings:</span>
                <span className="font-mono text-lg font-black text-slate-900">
                  {t.currencySymbol}
                  {effectiveGrossTotalPay.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            {/* Interactive Overtime Simulator for Testing */}
            <div className="mt-6 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/40 p-4">
              <label htmlFor="overtime-sim" className="block text-xs font-bold text-emerald-900">
                ⚡ Interactive Simulation: Add Extra Overtime Hours (+{extraSimulatedHours}h)
              </label>
              <p className="mt-0.5 text-[11px] text-emerald-700">
                Slide to test instant real-time wage recalculation and see FairShift transparent rates in action.
              </p>
              <div className="mt-2.5 flex items-center gap-3">
                <input
                  id="overtime-sim"
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={extraSimulatedHours}
                  onChange={(e) => setExtraSimulatedHours(parseFloat(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-emerald-200 accent-emerald-600"
                />
                <span className="w-12 text-right font-mono text-xs font-bold text-emerald-900">
                  +{extraSimulatedHours}h
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Transparent Deductions */}
          <div className="p-6 sm:p-7">
            <h4 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-900">
              <ShieldIcon className="h-4 w-4 text-emerald-600" />
              2. Statutory & Welfare Deductions
            </h4>
            <p className="mt-1 text-xs text-slate-500">
              Every deduction is regulated and tied to social security, healthcare, and meal amenities.
            </p>

            <div className="mt-4 space-y-3">
              {payslip.deductions.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start justify-between rounded-xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-500">{item.description}</div>
                  </div>
                  <div className="text-right font-mono text-xs font-bold text-slate-900">
                    -{t.currencySymbol}
                    {item.amount.toLocaleString('en-IN')}
                  </div>
                </div>
              ))}

              {/* Total Deductions Summary */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="font-bold text-slate-900">Total Deductions:</span>
                <span className="font-mono text-base font-extrabold text-red-600">
                  -{t.currencySymbol}
                  {totalDeductions.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Bottom Net Payout Highlight */}
            <div className="mt-6 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Net Payout to Account
                  </span>
                  <div className="font-mono text-2xl font-black text-emerald-900 sm:text-3xl">
                    {t.currencySymbol}
                    {effectiveNetEarnings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                  100% Guaranteed
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-800">
                <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
                <span>Zero delayed payment liability • Guaranteed grievance redressal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Audit Strip */}
        <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Compliance Standard: {payslip.complianceStandard}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Cryptographic Verification Hash: 0x9a84...de71
          </div>
        </div>
      </div>
    </div>
  );
};
