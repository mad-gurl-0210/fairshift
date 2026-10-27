export type Role = 'worker' | 'employer';
export type Sector = 'construction' | 'college';
export type Language = 'en' | 'te' | 'hi';

export type NavSection =
  | 'dashboard'
  | 'attendance'
  | 'payslips'
  | 'safety'
  | 'passport'
  | 'feedback'
  | 'settings';

export type ShiftStatus = 'Completed' | 'Active' | 'Verified' | 'Pending Review';

export interface Shift {
  id: string;
  workerName: string;
  workerId: string;
  role: string;
  sector: Sector;
  siteLocation: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  hours: number;
  overtimeHours: number;
  hourlyRate: number;
  status: ShiftStatus;
  verifiedByEmployer: boolean;
}

export type SafetySeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type SafetyCategory =
  | 'Fall Hazard'
  | 'Electrical'
  | 'Machinery'
  | 'Chemical & Lab'
  | 'Heat Stress & Fatigue'
  | 'Ergonomic'
  | 'Structural & Site'
  | 'Other';

export type SafetyStatus = 'Under Review' | 'Action In Progress' | 'Resolved' | 'Escalated';

export interface SafetyReport {
  id: string;
  title: string;
  description: string;
  sector: Sector;
  location: string;
  severity: SafetySeverity;
  category: SafetyCategory;
  reportedBy: string;
  isAnonymous: boolean;
  timestamp: string;
  status: SafetyStatus;
  resolutionNotes?: string;
}

export interface SkillCredential {
  id: string;
  title: string;
  issuingBody: string;
  dateEarned: string;
  expiryDate: string;
  status: 'Verified' | 'Pending Renewal';
  verificationHash: string;
  badgeType: 'Safety' | 'Technical' | 'Compliance' | 'Leadership';
  skillsCovered: string[];
}

export interface FeedbackItem {
  id: string;
  workerRole: string;
  category: 'Wage Fairness' | 'Safety Conditions' | 'Shift Scheduling' | 'Rest Facilities' | 'Supervisor Conduct';
  rating: number; // 1 to 5
  comment: string;
  timestamp: string;
  status: 'Received' | 'Reviewed';
}

export interface DeductionItem {
  name: string;
  amount: number;
  description: string;
}

export interface PayslipBreakdown {
  period: string;
  workerName: string;
  workerId: string;
  role: string;
  sector: Sector;
  baseHourlyRate: number;
  overtimeHourlyRate: number;
  regularHours: number;
  overtimeHours: number;
  grossRegularPay: number;
  grossOvertimePay: number;
  grossTotalPay: number;
  deductions: DeductionItem[];
  totalDeductions: number;
  netEstimatedEarnings: number;
  disbursementMode: string;
  complianceStandard: string;
}
