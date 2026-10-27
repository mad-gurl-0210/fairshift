'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Role,
  Sector,
  Language,
  NavSection,
  Shift,
  SafetyReport,
  SafetyStatus,
  SkillCredential,
  FeedbackItem,
  PayslipBreakdown,
} from '../types';
import {
  initialShifts,
  initialSafetyReports,
  initialSkillCredentials,
  initialFeedbackList,
  samplePayslip,
} from '../data/mockData';
import { translations } from '../utils/translations';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { FatigueBanner } from '../components/FatigueBanner';
import { StatCards } from '../components/StatCards';
import { AttendanceSection } from '../components/AttendanceSection';
import { PayslipsSection } from '../components/PayslipsSection';
import { SafetySection } from '../components/SafetySection';
import { SkillPassportSection } from '../components/SkillPassportSection';
import { FeedbackSection } from '../components/FeedbackSection';
import { SettingsSection } from '../components/SettingsSection';
import {
  ClockIcon,
  ShieldIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  PlusIcon,
} from '../components/Icons';

export default function FairShiftApp() {
  // Master Interactive State
  const [role, setRole] = useState<Role>('worker');
  const [sector, setSector] = useState<Sector>('construction');
  const [language, setLanguage] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Core Data State (in-memory demo session)
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [safetyReports, setSafetyReports] = useState<SafetyReport[]>(initialSafetyReports);
  const [credentials, setCredentials] = useState<SkillCredential[]>(initialSkillCredentials);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(initialFeedbackList);
  const [payslipData, setPayslipData] = useState<PayslipBreakdown>(samplePayslip);

  // Active Shift Time Tracking State
  const [isShiftActive, setIsShiftActive] = useState<boolean>(false);
  const [activeShiftStartTime, setActiveShiftStartTime] = useState<string | null>(null);
  const [activeShiftDurationSeconds, setActiveShiftDurationSeconds] = useState<number>(0);
  const [activeShiftSite, setActiveShiftSite] = useState<string>(
    'Metro Flyover Extension - Pier 22B'
  );

  // Fatigue & Wage Parameters
  const [fatigueThreshold, setFatigueThreshold] = useState<number>(8.0);
  const [baseHourlyRate, setBaseHourlyRate] = useState<number>(650);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<number>(1.5);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = translations[language];
  const currentWorkerName = sector === 'construction' ? 'Ramesh Kumar' : 'Anita Sharma';
  const currentWorkerId = sector === 'construction' ? 'FS-W-104' : 'FS-W-108';

  // Stopwatch timer interval when a shift is active
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isShiftActive) {
      interval = setInterval(() => {
        setActiveShiftDurationSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isShiftActive]);

  // Adjust default hourly rate and payslip when sector switches
  useEffect(() => {
    if (sector === 'construction') {
      setBaseHourlyRate(650);
      setActiveShiftSite('Metro Flyover Extension - Pier 22B');
      setPayslipData((prev) => ({
        ...prev,
        workerName: 'Ramesh Kumar',
        workerId: 'FS-W-104',
        role: 'Scaffolding Safety Specialist',
        sector: 'construction',
        baseHourlyRate: 650,
        overtimeHourlyRate: 650 * overtimeMultiplier,
      }));
    } else {
      setBaseHourlyRate(580);
      setActiveShiftSite('National Engineering Campus - Chem Block B');
      setPayslipData((prev) => ({
        ...prev,
        workerName: 'Anita Sharma',
        workerId: 'FS-W-108',
        role: 'Campus Lab Safety Attendant',
        sector: 'college',
        baseHourlyRate: 580,
        overtimeHourlyRate: 580 * overtimeMultiplier,
      }));
    }
  }, [sector, overtimeMultiplier]);

  // Calculate Metrics from Shifts & Reports
  const sectorShifts = useMemo(
    () => shifts.filter((s) => s.sector === sector),
    [shifts, sector]
  );

  const workerShifts = useMemo(
    () =>
      shifts.filter((s) =>
        s.workerName.toLowerCase().includes(currentWorkerName.toLowerCase().split(' ')[0])
      ),
    [shifts, currentWorkerName]
  );

  const totalHoursWorked = useMemo(() => {
    const listToSum = role === 'worker' ? workerShifts : sectorShifts;
    const recordedSum = listToSum.reduce((acc, curr) => acc + curr.hours, 0);
    const activeHrs = isShiftActive ? activeShiftDurationSeconds / 3600 : 0;
    return recordedSum + activeHrs;
  }, [role, workerShifts, sectorShifts, isShiftActive, activeShiftDurationSeconds]);

  const overtimeHoursWorked = useMemo(() => {
    const listToSum = role === 'worker' ? workerShifts : sectorShifts;
    return listToSum.reduce((acc, curr) => acc + curr.overtimeHours, 0);
  }, [role, workerShifts, sectorShifts]);

  const estimatedEarnings = useMemo(() => {
    if (role === 'worker') {
      const regularPay = (totalHoursWorked - overtimeHoursWorked) * baseHourlyRate;
      const otPay = overtimeHoursWorked * (baseHourlyRate * overtimeMultiplier);
      const estTotal = regularPay + otPay;
      // Deduct approx 12% statutory
      return Math.max(0, estTotal * 0.88);
    } else {
      // Employer total payroll liability for sector
      return sectorShifts.reduce((acc, s) => {
        const reg = (s.hours - s.overtimeHours) * s.hourlyRate;
        const ot = s.overtimeHours * (s.hourlyRate * overtimeMultiplier);
        return acc + reg + ot;
      }, 0);
    }
  }, [role, totalHoursWorked, overtimeHoursWorked, baseHourlyRate, overtimeMultiplier, sectorShifts]);

  // Max single shift hours logged by worker to compare against threshold
  const maxSingleShiftHours = useMemo(() => {
    const recordedMax = workerShifts.reduce((max, s) => Math.max(max, s.hours), 0);
    const activeHrs = isShiftActive ? activeShiftDurationSeconds / 3600 : 0;
    return Math.max(recordedMax, activeHrs);
  }, [workerShifts, isShiftActive, activeShiftDurationSeconds]);

  const fatigueRisk = maxSingleShiftHours >= fatigueThreshold;

  const openReportsCount = useMemo(
    () =>
      safetyReports.filter(
        (r) => r.status === 'Under Review' || r.status === 'Action In Progress'
      ).length,
    [safetyReports]
  );

  const resolvedReportsCount = useMemo(
    () => safetyReports.filter((r) => r.status === 'Resolved').length,
    [safetyReports]
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Interactions: Check in
  const handleCheckIn = (location: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setIsShiftActive(true);
    setActiveShiftStartTime(timeString);
    setActiveShiftDurationSeconds(0);
    setActiveShiftSite(location);
    showToast(`Checked in to ${location} at ${timeString}. Shift clock active!`);
  };

  // Interactions: Check out
  const handleCheckOut = () => {
    const now = new Date();
    const clockOutString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const elapsedHours = Math.max(0.25, Math.round((activeShiftDurationSeconds / 3600) * 100) / 100);
    const otHours = elapsedHours > fatigueThreshold ? elapsedHours - fatigueThreshold : 0;

    const newShift: Shift = {
      id: `SH-2026-${Math.floor(100 + Math.random() * 900)}`,
      workerName: currentWorkerName,
      workerId: currentWorkerId,
      role: sector === 'construction' ? 'Scaffolding Safety Specialist' : 'Campus Lab Safety Attendant',
      sector,
      siteLocation: activeShiftSite,
      date: now.toISOString().split('T')[0],
      clockIn: activeShiftStartTime || '08:00 AM',
      clockOut: clockOutString,
      hours: elapsedHours,
      overtimeHours: otHours,
      hourlyRate: baseHourlyRate,
      status: 'Completed',
      verifiedByEmployer: false,
    };

    setShifts([newShift, ...shifts]);
    setIsShiftActive(false);
    setActiveShiftStartTime(null);
    setActiveShiftDurationSeconds(0);
    showToast(`Shift completed: ${elapsedHours} hrs logged. Earnings updated!`);
  };

  // Interactions: Verify shift
  const handleVerifyShift = (shiftId: string) => {
    setShifts((prev) =>
      prev.map((s) => (s.id === shiftId ? { ...s, status: 'Verified', verifiedByEmployer: true } : s))
    );
    showToast(`Shift ${shiftId} verified by Employer.`);
  };

  // Interactions: Submit safety report
  const handleSubmitSafetyReport = (
    newReportData: Omit<SafetyReport, 'id' | 'timestamp' | 'status'>
  ) => {
    const now = new Date();
    const newReport: SafetyReport = {
      ...newReportData,
      id: `SAF-2026-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      status: 'Under Review',
    };
    setSafetyReports([newReport, ...safetyReports]);
    showToast(`Safety Hazard report "${newReport.title}" submitted.`);
  };

  // Interactions: Update safety status
  const handleUpdateSafetyStatus = (id: string, newStatus: SafetyStatus, notes?: string) => {
    setSafetyReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus, resolutionNotes: notes || r.resolutionNotes } : r))
    );
    showToast(`Report ${id} updated to status: ${newStatus}`);
  };

  // Interactions: Add skill credential
  const handleAddCredential = (
    credData: Omit<SkillCredential, 'id' | 'verificationHash' | 'status'>
  ) => {
    const newCred: SkillCredential = {
      ...credData,
      id: `SKL-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Verified',
      verificationHash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random()
        .toString(16)
        .substring(2, 6)}`,
    };
    setCredentials([newCred, ...credentials]);
    showToast(`Credential "${newCred.title}" registered & verified.`);
  };

  // Interactions: Submit feedback
  const handleSubmitFeedback = (
    itemData: Omit<FeedbackItem, 'id' | 'timestamp' | 'status'>
  ) => {
    const now = new Date();
    const newItem: FeedbackItem = {
      ...itemData,
      id: `FB-${Math.floor(200 + Math.random() * 800)}`,
      timestamp: now.toISOString().split('T')[0],
      status: 'Received',
    };
    setFeedbackList([newItem, ...feedbackList]);
    showToast(`Feedback on "${newItem.category}" submitted.`);
  };

  // Interactions: Reset Demo Data
  const handleResetDemoData = () => {
    setShifts(initialShifts);
    setSafetyReports(initialSafetyReports);
    setCredentials(initialSkillCredentials);
    setFeedbackList(initialFeedbackList);
    setFatigueThreshold(8.0);
    setIsShiftActive(false);
    setActiveShiftStartTime(null);
    setActiveShiftDurationSeconds(0);
    showToast('Session reset to default demo data.');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Toast Alert Popup */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-300 bg-emerald-950 px-4 py-3 text-xs font-bold text-white shadow-xl animate-fade-in"
        >
          <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        role={role}
        onRoleChange={setRole}
        sector={sector}
        onSectorChange={setSector}
        language={language}
        onLanguageChange={setLanguage}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        t={t}
        currentWorkerName={currentWorkerName}
      />

      <div className="flex flex-1">
        {/* Responsive Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          role={role}
          onRoleChange={setRole}
          sector={sector}
          onSectorChange={setSector}
          language={language}
          onLanguageChange={setLanguage}
          t={t}
          isShiftActive={isShiftActive}
          openReportsCount={openReportsCount}
          fatigueRisk={fatigueRisk}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* Top Fatigue Warning Alert Banner (Always visible when threshold exceeded) */}
          <FatigueBanner
            currentHours={maxSingleShiftHours}
            threshold={fatigueThreshold}
            t={t}
            onTakeBreak={() => {
              showToast('Rest interval logged. Stand down acknowledged for safety.');
              setActiveSection('attendance');
            }}
            workerName={currentWorkerName}
            role={role}
          />

          {/* Section 1: Dashboard Overview */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Dashboard Hero Banner */}
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200">
                      {role === 'worker' ? 'Worker Self-Service Dashboard' : 'Site Supervisor & Safety Control'}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Sector: <strong className="capitalize text-slate-800">{sector}</strong>
                    </span>
                  </div>
                  <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                    {role === 'worker'
                      ? `Welcome, ${currentWorkerName}`
                      : `Operations Control — ${sector === 'construction' ? 'Metro Construction Site' : 'Campus Facilities'}`}
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    {role === 'worker'
                      ? 'Live shift status, guaranteed hourly wage calculation, verified skill passport, and whistleblower safety reporting.'
                      : 'Real-time site headcount, aggregate shift records, occupational hazard triage, and fatigue risk management.'}
                  </p>
                </div>

                {/* Hero Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {role === 'worker' ? (
                    <>
                      {isShiftActive ? (
                        <button
                          type="button"
                          onClick={handleCheckOut}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-slate-800 active:scale-95"
                        >
                          <ClockIcon className="h-4 w-4 text-emerald-400" />
                          {t.clockOutBtn}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleCheckIn(activeShiftSite)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                          {t.clockInBtn}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveSection('safety')}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-bold text-red-700 hover:bg-red-100"
                      >
                        <AlertTriangleIcon className="h-4 w-4" />
                        Report Hazard
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveSection('attendance')}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-slate-800"
                      >
                        Audit All Shifts
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSection('safety')}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-700"
                      >
                        Triage Hazards ({openReportsCount})
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Five Dashboard Stat Cards */}
              <StatCards
                role={role}
                sector={sector}
                workersPresentCount={sector === 'construction' ? 42 : 28}
                totalWorkersCount={sector === 'construction' ? 48 : 30}
                totalHoursWorked={totalHoursWorked}
                overtimeHoursWorked={overtimeHoursWorked}
                estimatedEarnings={estimatedEarnings}
                openReportsCount={openReportsCount}
                resolvedReportsCount={resolvedReportsCount}
                fatigueRisk={fatigueRisk}
                fatigueThreshold={fatigueThreshold}
                isShiftActive={isShiftActive}
                activeShiftDurationHours={activeShiftDurationSeconds / 3600}
                onNavigateTo={(sec) => setActiveSection(sec)}
                t={t}
              />

              {/* Two Column Grid: Attendance Shift Ledger Preview & Safety Reports Preview */}
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {/* Left: Recent Shifts Preview */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-5 w-5 text-emerald-600" />
                      <h2 className="text-base font-bold text-slate-900">
                        {t.recentShiftsTitle}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSection('attendance')}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                    >
                      View All Shifts →
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {sectorShifts.slice(0, 4).map((shift) => (
                      <div
                        key={shift.id}
                        className="flex items-center justify-between py-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900">
                            {shift.workerName} • <span className="font-normal text-slate-500">{shift.role}</span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {shift.date} • {shift.clockIn} - {shift.clockOut || 'Active'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900">
                            {shift.hours.toFixed(1)} {t.hoursUnit}
                          </div>
                          <span
                            className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold ${
                              shift.status === 'Verified'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {shift.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Safety Hazards Preview */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangleIcon className="h-5 w-5 text-amber-500" />
                      <h2 className="text-base font-bold text-slate-900">
                        Active Hazard Queue
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSection('safety')}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                    >
                      Triage All ({safetyReports.length}) →
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {safetyReports.slice(0, 3).map((report) => (
                      <div key={report.id} className="py-3 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                              report.severity === 'Critical'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {report.severity}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {report.timestamp}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900">{report.title}</h4>
                        <p className="line-clamp-1 text-slate-600 text-[11px]">
                          {report.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Decent Work Standard Banner */}
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow">
                      <ShieldIcon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        United Nations SDG 8 Decent Work Compliance
                      </h3>
                      <p className="text-xs text-slate-600">
                        FairShift protects wage transparency, occupational ergonomics, timely remuneration, and portable skill dignity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveSection('passport')}
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                    >
                      View Skill Passport
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection('payslips')}
                      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Audit Payslip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Attendance & Shifts */}
          {activeSection === 'attendance' && (
            <AttendanceSection
              shifts={shifts}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              isShiftActive={isShiftActive}
              activeShiftStartTime={activeShiftStartTime}
              activeShiftDurationSeconds={activeShiftDurationSeconds}
              activeShiftSite={activeShiftSite}
              role={role}
              sector={sector}
              currentWorkerName={currentWorkerName}
              onVerifyShift={handleVerifyShift}
              t={t}
              fatigueRisk={fatigueRisk}
              fatigueThreshold={fatigueThreshold}
            />
          )}

          {/* Section 3: Transparent Payslips */}
          {activeSection === 'payslips' && (
            <PayslipsSection
              payslip={payslipData}
              role={role}
              sector={sector}
              t={t}
              currentWorkerName={currentWorkerName}
            />
          )}

          {/* Section 4: Safety Reports */}
          {activeSection === 'safety' && (
            <SafetySection
              reports={safetyReports}
              onSubmitReport={handleSubmitSafetyReport}
              onUpdateStatus={handleUpdateSafetyStatus}
              role={role}
              sector={sector}
              currentWorkerName={currentWorkerName}
              t={t}
            />
          )}

          {/* Section 5: Skill Passport */}
          {activeSection === 'passport' && (
            <SkillPassportSection
              credentials={credentials}
              onAddCredential={handleAddCredential}
              role={role}
              sector={sector}
              currentWorkerName={currentWorkerName}
              t={t}
            />
          )}

          {/* Section 6: Worker Voice & Feedback */}
          {activeSection === 'feedback' && (
            <FeedbackSection
              feedbackList={feedbackList}
              onSubmitFeedback={handleSubmitFeedback}
              role={role}
              sector={sector}
              currentWorkerName={currentWorkerName}
              t={t}
            />
          )}

          {/* Section 7: Settings & Thresholds */}
          {activeSection === 'settings' && (
            <SettingsSection
              fatigueThreshold={fatigueThreshold}
              onUpdateFatigueThreshold={setFatigueThreshold}
              baseHourlyRate={baseHourlyRate}
              onUpdateBaseRate={setBaseHourlyRate}
              overtimeMultiplier={overtimeMultiplier}
              onUpdateOvertimeMultiplier={setOvertimeMultiplier}
              role={role}
              onRoleChange={setRole}
              sector={sector}
              onSectorChange={setSector}
              language={language}
              onLanguageChange={setLanguage}
              onResetDemoData={handleResetDemoData}
              t={t}
              currentHours={maxSingleShiftHours}
            />
          )}
        </main>
      </div>

      {/* Global Bottom Status Bar */}
      <footer className="border-t border-slate-200 bg-white py-3 px-4 text-xs text-slate-500 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">FairShift</span>
            <span>—</span>
            <span>Prompt Wars 2026 Decent Work Prototype</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>React State Active</span>
            <span>•</span>
            <span>Zero External Secrets</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Accessible & Responsive</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
