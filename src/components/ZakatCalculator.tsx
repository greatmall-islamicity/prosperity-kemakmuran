import React, { useState } from 'react';
import { 
  Calculator, 
  Coins, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Bell, 
  HelpCircle, 
  Calendar,
  Sparkles,
  ShieldCheck,
  Building2,
  DollarSign
} from 'lucide-react';
import { Language } from '../types';

interface ZakatCalculatorProps {
  currentLang: Language;
  onPayZakat: (amountIdr: number, akad: string) => void;
  onSetReminder: (monthlyTurnover: number, reminderDay: number) => void;
}

export const ZakatCalculator: React.FC<ZakatCalculatorProps> = ({
  currentLang,
  onPayZakat,
  onSetReminder,
}) => {
  const [activeTab, setActiveTab] = useState<'business' | 'savings' | 'gold' | 'profession'>('business');

  // Gold price per gram (standard nisab 85 grams)
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(1550000);
  const nisabThreshold = goldPricePerGram * 85; // Rp 131.750.000

  // 1. Zakat Perniagaan (Business) state
  const [cashAndBank, setCashAndBank] = useState<number>(85000000);
  const [receivables, setReceivables] = useState<number>(30000000);
  const [inventoryValue, setInventoryValue] = useState<number>(65000000);
  const [shortTermDebt, setShortTermDebt] = useState<number>(25000000);

  const businessNetAssets = Math.max(0, (cashAndBank + receivables + inventoryValue) - shortTermDebt);
  const isBusinessEligible = businessNetAssets >= nisabThreshold;
  const businessZakatAnnual = isBusinessEligible ? Math.round(businessNetAssets * 0.025) : 0;
  const businessZakatMonthlyCicil = Math.round(businessZakatAnnual / 12);

  // 2. Zakat Tabungan & Deposito state
  const [savingsAmount, setSavingsAmount] = useState<number>(140000000);
  const [passiveInterestsDeducted, setPassiveInterestsDeducted] = useState<number>(0);
  const savingsNet = Math.max(0, savingsAmount - passiveInterestsDeducted);
  const isSavingsEligible = savingsNet >= nisabThreshold;
  const savingsZakat = isSavingsEligible ? Math.round(savingsNet * 0.025) : 0;

  // 3. Zakat Emas / Logam Mulia state
  const [goldGrams, setGoldGrams] = useState<number>(100);
  const [wornGrams, setWornGrams] = useState<number>(10); // Perhiasan yang dipakai wajar tidak dizakati
  const zakatEligibleGoldGrams = Math.max(0, goldGrams - wornGrams);
  const isGoldEligible = zakatEligibleGoldGrams >= 85;
  const goldZakatIdr = isGoldEligible ? Math.round(zakatEligibleGoldGrams * goldPricePerGram * 0.025) : 0;

  // 4. Zakat Profesi / Pendapatan Bulanan state
  const [monthlySalary, setMonthlySalary] = useState<number>(15000000);
  const [otherIncome, setOtherIncome] = useState<number>(3000000);
  const [monthlyBasicNeeds, setMonthlyBasicNeeds] = useState<number>(6000000);
  const monthlyGrossIncome = monthlySalary + otherIncome;
  const monthlyNisab = nisabThreshold / 12; // ~ Rp 10.979.166/bulan
  const isProfessionEligible = monthlyGrossIncome >= monthlyNisab;
  const professionZakatMonthly = isProfessionEligible ? Math.round(monthlyGrossIncome * 0.025) : 0;

  // Reminder settings
  const [reminderOmzet, setReminderOmzet] = useState<number>(50000000);
  const [reminderDay, setReminderDay] = useState<number>(25);
  const [reminderSavedToast, setReminderSavedToast] = useState(false);

  const handleSaveReminder = () => {
    onSetReminder(reminderOmzet, reminderDay);
    setReminderSavedToast(true);
    setTimeout(() => setReminderSavedToast(false), 3000);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Nisab Gold Info Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 dark:from-amber-950/20 dark:to-emerald-950/20 rounded-2xl p-5 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Standar Nisab Emas Terkini (85 Gram)
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
              Rp {nisabThreshold.toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Berdasarkan Fatwa MUI: Kepemilikan harta selama 1 haul (1 tahun hijriyah/masehi) setara 85 gr emas murni.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto bg-white dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500">Harga Emas/gr:</span>
          <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">Rp</span>
          <input
            type="number"
            value={goldPricePerGram}
            onChange={(e) => setGoldPricePerGram(Number(e.target.value))}
            className="w-28 text-xs font-mono font-bold text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-slate-600 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Main Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto bg-slate-50 dark:bg-slate-850">
          <button
            onClick={() => setActiveTab('business')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'business'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Zakat Perniagaan / Bisnis (Abdurrahman bin Auf)
          </button>
          <button
            onClick={() => setActiveTab('profession')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'profession'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Zakat Penghasilan / Profesi
          </button>
          <button
            onClick={() => setActiveTab('savings')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'savings'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Zakat Tabungan & Saham
          </button>
          <button
            onClick={() => setActiveTab('gold')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'gold'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Coins className="w-4 h-4" />
            Zakat Emas & Logam Mulia
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: ZAKAT PERNIAGAAN */}
          {activeTab === 'business' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div className="text-xs text-slate-500 dark:text-slate-400 bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/20">
                  <strong>Rumus Fiqih Muamalah:</strong> [Kas + Bank + Piutang Lancar + Stok Barang Dagangan] dikurangi [Hutang Jatuh Tempo]. Jika saldo bersih mencapai nisab 85 gr emas dan genap 1 haul, kadar zakatnya 2,5%.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    1. Saldo Kas & Rekening Bank Bisnis
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">Rp</span>
                    <input
                      type="number"
                      value={cashAndBank}
                      onChange={(e) => setCashAndBank(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    2. Piutang Dagang Lancar (Yang Diharapkan Tertagih)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">Rp</span>
                    <input
                      type="number"
                      value={receivables}
                      onChange={(e) => setReceivables(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    3. Nilai Persediaan Stok Barang Dagangan (Harga Pokok)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">Rp</span>
                    <input
                      type="number"
                      value={inventoryValue}
                      onChange={(e) => setInventoryValue(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    4. Hutang Dagang Jatuh Tempo (Hutang Lancar)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">Rp</span>
                    <input
                      type="number"
                      value={shortTermDebt}
                      onChange={(e) => setShortTermDebt(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Business Result Card */}
              <div className="bg-gradient-to-br from-slate-50 to-emerald-50/50 dark:from-slate-850 dark:to-slate-900 rounded-2xl p-6 border border-emerald-500/30 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Hasil Kalkulasi Fiqih Perniagaan
                  </span>
                  {isBusinessEligible ? (
                    <span className="text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Wajib Zakat (Mencapai Nisab)
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-600" /> Belum Wajib (Dianjurkan Infaq)
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Harta Bersih Kena Zakat:</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                    Rp {businessNetAssets.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Batas Nisab: Rp {nisabThreshold.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Zakat Maal Setahun (2,5%):</span>
                    <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 text-base">
                      Rp {businessZakatAnnual.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500">Opsi Cicil Bulanan (Ta'jil az-Zakah):</span>
                    <span className="font-semibold font-mono text-slate-700 dark:text-slate-300">
                      Rp {businessZakatMonthlyCicil.toLocaleString('id-ID')} / bulan
                    </span>
                  </div>
                </div>

                <button
                  disabled={!isBusinessEligible}
                  onClick={() => onPayZakat(businessZakatAnnual, 'Zakat Perniagaan (Maal)')}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Tunaikan Zakat Perniagaan Sekarang
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ZAKAT PROFESI */}
          {activeTab === 'profession' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div className="text-xs text-slate-500 dark:text-slate-400 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-xl border border-blue-500/20">
                  <strong>Zakat Penghasilan (Fatwa MUI No 3/2003):</strong> Dikeluarkan setiap kali menerima gaji/upah bulanan jika setara nisab bulanan (Rp {Math.round(monthlyNisab).toLocaleString('id-ID')}).
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Gaji / Penghasilan Pokok Bulanan
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">Rp</span>
                    <input
                      type="number"
                      value={monthlySalary}
                      onChange={(e) => setMonthlySalary(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Bonus / Tunjangan / Pendapatan Sampingan Lain
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">Rp</span>
                    <input
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Profession Output */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-850 dark:to-slate-900 rounded-2xl p-6 border border-blue-500/30 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Hasil Zakat Profesi Bulanan
                  </span>
                  {isProfessionEligible ? (
                    <span className="text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Wajib Zakat Bulanan
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                      Belum Mencapai Nisab Bulanan
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Total Penghasilan Kotor:</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                    Rp {monthlyGrossIncome.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Zakat Profesi Bulan Ini (2,5%):</span>
                    <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 text-lg">
                      Rp {professionZakatMonthly.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <button
                  disabled={!isProfessionEligible}
                  onClick={() => onPayZakat(professionZakatMonthly, 'Zakat Profesi Bulanan')}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Tunaikan Zakat Profesi Sekarang
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ZAKAT TABUNGAN */}
          {activeTab === 'savings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Total Tabungan, Deposito, Saham, & Reksadana
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">Rp</span>
                    <input
                      type="number"
                      value={savingsAmount}
                      onChange={(e) => setSavingsAmount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-emerald-50/50 dark:from-slate-850 dark:to-slate-900 rounded-2xl p-6 border border-emerald-500/30 space-y-4">
                <div className="text-xs text-slate-500">Kewajiban Zakat Tabungan (2,5%):</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  Rp {savingsZakat.toLocaleString('id-ID')}
                </div>
                <button
                  disabled={!isSavingsEligible}
                  onClick={() => onPayZakat(savingsZakat, 'Zakat Tabungan & Investasi')}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Tunaikan Zakat Tabungan
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: ZAKAT EMAS */}
          {activeTab === 'gold' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Total Emas / Logam Mulia Dimiliki (Gram)
                  </label>
                  <input
                    type="number"
                    value={goldGrams}
                    onChange={(e) => setGoldGrams(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Emas Perhiasan yang Rutin Dipakai (Bebas Zakat)
                  </label>
                  <input
                    type="number"
                    value={wornGrams}
                    onChange={(e) => setWornGrams(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-amber-50/50 dark:from-slate-850 dark:to-slate-900 rounded-2xl p-6 border border-amber-500/30 space-y-4">
                <div className="text-xs text-slate-500">Zakat Emas Bersih ({zakatEligibleGoldGrams} gr):</div>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
                  Rp {goldZakatIdr.toLocaleString('id-ID')}
                </div>
                <button
                  disabled={!isGoldEligible}
                  onClick={() => onPayZakat(goldZakatIdr, 'Zakat Emas & Logam Mulia')}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Tunaikan Zakat Emas
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Omzet Notification & Monthly Auto-Reminder Setup */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-teal-500/15 text-teal-600 dark:text-teal-400 rounded-lg">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Pengingat Zakat Mal Otomatis Berbasis Omzet Bulanan
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sistem akan memantau omzet bisnis Anda setiap bulan dan mengirimkan notifikasi pengingat tepat sebelum tutup buku.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Target Omzet Bulanan
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">Rp</span>
              <input
                type="number"
                value={reminderOmzet}
                onChange={(e) => setReminderOmzet(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-semibold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Tanggal Pengingat Rutin
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={reminderDay}
                onChange={(e) => setReminderDay(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              >
                {[20, 25, 27, 28, 30].map((d) => (
                  <option key={d} value={d}>Setiap Tanggal {d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSaveReminder}
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Aktifkan Pengingat
            </button>
          </div>
        </div>

        {reminderSavedToast && (
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Pengingat berhasil diatur! Notifikasi push dan pengingat WhatsApp akan dikirim setiap tanggal {reminderDay}.</span>
          </div>
        )}
      </div>
    </div>
  );
};
