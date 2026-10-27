import React from 'react';
import { NavSection, Role, Sector, Language } from '../types';
import { Translations } from '../utils/translations';
import {
  LayoutDashboardIcon,
  ClockIcon,
  WalletIcon,
  AlertTriangleIcon,
  AwardIcon,
  MessageSquareIcon,
  SettingsIcon,
  ShieldIcon,
  BuildingIcon,
  AcademicCapIcon,
  UserCheckIcon,
  UsersIcon,
  XIcon,
} from './Icons';

interface SidebarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  role: Role;
  onRoleChange: (role: Role) => void;
  sector: Sector;
  onSectorChange: (sector: Sector) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: Translations;
  isShiftActive: boolean;
  openReportsCount: number;
  fatigueRisk: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  isMobileOpen,
  onCloseMobile,
  role,
  onRoleChange,
  sector,
  onSectorChange,
  language,
  onLanguageChange,
  t,
  isShiftActive,
  openReportsCount,
  fatigueRisk,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavSection,
      label: t.navDashboard,
      icon: LayoutDashboardIcon,
    },
    {
      id: 'attendance' as NavSection,
      label: t.navAttendance,
      icon: ClockIcon,
      badge: isShiftActive ? 'ON CLOCK' : undefined,
      badgeColor: 'bg-emerald-600 text-white animate-pulse',
    },
    {
      id: 'payslips' as NavSection,
      label: t.navPayslips,
      icon: WalletIcon,
    },
    {
      id: 'safety' as NavSection,
      label: t.navSafety,
      icon: AlertTriangleIcon,
      badge: openReportsCount > 0 ? `${openReportsCount} OPEN` : undefined,
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      id: 'passport' as NavSection,
      label: t.navPassport,
      icon: AwardIcon,
      badge: 'VERIFIED',
      badgeColor: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    },
    {
      id: 'feedback' as NavSection,
      label: t.navFeedback,
      icon: MessageSquareIcon,
    },
    {
      id: 'settings' as NavSection,
      label: t.navSettings,
      icon: SettingsIcon,
      badge: fatigueRisk ? 'ALERT' : undefined,
      badgeColor: 'bg-red-500 text-white animate-bounce',
    },
  ];

  const handleNavClick = (sectionId: NavSection) => {
    onSelectSection(sectionId);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between bg-white px-4 py-5 border-r border-slate-200">
      <div>
        {/* Mobile Header Inside Drawer */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <ShieldIcon className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900">{t.appName}</span>
              <p className="text-[11px] text-slate-500">{t.appSubtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close navigation"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Current Active Sector & Role Quick Toggle for Mobile */}
        <div className="mb-5 space-y-2 lg:hidden">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Sector & Role
            </span>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => onSectorChange('construction')}
                className={`flex items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-semibold ${
                  sector === 'construction'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <BuildingIcon className="h-3 w-3" />
                Construction
              </button>
              <button
                type="button"
                onClick={() => onSectorChange('college')}
                className={`flex items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-semibold ${
                  sector === 'college'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <AcademicCapIcon className="h-3 w-3" />
                College
              </button>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => onRoleChange('worker')}
                className={`flex items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-bold ${
                  role === 'worker'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <UserCheckIcon className="h-3 w-3" />
                Worker
              </button>
              <button
                type="button"
                onClick={() => onRoleChange('employer')}
                className={`flex items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-bold ${
                  role === 'employer'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <UsersIcon className="h-3 w-3" />
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Section Title */}
        <div className="mb-2 px-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Workforce Portal
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1" aria-label="Sidebar Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 shadow-sm border border-emerald-200/80 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent
                    className={`h-5 w-5 transition-colors ${
                      isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-wide ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Decent Work Assurance Footer Card */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-white">
            <ShieldIcon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Decent Work Charter</p>
            <p className="text-[11px] text-slate-500">Fair Pay • Safe Shifts</p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
          Guaranteed transparency under ILO SDG 8 guidelines. Shift records are tamper-proof and verifiable.
        </p>
        <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2 text-[10px] font-semibold text-slate-500">
          <span>Active View: {role === 'worker' ? 'Worker Self-Service' : 'Employer Supervisor'}</span>
          <span className="text-emerald-700">● Live</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar: Sticky on the left */}
      <aside className="hidden lg:block lg:w-64 lg:shrink-0 lg:border-r lg:border-slate-200 bg-white">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          {navContent}
        </div>
      </aside>

      {/* Mobile Drawer Backdrop & Drawer */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">{navContent}</div>
      </div>
    </>
  );
};
