import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Award, 
  BookOpen, 
  Layers, 
  Calculator, 
  MapPin, 
  Package, 
  BrainCircuit, 
  FileText, 
  HeartHandshake,
  UserCheck,
  RefreshCw,
  Sparkles,
  Cpu,
  TrendingUp,
  Users,
  Scale,
  Sprout
} from 'lucide-react';
import { Role, Language, GamificationState } from '../types';
import { translations } from '../i18n/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  isOffline: boolean;
  offlineQueueCount: number;
  onSyncOfflineQueue: () => void;
  onOpenBiometrics: () => void;
  onOpenGamification: () => void;
  onOpenDonationModal: () => void;
  gamification: GamificationState;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentRole,
  setCurrentRole,
  currentLang,
  setCurrentLang,
  isDarkMode,
  setIsDarkMode,
  isOffline,
  offlineQueueCount,
  onSyncOfflineQueue,
  onOpenBiometrics,
  onOpenGamification,
  onOpenDonationModal,
  gamification,
  unreadNotificationsCount,
  onOpenNotifications,
}) => {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const t = translations[currentLang];

  const navItems = [
    { id: 'philosophy', label: t.navPhilosophy, icon: BookOpen },
    { id: 'protocol', label: t.navProtocol, icon: Cpu },
    { id: 'ashabiyyah', label: t.navAshabiyyah, icon: Users },
    { id: 'auf-ethics', label: t.navAufEthics, icon: Award },
    { id: 'investment', label: t.navInvestment, icon: TrendingUp },
    { id: 'figures-economy', label: t.navFiguresEconomy, icon: Scale },
    { id: 'baldatun-district', label: t.navBaldatunTown, icon: Sprout },
    { id: 'blockchain', label: t.navBlockchain, icon: Layers },
    { id: 'calculator', label: t.navCalculator, icon: Calculator },
    { id: 'map', label: t.navMap, icon: MapPin },
    { id: 'warehouse', label: t.navWarehouse, icon: Package },
    { id: 'ai-verify', label: t.navAiVerify, icon: BrainCircuit },
    { id: 'campaigns', label: t.navCampaigns, icon: HeartHandshake },
    { id: 'reports', label: t.navReports, icon: FileText },
  ];

  const roleLabels: Record<Role, { title: string; color: string; desc: string }> = {
    muzakki: { title: t.muzakki, color: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30', desc: 'Akses donasi & pelacakan ZISWAF' },
    mustahik: { title: t.mustahik, color: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30', desc: 'Pengajuan bantuan & program usaha' },
    amil: { title: t.amil, color: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border-cyan-500/30', desc: 'Verifikasi dokumen & audit smart contract' },
    logistician: { title: t.logistician, color: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/30', desc: 'Manajemen gudang WMS & QR inventaris' },
  };

  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800">
      {/* Top Banner Notice: Sadar Kaya & Offline Sync Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              GERAKAN SADAR KAYA:
            </span>
            <span className="hidden sm:inline text-slate-200">
              Transformasi Mustahik Menjadi Muzakki Berbasis Nilai Tambah & Etika Muqaddimah Ibnu Khaldun
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Offline/Online Live Indicator */}
            {isOffline ? (
              <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                <WifiOff className="w-3 h-3 text-amber-400" />
                <span>{t.offlineMode}</span>
                {offlineQueueCount > 0 && (
                  <button 
                    onClick={onSyncOfflineQueue}
                    className="ml-1 text-[11px] underline font-medium hover:text-white"
                  >
                    ({offlineQueueCount} pending)
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-300">
                <Wifi className="w-3 h-3" />
                <span className="hidden md:inline">{t.onlineMode}</span>
                {offlineQueueCount > 0 && (
                  <button 
                    onClick={onSyncOfflineQueue}
                    className="flex items-center gap-1 bg-emerald-700/60 hover:bg-emerald-600 px-2 py-0.5 rounded text-[11px] text-white"
                  >
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Sync ({offlineQueueCount})
                  </button>
                )}
              </div>
            )}

            {/* Quick Biometrics button */}
            <button
              onClick={onOpenBiometrics}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              title="Biometric Authentication Shield"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden lg:inline text-[11px]">WebAuthn Biometrik</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('philosophy')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-bold text-xl font-serif">
              م
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-tight tracking-tight">
                  {t.appTitle}
                </h1>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded font-semibold border border-emerald-300 dark:border-emerald-800">
                  Web3 & AI
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block truncate max-w-sm">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Right Action Controls: Role, Language, Gamification, Dark Mode, Quick Donate */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Active Role Selector */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${roleLabels[currentRole].color}`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t.role}:</span>
                <span>{roleLabels[currentRole].title}</span>
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Pilih Peran Sistem
                    </p>
                  </div>
                  {(['muzakki', 'mustahik', 'amil', 'logistician'] as Role[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setCurrentRole(r);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex flex-col gap-0.5 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors ${
                        currentRole === r ? 'bg-emerald-50 dark:bg-emerald-950/40 font-bold' : ''
                      }`}
                    >
                      <span className="text-slate-800 dark:text-slate-200">{roleLabels[r].title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{roleLabels[r].desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Gamification Level Badge Button */}
            <button
              onClick={onOpenGamification}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition-all"
              title="Lihat Peringkat As-Sakhaw & Lencana Kedermawanan"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{gamification.levelTitle}</span>
              <span className="bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-[10px] px-1.5 py-0.2 rounded-full">
                {gamification.points} pts
              </span>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
                title="Pilih Bahasa"
              >
                <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="uppercase">{currentLang}</span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50">
                  <button
                    onClick={() => { setCurrentLang('id'); setIsLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between ${currentLang === 'id' ? 'font-bold text-emerald-600' : ''}`}
                  >
                    <span>Bahasa Indonesia</span>
                    <span>🇮🇩</span>
                  </button>
                  <button
                    onClick={() => { setCurrentLang('en'); setIsLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between ${currentLang === 'en' ? 'font-bold text-emerald-600' : ''}`}
                  >
                    <span>English</span>
                    <span>🇬🇧</span>
                  </button>
                  <button
                    onClick={() => { setCurrentLang('ar'); setIsLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between ${currentLang === 'ar' ? 'font-bold text-emerald-600' : ''}`}
                  >
                    <span>العربية (Arabic)</span>
                    <span>🇸🇦</span>
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Notifikasi & Pengingat Zakat"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              )}
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
              )}
            </button>

            {/* Dark / Light Mode Switch */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={isDarkMode ? t.light : t.dark}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Primary Action Button: Tunaikan Zakat */}
            <button
              onClick={onOpenDonationModal}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{t.donateNow}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-100 dark:border-slate-800/80 pt-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
