import React, { useState, useEffect } from 'react';
import { Shift, Sector, Role } from '../types';
import { Translations } from '../utils/translations';
import {
  ClockIcon,
  CheckCircleIcon,
  BuildingIcon,
  AcademicCapIcon,
  PlusIcon,
  ShieldIcon,
} from './Icons';

interface AttendanceSectionProps {
  shifts: Shift[];
  onCheckIn: (siteLocation: string) => void;
  onCheckOut: () => void;
  isShiftActive: boolean;
  activeShiftStartTime: string | null;
  activeShiftDurationSeconds: number;
  activeShiftSite: string;
  role: Role;
  sector: Sector;
  currentWorkerName: string;
  onVerifyShift: (shiftId: string) => void;
  t: Translations;
  fatigueRisk: boolean;
  fatigueThreshold: number;
}

export const AttendanceSection: React.FC<AttendanceSectionProps> = ({
  shifts,
  onCheckIn,
  onCheckOut,
  isShiftActive,
  activeShiftStartTime,
  activeShiftDurationSeconds,
  activeShiftSite,
  role,
  sector,
  currentWorkerName,
  onVerifyShift,
  t,
  fatigueRisk,
  fatigueThreshold,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [filterSector, setFilterSector] = useState<'all' | Sector>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const constructionLocations = [
    'Metro Flyover Extension - Pier 22B',
    'Apex Tech City - Tower 4 Scaffolding',
    'Metro Station Terminal - Zone C',
    'East Wing Roofing Deck & Girders',
    'Substructure Foundation Pit Alpha',
  ];

  const collegeLocations = [
    'National Engineering Campus - Chem Block B',
    'University Central Library & Auditorium',
    'Polytechnic Campus - Computer Labs 1-4',
    'Life Sciences Research Wing Floor 2',
    'Sports Complex & Gymnasium Pavilion',
  ];

  const locationOptions = sector === 'construction' ? constructionLocations : collegeLocations;

  useEffect(() => {
    if (!selectedLocation || !locationOptions.includes(selectedLocation)) {
      setSelectedLocation(locationOptions[0]);
    }
  }, [sector]);

  // Format stopwatch seconds into HH:MM:SS
  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredShifts = shifts.filter((s) => {
    const matchesSector = filterSector === 'all' || s.sector === filterSector;
    const matchesStatus = filterStatus === 'all' || s.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesRole = role === 'worker' ? s.workerName.toLowerCase().includes(currentWorkerName.toLowerCase().split(' ')[0]) : true;
    return matchesSector && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* 1. Interactive Shift Clock-in / Clock-out Station */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
                Decent Work Time Ledger
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${
                  isShiftActive
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isShiftActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'
                  }`}
                />
                {isShiftActive ? t.shiftActiveBadge : t.shiftIdleBadge}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                {isShiftActive
                  ? `Shift Active: ${activeShiftSite}`
                  : `Start Work Shift — ${sector === 'construction' ? 'Construction Site' : 'Campus Operations'}`}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {isShiftActive
                  ? `Checked in at ${activeShiftStartTime}. Accurate time tracking guarantees full hourly compensation plus statutory 1.5x overtime.`
                  : 'Select your assigned duty location and check in. FairShift logs your clock timestamp for transparent wage calculation.'}
              </p>
            </div>

            {/* Shift Location Selector when Off Clock */}
            {!isShiftActive && (
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <label htmlFor="shift-location" className="text-xs font-bold text-slate-700 sm:w-32">
                  Assigned Site:
                </label>
                <select
                  id="shift-location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:w-80"
                >
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Action Button & Live Stopwatch */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            {isShiftActive && (
              <div className="flex flex-col items-start lg:items-end">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Live Shift Duration
                </span>
                <span className="font-mono text-3xl font-black tracking-tight text-emerald-700 sm:text-4xl">
                  {formatTimer(activeShiftDurationSeconds)}
                </span>
                {fatigueRisk && (
                  <span className="mt-1 rounded bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800 border border-amber-300">
                    ⚠️ Safe Limit ({fatigueThreshold}h) Exceeded
                  </span>
                )}
              </div>
            )}

            <div>
              {isShiftActive ? (
                <button
                  type="button"
                  onClick={onCheckOut}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 active:scale-95"
                >
                  <ClockIcon className="h-5 w-5 text-emerald-400" />
                  {t.clockOutBtn}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onCheckIn(selectedLocation)}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-600/25 transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-95"
                >
                  <CheckCircleIcon className="h-5 w-5" />
                  {t.clockInBtn}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Recent Shifts Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Table Header and Controls */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{t.recentShiftsTitle}</h3>
            <p className="text-xs text-slate-500">
              {role === 'worker'
                ? `Showing recorded shift hours for ${currentWorkerName}. Guaranteed transparent record.`
                : 'Workforce shift ledger. Supervisors can audit hours and verify completed duties.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter by sector */}
            <select
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value as 'all' | Sector)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
            >
              <option value="all">All Sectors</option>
              <option value="construction">Construction Only</option>
              <option value="college">College Only</option>
            </select>

            {/* Filter by status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="verified">Verified</option>
              <option value="active">Active</option>
            </select>
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-5 py-3.5">Shift Date</th>
                <th className="px-5 py-3.5">Worker & Role</th>
                <th className="px-5 py-3.5">Site / Sector</th>
                <th className="px-5 py-3.5">Clock In / Out</th>
                <th className="px-5 py-3.5">Duration</th>
                <th className="px-5 py-3.5">Overtime</th>
                <th className="px-5 py-3.5">Est. Pay</th>
                <th className="px-5 py-3.5">Status</th>
                {role === 'employer' && <th className="px-5 py-3.5 text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredShifts.length === 0 ? (
                <tr>
                  <td colSpan={role === 'employer' ? 9 : 8} className="px-5 py-8 text-center text-slate-400">
                    No matching shifts logged yet. Clock in to record your shift!
                  </td>
                </tr>
              ) : (
                filteredShifts.map((shift) => {
                  const estPay =
                    shift.hours * shift.hourlyRate +
                    shift.overtimeHours * (shift.hourlyRate * 0.5);

                  return (
                    <tr key={shift.id} className="transition-colors hover:bg-slate-50/80">
                      <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900">
                        {shift.date}
                        <span className="block text-[11px] font-normal text-slate-400">
                          ID: {shift.id}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">{shift.workerName}</div>
                        <div className="text-xs text-slate-500">{shift.role}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="max-w-[200px] truncate font-medium text-slate-800" title={shift.siteLocation}>
                          {shift.siteLocation}
                        </div>
                        <span
                          className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                            shift.sector === 'construction'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {shift.sector}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700">
                        {shift.clockIn} — {shift.clockOut || 'Active (On Clock)'}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-bold text-slate-900">
                        {shift.hours.toFixed(1)} {t.hoursUnit}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        {shift.overtimeHours > 0 ? (
                          <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                            +{shift.overtimeHours.toFixed(1)}h OT (1.5x)
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-black text-emerald-800">
                        {t.currencySymbol}
                        {estPay.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            shift.status === 'Verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : shift.status === 'Active'
                              ? 'bg-blue-100 text-blue-800 animate-pulse'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {shift.status === 'Verified' && <CheckCircleIcon className="h-3 w-3" />}
                          {shift.status}
                        </span>
                      </td>
                      {role === 'employer' && (
                        <td className="whitespace-nowrap px-5 py-4 text-right">
                          {shift.status !== 'Verified' ? (
                            <button
                              type="button"
                              onClick={() => onVerifyShift(shift.id)}
                              className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors border border-emerald-300"
                            >
                              Verify Shift
                            </button>
                          ) : (
                            <span className="text-xs font-semibold text-emerald-700">Verified ✓</span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Decent Work Guarantee */}
        <div className="flex flex-wrap items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs text-slate-600">
          <span>Decent Work Guarantee: Clock timestamps are immutable and stored in live session state.</span>
          <span className="font-semibold text-emerald-700">Total shifts displayed: {filteredShifts.length}</span>
        </div>
      </div>
    </div>
  );
};
