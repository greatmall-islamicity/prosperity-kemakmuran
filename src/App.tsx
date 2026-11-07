/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { KhaldunPhilosophy } from './components/KhaldunPhilosophy';
import { MuqaddimahProtocol } from './components/MuqaddimahProtocol';
import { AshabiyyahAndProsperityLaws } from './components/AshabiyyahAndProsperityLaws';
import { AufTradingEthics } from './components/AufTradingEthics';
import { ProductiveInvestmentGuide } from './components/ProductiveInvestmentGuide';
import { FiguresAndEconomy } from './components/FiguresAndEconomy';
import { BaldatunDistrictHub } from './components/BaldatunDistrictHub';
import { BlockchainExplorer } from './components/BlockchainExplorer';
import { ZakatCalculator } from './components/ZakatCalculator';
import { InteractiveMap } from './components/InteractiveMap';
import { WmsInventory } from './components/WmsInventory';
import { AiVerificationAndChat } from './components/AiVerificationAndChat';
import { CampaignsView } from './components/CampaignsView';
import { ReportsAndExport } from './components/ReportsAndExport';
import { DonationModal } from './components/DonationModal';
import { BiometricModal } from './components/BiometricModal';
import { GamificationModal } from './components/GamificationModal';
import { NotificationCenter, AppNotification } from './components/NotificationCenter';

import { 
  Role, 
  Language, 
  BlockchainTransaction, 
  InventoryItem, 
  GamificationState,
  DonationCampaign 
} from './types';

import { 
  INITIAL_TRANSACTIONS, 
  INITIAL_MUSTAHIK, 
  INITIAL_INVENTORY, 
  INITIAL_CAMPAIGNS, 
  PREDICTIVE_REGIONS 
} from './data/initialData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('philosophy');
  const [currentRole, setCurrentRole] = useState<Role>('muzakki');
  const [currentLang, setCurrentLang] = useState<Language>('id');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Network & Offline Sync State
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [offlineQueue, setOfflineQueue] = useState<BlockchainTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('muqaddimah_offline_txs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Core Data Stores
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>(INITIAL_TRANSACTIONS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>(INITIAL_CAMPAIGNS);

  // Security / Biometrics State
  const [isBiometricEnrolled, setIsBiometricEnrolled] = useState<boolean>(false);
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState<boolean>(false);

  // Gamification State
  const [gamification, setGamification] = useState<GamificationState>({
    points: 1250,
    levelTitle: 'Tingkat 3: Muhsin Berdaya',
    streakMonths: 4,
    badges: [
      { id: 'b1', title: 'Jejak Al-Muqaddimah', description: 'Memahami 5 pilar rezeki dan nilai tambah', icon: '📜' },
      { id: 'b2', title: 'Pasar Madinah Auf', description: 'Menerapkan perputaran cepat & kejujuran', icon: '⚖️' },
      { id: 'b3', title: 'Pembebas Riba', description: 'Membantu mustahik asnaf Gharimin', icon: '🕊️' },
      { id: 'b4', title: 'Multiplier Rezeki', description: 'Istiqomah zakat 4 bulan berturut-turut', icon: '💎' },
    ],
  });
  const [isGamificationModalOpen, setIsGamificationModalOpen] = useState<boolean>(false);

  // Modals & Panels
  const [isDonationModalOpen, setIsDonationModalOpen] = useState<boolean>(false);
  const [donationPrefill, setDonationPrefill] = useState<{ amount: number; akad: string }>({
    amount: 1000000,
    akad: 'Zakat Maal - Modal Usaha Mustahik',
  });

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Waktu Shalat & Zikir Petang',
      message: 'Masuk waktu Maghrib untuk wilayah DKI Jakarta & sekitarnya. "Ambillah zakat dari sebagian harta mereka..." (QS. At-Taubah: 103).',
      timestamp: '18:05',
      type: 'prayer_time',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Pengingat Omzet Bulanan',
      message: 'Buku perniagaan bulan November mencapai titik haul. Lakukan penghitungan zakat maal melalui kalkulator otomatis.',
      timestamp: '16:30',
      type: 'zakat_reminder',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Blok #489210 Terkonfirmasi',
      message: 'Transaksi penyaluran modal jamu Ibu Aminah senilai Rp 3.500.000 telah terverifikasi oleh 12 node amil.',
      timestamp: '18:42',
      type: 'smart_contract',
      read: true,
    },
    {
      id: 'notif-4',
      title: 'Peringatan Stok Gudang',
      message: 'Gerobak Kuliner UMKM di Gudang Surabaya mendekati batas minimum (tersisa 42 unit). Segera lakukan pemesanan pengadaan.',
      timestamp: '11:20',
      type: 'wms_alert',
      read: true,
    },
  ]);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState<boolean>(false);

  // Handle Online / Offline Event Listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      // Auto sync if any queue exists
      syncOfflineQueue();
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineQueue]);

  // Sync Dark Mode class with root document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync RTL for Arabic
  useEffect(() => {
    if (currentLang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [currentLang]);

  // Add a newly confirmed transaction
  const handleDonationSuccess = (newTx: BlockchainTransaction) => {
    if (isOffline) {
      const updatedQueue = [newTx, ...offlineQueue];
      setOfflineQueue(updatedQueue);
      try {
        localStorage.setItem('muqaddimah_offline_txs', JSON.stringify(updatedQueue));
      } catch {
        // ignore
      }
    } else {
      setTransactions((prev) => [newTx, ...prev]);
    }

    // Award Gamification Points
    setGamification((prev) => ({
      ...prev,
      points: prev.points + 250,
      levelTitle: prev.points + 250 > 2000 ? 'Tingkat 4: Sakhaw Abdurrahman bin Auf' : prev.levelTitle,
    }));

    // Add push notification
    const pushNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Akad Zakat On-Chain Berhasil!',
      message: `Donasi Rp ${newTx.amountIdr.toLocaleString('id-ID')} untuk ${newTx.recipientName} telah dicatat ke Blok #${newTx.blockNumber}.`,
      timestamp: 'Baru saja',
      type: 'smart_contract',
      read: false,
    };
    setNotifications((prev) => [pushNotif, ...prev]);
  };

  const syncOfflineQueue = () => {
    if (offlineQueue.length === 0) return;
    setTransactions((prev) => [...offlineQueue, ...prev]);
    setOfflineQueue([]);
    localStorage.removeItem('muqaddimah_offline_txs');
  };

  const handleOpenDonatePrefilled = (amount: number, akad: string) => {
    setDonationPrefill({ amount, akad });
    setIsDonationModalOpen(true);
  };

  const handleSelectCampaignForDonation = (campaign: DonationCampaign) => {
    setDonationPrefill({
      amount: 1000000,
      akad: `${campaign.category} - ${campaign.title}`,
    });
    setIsDonationModalOpen(true);
  };

  const handleSetZakatReminder = (monthlyTurnover: number, reminderDay: number) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Pengingat Zakat Bisnis Diaktifkan',
      message: `Sistem dijadwalkan mengingatkan zakat omzet bulanan (target Rp ${monthlyTurnover.toLocaleString('id-ID')}) setiap tanggal ${reminderDay}.`,
      timestamp: 'Baru saja',
      type: 'zakat_reminder',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isOffline={isOffline}
        offlineQueueCount={offlineQueue.length}
        onSyncOfflineQueue={syncOfflineQueue}
        onOpenBiometrics={() => setIsBiometricModalOpen(true)}
        onOpenGamification={() => setIsGamificationModalOpen(true)}
        onOpenDonationModal={() => {
          setDonationPrefill({ amount: 1000000, akad: 'Zakat Maal - Modal Usaha Mustahik' });
          setIsDonationModalOpen(true);
        }}
        gamification={gamification}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationCenterOpen(true)}
      />

      {/* Main App Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentTab === 'philosophy' && (
          <KhaldunPhilosophy
            currentLang={currentLang}
            onNavigateToCalculator={() => setCurrentTab('calculator')}
            onNavigateToCampaigns={() => setCurrentTab('campaigns')}
          />
        )}

        {currentTab === 'protocol' && (
          <MuqaddimahProtocol
            currentLang={currentLang}
            onNavigateToCalculator={() => setCurrentTab('calculator')}
            onNavigateToBlockchain={() => setCurrentTab('blockchain')}
          />
        )}

        {currentTab === 'ashabiyyah' && (
          <AshabiyyahAndProsperityLaws
            currentLang={currentLang}
            onNavigateToCalculator={() => setCurrentTab('calculator')}
            onNavigateToInvestment={() => setCurrentTab('investment')}
          />
        )}

        {currentTab === 'auf-ethics' && (
          <AufTradingEthics
            currentLang={currentLang}
            onNavigateToCalculator={() => setCurrentTab('calculator')}
            onNavigateToInvestment={() => setCurrentTab('investment')}
          />
        )}

        {currentTab === 'investment' && (
          <ProductiveInvestmentGuide
            currentLang={currentLang}
            onNavigateToCalculator={() => setCurrentTab('calculator')}
            onNavigateToCampaigns={() => setCurrentTab('campaigns')}
          />
        )}

        {currentTab === 'figures-economy' && (
          <FiguresAndEconomy
            currentLang={currentLang}
            onNavigateToCalculator={() => setCurrentTab('calculator')}
            onNavigateToInvestment={() => setCurrentTab('investment')}
            onNavigateToAshabiyyah={() => setCurrentTab('ashabiyyah')}
          />
        )}

        {currentTab === 'baldatun-district' && (
          <BaldatunDistrictHub
            currentLang={currentLang}
            onNavigateToCalculator={() => setCurrentTab('calculator')}
            onNavigateToWarehouse={() => setCurrentTab('warehouse')}
            onNavigateToAshabiyyah={() => setCurrentTab('ashabiyyah')}
            onNavigateToCampaigns={() => setCurrentTab('campaigns')}
          />
        )}

        {currentTab === 'blockchain' && (
          <BlockchainExplorer
            transactions={transactions}
            onOpenDonateModal={() => setIsDonationModalOpen(true)}
          />
        )}

        {currentTab === 'calculator' && (
          <ZakatCalculator
            currentLang={currentLang}
            onPayZakat={(amount, akad) => handleOpenDonatePrefilled(amount, akad)}
            onSetReminder={handleSetZakatReminder}
          />
        )}

        {currentTab === 'map' && (
          <InteractiveMap
            predictiveRegions={PREDICTIVE_REGIONS}
            mustahikList={INITIAL_MUSTAHIK}
          />
        )}

        {currentTab === 'warehouse' && (
          <WmsInventory
            inventory={inventory}
            onUpdateInventory={(updated) => setInventory(updated)}
          />
        )}

        {currentTab === 'ai-verify' && (
          <AiVerificationAndChat currentLang={currentLang} />
        )}

        {currentTab === 'campaigns' && (
          <CampaignsView
            campaigns={campaigns}
            onSelectCampaignForDonation={handleSelectCampaignForDonation}
          />
        )}

        {currentTab === 'reports' && (
          <ReportsAndExport
            transactions={transactions}
            currentLang={currentLang}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 font-serif">
              Muqaddimah Wealth & Zakat Hub
            </span>
            <span>•</span>
            <span>Gerakan Sadar Kaya Indonesia</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Filosofi Kitab Al-Muqaddimah Ibnu Khaldun (Ilmu 'Umran)</span>
            <span>•</span>
            <span>Kaidah Perniagaan Abdurrahman bin Auf</span>
            <span>•</span>
            <span>Terverifikasi Smart Contract</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onDonationSuccess={handleDonationSuccess}
        prefilledAmount={donationPrefill.amount}
        prefilledAkad={donationPrefill.akad}
      />

      <BiometricModal
        isOpen={isBiometricModalOpen}
        onClose={() => setIsBiometricModalOpen(false)}
        currentRole={currentRole}
        isBiometricEnrolled={isBiometricEnrolled}
        onEnrollBiometric={() => setIsBiometricEnrolled(true)}
      />

      <GamificationModal
        isOpen={isGamificationModalOpen}
        onClose={() => setIsGamificationModalOpen(false)}
        gamification={gamification}
        onCelebrate={() => {}}
      />

      <NotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
      />
    </div>
  );
}
