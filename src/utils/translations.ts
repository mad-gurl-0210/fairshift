import { Language } from '../types';

export interface Translations {
  appName: string;
  appSubtitle: string;
  demoNotice: string;
  sessionStateNotice: string;
  roleWorker: string;
  roleEmployer: string;
  sectorConstruction: string;
  sectorCollege: string;
  navDashboard: string;
  navAttendance: string;
  navPayslips: string;
  navSafety: string;
  navPassport: string;
  navFeedback: string;
  navSettings: string;
  cardWorkersPresent: string;
  cardHoursWorked: string;
  cardEstimatedEarnings: string;
  cardSafetyReports: string;
  cardFatigueAlerts: string;
  clockInBtn: string;
  clockOutBtn: string;
  shiftActiveBadge: string;
  shiftIdleBadge: string;
  fatigueWarningTitle: string;
  fatigueWarningDesc: string;
  fatigueNormalStatus: string;
  recentShiftsTitle: string;
  safetyReportsTitle: string;
  submitSafetyBtn: string;
  viewPayslipBtn: string;
  verifiedBadge: string;
  underReviewBadge: string;
  resolvedBadge: string;
  hoursUnit: string;
  currencySymbol: string;
  exportPdfBtn: string;
  filterAll: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "FairShift",
    appSubtitle: "Decent Work Platform",
    demoNotice: "Demo Mode • In-Memory Session State • Prompt Wars 2026",
    sessionStateNotice: "Live interactive state. Data is held in memory for this demo session and is not stored in an external database.",
    roleWorker: "Worker View",
    roleEmployer: "Employer / Admin View",
    sectorConstruction: "Construction Sector",
    sectorCollege: "College Sector",
    navDashboard: "Dashboard",
    navAttendance: "Attendance & Shifts",
    navPayslips: "Transparent Payslips",
    navSafety: "Safety Reports",
    navPassport: "Skill Passport",
    navFeedback: "Worker Voice & Feedback",
    navSettings: "Settings & Thresholds",
    cardWorkersPresent: "Workers Present",
    cardHoursWorked: "Hours Logged",
    cardEstimatedEarnings: "Estimated Earnings",
    cardSafetyReports: "Safety Reports",
    cardFatigueAlerts: "Fatigue Alerts",
    clockInBtn: "Check In to Shift",
    clockOutBtn: "Check Out of Shift",
    shiftActiveBadge: "Active Shift (On Clock)",
    shiftIdleBadge: "Not Checked In (Off Clock)",
    fatigueWarningTitle: "Fatigue Risk Alert: Safe Work Hours Exceeded!",
    fatigueWarningDesc: "Continuous working hours have reached or exceeded the configured limit. Mandatory rest break advised under Decent Work Standards.",
    fatigueNormalStatus: "Safe Fatigue Range (Within Threshold)",
    recentShiftsTitle: "Recent Shift Logs & Time Tracking",
    safetyReportsTitle: "Safety Hazard Reports & Triage",
    submitSafetyBtn: "Report Safety Hazard",
    viewPayslipBtn: "View Itemized Payslip",
    verifiedBadge: "Verified",
    underReviewBadge: "Under Review",
    resolvedBadge: "Resolved",
    hoursUnit: "hrs",
    currencySymbol: "₹",
    exportPdfBtn: "Export Payslip Summary",
    filterAll: "All Records",
  },
  te: {
    appName: "ఫెయిర్‌షిఫ్ట్ (FairShift)",
    appSubtitle: "న్యాయమైన పని & భద్రతా వేదిక",
    demoNotice: "డెమో మోడ్ • ఇన్-మెమరీ సెషన్ స్టేట్ • ప్రాంప్ట్ వార్స్ 2026",
    sessionStateNotice: "ప్రత్యక్ష పరస్పర స్థితి. డేటా ఈ డెమో సెషన్ కోసం మెమరీలో ఉంచబడుతుంది మరియు బాహ్య డేటాబేస్‌లో నిల్వ చేయబడదు.",
    roleWorker: "కార్మికుల వీక్షణ",
    roleEmployer: "యాజమాన్యం / అడ్మిన్ వీక్షణ",
    sectorConstruction: "నిర్మాణ రంగం (Construction)",
    sectorCollege: "కళాశాల రంగం (College Sector)",
    navDashboard: "డాష్‌బోర్డ్",
    navAttendance: "హాజరు & షిఫ్ట్‌లు",
    navPayslips: "పారదర్శక పేస్లిప్‌లు",
    navSafety: "భద్రతా నివేదికలు",
    navPassport: "స్కిల్ పాస్‌పోర్ట్",
    navFeedback: "కార్మికుల స్వరం & అభిప్రాయం",
    navSettings: "సెట్టింగ్‌లు & పరిమితులు",
    cardWorkersPresent: "హాజరైన కార్మికులు",
    cardHoursWorked: "పనిచేసిన గంటలు",
    cardEstimatedEarnings: "అంచనా సంపాదన",
    cardSafetyReports: "భద్రతా నివేదికలు",
    cardFatigueAlerts: "అలసట హెచ్చరికలు",
    clockInBtn: "షిఫ్ట్ చెక్-ఇన్ చేయండి",
    clockOutBtn: "షిఫ్ట్ చెక్-అవుట్ చేయండి",
    shiftActiveBadge: "యాక్టివ్ షిఫ్ట్ (పనిలో ఉన్నారు)",
    shiftIdleBadge: "చెక్-ఇన్ కాలేదు (విరామం)",
    fatigueWarningTitle: "అలసట ప్రమాద హెచ్చరిక: సురక్షిత పని గంటలు దాటాయి!",
    fatigueWarningDesc: "నిరంతర పని గంటలు నిర్ణీత పరిమితిని దాటాయి. సరైన పని ప్రమాణాల ప్రకారం విధిగా విశ్రాంతి అవసరం.",
    fatigueNormalStatus: "సురక్షిత పరిమితిలో అలసట స్థాయి",
    recentShiftsTitle: "ఇటీవలి షిఫ్ట్ రికార్డులు & సమయ ట్రాకింగ్",
    safetyReportsTitle: "భద్రతా ప్రమాద నివేదికలు & సమీక్ష",
    submitSafetyBtn: "భద్రతా ప్రమాదాన్ని నివేదించండి",
    viewPayslipBtn: "వివరణాత్మక పేస్లిప్ చూడండి",
    verifiedBadge: "ధృవీకరించబడింది",
    underReviewBadge: "సమీక్షలో ఉంది",
    resolvedBadge: "పరిష్కరించబడింది",
    hoursUnit: "గం.",
    currencySymbol: "₹",
    exportPdfBtn: "పేస్లిప్ సారాంశం డౌన్‌లోడ్",
    filterAll: "అన్ని రికార్డులు",
  },
  hi: {
    appName: "फेयरशिफ्ट (FairShift)",
    appSubtitle: "गरिमामय कार्य एवं सुरक्षा मंच",
    demoNotice: "डेमो मोड • इन-मेमोरी सेशन स्टेट • प्रॉम्प्ट वॉर्स 2026",
    sessionStateNotice: "लाइव इंटरएक्टिव स्टेट। डेटा इस डेमो सत्र के लिए मेमोरी में सुरक्षित है और किसी बाहरी डेटाबेस में संग्रहीत नहीं है।",
    roleWorker: "श्रमिक दृश्य (Worker)",
    roleEmployer: "नियोक्ता / व्यवस्थापक दृश्य (Admin)",
    sectorConstruction: "निर्माण क्षेत्र (Construction)",
    sectorCollege: "महाविद्यालय / परिसर क्षेत्र (College)",
    navDashboard: "डैशबोर्ड",
    navAttendance: "उपस्थिति एवं पारियां",
    navPayslips: "पारदर्शी वेतन पर्ची (Payslip)",
    navSafety: "सुरक्षा रिपोर्ट",
    navPassport: "कौशल पासपोर्ट",
    navFeedback: "श्रमिक संवाद एवं फीडबैक",
    navSettings: "सेटिंग्स एवं सीमाएं",
    cardWorkersPresent: "उपस्थित श्रमिक",
    cardHoursWorked: "दर्ज कार्य घंटे",
    cardEstimatedEarnings: "अनुमानित आय",
    cardSafetyReports: "सुरक्षा रिपोर्ट",
    cardFatigueAlerts: "थकान चेतावनी",
    clockInBtn: "पारी चेक-इन करें",
    clockOutBtn: "पारी चेक-आउट करें",
    shiftActiveBadge: "सक्रिय पारी (कार्यरत)",
    shiftIdleBadge: "चेक-इन नहीं (ऑफ-ड्यूटी)",
    fatigueWarningTitle: "थकान जोखिम चेतावनी: सुरक्षित कार्य सीमा पार!",
    fatigueWarningDesc: "लगातार कार्य घंटे निर्धारित सुरक्षित सीमा को पार कर चुके हैं। गरिमामय कार्य मानकों के तहत अनिवार्य विश्राम अनुशंसित है।",
    fatigueNormalStatus: "सुरक्षित कार्य सीमा में (सामान्य)",
    recentShiftsTitle: "हालिया पारी रिकॉर्ड एवं समय ट्रैकिंग",
    safetyReportsTitle: "सुरक्षा जोखिम रिपोर्ट एवं निवारण",
    submitSafetyBtn: "सुरक्षा जोखिम दर्ज करें",
    viewPayslipBtn: "विस्तृत वेतन पर्ची देखें",
    verifiedBadge: "सत्यापित",
    underReviewBadge: "समीक्षाधीन",
    resolvedBadge: "समाधानित",
    hoursUnit: "घंटे",
    currencySymbol: "₹",
    exportPdfBtn: "वेतन पर्ची डाउनलोड",
    filterAll: "सभी रिकॉर्ड",
  },
};
