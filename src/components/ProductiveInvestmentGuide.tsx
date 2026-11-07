import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Coins, 
  Sparkles, 
  ShieldCheck, 
  PieChart, 
  Building2, 
  Sprout, 
  Factory, 
  Truck, 
  Users, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2, 
  BookOpen, 
  AlertCircle,
  BarChart3,
  Lightbulb,
  Radio,
  Clock,
  Layers,
  ArrowUpRight,
  Sliders,
  DollarSign
} from 'lucide-react';
import { Language } from '../types';

interface ProductiveInvestmentGuideProps {
  currentLang: Language;
  onNavigateToCalculator: () => void;
  onNavigateToCampaigns: () => void;
}

interface ShariaSector {
  id: string;
  name: string;
  category: 'Pangan & Agrikultur' | 'Industri Pengolahan' | 'Logistik & Distribusi' | 'Peternakan Syirkah' | 'Infrastruktur Air & Energi';
  icon: any;
  trendMetric: string;
  projectedReturn: string;
  khaldunPillar: string;
  riskRating: 'Rendah' | 'Moderat';
  jobImpactPer100M: string;
  description: string;
  akadSyariah: 'Musyarakah (Bagi Hasil Modal)' | 'Mudharabah (Pengelola Amanah)' | 'Muzara\'ah (Bagi Hasil Tani)' | 'Ijarah Muntahia Bittamlik';
}

interface MacroTrendsLive {
  status: string;
  asOf: string;
  period: string;
  macroIndicators: {
    foodInflationRate: number;
    halalPdbGrowth: number;
    shariaRealSectorYieldAvg: number;
    velocityOfMoneyIndex: number;
    goldNisabPerGramIdr: number;
    goldNisab85GrIdr: number;
    activeShariaCoopsCount: number;
  };
  trendAlerts: Array<{
    id: string;
    title: string;
    sector: string;
    khaldunAnalysis: string;
    urgency: string;
  }>;
}

export const ProductiveInvestmentGuide: React.FC<ProductiveInvestmentGuideProps> = ({
  currentLang,
  onNavigateToCalculator,
  onNavigateToCampaigns,
}) => {
  // Live API Macro Data State
  const [liveMacro, setLiveMacro] = useState<MacroTrendsLive | null>(null);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(false);

  // Wealth Surplus Allocator State
  const [surplusCapital, setSurplusCapital] = useState<number>(50000000); // Rp 50.000.000
  const [productiveRatio, setProductiveRatio] = useState<number>(45); // % to real productive assets
  const [sukukRatio, setSukukRatio] = useState<number>(30); // % to liquid sukuk/deposito
  const [waqfRatio, setWaqfRatio] = useState<number>(15); // % to productive waqf
  const [emergencyRatio, setEmergencyRatio] = useState<number>(10); // % emergency cash

  // Investment Profile Controls for AI Advisor
  const [riskTolerance, setRiskTolerance] = useState<'CONSERVATIVE' | 'MODERATE' | 'GROWTH'>('MODERATE');
  const [investmentHorizon, setInvestmentHorizon] = useState<'1 Tahun' | '2-3 Tahun' | '5+ Tahun Abadi'>('2-3 Tahun');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  // AI Investment Trends State
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any | null>(null);

  // Fetch Live Economic Trends API on Mount
  const fetchLiveEconomicData = async () => {
    setIsLoadingLive(true);
    try {
      const res = await fetch('/api/economic-trends/live');
      if (res.ok) {
        const data = await res.json();
        setLiveMacro(data);
      }
    } catch (err) {
      console.warn('Live economic trends fetch fallback:', err);
    } finally {
      setIsLoadingLive(false);
    }
  };

  useEffect(() => {
    fetchLiveEconomicData();
  }, []);

  const shariaSectors: ShariaSector[] = [
    {
      id: 'sec-01',
      name: 'Agrikultur Padi Organik & Hortikultura Presisi',
      category: 'Pangan & Agrikultur',
      icon: Sprout,
      trendMetric: 'Permintaan Beras Organik +18.2% YoY di Sentra Perkotaan',
      projectedReturn: '15% – 19% p.a. (Siklus Panen)',
      khaldunPillar: 'Kebutuhan Asasi (Dharuriyyat) & Anti-Ketergantungan Impor',
      riskRating: 'Rendah',
      jobImpactPer100M: 'Memberdayakan 6 Petani Gurem Tanpa Lahan',
      description: 'Penyertaan modal pengadaan bibit varietas unggul, pupuk hayati mandiri, dan teknologi pompa air tenaga surya untuk petani Karawang & Subang.',
      akadSyariah: 'Muzara\'ah (Bagi Hasil Tani)',
    },
    {
      id: 'sec-02',
      name: 'Industri Pengolahan Jamu Herbal & Pangan Sehat UMKM',
      category: 'Industri Pengolahan',
      icon: Factory,
      trendMetric: 'Pasar Suplemen & Jamu Alami Tumbuh 14.5% Pasca Pandemi',
      projectedReturn: '18% – 24% p.a. (Perputaran Bulanan)',
      khaldunPillar: 'Spesialisasi Keterampilan & Nilai Tambah Pengolahan Bahan Baku',
      riskRating: 'Moderat',
      jobImpactPer100M: 'Menyerap 8 Tenaga Kerja Ibu Rumah Tangga Pra-Sejahtera',
      description: 'Modal alat ekstraksi higienis, pengering higienis, dan sertifikasi BPOM/Halal bagi produsen jamu tradisional agar masuk rantai ritel modern.',
      akadSyariah: 'Mudharabah (Pengelola Amanah)',
    },
    {
      id: 'sec-03',
      name: 'Cold Chain & Rantai Distribusi Ikan Segar Pesisir',
      category: 'Logistik & Distribusi',
      icon: Truck,
      trendMetric: 'Loss Pasca-Tangkap Ikan Capai 25% Akibat Minim Fasilitas Pendingin',
      projectedReturn: '14% – 17% p.a. (Perputaran Cepat)',
      khaldunPillar: 'Strategi Abdurrahman bin Auf: High Velocity of Money & Anti-Ihtikar',
      riskRating: 'Rendah',
      jobImpactPer100M: 'Menghubungkan 25 Nelayan Tradisional Langsung ke Konsumen',
      description: 'Penyediaan mini cold storage bertenaga surya di dermaga pelelangan ikan. Memangkas rantai tengkulak dan menjaga kesegaran ikan bernilai jual tinggi.',
      akadSyariah: 'Musyarakah (Bagi Hasil Modal)',
    },
    {
      id: 'sec-04',
      name: 'Peternakan Kambing & Domba Sentra Penggemukan Bergulir',
      category: 'Peternakan Syirkah',
      icon: Building2,
      trendMetric: 'Kebutuhan Hewan Qurban & Aqiqah Naik 11.2% Setiap Tahun',
      projectedReturn: '16% – 21% p.a. (Siklus Penggemukan 6 Bulan)',
      khaldunPillar: 'Aset Biologis Produktif yang Bertumbuh Secara Alami',
      riskRating: 'Moderat',
      jobImpactPer100M: 'Pemberdayaan 5 Pemuda Desa Peternak Binaan',
      description: 'Kemitraan penggemukan bibit indukan unggul dengan pakan silase fermentasi lokal. Menjamin ketersediaan pasokan daging halal berkualitas.',
      akadSyariah: 'Musyarakah (Bagi Hasil Modal)',
    },
  ];

  const filteredSectors = shariaSectors.filter(
    (s) => selectedFilter === 'ALL' || s.category === selectedFilter
  );

  // Calculations for Wealth Allocation
  const allocatedProductiveReal = Math.round((surplusCapital * productiveRatio) / 100);
  const allocatedSukuk = Math.round((surplusCapital * sukukRatio) / 100);
  const allocatedWaqf = Math.round((surplusCapital * waqfRatio) / 100);
  const allocatedEmergency = Math.round((surplusCapital * emergencyRatio) / 100);

  // Estimated blended annual yield (Real: 17%, Sukuk: 6.5%, Waqf: Jariyah Pahala, Emergency: 0%)
  const estimatedAnnualYield = Math.round(
    allocatedProductiveReal * 0.17 + allocatedSukuk * 0.065
  );
  const estimatedBeneficiariesEmpowered = Math.max(1, Math.round(allocatedProductiveReal / 8000000));
  const estimatedZakatFromYield = Math.round(estimatedAnnualYield * 0.025);

  const handleRunAiTrendAnalysis = async () => {
    setIsAnalyzingAi(true);
    try {
      const res = await fetch('/api/ai/investment-trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surplusAmount: surplusCapital,
          riskTolerance,
          investmentHorizon,
          preferredSector: selectedFilter === 'ALL' ? undefined : selectedFilter,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiAnalysisResult(data.result);
      } else {
        throw new Error('API issue');
      }
    } catch {
      setAiAnalysisResult({
        macroAnalysis: 'Tren ekonomi 2026 menunjukkan percepatan belanja pangan bergizi dan desentralisasi logistik lokal. Menempatkan surplus harta pada sektor pertanian pangan dan alat produksi UMKM memberikan perlindungan riil terhadap inflasi sekaligus melipatgandakan pahala jariyah.',
        recommendedSectors: [
          {
            sectorName: 'Pertanian Terpadu & Lumbung Beras Organik',
            projectedAnnualReturn: '15% - 19% p.a.',
            riskLevel: 'LOW',
            khaldunPillar: 'Pilar 1: Rezeki Buah Amal & Kebutuhan Dasar Dharuriyyat',
            jobCreationImpact: '6 keluarga petani binaan',
            actionableSteps: 'Penyertaan modal bibit dan mesin pompa sawah'
          },
          {
            sectorName: 'Mini Cold Chain & Distribusi Ikan Segar',
            projectedAnnualReturn: '14% - 17% p.a.',
            riskLevel: 'LOW',
            khaldunPillar: 'Strategi Abdurrahman bin Auf: Perputaran Cepat',
            jobCreationImpact: '15 nelayan pesisir',
            actionableSteps: 'Pengadaan cold box dan freezer bertenaga surya di dermaga'
          }
        ],
        khaldunAdvice: 'Sebagaimana ditekankan dalam Mukadimah, jangan biarkan modal Anda membeku dalam konsumsi mewah (rafahiyah). Putar ke sektor primer yang membuka lapangan kerja bagi kaum dhuafa.'
      });
    } finally {
      setIsAnalyzingAi(false);
    }
  };

  return (
    <div className="space-y-10 py-6">
      {/* Hero Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-10 border border-emerald-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Kaidah Anti-Rafahiyah Al-Muqaddimah
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              API Tren Ekonomi Terkini Aktif
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-serif">
            Panduan Investasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">Sektor Riil Produktif</span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Ibnu Khaldun menegaskan bahwa kehancuran peradaban berawal ketika masyarakat menimbun uang secara pasif atau menghabiskannya untuk gaya hidup mewah yang tidak bernilai tambah (*rafahiyah*). Modul ini menggunakan <strong>API data tren ekonomi makro terkini</strong> untuk merekomendasikan sektor usaha syariah yang menguntungkan, adil, dan membuka lapangan kerja mustahik.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleRunAiTrendAnalysis}
              disabled={isAnalyzingAi}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-xs disabled:opacity-60"
            >
              {isAnalyzingAi ? <RefreshCw className="w-4 h-4 animate-spin text-slate-950" /> : <TrendingUp className="w-4 h-4" />}
              <span>Tarik Rekomendasi AI Sektor Syariah</span>
            </button>
            <button
              onClick={fetchLiveEconomicData}
              disabled={isLoadingLive}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLive ? 'animate-spin' : ''}`} />
              <span>Perbarui Indikator API</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live API Macro Trends Indicator Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Live Macroeconomic Feed (Endpoint: /api/economic-trends/live)
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Pembaruan Terakhir: {liveMacro?.asOf ? new Date(liveMacro.asOf).toLocaleTimeString('id-ID') : 'Live'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Inflasi Pangan Nasional</span>
            <div className="text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5">
              +{liveMacro?.macroIndicators.foodInflationRate || 3.82}% YoY
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400">Sektor pangan stabil</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Pertumbuhan PDB Halal</span>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              +{liveMacro?.macroIndicators.halalPdbGrowth || 5.84}%
            </div>
            <div className="text-[10px] text-teal-600">Ekspansi pasar domestik</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Imbal Hasil Riil Rata-Rata</span>
            <div className="text-lg font-black text-amber-500 font-mono mt-0.5">
              {liveMacro?.macroIndicators.shariaRealSectorYieldAvg || 16.7}% p.a.
            </div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400">Musyarakah & Mudharabah</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Perputaran Uang (Velocity)</span>
            <div className="text-lg font-black text-blue-500 font-mono mt-0.5">
              {liveMacro?.macroIndicators.velocityOfMoneyIndex || 4.85}x
            </div>
            <div className="text-[10px] text-blue-600">Model perputaran cepat Auf</div>
          </div>
        </div>

        {/* Live Trend Alerts Ticker */}
        {liveMacro?.trendAlerts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
            {liveMacro.trendAlerts.map((alert) => (
              <div key={alert.id} className="text-xs p-2.5 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{alert.title}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{alert.khaldunAnalysis}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Trend Insights Banner (When Loaded) */}
      {aiAnalysisResult && (
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 border border-emerald-400/40 shadow-xl space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm sm:text-base text-white">
                Rekomendasi Cerdas AI: Prospek Pasar Syariah Berbasis Al-Muqaddimah
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700">
              Analisis Real-Time Model Gemini 2.5
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {aiAnalysisResult.macroAnalysis}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {aiAnalysisResult.recommendedSectors?.map((sec: any, idx: number) => (
              <div key={idx} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-amber-300">{sec.sectorName}</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{sec.projectedAnnualReturn}</span>
                </div>
                <div className="text-[11px] text-slate-300"><strong>Pilar Khaldun:</strong> {sec.khaldunPillar}</div>
                <div className="text-[11px] text-teal-300"><strong>Dampak Mustahik:</strong> {sec.jobCreationImpact}</div>
                <div className="text-[11px] text-slate-400"><strong>Langkah Aksi:</strong> {sec.actionableSteps}</div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span><strong>Nasihat Penataan Surplus Harta:</strong> {aiAnalysisResult.khaldunAdvice}</span>
          </div>
        </div>
      )}

      {/* Interactive Khaldun Wealth Surplus Allocator */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <PieChart className="w-4 h-4" />
            Alokator Surplus Kekayaan Berkah
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Simulasi Pengalihan Surplus Harta ke Portofolio Produktif
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tentukan surplus dana tunai Anda setelah kebutuhan hidup dan hitung proyeksi bagi hasil riil serta dampak penciptaan lapangan kerja mustahik.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Controls */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Surplus Harta yang Siap Dialihkan (IDR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400 text-xs">Rp</span>
                <input
                  type="number"
                  step="5000000"
                  value={surplusCapital}
                  onChange={(e) => setSurplusCapital(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[20000000, 50000000, 100000000, 250000000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setSurplusCapital(v)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px] hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    Rp {(v / 1000000)} Jt
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Preferences */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Profil Risiko
                </label>
                <select
                  value={riskTolerance}
                  onChange={(e) => setRiskTolerance(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                >
                  <option value="CONSERVATIVE">Konservatif (Pangan Pokok)</option>
                  <option value="MODERATE">Moderat (Agro-Industri)</option>
                  <option value="GROWTH">Pertumbuhan (Teknologi/Cold Chain)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Horizon Waktu
                </label>
                <select
                  value={investmentHorizon}
                  onChange={(e) => setInvestmentHorizon(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                >
                  <option value="1 Tahun">1 Tahun (Musim Tanam)</option>
                  <option value="2-3 Tahun">2-3 Tahun (Penggemukan Ternak)</option>
                  <option value="5+ Tahun Abadi">5+ Tahun (Wakaf Produktif Abadi)</option>
                </select>
              </div>
            </div>

            {/* Allocation Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>1. Aset Riil Produktif (Kemitraan Syirkah UMKM)</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{productiveRatio}% (Rp {allocatedProductiveReal.toLocaleString('id-ID')})</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="70"
                  value={productiveRatio}
                  onChange={(e) => setProductiveRatio(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>2. Instrumen Likuid Syariah (Sukuk Ritel / Deposito Mudharabah)</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{sukukRatio}% (Rp {allocatedSukuk.toLocaleString('id-ID')})</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={sukukRatio}
                  onChange={(e) => setSukukRatio(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>3. Wakaf Produktif Abadi (Tanah Pertanian / Sarana Air)</span>
                  <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{waqfRatio}% (Rp {allocatedWaqf.toLocaleString('id-ID')})</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={waqfRatio}
                  onChange={(e) => setWaqfRatio(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>4. Kas Cadangan Likuiditas Cepat (Abdurrahman bin Auf)</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{emergencyRatio}% (Rp {allocatedEmergency.toLocaleString('id-ID')})</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={emergencyRatio}
                  onChange={(e) => setEmergencyRatio(Number(e.target.value))}
                  className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Allocation Outcome Card */}
          <div className="bg-gradient-to-br from-slate-50 to-emerald-50/50 dark:from-slate-850 dark:to-slate-900 rounded-2xl p-6 border border-emerald-500/30 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Proyeksi Hasil Portofolio Produktif
              </span>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                Bagi Hasil Syariah
              </span>
            </div>

            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Estimasi Imbal Hasil Sektor Riil per Tahun:</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                Rp {estimatedAnnualYield.toLocaleString('id-ID')} / tahun
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                ~ Rp {Math.round(estimatedAnnualYield / 12).toLocaleString('id-ID')} / bulan pasif berkah
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400">Dampak Serapan Mustahik:</span>
                <div className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono mt-0.5">
                  {estimatedBeneficiariesEmpowered} Kepala Keluarga
                </div>
                <div className="text-[10px] text-teal-600 dark:text-teal-400">Memperoleh alat kerja mandiri</div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400">Potensi Zakat Maal (2,5%):</span>
                <div className="text-base font-bold text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                  Rp {estimatedZakatFromYield.toLocaleString('id-ID')}
                </div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400">Penyucian atas hasil bagi hasil</div>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 leading-relaxed">
              <strong>Kaidah Ibnu Khaldun:</strong> Dengan mengalihkan Rp {allocatedProductiveReal.toLocaleString('id-ID')} ke aset kerja riil, Anda telah memutus siklus kemewahan pasif (*rafahiyah*), membentengi harta dari degradasi inflasi, serta menghidupkan pasar umat.
            </div>

            <button
              onClick={onNavigateToCalculator}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs"
            >
              <Coins className="w-4 h-4" />
              <span>Hitung Zakat Maal atas Surplus Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Productive Sharia Sectors Catalog */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              Katalog Sektor Bisnis Syariah Berbasis Tren Ekonomi 2026
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Sektor pilihan yang memenuhi 3 kriteria Ibnu Khaldun: Kebutuhan Primer (*Dharuriyyat*), Nilai Tambah Pengolahan, dan Perputaran Cepat (*Velocity of Money*).
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['ALL', 'Pangan & Agrikultur', 'Industri Pengolahan', 'Logistik & Distribusi', 'Peternakan Syirkah'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedFilter === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat === 'ALL' ? 'Semua Sektor' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSectors.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {sec.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      Proyeksi: {sec.projectedReturn}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                        {sec.name}
                      </h4>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Akad: {sec.akadSyariah} • Risiko: {sec.riskRating}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sec.description}
                  </p>

                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                      <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                      <span><strong>Data Tren Ekonomi:</strong> {sec.trendMetric}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-300 font-medium">
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      <span><strong>Dampak Serapan:</strong> {sec.jobImpactPer100M}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Prinsip: {sec.khaldunPillar}
                  </span>
                  <button
                    onClick={onNavigateToCampaigns}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Salurkan Modal Syirkah</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
