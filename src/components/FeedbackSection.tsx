import React, { useState } from 'react';
import { FeedbackItem, Role, Sector } from '../types';
import { Translations } from '../utils/translations';
import { MessageSquareIcon, CheckCircleIcon, ShieldIcon } from './Icons';

interface FeedbackSectionProps {
  feedbackList: FeedbackItem[];
  onSubmitFeedback: (item: Omit<FeedbackItem, 'id' | 'timestamp' | 'status'>) => void;
  role: Role;
  sector: Sector;
  currentWorkerName: string;
  t: Translations;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  feedbackList,
  onSubmitFeedback,
  role,
  sector,
  currentWorkerName,
  t,
}) => {
  const [category, setCategory] = useState<FeedbackItem['category']>('Rest Facilities');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onSubmitFeedback({
      workerRole: role === 'worker' ? 'Scaffolding Safety Specialist' : 'Site Associate',
      category,
      rating,
      comment: comment.trim(),
    });

    setComment('');
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
              {t.navFeedback}
            </h2>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-300">
              Worker Voice & Grievance Mechanism
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            {role === 'worker'
              ? 'Share honest feedback on site rest shelters, wage calculations, supervisor conduct, and hydration facilities without fear of retribution.'
              : 'Workforce satisfaction pulse and grievance redressal stream. Monitor real working conditions on the ground.'}
          </p>
        </div>
      </div>

      {/* Decent Work Pulse Summary Card */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Decent Work Pulse
          </span>
          <div className="mt-2 text-3xl font-black text-emerald-700">4.7 / 5.0</div>
          <p className="mt-1 text-[11px] text-slate-500">Benchmark: ILO Tier 1</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Wage Transparency
          </span>
          <div className="mt-2 text-3xl font-black text-slate-900">4.9 / 5.0</div>
          <p className="mt-1 text-[11px] text-slate-500">Zero payroll discrepancies</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Rest & Hydration
          </span>
          <div className="mt-2 text-3xl font-black text-amber-600">4.2 / 5.0</div>
          <p className="mt-1 text-[11px] text-slate-500">Active improvements underway</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Hazard Response
          </span>
          <div className="mt-2 text-3xl font-black text-emerald-700">4.8 / 5.0</div>
          <p className="mt-1 text-[11px] text-slate-500">Avg. 1.8 hrs resolution</p>
        </div>
      </div>

      {submittedToast && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
            <span>
              Your feedback was recorded securely. Thank you for contributing to fair and dignified labour standards.
            </span>
          </div>
        </div>
      )}

      {/* Two Column: Submission Form & List */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Feedback Submission Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Submit Workplace Feedback
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Directly informs site safety committees and regional labour inspectors.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fb-category" className="block text-xs font-bold text-slate-700">
                Category
              </label>
              <select
                id="fb-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as FeedbackItem['category'])}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none"
              >
                <option value="Rest Facilities">Rest Facilities & Hydration</option>
                <option value="Wage Fairness">Wage Transparency & Timely Pay</option>
                <option value="Safety Conditions">Safety Gear & Hazard Containment</option>
                <option value="Shift Scheduling">Shift Scheduling & Overtime Limits</option>
                <option value="Supervisor Conduct">Supervisor Conduct & Worker Dignity</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Satisfaction Rating</label>
              <div className="mt-1 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`h-8 w-8 rounded-lg text-sm font-bold transition-all ${
                      rating >= star
                        ? 'bg-amber-400 text-slate-900 shadow-sm'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-700 ml-2">
                  {rating} / 5
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="fb-comment" className="block text-xs font-bold text-slate-700">
                Your Observation or Suggestion
              </label>
              <textarea
                id="fb-comment"
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="e.g. Cold drinking water station needed near Level 4 scaffold..."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Feedback List */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Recent Worker Voices & Suggestions
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Public feed of workplace feedback reviewed by Decent Work auditors.
          </p>

          <div className="space-y-3">
            {feedbackList.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-800">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-amber-500">
                      {'★'.repeat(item.rating)}
                      <span className="text-slate-300">{'★'.repeat(5 - item.rating)}</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{item.timestamp}</span>
                </div>

                <p className="mt-2 text-xs text-slate-800 leading-relaxed">
                  "{item.comment}"
                </p>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60 pt-2">
                  <span>Author: {item.workerRole}</span>
                  <span className="font-semibold text-emerald-700">Status: {item.status} ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
