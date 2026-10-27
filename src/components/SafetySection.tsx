import React, { useState } from 'react';
import { SafetyReport, SafetySeverity, SafetyCategory, SafetyStatus, Sector, Role } from '../types';
import { Translations } from '../utils/translations';
import { AlertTriangleIcon, CheckCircleIcon, ShieldIcon, PlusIcon } from './Icons';

interface SafetySectionProps {
  reports: SafetyReport[];
  onSubmitReport: (newReport: Omit<SafetyReport, 'id' | 'timestamp' | 'status'>) => void;
  onUpdateStatus: (id: string, newStatus: SafetyStatus, notes?: string) => void;
  role: Role;
  sector: Sector;
  currentWorkerName: string;
  t: Translations;
}

export const SafetySection: React.FC<SafetySectionProps> = ({
  reports,
  onSubmitReport,
  onUpdateStatus,
  role,
  sector,
  currentWorkerName,
  t,
}) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<SafetySeverity>('High');
  const [category, setCategory] = useState<SafetyCategory>(
    sector === 'construction' ? 'Fall Hazard' : 'Chemical & Lab'
  );
  const [location, setLocation] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      return;
    }

    const reportLocation = location.trim()
      ? location.trim()
      : sector === 'construction'
      ? 'Metro Extension Site B - Scaffolding Section'
      : 'College Science Complex - Prep Lab';

    onSubmitReport({
      title: title.trim(),
      description: description.trim(),
      sector,
      location: reportLocation,
      severity,
      category,
      reportedBy: isAnonymous ? 'Anonymous Worker' : currentWorkerName,
      isAnonymous,
    });

    setTitle('');
    setDescription('');
    setLocation('');
    setSubmissionSuccess(true);
    setIsFormOpen(false);
    setTimeout(() => setSubmissionSuccess(false), 5000);
  };

  const filteredReports = reports.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status.toLowerCase().replace(/\s+/g, '') === filterStatus.toLowerCase().replace(/\s+/g, '');
  });

  const getSeverityBadgeClass = (sev: SafetySeverity) => {
    switch (sev) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300 font-black';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300 font-extrabold';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
      case 'Low':
        return 'bg-blue-100 text-blue-800 border-blue-300 font-semibold';
    }
  };

  const getStatusBadgeClass = (st: SafetyStatus) => {
    switch (st) {
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Action In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Escalated':
        return 'bg-purple-100 text-purple-800 border-purple-300 animate-pulse';
      case 'Under Review':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Quick Report Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
              {t.safetyReportsTitle}
            </h2>
            <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-800 border border-red-300">
              Zero-Retaliation Reporting
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            {role === 'worker'
              ? 'Report site hazards, unsafe scaffolding, chemical spills, or excessive fatigue. Reports are reviewed by safety marshalls with protected whistleblower rights.'
              : 'Triage, assign corrective actions, and resolve occupational hazard reports across Construction and College operations.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-red-600/20 transition-all hover:bg-red-700 active:scale-95"
        >
          <PlusIcon className="h-5 w-5" />
          {isFormOpen ? 'Close Form' : t.submitSafetyBtn}
        </button>
      </div>

      {/* Success Notification Alert */}
      {submissionSuccess && (
        <div
          role="alert"
          className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
            <span>
              Safety hazard successfully submitted! Assigned to site marshalls for priority triage. Thank you for protecting fellow workers.
            </span>
          </div>
        </div>
      )}

      {/* 1. Hazard Submission Form Drawer / Accordion */}
      {isFormOpen && (
        <div className="rounded-2xl border-2 border-red-200 bg-white p-6 shadow-md sm:p-7">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-700">
                <AlertTriangleIcon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Submit Occupational Hazard / Safety Incident
              </h3>
            </div>
            <span className="text-xs font-medium text-slate-500">
              Target Sector: <span className="font-bold capitalize">{sector}</span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Incident Title */}
              <div className="sm:col-span-2">
                <label htmlFor="report-title" className="block text-xs font-bold text-slate-800">
                  Incident Title / Hazard Summary *
                </label>
                <input
                  id="report-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Unanchored guardrail on 4th floor edge or Unlabeled chemical containers"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Severity Selection */}
              <div>
                <label htmlFor="report-severity" className="block text-xs font-bold text-slate-800">
                  Severity Level *
                </label>
                <select
                  id="report-severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as SafetySeverity)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="Critical">🔴 Critical (Immediate stoppage risk / life hazard)</option>
                  <option value="High">🟠 High (Serious injury risk without PPE / guard)</option>
                  <option value="Medium">🟡 Medium (Requires corrective repair within 24h)</option>
                  <option value="Low">🔵 Low (Minor housekeeping / precautionary report)</option>
                </select>
              </div>

              {/* Hazard Category */}
              <div>
                <label htmlFor="report-category" className="block text-xs font-bold text-slate-800">
                  Hazard Category *
                </label>
                <select
                  id="report-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SafetyCategory)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="Fall Hazard">Fall Hazard & Scaffolding Edge</option>
                  <option value="Electrical">Electrical Feeder & Cable Insulation</option>
                  <option value="Chemical & Lab">Chemical, Fume Hood & Hazardous Materials</option>
                  <option value="Heat Stress & Fatigue">Heat Stress, Dehydration & Shift Fatigue</option>
                  <option value="Machinery">Heavy Machinery, Crane & Rigging</option>
                  <option value="Ergonomic">Heavy Lifting & Repetitive Strain</option>
                  <option value="Structural & Site">Structural Pit, Trench or Flooring Integrity</option>
                  <option value="Other">Other Occupational Safety Hazard</option>
                </select>
              </div>

              {/* Location Specification */}
              <div className="sm:col-span-2">
                <label htmlFor="report-location" className="block text-xs font-bold text-slate-800">
                  Exact Location / Building / Deck
                </label>
                <input
                  id="report-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Metro Flyover Pier 22B, Level 4 Scaffolding or Campus Chemistry Block B Room 14"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label htmlFor="report-description" className="block text-xs font-bold text-slate-800">
                  Detailed Hazard Description *
                </label>
                <textarea
                  id="report-description"
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the condition, equipment involved, and any immediate danger observed..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Anonymous Checkbox */}
              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  id="report-anonymous"
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="report-anonymous" className="text-xs font-medium text-slate-700">
                  Submit anonymously (protects whistleblower identity from site supervisors)
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-red-700"
              >
                Submit Hazard Report
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. Submitted Reports List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Table / List Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Reported Hazards & Corrective Action Queue
            </h3>
            <p className="text-xs text-slate-500">
              Tracking reported incidents. All corrective measures are timestamped under Decent Work compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Filter:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">All ({reports.length})</option>
              <option value="underreview">Under Review</option>
              <option value="actioninprogress">Action In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
        </div>

        {/* Reports Cards / Rows */}
        <div className="divide-y divide-slate-100">
          {filteredReports.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No reports match the selected filter.
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="p-5 transition-colors hover:bg-slate-50/70 sm:p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500">
                        {report.id}
                      </span>
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[11px] uppercase ${getSeverityBadgeClass(
                          report.severity
                        )}`}
                      >
                        {report.severity}
                      </span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                        {report.category}
                      </span>
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${getStatusBadgeClass(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">
                      {report.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {report.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span>📍 <strong className="text-slate-700">{report.location}</strong></span>
                      <span>🕒 {report.timestamp}</span>
                      <span>👤 {report.reportedBy}</span>
                    </div>

                    {report.resolutionNotes && (
                      <div className="mt-2 rounded-lg bg-emerald-50/80 p-3 border border-emerald-200 text-xs text-emerald-950">
                        <span className="font-bold text-emerald-900">Resolution Update: </span>
                        {report.resolutionNotes}
                      </div>
                    )}
                  </div>

                  {/* Status Action Buttons for Employer / Admin or Review */}
                  <div className="flex shrink-0 flex-row sm:flex-col items-end gap-2 pt-2 sm:pt-0">
                    {report.status !== 'Resolved' && (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStatus(
                            report.id,
                            'Resolved',
                            'Hazard rectified, verified by site safety marshall under FairShift standard.'
                          )
                        }
                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                      >
                        Mark Resolved ✓
                      </button>
                    )}

                    {report.status === 'Under Review' && (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStatus(
                            report.id,
                            'Action In Progress',
                            'Corrective crew dispatched to site.'
                          )
                        }
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        Dispatch Crew
                      </button>
                    )}

                    {report.status !== 'Escalated' && report.status !== 'Resolved' && (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStatus(
                            report.id,
                            'Escalated',
                            'Escalated to State Labour & Safety Inspectorate.'
                          )
                        }
                        className="rounded-lg border border-red-300 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700 hover:bg-red-100"
                      >
                        Escalate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
