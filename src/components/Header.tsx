import React from 'react';
import { Role, Sector, Language } from '../types';
import { Translations } from '../utils/translations';
import { ShieldIcon, MenuIcon, XIcon, BuildingIcon, AcademicCapIcon, UserCheckIcon, UsersIcon } from './Icons';

interface HeaderProps {
  role: Role;
  onRoleChange: (newRole: Role) => void;
  sector: Sector;
  onSectorChange: (newSector: Sector) => void;
  language: Language;
  onLanguageChange: (newLang: Language) => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  t: Translations;
  currentWorkerName: string;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  onRoleChange,
  sector,
  onSectorChange,
  language,
  onLanguageChange,
  isMobileMenuOpen,
  onToggleMobileMenu,
  t,
  currentWorkerName,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all">
      {/* Top Demo Notification Strip */}
      <div className="bg-slate-900 px-4 py-1 text-center text-xs font-medium text-slate-200 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-emerald-400">PROMPT WARS 2026</span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              SDG 8 Decent Work & Economic Growth Standards
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="rounded bg-slate-800 px-2 py-0.5 text-emerald-400 border border-slate-700">
              In-Memory Session Demo
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:hidden"
          >
            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
              <ShieldIcon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  {t.appName}
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                  v2026.1
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500">
                {t.appSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Global Selectors: Sector, Language & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sector Selector */}
          <div className="flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => onSectorChange('construction')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all ${
                sector === 'construction'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to Construction Sector"
            >
              <BuildingIcon className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Construction</span>
            </button>
            <button
              type="button"
              onClick={() => onSectorChange('college')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all ${
                sector === 'college'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to College Sector"
            >
              <AcademicCapIcon className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden sm:inline">College</span>
            </button>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <label htmlFor="language-select" className="sr-only">
              Select Language
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-2.5 pr-7 text-xs font-semibold text-slate-800 shadow-sm hover:border-slate-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="en">English (EN)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              ▼
            </span>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center rounded-lg bg-emerald-50 p-1 border border-emerald-200">
            <button
              type="button"
              onClick={() => onRoleChange('worker')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-bold transition-all ${
                role === 'worker'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-800 hover:bg-emerald-100/60'
              }`}
              title="Switch to Worker Mode"
            >
              <UserCheckIcon className="h-3.5 w-3.5" />
              <span>{role === 'worker' ? 'Worker' : 'Worker'}</span>
            </button>
            <button
              type="button"
              onClick={() => onRoleChange('employer')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-bold transition-all ${
                role === 'employer'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-200/60'
              }`}
              title="Switch to Employer/Admin Mode"
            >
              <UsersIcon className="h-3.5 w-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* User profile avatar indicator */}
          <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              {role === 'worker' ? 'RK' : 'AD'}
            </div>
            <div className="text-left text-xs leading-tight">
              <p className="font-bold text-slate-900">
                {role === 'worker' ? currentWorkerName : 'Site Ops Manager'}
              </p>
              <p className="text-[11px] text-emerald-700 font-medium">
                {role === 'worker' ? 'Verified Worker' : 'Supervisor Portal'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
