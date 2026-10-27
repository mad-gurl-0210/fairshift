import React, { useState } from 'react';
import { SkillCredential, Role, Sector } from '../types';
import { Translations } from '../utils/translations';
import { AwardIcon, ShieldIcon, CheckCircleIcon, PlusIcon } from './Icons';

interface SkillPassportSectionProps {
  credentials: SkillCredential[];
  onAddCredential: (cred: Omit<SkillCredential, 'id' | 'verificationHash' | 'status'>) => void;
  role: Role;
  sector: Sector;
  currentWorkerName: string;
  t: Translations;
}

export const SkillPassportSection: React.FC<SkillPassportSectionProps> = ({
  credentials,
  onAddCredential,
  role,
  sector,
  currentWorkerName,
  t,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newIssuer, setNewIssuer] = useState('');
  const [newBadgeType, setNewBadgeType] = useState<SkillCredential['badgeType']>('Safety');
  const [newSkills, setNewSkills] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newIssuer.trim()) return;

    onAddCredential({
      title: newTitle.trim(),
      issuingBody: newIssuer.trim(),
      badgeType: newBadgeType,
      dateEarned: new Date().toISOString().split('T')[0],
      expiryDate: '2028-12-31',
      skillsCovered: newSkills.split(',').map((s) => s.trim()).filter(Boolean),
    });

    setNewTitle('');
    setNewIssuer('');
    setNewSkills('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
              {t.navPassport}
            </h2>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-300">
              Portable Decent Work Credential
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            {role === 'worker'
              ? `Verified micro-credentials for ${currentWorkerName}. Portable across employers to command certified, fair hourly wage rates.`
              : 'Workforce qualification ledger. Validate worker certifications before allocating critical tasks.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(!showAddModal)}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 active:scale-95"
        >
          <PlusIcon className="h-4 w-4 text-emerald-400" />
          {showAddModal ? 'Close Form' : 'Register New Certification'}
        </button>
      </div>

      {/* Add Credential Form Modal/Drawer */}
      {showAddModal && (
        <div className="rounded-2xl border-2 border-emerald-200 bg-white p-6 shadow-md">
          <h3 className="text-lg font-black text-slate-900 mb-3">
            Register Verified Credential / Safety License
          </h3>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">Certification Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scaffolding Rigging Level 2 or Lab Chemical Safety"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Issuing Authority *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sector Skill Council (CSDC) or National Safety Council"
                  value={newIssuer}
                  onChange={(e) => setNewIssuer(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Credential Type</label>
                <select
                  value={newBadgeType}
                  onChange={(e) => setNewBadgeType(e.target.value as SkillCredential['badgeType'])}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Safety">Safety & Occupational Health</option>
                  <option value="Technical">Technical Craftsmanship</option>
                  <option value="Compliance">Compliance & Labour Rights</option>
                  <option value="Leadership">Crew Leadership & Marshalling</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Competencies Covered (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Fall arrest systems, Load rigging, Emergency protocol"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
              >
                Register Credential
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {credentials.map((cred) => (
          <div
            key={cred.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <AwardIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                      {cred.badgeType}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-slate-900">
                      {cred.title}
                    </h3>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-300">
                  <CheckCircleIcon className="h-3.5 w-3.5" />
                  {cred.status}
                </span>
              </div>

              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                <p>
                  <strong className="text-slate-800">Issuing Body:</strong> {cred.issuingBody}
                </p>
                <p>
                  <strong className="text-slate-800">Earned Date:</strong> {cred.dateEarned} •{' '}
                  <strong className="text-slate-800">Valid Until:</strong> {cred.expiryDate}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {cred.skillsCovered.map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 border border-slate-200"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Verification Hash */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400">
              <span className="font-mono">ID: {cred.id}</span>
              <span className="font-mono text-emerald-700 font-semibold">
                Ledger Proof: {cred.verificationHash}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
