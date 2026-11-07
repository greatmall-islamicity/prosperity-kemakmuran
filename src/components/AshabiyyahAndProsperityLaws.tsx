import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Scale, 
  MapPin, 
  Compass, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight, 
  Coins, 
  BookOpen, 
  Flame, 
  CheckCircle2, 
  Activity, 
  Layers,
  HeartHandshake,
  Share2,
  GitBranch,
  BarChart3,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { Language } from '../types';
import { AshabiyyahMap } from './AshabiyyahMap';

interface AshabiyyahAndProsperityLawsProps {
  currentLang: Language;
  onNavigateToCalculator: () => void;
  onNavigateToInvestment: () => void;
}

export interface EconomicNode {
  id: string;
  name: string;
  shortName: string;
  category: 'Pangan Primer' | 'Maritim & Pesisir' | 'Finansial & Muzakki' | 'Pengolahan & Herbal' | 'Pendidikan & Amil' | 'Rantai Pasok & Logistik';
  membersCount: number; // KK
  monthlyVolumeIdr: number;
  ashabiyyahScore: number; // 0 - 100
  cx: number; // in svg viewBox 800x520
  cy: number;
  iconBg: string;
  roleInEcosystem: string;
  khaldunInsight: string;
  keyOutputs: string[];
}

export interface EconomicLink {
  id: string;
  sourceId: string;
  targetId: string;
  label: string;
  monthlyFlowIdr: number;
  trustScore: number;
  akad: string;
  type: 'syirkah_capital' | 'raw_material' | 'finished_goods' | 'zakat_empowerment';
}

interface AshabiyyahRegion {
  id: string;
  regionName: string;
  ashabiyyahScore: number; // 0 - 100
  status: 'Kuat & Mengakar' | 'Tumbuh Dinamis' | 'Perlu Penguatan';
  communalZakatRate: string;
  primarySocialCapital: string;
  economicResilience: string;
  khaldunObservation: string;
  lat: number;
  lng: number;
}

export const AshabiyyahAndProsperityLaws: React.FC<AshabiyyahAndProsperityLawsProps> = ({
  currentLang,
  onNavigateToCalculator,
  onNavigateToInvestment,
}) => {
  const [activeTab, setActiveTab] = useState<'d3_simulation' | 'network_graph' | 'prosperity_stages' | 'ashabiyyah_map' | 'cohesion_calculator'>('d3_simulation');
  const [selectedStage, setSelectedStage] = useState<number>(3); // 1 to 5
  const [selectedRegionId, setSelectedRegionId] = useState<string>('reg-sumbar');

  // Network Graph Selected Node & Simulation State
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-saudagar');
  const [isAdditionalSynergyActive, setIsAdditionalSynergyActive] = useState<boolean>(true);

  // Community Ashabiyyah Calculator State
  const [communitySize, setCommunitySize] = useState<number>(250); // Kepala Keluarga
  const [zakatParticipationRate, setZakatParticipationRate] = useState<number>(75); // %
  const [hasFoodBankLumbung, setHasFoodBankLumbung] = useState<boolean>(true);
  const [hasInterestFreeCoop, setHasInterestFreeCoop] = useState<boolean>(true);
  const [mutualAidFrequency, setMutualAidFrequency] = useState<number>(4); // kali per bulan

  // Calculated Ashabiyyah Resilience Score (0 - 100)
  const calculatedScore = Math.min(
    100,
    Math.round(
      (zakatParticipationRate * 0.4) +
      (hasFoodBankLumbung ? 25 : 5) +
      (hasInterestFreeCoop ? 25 : 5) +
      (mutualAidFrequency * 2.5)
    )
  );

  let ashabiyyahLevel = 'Rapuh / Individualistis (Banjir Risiko)';
  let ashabiyyahClass = 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800';
  let ashabiyyahPrescription = 'Masyarakat rentan terjerat rentenir dan krisis pangan. Segera dirikan Baitul Maal komunitas dan lumbung pangan rukun warga.';

  if (calculatedScore >= 80) {
    ashabiyyahLevel = 'Ashabiyyah Mutamaddin (Peradaban Tangguh & Mandiri)';
    ashabiyyahClass = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800';
    ashabiyyahPrescription = 'Solidaritas sosial sangat kuat. Mampu membiayai modal usaha produktif sendiri dan mengentaskan kemiskinan warga secara mandiri.';
  } else if (calculatedScore >= 55) {
    ashabiyyahLevel = 'Ashabiyyah Berkembang (Daya Lentur Cukup)';
    ashabiyyahClass = 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800';
    ashabiyyahPrescription = 'Kemandirian pangan mulai terbangun. Perlu penguatan syirkah usaha kolektif untuk memutus ketergantungan modal luar.';
  }

  // Network Nodes Definition (viewBox 800 x 520)
  const economicNodes: EconomicNode[] = [
    {
      id: 'node-saudagar',
      name: 'Asosiasi Saudagar Sadar Kaya (Muzakki Investor)',
      shortName: 'Saudagar & Finansial',
      category: 'Finansial & Muzakki',
      membersCount: 48,
      monthlyVolumeIdr: 320000000,
      ashabiyyahScore: 95,
      cx: 400,
      cy: 80,
      iconBg: 'from-amber-500 to-amber-700',
      roleInEcosystem: 'Penyedia likuiditas syirkah, offtaker hasil panen, dan penyalur zakat mal produktif langsung ke sektor riil.',
      khaldunInsight: 'Penerapan strategi Abdurrahman bin Auf: Modal diputar ke sektor riil dengan margin wajar dan transparansi 100% tanpa penimbunan.',
      keyOutputs: ['Modal Musyarakah', 'Zakat Maal Produktif', 'Jaringan Akses Pasar Nasional'],
    },
    {
      id: 'node-petani',
      name: 'Komunitas Petani Padi Organik Karawang',
      shortName: 'Petani Padi Organik',
      category: 'Pangan Primer',
      membersCount: 125,
      monthlyVolumeIdr: 165000000,
      ashabiyyahScore: 91,
      cx: 170,
      cy: 220,
      iconBg: 'from-emerald-500 to-emerald-700',
      roleInEcosystem: 'Produsen gabah & beras organik premium penopang ketahanan pangan dasar (Dharuriyyat) umat.',
      khaldunInsight: 'Pilar ke-1 Al-Muqaddimah: Nilai rezeki adalah buah kerja fisik dan tanah yang diolah dengan integritas tinggi.',
      keyOutputs: ['45 Ton Beras Organik/Bulan', 'Gabah Siap Giling', 'Lumbung Pangan Cadangan'],
    },
    {
      id: 'node-nelayan',
      name: 'Koperasi Nelayan Mandiri Muara Angke',
      shortName: 'Nelayan & Rantai Dingin',
      category: 'Maritim & Pesisir',
      membersCount: 85,
      monthlyVolumeIdr: 140000000,
      ashabiyyahScore: 88,
      cx: 190,
      cy: 420,
      iconBg: 'from-cyan-500 to-blue-700',
      roleInEcosystem: 'Penyedia protein maritim segar dengan fasilitas pendingin bertenaga surya kolektif.',
      khaldunInsight: 'Penghapusan tengkulak melalui kemitraan bagi hasil maritim mengembalikan surplus ekonomi ke keluarga nelayan.',
      keyOutputs: ['22 Ton Ikan Tangkap Segar', 'Pengolahan Ikan Asin Higienis', 'Koperasi Pesisir'],
    },
    {
      id: 'node-herbal',
      name: 'Sentra Pengrajin Jamu & Herbal Priangan',
      shortName: 'Pengrajin Herbal UMKM',
      category: 'Pengolahan & Herbal',
      membersCount: 64,
      monthlyVolumeIdr: 95000000,
      ashabiyyahScore: 89,
      cx: 400,
      cy: 460,
      iconBg: 'from-teal-500 to-emerald-700',
      roleInEcosystem: 'Mengolah rimpang herbal mentah menjadi produk kesehatan terstandar BPOM berdaya saing tinggi.',
      khaldunInsight: 'Pilar ke-2 Al-Muqaddimah: Spesialisasi pengolahan bahan mentah melahirkan surplus nilai tambah berlipat ganda.',
      keyOutputs: ['Ekstrak Jamu Instan', 'Minyak Atsiri Alami', 'Minuman Nutrisi Herbal'],
    },
    {
      id: 'node-vokasi',
      name: 'Baitul Maal & Pesantren Vokasi Sukabumi',
      shortName: 'Vokasi Keahlian & Amil',
      category: 'Pendidikan & Amil',
      membersCount: 320,
      monthlyVolumeIdr: 110000000,
      ashabiyyahScore: 96,
      cx: 630,
      cy: 220,
      iconBg: 'from-indigo-500 to-purple-700',
      roleInEcosystem: 'Pusat inkubasi sertifikasi keahlian santri mustahik, dewan pengawas syariah, dan auditor smart contract.',
      khaldunInsight: 'Pendidikan vokasi spesifik mencetak tenaga ahli yang siap memimpin industri halal tanpa bergantung pada bantuan belas kasihan.',
      keyOutputs: ['Tenaga Terampil Bersertifikasi', 'Audit Fiqih Muamalah', 'Inovasi Riset Pakan Organik'],
    },
    {
      id: 'node-logistik',
      name: 'Hub Distribusi & Logistik Antar-Pasar',
      shortName: 'Logistik Cepat (WMS)',
      category: 'Rantai Pasok & Logistik',
      membersCount: 35,
      monthlyVolumeIdr: 210000000,
      ashabiyyahScore: 92,
      cx: 610,
      cy: 420,
      iconBg: 'from-amber-600 to-orange-700',
      roleInEcosystem: 'Menghubungkan rantai pasok antar komoditas langsung ke pasar kota dengan teknologi pelacakan QR Code.',
      khaldunInsight: 'Kecepatan perputaran uang (velocity of money) memotong biaya perantara liar dan menjaga kesegaran barang dagangan.',
      keyOutputs: ['Armada Truk Berpendingin', 'Manajemen Pergudangan QR', 'Platform Distribusi Terintegrasi'],
    },
  ];

  // Inter-Community Economic Links
  const economicLinks: EconomicLink[] = [
    {
      id: 'l1',
      sourceId: 'node-saudagar',
      targetId: 'node-petani',
      label: 'Modal Musyarakah Pupuk & Benih',
      monthlyFlowIdr: 120000000,
      trustScore: 97,
      akad: 'Musyarakah (Bagi Hasil Panen)',
      type: 'syirkah_capital',
    },
    {
      id: 'l2',
      sourceId: 'node-petani',
      targetId: 'node-logistik',
      label: 'Suplai 45 Ton Beras ke Hub Logistik',
      monthlyFlowIdr: 95000000,
      trustScore: 94,
      akad: 'Jual Beli Murabahah Terbuka',
      type: 'raw_material',
    },
    {
      id: 'l3',
      sourceId: 'node-nelayan',
      targetId: 'node-logistik',
      label: 'Distribusi Cold Chain Ikan Pesisir',
      monthlyFlowIdr: 85000000,
      trustScore: 92,
      akad: 'Kemitraan Syirkah Inan',
      type: 'raw_material',
    },
    {
      id: 'l4',
      sourceId: 'node-logistik',
      targetId: 'node-saudagar',
      label: 'Penjualan ke Ritel & Pasar Kota',
      monthlyFlowIdr: 180000000,
      trustScore: 96,
      akad: 'Perputaran Tunai Cepat (Cash Flow)',
      type: 'finished_goods',
    },
    {
      id: 'l5',
      sourceId: 'node-saudagar',
      targetId: 'node-vokasi',
      label: 'Alokasi Zakat Maal & Beasiswa Vokasi',
      monthlyFlowIdr: 65000000,
      trustScore: 99,
      akad: 'Zakat Maal - Asnaf Fisabilillah',
      type: 'zakat_empowerment',
    },
    {
      id: 'l6',
      sourceId: 'node-vokasi',
      targetId: 'node-herbal',
      label: 'Pendampingan Standar BPOM & Mesin',
      monthlyFlowIdr: 45000000,
      trustScore: 95,
      akad: 'Wakaf Produktif Alat Ekstraksi',
      type: 'zakat_empowerment',
    },
    {
      id: 'l7',
      sourceId: 'node-herbal',
      targetId: 'node-logistik',
      label: 'Pasokan Produk Jamu Kemasan',
      monthlyFlowIdr: 50000000,
      trustScore: 91,
      akad: 'Distribusi Grosir Syariah',
      type: 'finished_goods',
    },
    // Dynamic Synergy Link (Toggled)
    ...(isAdditionalSynergyActive ? [{
      id: 'l8-synergy',
      sourceId: 'node-vokasi',
      targetId: 'node-nelayan',
      label: 'Inovasi Riset Pakan Ikan & Sensor Solar',
      monthlyFlowIdr: 35000000,
      trustScore: 96,
      akad: 'Sinergi Keilmuan & Alat Tangkap Efisien',
      type: 'zakat_empowerment' as const,
    }] : [])
  ];

  const selectedNode = economicNodes.find((n) => n.id === selectedNodeId) || economicNodes[0];

  // Aggregated Network Multiplier Metrics
  const totalNetworkMonthlyFlow = economicLinks.reduce((acc, curr) => acc + curr.monthlyFlowIdr, 0);
  const totalBeneficiaries = economicNodes.reduce((acc, curr) => acc + curr.membersCount, 0);
  const averageTrustScore = (economicLinks.reduce((acc, curr) => acc + curr.trustScore, 0) / economicLinks.length).toFixed(1);

  const prosperityStages = [
    {
      stage: 1,
      arabic: 'المعاش الضروري',
      name: 'Tahap 1: Ketercukupan Primer (Al-Ma\'ash ad-Dharuri)',
      focus: 'Fokus Bertahan Hidup & Kebutuhan Mendasar',
      desc: 'Masyarakat hidup dari pemenuhan pangan pokok (*al-qut*) dan tempat berteduh sederhana. Kerja sama fisik sangat tinggi karena manusia mustahil bertahan sendirian tanpa tolong-menolong.',
      economicTrait: 'Belum ada akumulasi modal besar. Nilai tukar sederhana berupa barter atau uang komoditas primer.',
      khaldunLaw: 'Solidaritas (\'Ashabiyyah) berada pada titik paling murni dan tulus, karena tidak ada persaingan kemewahan.',
      color: 'from-blue-600 to-cyan-700',
    },
    {
      stage: 2,
      arabic: 'تقسيم العمل وظهور الفائض',
      name: 'Tahap 2: Pembagian Kerja & Lahirnya Surplus (Taqsim al-Amal)',
      focus: 'Spesialisasi Keahlian & Efisiensi Kolektif',
      desc: 'Masyarakat menyadari bahwa kerja serabutan tidak efisien. Terjadi spesialisasi: ada petani, peternak, tukang bangunan, dan perajin alat. Kerja sama terorganisir melahirkan surplus hasil produksi melebihi kebutuhan konsumsi harian.',
      economicTrait: 'Tercipta tabungan riil dan kelebihan pasokan barang yang siap ditukarkan ke komunitas lain.',
      khaldunLaw: 'Surplus ekonomi lahir dari sinergi amal banyak orang, bukan kehebatan individu yang menyendiri.',
      color: 'from-teal-600 to-emerald-700',
    },
    {
      stage: 3,
      arabic: 'التجارة والعمران وازدهار الصنائع',
      name: 'Tahap 3: Perdagangan, Nilai Tambah & Puncak Kemakmuran',
      focus: 'Masa Keemasan Peradaban & Pasar Dinamis',
      desc: 'Pasar reguler terbentuk. Berkembang industri pengolahan (*sana\'i*), transportasi, dan pertukaran emas/perak. Uang berputar sangat cepat (*high velocity of money*). Nilai tukar dan keuntungan ditentukan oleh modal kepercayaan (*trust*) dan mutu barang.',
      economicTrait: 'Kesejahteraan masyarakat merata, pendapatan tinggi, Baitul Maal surplus, dan zakat tersalurkan optimal.',
      khaldunLaw: 'Kekayaan hakiki peradaban adalah perputaran nilai tambah (amal) yang adil di pasar yang bermoral.',
      color: 'from-emerald-600 to-amber-600',
    },
    {
      stage: 4,
      arabic: 'الترف والرفاهية والكسل',
      name: 'Tahap 4: Kemewahan Berlebih (Rafahiyah) & Biaya Hidup Tinggi',
      focus: 'Peringatan Titik Balik Keruntuhan',
      desc: 'Generasi penerus terbuai kenyamanan. Konsumsi bergeser dari kebutuhan produktif ke barang prestise dan gaya hidup hedonis (*taraf*). Biaya hidup melonjak drastis, pungutan dan pajak dinaikkan penguasa untuk menutupi defisit konsumtif, mematikan motivasi bekerja.',
      economicTrait: 'Munculnya rentenir, penimbunan modal (*ihtikar*), dan keengganan berproduksi riil.',
      khaldunLaw: 'Pajak yang menindas dan gaya hidup mewah adalah lonceng kematian inisiatif usaha masyarakat.',
      color: 'from-amber-600 to-rose-700',
    },
    {
      stage: 5,
      arabic: 'خراب العمران والتفكك',
      name: 'Tahap 5: Kehancuran Peradaban & Disintegrasi Ekonomi (Kharab)',
      focus: 'Kolaps Sosial Akibat Hilangnya Keadilan',
      desc: 'Hak milik tidak lagi aman, monopoli merajalela, keadilan hukum sirna. Solidaritas sosial (\'Ashabiyyah) musnah menjadi individualisme ekstrem. Masyarakat terjerumus dalam kemiskinan massal.',
      economicTrait: 'Pasar lumpuh, daya beli nol, dan masyarakat terpecah-belah hingga lahir peradaban baru.',
      khaldunLaw: 'Ketidakadilan dan kezaliman meruntuhkan peradaban sekuat apapun benteng militernya.',
      color: 'from-rose-700 to-slate-900',
    },
  ];

  const ashabiyyahRegions: AshabiyyahRegion[] = [
    {
      id: 'reg-sumbar',
      regionName: 'Sumatera Barat (Minangkabau & Rantau)',
      ashabiyyahScore: 89,
      status: 'Kuat & Mengakar',
      communalZakatRate: '88% Pembayaran via Kerapatan Nagari & Baitul Maal',
      primarySocialCapital: 'Tanah Ulayat Bersama, Tradisi Kongsi & Rantau Berdaya',
      economicResilience: 'Sangat Tinggi terhadap guncangan inflasi luar',
      khaldunObservation: 'Konsep "Bareh Solok" dan tanah pusako tinggi berfungsi persis seperti perlindungan modal riil kolektif Al-Muqaddimah.',
      lat: -0.9471,
      lng: 100.4172,
    },
    {
      id: 'reg-jabar',
      regionName: 'Jawa Barat (Priangan & Pantura)',
      ashabiyyahScore: 82,
      status: 'Kuat & Mengakar',
      communalZakatRate: '81% Solidaritas Beras Perelek & Koperasi Santri',
      primarySocialCapital: 'Jejaring Pesantren Tradisional, Lumbung Desa, Budaya Sauyunan',
      economicResilience: 'Tinggi pada sentra pertanian organik dan UMKM',
      khaldunObservation: 'Tradisi gotong royong "Perelek" (sejimpit beras per pintu setiap sore) adalah model mikrozakat tertua yang menjaga ketahanan pangan.',
      lat: -6.9175,
      lng: 107.6191,
    },
    {
      id: 'reg-jateng',
      regionName: 'Jawa Tengah & DI Yogyakarta',
      ashabiyyahScore: 88,
      status: 'Kuat & Mengakar',
      communalZakatRate: '86% Kemitraan Sambatan & BMT Mandiri',
      primarySocialCapital: 'Budaya Sambatan Warga, Gugur Gunung, Koperasi BMT Syariah',
      economicResilience: 'Sangat Tangguh dalam ketahanan pangan keluarga',
      khaldunObservation: 'Sambatan membangun rumah dan panen tanpa upah tunai membuktikan teori Ibnu Khaldun bahwa kerja sama melipatgandakan nilai amal.',
      lat: -7.150975,
      lng: 110.140259,
    },
    {
      id: 'reg-jatim',
      regionName: 'Jawa Timur & Madura',
      ashabiyyahScore: 85,
      status: 'Kuat & Mengakar',
      communalZakatRate: '83% Gotong Royong Roan & Kemitraan Nelayan',
      primarySocialCapital: 'Kemitraan Nelayan Tradisional, Pesantren Entrepreneur, Syirkah Ternak',
      economicResilience: 'Tinggi dalam rantai pasok agro-maritim',
      khaldunObservation: 'Sistem bagi hasil perahu dan ternak bergulir mencerminkan model syirkah mudharabah murni sahabat nabi.',
      lat: -7.536064,
      lng: 112.238402,
    },
    {
      id: 'reg-sulsel',
      regionName: 'Sulawesi Selatan (Bugis-Makassar)',
      ashabiyyahScore: 84,
      status: 'Tumbuh Dinamis',
      communalZakatRate: '80% Filantropi Saudagar Bugis di Pelabuhan',
      primarySocialCapital: 'Filosofi Siri\' Na Pacce, Jaringan Pelaut & Saudagar Nusantara',
      economicResilience: 'Sangat Cepat dalam perputaran kas perdagangan maritim',
      khaldunObservation: 'Keahlian berlayar dan keberanian membuka pasar baru mencerminkan kaidah perniagaan Abdurrahman bin Auf.',
      lat: -5.147665,
      lng: 119.432732,
    },
  ];

  const activeRegion = ashabiyyahRegions.find((r) => r.id === selectedRegionId) || ashabiyyahRegions[0];

  return (
    <div className="space-y-10 py-6">
      {/* Hero Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 text-white p-6 sm:p-10 border border-teal-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              Sosiologi Politik-Ekonomi Kitab Al-Muqaddimah
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold">
              Konsep Inti: 'Ashabiyyah (Kohesi & Jejaring Nilai)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-serif">
            Dasbor Visualisasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300">Peta Kekuatan Ashabiyyah</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Dalam teori sosiologi-ekonomi Ibnu Khaldun, produktivitas ekonomi tidak bertumpu pada modal uang yang terisolasi, melainkan pada <strong>kekuatan jejaring sosial (*'Ashabiyyah Network*)</strong> antar kelompok produsen, pedagang, lembaga pendidikan, dan penyedia logistik. Jejaring ini menghapuskan biaya perantara, memotong riba, dan melipatgandakan surplus kesejahteraan bersama.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('d3_simulation')}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-xs"
            >
              <Share2 className="w-4 h-4 text-amber-300" />
              Simulasi D3.js Fisika Ashabiyyah
            </button>
            <button
              onClick={() => setActiveTab('network_graph')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-xs"
            >
              <GitBranch className="w-4 h-4" />
              Struktur Topologi Sosiologis
            </button>
            <button
              onClick={onNavigateToInvestment}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-xs"
            >
              <TrendingUp className="w-4 h-4" />
              Panduan Investasi Sektor Riil
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        {[
          { id: 'd3_simulation', label: '1. Simulasi D3.js Force Interaktif (Fisika Dinamis)', icon: Share2 },
          { id: 'network_graph', label: '2. Struktur Topologi Hubungan Antar-Kelompok', icon: GitBranch },
          { id: 'prosperity_stages', label: '3. 5 Tahap Hukum Kemakmuran Khaldun', icon: Activity },
          { id: 'ashabiyyah_map', label: '4. Peta Indeks Ashabiyah Nusantara', icon: MapPin },
          { id: 'cohesion_calculator', label: '5. Kalkulator Ketahanan Komunitas', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-teal-600 text-teal-600 dark:text-teal-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: D3.JS FORCE SIMULATION ASHABIYYAH MAP */}
      {activeTab === 'd3_simulation' && (
        <AshabiyyahMap
          currentLang={currentLang}
          onNavigateToCalculator={onNavigateToCalculator}
          onNavigateToInvestment={onNavigateToInvestment}
        />
      )}

      {/* TAB 2: INTERACTIVE ASHABIYYAH NETWORK GRAPH CANVAS */}
      {activeTab === 'network_graph' && (
        <div className="space-y-6">
          {/* Top Multiplier Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <span>Perputaran Ekonomi Jejaring</span>
                <Coins className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
                Rp {(totalNetworkMonthlyFlow / 1000000).toFixed(0)} Jt / bln
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Aliran Syirkah & Transaksi Riil
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <span>Efisiensi Biaya Transaksi</span>
                <ShieldCheck className="w-4 h-4 text-teal-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
                -34.5%
              </div>
              <div className="text-[11px] text-teal-600 dark:text-teal-400 mt-1">
                Memotong calo & rentenir liar
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <span>Indeks Modal Kepercayaan</span>
                <HeartHandshake className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
                {averageTrustScore}%
              </div>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 mt-1">
                Amanah akad syariah terverifikasi
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <span>Anggota Komunitas Binaan</span>
                <Users className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
                {totalBeneficiaries} KK
              </div>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 mt-1">
                Transisi Mustahik Menuju Muzakki
              </div>
            </div>
          </div>

          {/* Interactive SVG Network Graph Visualizer */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 z-10 relative">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
                  <span className="font-bold text-sm text-white">
                    Peta Interkoneksi Ekonomi Antar-Komunitas (Ashabiyyah Cohesion Graph)
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Klik sembarang node komunitas untuk membedah analisis sosiologi dan aliran nilai transaksinya
                </p>
              </div>

              {/* Simulation Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('d3_simulation')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition-all flex items-center gap-1.5 shadow"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Buka Mode D3.js Fisika</span>
                </button>
                <button
                  onClick={() => setIsAdditionalSynergyActive(!isAdditionalSynergyActive)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isAdditionalSynergyActive
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-400/50 hover:bg-teal-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAdditionalSynergyActive ? 'Koridor Sinergi Riset Aktif (+Rp 35 Jt)' : 'Aktifkan Sinergi Riset Baru'}</span>
                </button>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="relative w-full h-[380px] sm:h-[480px] bg-slate-900/60 rounded-2xl border border-slate-800/80 overflow-hidden flex items-center justify-center">
              {/* Subtle background coordinate grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              <svg 
                viewBox="0 0 800 520" 
                className="w-full h-full select-none"
                style={{ filter: 'drop-shadow(0px 0px 8px rgba(20, 184, 166, 0.15))' }}
              >
                <defs>
                  {/* Glowing line gradients */}
                  <linearGradient id="grad-teal-amber" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="grad-pulse" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Render Links (Edges) */}
                {economicLinks.map((link) => {
                  const source = economicNodes.find((n) => n.id === link.sourceId);
                  const target = economicNodes.find((n) => n.id === link.targetId);
                  if (!source || !target) return null;

                  const isHighlighted = selectedNodeId === source.id || selectedNodeId === target.id;
                  const isSynergy = link.id.includes('synergy');

                  const midX = (source.cx + target.cx) / 2;
                  const midY = (source.cy + target.cy) / 2;

                  return (
                    <g key={link.id} className="cursor-pointer group">
                      {/* Connecting Line */}
                      <line
                        x1={source.cx}
                        y1={source.cy}
                        x2={target.cx}
                        y2={target.cy}
                        stroke={isHighlighted ? '#2dd4bf' : isSynergy ? '#f59e0b' : '#334155'}
                        strokeWidth={isHighlighted ? 3 : isSynergy ? 2.5 : 1.5}
                        strokeDasharray={isSynergy ? '5,5' : 'none'}
                        className="transition-all duration-300"
                      />

                      {/* Animated Flow Pulse (Simulating Real Currency/Good Flow) */}
                      {isHighlighted && (
                        <circle r="4" fill="#34d399">
                          <animateMotion
                            path={`M ${source.cx} ${source.cy} L ${target.cx} ${target.cy}`}
                            dur="2.5s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}

                      {/* Midpoint Pill Tag */}
                      <rect
                        x={midX - 55}
                        y={midY - 11}
                        width="110"
                        height="22"
                        rx="11"
                        fill="#0f172a"
                        stroke={isHighlighted ? '#14b8a6' : '#334155'}
                        strokeWidth="1"
                        className="transition-all duration-200"
                      />
                      <text
                        x={midX}
                        y={midY + 3.5}
                        textAnchor="middle"
                        fill={isHighlighted ? '#5eead4' : '#94a3b8'}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        Rp {(link.monthlyFlowIdr / 1000000).toFixed(0)} Jt/bln
                      </text>
                    </g>
                  );
                })}

                {/* Render Nodes */}
                {economicNodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className="cursor-pointer group"
                      transform={`translate(${node.cx}, ${node.cy})`}
                    >
                      {/* Outer Pulse when Selected */}
                      {isSelected && (
                        <circle
                          r="38"
                          fill="none"
                          stroke="#14b8a6"
                          strokeWidth="2"
                          strokeOpacity="0.6"
                          className="animate-ping"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        r={isSelected ? 32 : 26}
                        fill="#090d16"
                        stroke={isSelected ? '#2dd4bf' : '#334155'}
                        strokeWidth={isSelected ? 3 : 2}
                        className="transition-all duration-300 group-hover:stroke-teal-400 group-hover:scale-105"
                      />

                      {/* Inner Core Circle */}
                      <circle
                        r={isSelected ? 20 : 16}
                        fill={isSelected ? '#14b8a6' : '#1e293b'}
                        className="transition-all duration-300"
                      />

                      {/* Center Abbreviation / Ashabiyyah Score */}
                      <text
                        textAnchor="middle"
                        y="4"
                        fill="#ffffff"
                        fontSize={isSelected ? '10' : '9'}
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {node.ashabiyyahScore}%
                      </text>

                      {/* Below Node Label */}
                      <rect
                        x="-70"
                        y={isSelected ? 38 : 32}
                        width="140"
                        height="20"
                        rx="10"
                        fill="#020617"
                        stroke={isSelected ? '#14b8a6' : '#1e293b'}
                        strokeWidth="1"
                      />
                      <text
                        textAnchor="middle"
                        y={isSelected ? 52 : 46}
                        fill={isSelected ? '#5eead4' : '#e2e8f0'}
                        fontSize="9.5"
                        fontWeight="bold"
                      >
                        {node.shortName}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-4 text-[10px] text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                💡 Angka persentase pada node melambangkan <strong>Skor Kohesi 'Ashabiyyah</strong> komunitas tersebut
              </div>
            </div>

            {/* Selected Node In-Depth Dossier Panel */}
            {selectedNode && (
              <div className="mt-4 bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-teal-950 text-teal-300 border border-teal-800 px-2 py-0.5 rounded">
                        {selectedNode.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Anggota: {selectedNode.membersCount} Kepala Keluarga
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {selectedNode.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">Volume Transaksi:</span>
                      <span className="font-mono font-black text-emerald-400 text-sm">
                        Rp {selectedNode.monthlyVolumeIdr.toLocaleString('id-ID')} / bln
                      </span>
                    </div>
                    <div className="text-right pl-3 border-l border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-mono">Skor 'Ashabiyyah:</span>
                      <span className="font-mono font-black text-teal-300 text-sm">
                        {selectedNode.ashabiyyahScore}/100
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-mono">Peran Strategis dalam Ekosistem:</span>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {selectedNode.roleInEcosystem}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-teal-400 text-[10px] uppercase font-mono">Komoditas & Nilai Tambah Utama:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedNode.keyOutputs.map((item, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 text-[11px]">
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Khaldunian Socio-Economic Theory Box */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-teal-500/30 text-xs text-slate-300 leading-relaxed space-y-1">
                  <div className="font-bold text-teal-300 flex items-center gap-1.5 text-[11px]">
                    <BookOpen className="w-3.5 h-3.5" />
                    Telaah Teori Sosiologi Ibnu Khaldun (Al-Muqaddimah):
                  </div>
                  <p className="italic font-serif text-slate-300">
                    "{selectedNode.khaldunInsight}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: 5 EVOLUTIONARY STAGES OF PROSPERITY */}
      {activeTab === 'prosperity_stages' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-teal-600 dark:text-teal-400">
                Evolusi Siklus Sosiologis Khaldun
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Anatomi 5 Tahap Kemakmuran & Titik Kritis Peradaban
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Pilih tahap untuk menelaah karakteristik perputaran uang, kondisi psikologis masyarakat, dan solusi syariah untuk mengunci kemakmuran di Tahap 3.
              </p>
            </div>

            {/* Stages Step Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
              {prosperityStages.map((st) => (
                <button
                  key={st.stage}
                  onClick={() => setSelectedStage(st.stage)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selectedStage === st.stage
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/50 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">Tahap {st.stage}</span>
                    <span className="text-[10px] font-serif text-teal-600 dark:text-teal-400 font-bold">{st.arabic.split(' ')[0]}</span>
                  </div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white mt-1 line-clamp-1">
                    {st.name.split(':')[1]}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Selected Stage Deep Dive Card */}
            {(() => {
              const current = prosperityStages[selectedStage - 1];
              const isDangerStage = selectedStage >= 4;
              return (
                <div className={`mt-4 p-6 rounded-2xl border transition-all space-y-4 ${
                  selectedStage === 3
                    ? 'bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/40 dark:to-teal-950/40 border-emerald-400/50'
                    : isDangerStage
                    ? 'bg-gradient-to-br from-rose-50/80 to-amber-50/80 dark:from-rose-950/40 dark:to-amber-950/40 border-rose-400/50'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase">
                        Tahap {current.stage} • {current.arabic}
                      </span>
                      <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {current.name}
                      </h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      selectedStage === 3
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                        : isDangerStage
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {current.focus}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {current.desc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Kondisi Finansial & Pasar:</span>
                      <p className="text-slate-800 dark:text-slate-200 font-medium mt-0.5">{current.economicTrait}</p>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Kaidah Sosiologi Al-Muqaddimah:</span>
                      <p className="text-teal-700 dark:text-teal-300 font-medium mt-0.5">{current.khaldunLaw}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-teal-500/30 text-xs flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Peran Protokol Zakat:</strong> Injeksi modal produktif di tahap ini mencegah degradasi peradaban ke fase kepailitan.</span>
                    </div>
                    <button
                      onClick={onNavigateToCalculator}
                      className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                    >
                      Hitung Nisab Pembebas <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 3: ASHABIYYAH MAP NUSANTARA */}
      {activeTab === 'ashabiyyah_map' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-teal-600 dark:text-teal-400">
                Peta Geososial Ketahanan Ekonomi
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Peta Indeks Ashabiyah & Modal Sosial Nusantara
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Analisis kekuatan solidaritas kolektif (*'Ashabiyyah*) di berbagai wilayah Indonesia sebagai penopang ketahanan ekonomi mikro bebas riba.
              </p>
            </div>

            {/* Region Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ashabiyyahRegions.map((reg) => (
                <div
                  key={reg.id}
                  onClick={() => setSelectedRegionId(reg.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                    selectedRegionId === reg.id
                      ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/40 shadow-md ring-2 ring-teal-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-teal-500" />
                      {reg.regionName.split('(')[0]}
                    </span>
                    <span className="font-mono font-black text-sm text-teal-600 dark:text-teal-400">
                      {reg.ashabiyyahScore}/100
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {reg.primarySocialCapital}
                  </div>

                  <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-2 py-1 rounded">
                    {reg.communalZakatRate}
                  </div>
                </div>
              ))}
            </div>

            {/* Active Region Observation Deep-Dive */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-teal-400" />
                  <h4 className="font-bold text-base text-white">
                    Telaah Sosiologi Khaldun: {activeRegion.regionName}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Indeks Ashabiyyah:</span>
                  <span className="font-mono font-black text-base text-teal-400">{activeRegion.ashabiyyahScore}/100</span>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-500/40">
                    {activeRegion.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-mono">Modal Sosial Warisan Leluhur:</span>
                  <p className="text-slate-200 font-medium">{activeRegion.primarySocialCapital}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-mono">Daya Lentur Krisis Moneter:</span>
                  <p className="text-emerald-400 font-medium">{activeRegion.economicResilience}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-serif italic">
                "{activeRegion.khaldunObservation}"
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMMUNITY ASHABIYYAH RESILIENCE CALCULATOR */}
      {activeTab === 'cohesion_calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              <Users className="w-4 h-4" />
              Kalkulator Ashabiyyah Komunal
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Uji Daya Lentur & Solidaritas Rukun Warga / Komunitas Anda
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Jumlah Kepala Keluarga dalam Komunitas
              </label>
              <input
                type="number"
                value={communitySize}
                onChange={(e) => setCommunitySize(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                <span>Tingkat Kepatuhan Zakat/Infaq Warga</span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{zakatParticipationRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={zakatParticipationRate}
                onChange={(e) => setZakatParticipationRate(Number(e.target.value))}
                className="w-full h-2 accent-teal-600 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasFoodBankLumbung}
                  onChange={(e) => setHasFoodBankLumbung(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <span>Memiliki Lumbung Pangan / Beras Perelek Komunitas</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasInterestFreeCoop}
                  onChange={(e) => setHasInterestFreeCoop(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <span>Memiliki Koperasi / Baitul Maal Anti-Rentenir Bebas Bunga</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Frekuensi Gotong Royong / Musyawarah Warga (Kali / Bulan)
              </label>
              <input
                type="number"
                min="0"
                max="12"
                value={mutualAidFrequency}
                onChange={(e) => setMutualAidFrequency(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Calculator Output */}
          <div className="bg-gradient-to-br from-slate-50 to-teal-50/50 dark:from-slate-850 dark:to-slate-900 rounded-2xl p-6 border border-teal-500/30 space-y-5">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Hasil Diagnosis Ashabiyyah Komunal
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-1">
              <span className="text-xs text-slate-400">Skor Kohesi Sosial ('Ashabiyyah):</span>
              <div className="text-4xl font-black text-teal-600 dark:text-teal-400 font-mono">
                {calculatedScore} / 100
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mt-2 ${ashabiyyahClass}`}>
                {ashabiyyahLevel}
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Rekomendasi Aksi Muqaddimah:</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {ashabiyyahPrescription}
              </p>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl leading-relaxed">
              <strong>Dalil Mukadimah:</strong> "Kemenangan dan kepemimpinan ekonomi hanya dapat dicapai melalui 'Ashabiyyah. Tanpa solidaritas gotong royong, uang sebanyak apapun akan habis dirampas oleh kekuatan luar."
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
