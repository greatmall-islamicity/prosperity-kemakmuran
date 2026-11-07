import React, { useState } from 'react';
import { 
  FileCode, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Download, 
  Copy, 
  Check, 
  Flame, 
  BookOpen, 
  Scale, 
  Coins, 
  Terminal,
  Activity
} from 'lucide-react';
import { Language } from '../types';

interface MuqaddimahProtocolProps {
  currentLang: Language;
  onNavigateToCalculator: () => void;
  onNavigateToBlockchain: () => void;
}

export const MuqaddimahProtocol: React.FC<MuqaddimahProtocolProps> = ({
  currentLang,
  onNavigateToCalculator,
  onNavigateToBlockchain,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'cycle_engine' | 'smart_contract' | 'kifayah_oracle'>('architecture');
  const [copiedCode, setCopiedCode] = useState(false);

  // Civilization cycle simulation state
  const [cyclePhase, setCyclePhase] = useState<number>(3); // 1 to 5
  const [isInterventionApplied, setIsInterventionApplied] = useState<boolean>(false);

  // Had Kifayah Oracle interactive test
  const [familyMembers, setFamilyMembers] = useState<number>(4);
  const [localFoodBasketCost, setLocalFoodBasketCost] = useState<number>(1800000); // biaya pangan keluarga
  const [housingCost, setHousingCost] = useState<number>(900000); // biaya tempat tinggal
  const [educationHealthCost, setEducationHealthCost] = useState<number>(650000); // pendidikan & kesehatan
  const [actualHouseholdIncome, setActualHouseholdIncome] = useState<number>(1600000);

  const calculatedHadKifayah = localFoodBasketCost + housingCost + educationHealthCost;
  const perCapitaIncome = actualHouseholdIncome / familyMembers;
  const perCapitaKifayah = calculatedHadKifayah / familyMembers;
  const kifayahRatio = (actualHouseholdIncome / calculatedHadKifayah) * 100;

  let protocolStatus = 'Muzakki Mandiri';
  let protocolAsnaf = 'Bukan Mustahik';
  let recommendedAid = 'Wajib Zakat Maal jika mencapai nisab emas 85gr';

  if (kifayahRatio < 50) {
    protocolStatus = 'Asnaf Fakir (Sangat Mendesak)';
    protocolAsnaf = 'Fakir';
    recommendedAid = 'Bantuan Pangan Pokok 100% + Pendampingan Darurat';
  } else if (kifayahRatio < 100) {
    protocolStatus = 'Asnaf Miskin (Produktif Potensial)';
    protocolAsnaf = 'Miskin';
    recommendedAid = 'Bantuan Modal Usaha Bergulir (Syirkah) + Paket Alat Produksi';
  }

  const copySmartContract = () => {
    navigator.clipboard.writeText(smartContractCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleApplyIntervention = () => {
    setIsInterventionApplied(true);
    setCyclePhase(3); // Reset civilization cycle back to golden flourishing phase
  };

  const smartContractCode = `// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

/**
 * @title ProtokolMuqaddimahCore v1.0
 * @notice Konsensus Terdesentralisasi Pengelolaan Sumber Daya Berkelanjutan & Distribusi ZISWAF
 * @dev Berdasarkan Prinsip Sosiologi-Ekonomi Kitab Al-Muqaddimah Ibnu Khaldun
 */
interface IHadKifayahOracle {
    function getThreshold(bytes32 regionCode, uint8 familySize) external view returns (uint256);
}

contract ProtokolMuqaddimah {
    address public immutable dewanPengawasSyariah;
    IHadKifayahOracle public kifayahOracle;
    uint256 public constant NISAB_GOLD_GRAMS = 85;
    uint256 public constant ZAKAT_RATE_BPS = 250; // 2.5%

    enum Asnaf { Fakir, Miskin, Amil, Muallaf, Riqab, Gharimin, Fisabilillah, IbnuSabil }

    struct MustahikProfile {
        bytes32 nikHash;
        Asnaf category;
        uint256 verifiedIncome;
        uint256 allocatedCapital;
        bool graduatedToMuzakki;
        uint256 lastDisbursementTimestamp;
    }

    mapping(address => MustahikProfile) public mustahikRegistry;
    mapping(bytes32 => bool) public executedDisbursements;

    event ZakatDistributed(
        address indexed recipient,
        Asnaf indexed asnaf,
        uint256 amountIdr,
        string akad,
        bytes32 proofHash
    );

    event MustahikGraduated(
        address indexed mustahik,
        uint256 monthsToMuzakki,
        uint256 totalProductiveYield
    );

    modifier onlyDPS() {
        require(msg.sender == dewanPengawasSyariah, "Protokol: Unauthorized DPS");
        _;
    }

    constructor(address _dps, address _oracle) {
        dewanPengawasSyariah = _dps;
        kifayahOracle = IHadKifayahOracle(_oracle);
    }

    /**
     * @notice Menyalurkan dana zakat dengan verifikasi otomatis Had Kifayah
     * @dev Menolak intervensi konsumtif jika mustahik memiliki potensi nilai tambah (amal)
     */
    function disburseProductiveZakat(
        address recipient,
        Asnaf asnaf,
        uint256 amount,
        string calldata akad,
        bytes32 proofHash
    ) external onlyDPS {
        require(!executedDisbursements[proofHash], "Protokol: Double disbursement prevented");
        
        executedDisbursements[proofHash] = true;
        mustahikRegistry[recipient].allocatedCapital += amount;
        
        emit ZakatDistributed(recipient, asnaf, amount, akad, proofHash);
    }

    /**
     * @notice Mencatat kelulusan mustahik menjadi muzakki (Gerakan Sadar Kaya)
     */
    function certifyMustahikGraduation(address mustahik, uint256 yieldGenerated) external onlyDPS {
        mustahikRegistry[mustahik].graduatedToMuzakki = true;
        emit MustahikGraduated(mustahik, 12, yieldGenerated);
    }
}`;

  return (
    <div className="space-y-10 py-6">
      {/* Protocol Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 text-white p-6 sm:p-10 border border-emerald-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Protokol Muqaddimah v1.0 • Mainnet Active
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold">
              Proof of Sadaqah (PoS)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-serif">
            Arsitektur Protokol <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">Al-Muqaddimah</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Protokol Muqaddimah adalah standar konsensus desentralisasi pertama yang mengintegrasikan hukum peradaban <strong>Ibnu Khaldun (*Ilmu 'Umran*)</strong> ke dalam kontrak cerdas (*smart contract*). Protokol ini mengotomatiskan audit nisab emas, penentuan Had Kifayah 8 Asnaf, pencegahan monopoli (*anti-ihtikar*), serta pemantauan transformasi mustahik menjadi muzakki secara terverifikasi.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNavigateToBlockchain}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-xs"
            >
              <Layers className="w-4 h-4" />
              Eksplorasi Ledger On-Chain
            </button>
            <button
              onClick={onNavigateToCalculator}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-xs"
            >
              <Coins className="w-4 h-4" />
              Kalkulasi Nisab Protokol
            </button>
          </div>
        </div>
      </div>

      {/* Protocol Navigation Subtabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        {[
          { id: 'architecture', label: '1. Arsitektur 4 Engine Protokol', icon: Layers },
          { id: 'cycle_engine', label: '2. Simulator Siklus Peradaban Khaldun', icon: Activity },
          { id: 'kifayah_oracle', label: '3. Oracle Had Kifayah Interaktif', icon: Scale },
          { id: 'smart_contract', label: '4. Kode Smart Contract Solidity', icon: FileCode },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: 4 PROTOCOL ENGINES */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                  ENGINE 01 • SYARIAH ORACLE
                </span>
                <Scale className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Had Kifayah Dynamic Oracle (HKDO)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Algoritma penentu ambang batas kemiskinan riil berbasis biaya hidup spesifik per kabupaten/kota. Menggantikan batasan kemiskinan statis dengan kalkulasi dinamis atas 3 komponen asasi: pangan layak gizi, sewa tempat tinggal, serta pendidikan & kesehatan keluarga.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                Formula: HK = BiayaPangan + BiayaHunian + BiayaPendidikanKesehatan
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-300 dark:border-blue-800">
                  ENGINE 02 • VALUE EQUATION
                </span>
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Khaldunian Value & Effort Index (VEI)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Memastikan dana zakat yang dialokasikan tidak menjadi "sedekah konsumtif yang mematikan inisiatif". Protokol memprioritaskan pembiayaan alat kerja produksi (gerobak, mesin, benih tani, perahu) kepada mustahik yang memiliki keterampilan teruji.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-[11px] font-mono text-blue-700 dark:text-blue-400">
                Formula: Rezeki = Amal × Spesialisasi^1.2 × TrustCapital
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800">
                  ENGINE 03 • MARKET EQUILIBRIUM
                </span>
                <ShieldCheck className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Anti-Ihtikar & Liquidity Velocity Guard
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Menegakkan wasiat Abdurrahman bin Auf dan larangan ihtikar Ibnu Khaldun. Dana amanah zakat yang masuk ke smart contract diwajibkan tersalurkan ke sektor riil dalam rentang maksimal 14 hari tanpa pengendapan pasif.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-[11px] font-mono text-amber-700 dark:text-amber-400">
                Aturan Konsensus: MaxIdlePeriod = 14 Days • Zero Idle Reserve Fee
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded border border-teal-300 dark:border-teal-800">
                  ENGINE 04 • EMPOWERMENT INDEX
                </span>
                <Sparkles className="w-5 h-5 text-teal-500" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                MMTI (Mustahik-to-Muzakki Transition Index)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Indeks keberhasilan lembaga amil zakat diukur bukan dari seberapa banyak zakat yang dibagikan, melainkan seberapa banyak mustahik yang berhasil "lulus" menjadi pembayar zakat mandiri dalam 12–24 bulan.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-[11px] font-mono text-teal-700 dark:text-teal-400">
                Target Protokol: Minimal 30% Mustahik Lulus Menjadi Muzakki per Haul
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CIVILIZATION CYCLE SIMULATOR */}
      {activeTab === 'cycle_engine' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                The Khaldunian Civilization Engine
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Simulator 5 Fase Siklus Peradaban & Titik Intervensi Zakat
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Ibnu Khaldun memetakan bahwa peradaban yang makmur pasti runtuh jika jatuh ke fase kemewahan konsumtif (*rafahiyah*). Protokol Muqaddimah bertindak sebagai rem penyelamat otomatis.
              </p>
            </div>

            <button
              onClick={handleApplyIntervention}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 self-start md:self-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Injeksi ZISWAF Produktif (Reset Siklus)</span>
            </button>
          </div>

          {/* Interactive Phase Slider */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Fase Saat Ini: Fase {cyclePhase}</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                {cyclePhase === 1 && 'Fase 1: Solidaritas Sosial (\'Ashabiyyah)'}
                {cyclePhase === 2 && 'Fase 2: Sentralisasi & Penguatan Kelembagaan'}
                {cyclePhase === 3 && 'Fase 3: Kemakmuran & Surplus Spesialisasi (Masa Emas)'}
                {cyclePhase === 4 && 'Fase 4: Kemewahan Berlebih (Rafahiyah) & Pajak Menindas'}
                {cyclePhase === 5 && 'Fase 5: Kemunduran & Kolaps Ekonomi'}
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={cyclePhase}
              onChange={(e) => {
                setCyclePhase(Number(e.target.value));
                setIsInterventionApplied(false);
              }}
              className="w-full h-3 accent-emerald-600 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />

            <div className="grid grid-cols-5 text-[10px] font-mono text-slate-400 text-center pt-1">
              <span>1. 'Ashabiyyah</span>
              <span>2. Institusi</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">3. Kemakmuran</span>
              <span className="text-amber-500 font-bold">4. Rafahiyah</span>
              <span className="text-rose-500 font-bold">5. Kolaps</span>
            </div>
          </div>

          {/* Detailed Diagnosis Card of Current Phase */}
          <div className={`p-5 rounded-2xl border transition-all ${
            cyclePhase === 3
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-400/40'
              : cyclePhase >= 4
              ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-400/40'
              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
              {cyclePhase >= 4 ? <Flame className="w-4 h-4 text-rose-500" /> : <Sparkles className="w-4 h-4 text-emerald-500" />}
              <span>Karakteristik & Risiko Sosiologis:</span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
              {cyclePhase === 1 && 'Masyarakat memiliki solidaritas tinggi, etos kerja luhur, dan tidak konsumtif. Kebutuhan masih sederhana, gotong royong kuat.'}
              {cyclePhase === 2 && 'Pemerintahan dan pasar mulai teratur. Hukum kepemilikan ditegakkan dan perdagangan antardaerah berkembang pesat.'}
              {cyclePhase === 3 && 'Puncak peradaban: Keahlian terspesialisasi tinggi, surplus ekonomi melimpah, ilmu pengetahuan berkembang, dan pasar sangat dinamis. Rezeki melimpah karena nilai tambah (amal) maksimal.'}
              {cyclePhase === 4 && 'Peringatan Khaldun: Gaya hidup mewah dan konsumtif menjangkiti masyarakat. Biaya hidup melonjak drastis, pungutan pajak memberatkan rakyat pekerja, motivasi kerja menurun.'}
              {cyclePhase === 5 && 'Siklus akhir: Kehancuran moral dan kepailitan ekonomi. Monopoli merajalela dan daya beli masyarakat hancur total jika tidak ada intervensi sistemik.'}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              <strong>Solusi Protokol Muqaddimah:</strong> Salurkan surplus dari fase kemakmuran melalui Zakat Maal & Wakaf Produktif ke modal kerja dhuafa, guna mencegah timbulnya kesenjangan ekstrem dan mengunci peradaban tetap di Fase 3!
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HAD KIFAYAH ORACLE */}
      {activeTab === 'kifayah_oracle' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              Simulator Oracle Had Kifayah
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Uji Kelayakan Asnaf Berdasarkan Biaya Hidup Riil
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Jumlah Jiwa dalam Keluarga
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={familyMembers}
                onChange={(e) => setFamilyMembers(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Kebutuhan Pangan Pokok Layak Gizi (Keluarga/Bulan)
              </label>
              <input
                type="number"
                value={localFoodBasketCost}
                onChange={(e) => setLocalFoodBasketCost(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Biaya Tempat Tinggal / Sewa / Listrik / Air
              </label>
              <input
                type="number"
                value={housingCost}
                onChange={(e) => setHousingCost(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Pendidikan Anak & Layanan Kesehatan Dasar
              </label>
              <input
                type="number"
                value={educationHealthCost}
                onChange={(e) => setEducationHealthCost(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Penghasilan Riil Kepala Keluarga (Bulan Ini)
              </label>
              <input
                type="number"
                value={actualHouseholdIncome}
                onChange={(e) => setActualHouseholdIncome(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Oracle Decision Output */}
          <div className="bg-gradient-to-br from-slate-50 to-emerald-50/50 dark:from-slate-850 dark:to-slate-900 rounded-2xl p-6 border border-emerald-500/30 space-y-4">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Keputusan Konsensus Protokol Had Kifayah
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400">Total Had Kifayah Keluarga:</span>
                <div className="text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5">
                  Rp {calculatedHadKifayah.toLocaleString('id-ID')}
                </div>
                <div className="text-[10px] text-slate-500">Rp {Math.round(perCapitaKifayah).toLocaleString('id-ID')}/jiwa</div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400">Rasio Ketercukupan Hidup:</span>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                  {kifayahRatio.toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-500">Ambang Miskin: &lt; 100%</div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs text-slate-400">Klasifikasi Status Syar'i:</div>
              <div className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>{protocolStatus}</span>
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-400 pt-1 border-t border-slate-100 dark:border-slate-700 font-medium">
                <strong>Rekomendasi Tindakan:</strong> {recommendedAid}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
              Protokol secara otomatis memasukkan profil ini ke smart contract antrean penyaluran modal bergulir untuk menjamin keadilan distribusi aset.
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SMART CONTRACT SOLIDITY CODE */}
      {activeTab === 'smart_contract' && (
        <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden font-mono text-xs">
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-slate-200 text-xs">ProtokolMuqaddimahCore.sol</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                Solidity ^0.8.24
              </span>
            </div>

            <button
              onClick={copySmartContract}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Disalin' : 'Salin Kode'}</span>
            </button>
          </div>

          <div className="p-5 overflow-x-auto max-h-[500px] leading-relaxed">
            <pre className="text-slate-300 whitespace-pre">
              {smartContractCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
