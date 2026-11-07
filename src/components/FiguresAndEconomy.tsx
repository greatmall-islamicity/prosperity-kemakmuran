import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Scale, 
  Zap, 
  Layers, 
  Compass, 
  Sliders, 
  BrainCircuit, 
  BookOpen, 
  Building2, 
  Cpu, 
  Repeat,
  HeartHandshake,
  Target
} from 'lucide-react';
import { Language } from '../types';

interface FiguresAndEconomyProps {
  currentLang?: Language;
  onNavigateToCalculator?: () => void;
  onNavigateToInvestment?: () => void;
  onNavigateToAshabiyyah?: () => void;
}

interface DimensionComparison {
  id: string;
  category: string;
  title: string;
  khaldunAufPrinciple: {
    heading: string;
    description: string;
    kitabQuote: string;
    icon: any;
  };
  bevanModel: {
    heading: string;
    description: string;
    practice: string;
    pros: string;
    vulnerability: string;
  };
  sandiagaModel: {
    heading: string;
    description: string;
    practice: string;
    pros: string;
    vulnerability: string;
  };
  synthesisTakeaway: string;
}

export const FiguresAndEconomy: React.FC<FiguresAndEconomyProps> = ({
  currentLang = 'id',
  onNavigateToCalculator,
  onNavigateToInvestment,
  onNavigateToAshabiyyah,
}) => {
  const [selectedDimension, setSelectedDimension] = useState<string>('all');
  
  // Interactive Synthesis Sandbox Portfolio Sliders
  const [digitalLiquidityPct, setDigitalLiquidityPct] = useState<number>(25); // Model Bevan
  const [realEquityPct, setRealEquityPct] = useState<number>(65); // Model Sandiaga
  const [zakatEndowmentPct, setZakatEndowmentPct] = useState<number>(10); // Kaidah Auf & Khaldun

  // Ensure total stays aligned or normalized
  const handleSliderChange = (type: 'digital' | 'real' | 'zakat', value: number) => {
    if (type === 'digital') {
      const remaining = 100 - value;
      const zakat = Math.min(remaining, Math.max(2.5, zakatEndowmentPct));
      const real = Math.max(0, remaining - zakat);
      setDigitalLiquidityPct(value);
      setRealEquityPct(real);
      setZakatEndowmentPct(zakat);
    } else if (type === 'real') {
      const remaining = 100 - value;
      const zakat = Math.min(remaining, Math.max(2.5, zakatEndowmentPct));
      const digital = Math.max(0, remaining - zakat);
      setRealEquityPct(value);
      setDigitalLiquidityPct(digital);
      setZakatEndowmentPct(zakat);
    } else {
      const remaining = 100 - value;
      const real = Math.round(remaining * 0.7);
      const digital = remaining - real;
      setZakatEndowmentPct(value);
      setRealEquityPct(real);
      setDigitalLiquidityPct(digital);
    }
  };

  // Calculated Khaldunian Resilience Score (0 - 100)
  // Optimal Khaldunian balance: high real equity (40-70%), nimble liquidity (15-35%), disciplined zakat (>=5%)
  const calculatedResilience = Math.min(
    100,
    Math.round(
      (realEquityPct * 0.6) + 
      (digitalLiquidityPct > 45 ? (45 * 0.3) - ((digitalLiquidityPct - 45) * 0.4) : digitalLiquidityPct * 0.3) + 
      (zakatEndowmentPct * 2.5)
    )
  );

  const getResilienceStatus = (score: number) => {
    if (score >= 80) return { label: 'Sangat Tangguh & Berkah (Khaldunian Balanced)', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' };
    if (score >= 60) return { label: 'Moderat & Produktif (Perlu Peningkatan Riil)', color: 'text-teal-500 bg-teal-500/10 border-teal-500/30' };
    if (score >= 40) return { label: 'Rentan Volatilitas Spekulatif', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' };
    return { label: 'Kritis: Risiko Gelembung Semu (Al-Amwal al-Wahmiyyah)', color: 'text-rose-500 bg-rose-500/10 border-rose-500/30' };
  };

  const status = getResilienceStatus(calculatedResilience);

  // Comparison Dimensions Dataset
  const dimensions: DimensionComparison[] = [
    {
      id: 'value-creation',
      category: 'Nilai & Akumulasi',
      title: '1. Sumber Nilai Kerja & Pembentukan Modal',
      khaldunAufPrinciple: {
        heading: 'Teori Nilai Kerja (Qimah al-A\'mal)',
        description: 'Rezeki sejati lahir dari nilai kerja, keahlian teknik (Sana\'i), dan keringat usaha manusia. Keberkahan datang dari perputaran cepat uang halal tanpa riba dan tanpa penimbunan barang.',
        kitabQuote: '"Ketahuilah bahwa segala sesuatu yang diperoleh manusia dan berwujud harta, tidak lain adalah nilai dari jerih payah dan keahlian usahanya." — Kitab Al-Muqaddimah, Bab Rezeki.',
        icon: BrainCircuit,
      },
      bevanModel: {
        heading: 'Keahlian Riset Teknis & Arbitrase Likuiditas On-Chain',
        description: 'Mewakili pemuda Kediri yang memanfaatkan asimetri informasi digital global, pemahaman algoritma smart contract, dan trading on-chain secara mandiri.',
        practice: 'Flipping NFT, airdrop hunting, scalping kripto, dan disiplin endurance mental (Ironman 70.3).',
        pros: 'Sangat lincah, modal awal mandiri tanpa utang bank, efisiensi waktu 24/7 global.',
        vulnerability: 'Aset bersifat maya; sangat rentan gelembung likuiditas jika tidak diparkir ke sektor fisik.',
      },
      sandiagaModel: {
        heading: 'Modal Ekuitas Institusional & Skala Industri Riil',
        description: 'Mewakili private equity (Saratoga) yang mengumpulkan modal konsorsium untuk merevitalisasi perusahaan fisik tertekan pasca krisis moneter 1998.',
        practice: 'Akuisisi distressed assets di sektor menara telko (TBIG), tambang (Adaro), logistik, dan konsumsi.',
        pros: 'Menyerap puluhan ribu tenaga kerja riil, memproduksi infrastruktur fisik negara.',
        vulnerability: 'Butuh modal raksasa; rentan siklus utang korporasi & guncangan makroekonomi regulasi.',
      },
      synthesisTakeaway: 'Inovasi digital ala Bevan memberikan ketangkasan likuiditas, sementara institusionalisasi riil ala Sandiaga memberikan jangkar penyerapan tenaga kerja nyata.',
    },
    {
      id: 'social-network',
      category: 'Jejaring & Kepercayaan',
      title: '2. Modal Sosial, Kepercayaan, & Kekuatan \'Ashabiyyah',
      khaldunAufPrinciple: {
        heading: 'Jejaring Kohesi Sosial (\'Ashabiyyah) & Amanah',
        description: 'Kemakmuran mustahil berdiri tanpa kelompok solidaritas (\'Ashabiyyah). Abdurrahman bin Auf berdagang dengan modal dasar kejujuran dan amanah, sehingga pedagang Madinah rela bekerjasama tanpa jaminan bunga.',
        kitabQuote: '"Kekuatan suatu kelompok terletak pada \'Ashabiyyah mereka; semakin kuat solidaritas tolong-menolong, semakin murah biaya hidup dan semakin melimpah produktivitas negerinya." — Al-Muqaddimah.',
        icon: Users,
      },
      bevanModel: {
        heading: 'Jejaring Komunitas Terdesentralisasi (Web3 DAOs)',
        description: 'Membangun jejaring melalui forum on-chain global, Discord, Twitter/X, dan komunitas trader digital lintas negara.',
        practice: 'Kolaborasi riset data on-chain terbuka, verifikasi trustless berbasis kriptografi tanpa mengenal fisik.',
        pros: 'Bebas sekat geografis dan birokrasi perizinan tradisional.',
        vulnerability: 'Ikatan sosial bersifat anonim dan transaksional; mudah retak saat bear market berkepanjangan.',
      },
      sandiagaModel: {
        heading: 'Jejaring Asosiasi Pengusaha & Aliansi Strategis',
        description: 'Memanfaatkan jejaring formal nasional seperti HIPMI, Kadin, asosiasi pemodal ventura, dan aliansi perbankan.',
        practice: 'Membangun konsorsium investor, co-investment syirkah skala besar, dan jaringan kemitraan korporasi.',
        pros: 'Modal sosial sangat solid di level institusional dan memiliki daya tawar ekonomi-politik tinggi.',
        vulnerability: 'Risiko eksklusivitas oligarki jika tidak membuka akses seluas-luasnya bagi pelaku UMKM akar rumput.',
      },
      synthesisTakeaway: 'Jejaring digital membuka akses inklusif bagi talenta muda daerah, sedangkan jejaring institusional menyediakan daya tahan ekosistem industri.',
    },
    {
      id: 'cycle-risk',
      category: 'Siklus & Risiko',
      title: '3. Navigasi Siklus Kemakmuran & Mitigasi Krisis',
      khaldunAufPrinciple: {
        heading: 'Hukum Pasang Surut Kemakmuran 5 Tahap',
        description: 'Peradaban tumbuh dari kesederhanaan dan kerja keras, mencapai puncak kemakmuran, lalu terancam runtuh akibat gaya hidup bermewah-mewahan (Rafahiyah) dan maraknya spekulasi yang mematikan sektor produksi.',
        kitabQuote: '"Ketika suatu bangsa meninggalkan sektor produksi riil dan memilih hidup dari spekulasi serta pajak yang memeras, maka kehancuran peradaban itu tinggal menunggu waktu." — Al-Muqaddimah.',
        icon: Activity,
      },
      bevanModel: {
        heading: 'Navigasi Siklus 4 Tahunan Halving Kripto',
        description: 'Mengantisipasi siklus bull run dan bear market dengan disiplin cut loss, take profit bertahap, dan menjaga likuiditas cash/stablecoin.',
        practice: 'Hedging risiko dengan portofolio multichain dan diversifikasi ke aset stabil saat pasar jenuh.',
        pros: 'Reaksi sangat cepat terhadap perubahan likuiditas global.',
        vulnerability: 'Psikologis trader mudah terpancing FOMO (Fear of Missing Out) jika tidak berpegang pada disiplin akal sehat.',
      },
      sandiagaModel: {
        heading: 'Manajemen Siklus Makroekonomi & Restrukturisasi Utang',
        description: 'Membeli saat krisis (siklus depresi) dan menjual atau melantai di bursa (IPO) saat pasar berada di puncak ekspansi ekonomi.',
        practice: 'Menerapkan tata kelola perusahaan yang baik (GCG), diversifikasi portofolio lintas industri (energi, telko, konsumer).',
        pros: 'Aset berwujud fisik memiliki nilai intrinsik abadi dan menghasilkan arus kas dividen berkelanjutan.',
        vulnerability: 'Biaya modal (cost of capital) yang tinggi saat suku bunga bank global melonjak tajam.',
      },
      synthesisTakeaway: 'Disiplin mengamankan profit di masa pasang untuk diinvestasikan ke sektor riil yang tahan krisis adalah manifestasi kecerdasan Khaldunian.',
    },
    {
      id: 'power-ethics',
      category: 'Etika & Kekuasaan',
      title: '4. Peringatan Penguasa Berdagang & Bahaya Penimbunan',
      khaldunAufPrinciple: {
        heading: 'Bab "Ijtinab al-Sultan min al-Tijarah" & Anti-Ihtikar',
        description: 'Ibnu Khaldun memperingatkan keras bahaya penguasa yang berbisnis, karena akan mematikan keadilan persaingan. Sementara Abdurrahman bin Auf melarang keras penimbunan (ihtikar) dan selalu memutar kas secara kontan.',
        kitabQuote: '"Keterlibatan penguasa dalam perniagaan adalah bencana terbesar bagi rakyat dan penghancur penerimaan kas negara." — Kitab Al-Muqaddimah, Pasal 40.',
        icon: Scale,
      },
      bevanModel: {
        heading: 'Desentralisasi vs Risiko Penipuan Digital (Rugpull)',
        description: 'Menjaga integritas di pasar tanpa regulasi formal; menghindari proyek skema ponzi, token manipulatif, dan insider trading.',
        practice: 'Audit smart contract independen, transparansi on-chain, dan menolak promosi koin bodong kepada pengikut.',
        pros: 'Sistem blockchain terdesentralisasi meminimalkan manipulasi sentralistik.',
        vulnerability: 'Kurangnya payung hukum perlindungan konsumen jika terjadi peretasan atau penipuan developer.',
      },
      sandiagaModel: {
        heading: 'Pemisahan Kepentingan Bisnis & Jabatan Publik',
        description: 'Tantangan seorang pengusaha besar ketika masuk ke ranah politik praktis (Wakil Gubernur, Menteri, Kontestasi Pemilu).',
        practice: 'Melepaskan jabatan eksekutif di perusahaan aktif (Saratoga) dan memfokuskan kebijakan publik pada pemberdayaan UMKM/Ekraf.',
        pros: 'Memiliki pemahaman praktis bisnis untuk memangkas regulasi birokrasi yang menghambat kewirausahaan.',
        vulnerability: 'Tuntutan publik yang sangat tinggi terhadap transparansi LHKPN dan pencegahan konflik kepentingan kebijakan.',
      },
      synthesisTakeaway: 'Integritas tertinggi seorang pelaku usaha adalah menjamin bahwa kekayaannya diperoleh dari keunggulan nilai karya riil, bukan dari fasilitas kekuasaan.',
    },
    {
      id: 'zakat-redistribution',
      category: 'Zakat & Transformasi',
      title: '5. Filantropi Ekstrem & Transformasi Mustahik Menjadi Muzakki',
      khaldunAufPrinciple: {
        heading: 'Kafilah 700 Unta Abdurrahman bin Auf & Zakat Produktif',
        description: 'Zakat dan infaq bukan sekadar belas kasihan konsumtif, melainkan alat penyeimbang likuiditas makro untuk mencegah penumpukan modal di tangan segelintir orang (QS. Al-Hasyr: 7).',
        kitabQuote: '"Ketika Abdurrahman bin Auf wafat, seribu dinar emas dibagikan kepada para veteran perang, dan setiap istrinya memperoleh warisan ratusan ribu dinar setelah sedekah-sedekah raksasanya." — Sirah Nabawiyah.',
        icon: HeartHandshake,
      },
      bevanModel: {
        heading: 'Zakat Aset Kripto & Literasi Finansial Generasi Muda',
        description: 'Menunaikan zakat mal 2.5% dari keuntungan bersih trading digital dan mengedukasi anak muda daerah agar melek literasi keuangan.',
        practice: 'Penyaluran sedekah langsung ke keluarga, beasiswa santri/siswa, dan pembagian ilmu analisis data secara gratis.',
        pros: 'Inspirasi nyata bagi generasi Gen Z bahwa pemuda daerah bisa berprestasi di tingkat dunia secara mandiri.',
        vulnerability: 'Filantropi sering kali belum terstruktur dalam bentuk wakaf produktif jangka panjang.',
      },
      sandiagaModel: {
        heading: 'Yayasan Filantropi Terstruktur, CSR, & Program OK OCE',
        description: 'Mendirikan yayasan beasiswa, program inkubasi kewirausahaan sosial (OK OCE / Rumah Siap Kerja), dan wakaf korporasi.',
        practice: 'Menyediakan pendampingan bisnis kurasi UMKM, pelatihan vokasi pemuda, dan akses permodalan tanpa agunan memberatkan.',
        pros: 'Memiliki metodologi terstruktur dalam mendampingi mustahik agar naik kelas menjadi muzakki berdaya.',
        vulnerability: 'Memerlukan biaya operasional manajemen yayasan yang cukup tinggi dan komitmen pendamping yang konsisten.',
      },
      synthesisTakeaway: 'Zakat produktif adalah jembatan emas: mengubah surplus dari keuntungan finansial menjadi modal kerja riil yang mengangkat martabat mustahik.',
    },
  ];

  const filteredDimensions = selectedDimension === 'all' 
    ? dimensions 
    : dimensions.filter(d => d.id === selectedDimension);

  return (
    <div className="space-y-10 py-6">
      {/* Hero Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white p-6 sm:p-10 border border-teal-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" />
              Dialektika Sosiologi-Ekonomi Al-Muqaddimah
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold">
              Studi Tokoh: Bevan Pramudito & Sandiaga Uno
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-serif">
            Komparasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300">Tokoh & Ekonomi</span> Khaldunian
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Membedah dialektika antara <strong>konsep rezeki & nilai kerja Kitab Al-Muqaddimah Ibnu Khaldun</strong> dengan dua model ekonomi kontemporer: <strong>Bevan Pramudito</strong> (akselerasi likuiditas digital & disiplin ketahanan) serta <strong>Sandiaga Uno</strong> (konsolidasi modal institusional, sektor riil & aliansi <em>'Ashabiyyah</em>). Bagaimana surplus dari kedua dunia ini harus dialokasikan agar membawa keberkahan peradaban?
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('synthesis-simulator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-xs"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span>Simulasi Sintesis Portofolio Ideal</span>
            </button>
            {onNavigateToAshabiyyah && (
              <button
                onClick={onNavigateToAshabiyyah}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-xs"
              >
                <Users className="w-4 h-4 text-teal-300" />
                <span>Lihat Peta Ashabiyyah D3.js</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3 Figur Utama: Ringkasan Arketipe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pilar 1: Ibnu Khaldun & Abdurrahman bin Auf */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-amber-500/30 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                Pondasi Klasik & Syariah
              </span>
              <BookOpen className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-serif">
              Ibnu Khaldun & Abdurrahman bin Auf
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Arketipe:</strong> <em>The Civilizational Ethicist</em>. Rezeki bersumber dari kerja riil (<em>Qimah al-A'mal</em>), perputaran uang kontan yang cepat tanpa riba, anti-penimbunan (<em>anti-ihtikar</em>), dan filantropi skala besar sebagai benteng harta.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Kaidah: Harta riil + Zakat 2.5% + Modal Kepercayaan
          </div>
        </div>

        {/* Pilar 2: Bevan Pramudito */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-cyan-500/30 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30">
                Generasi Digital & On-Chain
              </span>
              <Cpu className="w-5 h-5 text-cyan-500" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Muhammad Bevan Pramudito
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Arketipe:</strong> <em>The Agile Digital Arbitrageur</em>. Pemuda Kediri yang memanfaatkan kecakapan analisis on-chain global, scalping aset digital, dan disiplin mental ketahanan fisik (Ironman Triathlon) untuk membangun kekayaan mandiri dari nol.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-cyan-600 dark:text-cyan-400 font-mono flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Karakteristik: Kecepatan likuiditas + Kemandirian modal
          </div>
        </div>

        {/* Pilar 3: Sandiaga Uno */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-500/30 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                Konsolidasi Korporasi & Kebijakan
              </span>
              <Building2 className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Sandiaga Salahuddin Uno
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Arketipe:</strong> <em>The Institutional Capitalist & Reformer</em>. Pelopor private equity (Saratoga) pasca krisis 1998, merevitalisasi aset fisik, membuka puluhan ribu lapangan kerja, dan menggunakan aliansi <em>'Ashabiyyah</em> HIPMI/Kadin untuk membuka pasar.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            Karakteristik: Skala industri fisik + Dampak penyerapan kerja
          </div>
        </div>
      </div>

      {/* Metric Benchmark Bar: Visual Perbandingan Kapabilitas */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>Matriks Benchmark Nilai & Strategi Ekonomi</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Perbandingan skor kapabilitas objektif antara kedua model dalam kacamata 6 kriteria Al-Muqaddimah
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-cyan-600 dark:text-cyan-400">
              <span className="w-3 h-3 rounded bg-cyan-500 inline-block" /> Bevan (Digital)
            </span>
            <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
              <span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Sandiaga (Institusi)
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {[
            {
              metric: 'Kecepatan Perputaran Modal (Velocity of Capital)',
              bevanScore: 96,
              sandiScore: 72,
              khaldunStandard: 'Semakin cepat uang berputar, semakin tinggi berkah dan efisiensi masyarakat.',
            },
            {
              metric: 'Penyerapan Lapangan Kerja Riil (Division of Labor)',
              bevanScore: 48,
              sandiScore: 94,
              khaldunStandard: 'Kesejahteraan peradaban diukur dari banyaknya tangan manusia yang bekerja (Taqsim al-A\'mal).',
            },
            {
              metric: 'Ketahanan Terhadap Gelembung Semu (Asset Grounding)',
              bevanScore: 54,
              sandiScore: 91,
              khaldunStandard: 'Aset fisik (pangan, tanah, sarana produksi) memiliki nilai abadi dibanding uang kertas atau angka maya.',
            },
            {
              metric: 'Modal Sosial & Jaringan Aliansi (\'Ashabiyyah Power)',
              bevanScore: 68,
              sandiScore: 95,
              khaldunStandard: 'Modal besar mustahil terkumpul tanpa aliansi kepercayaan dan kohesi kelompok yang kokoh.',
            },
            {
              metric: 'Efisiensi Transaksi Tanpa Perantara Liar (Disintermediation)',
              bevanScore: 95,
              sandiScore: 78,
              khaldunStandard: 'Menghapuskan calo dan biaya rentenir melipatgandakan keuntungan produsen dan konsumen.',
            },
            {
              metric: 'Kemandirian dari Jeratan Utang Ribawi (Debt-Free Agility)',
              bevanScore: 92,
              sandiScore: 65,
              khaldunStandard: 'Abdurrahman bin Auf menolak perdagangan berbasis bunga; berniaga dengan kas kontan menjaga martabat.',
            },
          ].map((row, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {row.metric}
                </span>
                <span className="text-[11px] text-slate-400 italic font-serif">
                  Kaidah: {row.khaldunStandard}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Bevan bar */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 w-16">
                    Bevan ({row.bevanScore}%)
                  </span>
                  <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500" 
                      style={{ width: `${row.bevanScore}%` }} 
                    />
                  </div>
                </div>

                {/* Sandi bar */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 w-16">
                    Sandiaga ({row.sandiScore}%)
                  </span>
                  <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500" 
                      style={{ width: `${row.sandiScore}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs for Deep Comparison */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
              Analisis Komparatif Berdasarkan 5 Dimensi Utama
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pilih dimensi untuk menelaah dialektika teori klasik dengan praktik bisnis kontemporer
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'Semua Dimensi' },
              { id: 'value-creation', label: 'Nilai Kerja' },
              { id: 'social-network', label: 'Jejaring \'Ashabiyyah' },
              { id: 'cycle-risk', label: 'Siklus & Risiko' },
              { id: 'power-ethics', label: 'Etika & Kekuasaan' },
              { id: 'zakat-redistribution', label: 'Zakat & Transformasi' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedDimension(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedDimension === tab.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Cards Stack */}
        <div className="space-y-6">
          {filteredDimensions.map((item) => {
            const Icon = item.khaldunAufPrinciple.icon;
            return (
              <div 
                key={item.id} 
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* 3-Column Comparative Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Kolom 1: Landasan Khaldun & Auf */}
                  <div className="bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl p-5 border border-amber-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <BookOpen className="w-4 h-4" />
                      <span>Filsafat Al-Muqaddimah & Sirah Auf</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.khaldunAufPrinciple.heading}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.khaldunAufPrinciple.description}
                    </p>
                    <div className="pt-2 border-t border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 italic font-serif leading-relaxed">
                      {item.khaldunAufPrinciple.kitabQuote}
                    </div>
                  </div>

                  {/* Kolom 2: Bevan Pramudito Model */}
                  <div className="bg-cyan-500/5 dark:bg-cyan-500/10 rounded-2xl p-5 border border-cyan-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider">
                        <Cpu className="w-4 h-4" />
                        <span>Kiprah Bevan Pramudito</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-600 dark:text-cyan-300">
                        Web3 & On-Chain
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.bevanModel.heading}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.bevanModel.description}
                    </p>
                    <div className="space-y-1.5 pt-2 text-xs">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        <strong className="text-cyan-600 dark:text-cyan-400">Praktik Riil:</strong> {item.bevanModel.practice}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                        <strong>Kelebihan:</strong> {item.bevanModel.pros}
                      </div>
                      <div className="text-[11px] text-amber-600 dark:text-amber-400">
                        <strong>Titik Rawan Khaldun:</strong> {item.bevanModel.vulnerability}
                      </div>
                    </div>
                  </div>

                  {/* Kolom 3: Sandiaga Uno Model */}
                  <div className="bg-emerald-500/5 dark:bg-emerald-500/10 rounded-2xl p-5 border border-emerald-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                        <Building2 className="w-4 h-4" />
                        <span>Kiprah Sandiaga Uno</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
                        Private Equity & Riil
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.sandiagaModel.heading}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.sandiagaModel.description}
                    </p>
                    <div className="space-y-1.5 pt-2 text-xs">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        <strong className="text-emerald-600 dark:text-emerald-400">Praktik Riil:</strong> {item.sandiagaModel.practice}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                        <strong>Kelebihan:</strong> {item.sandiagaModel.pros}
                      </div>
                      <div className="text-[11px] text-amber-600 dark:text-amber-400">
                        <strong>Titik Rawan Khaldun:</strong> {item.sandiagaModel.vulnerability}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sintesis Kesimpulan Dimensi */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex items-start gap-3 text-xs">
                  <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Sintesis Khaldunian Gerakan Sadar Kaya:</strong>{' '}
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.synthesisTakeaway}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE SYNTHESIS SANDBOX: "Simulator Portofolio Khaldunian Ideal" */}
      <div 
        id="synthesis-simulator" 
        className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-teal-500/30 shadow-2xl space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 text-xs font-mono font-bold">
                Simulator Interaktif
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Formula Rezeki Berkelanjutan
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Simulator Sintesis Portofolio: Mengawinkan Dua Kekuatan
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Uji alokasi surplus kekayaan Anda antara ketangkasan likuiditas digital (Model Bevan), skala sektor riil produktif (Model Sandiaga), dan benteng zakat-wakaf (Kaidah Abdurrahman bin Auf).
            </p>
          </div>

          <div className="text-right bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Indeks Ketahanan Khaldun:</span>
            <div className="text-3xl font-black font-mono text-teal-400">
              {calculatedResilience}/100
            </div>
            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mt-1 border ${status.color}`}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Digital Liquidity (Bevan) */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                Aset Digital & Likuiditas Lincah
              </span>
              <span className="font-mono text-base">{digitalLiquidityPct}%</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Trading aset digital, arbitrase kripto, kas likuiditas operasional cepat (Inspirasi Bevan).
            </p>
            <input
              type="range"
              min="5"
              max="70"
              value={digitalLiquidityPct}
              onChange={(e) => handleSliderChange('digital', Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 font-mono flex justify-between">
              <span>Konservatif (5%)</span>
              <span>Agresif (70%)</span>
            </div>
          </div>

          {/* Slider 2: Sektor Riil & Ekuitas (Sandiaga) */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                Sektor Riil & Ekuitas Produktif
              </span>
              <span className="font-mono text-base">{realEquityPct}%</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Pabrik, lumbung tani, perikanan pesisir, properti sewa, kemitraan syirkah UMKM (Inspirasi Sandiaga).
            </p>
            <input
              type="range"
              min="20"
              max="90"
              value={realEquityPct}
              onChange={(e) => handleSliderChange('real', Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 font-mono flex justify-between">
              <span>Minimal (20%)</span>
              <span>Dominan (90%)</span>
            </div>
          </div>

          {/* Slider 3: Zakat Maal & Wakaf Produktif (Auf & Khaldun) */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-amber-400">
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4" />
                Zakat Maal & Wakaf Produktif
              </span>
              <span className="font-mono text-base">{zakatEndowmentPct}%</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Zakat wajib 2.5%, infaq operasional, modal bergulir qardhul hasan bagi asnaf mustahik.
            </p>
            <input
              type="range"
              min="2.5"
              max="30"
              step="0.5"
              value={zakatEndowmentPct}
              onChange={(e) => handleSliderChange('zakat', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 font-mono flex justify-between">
              <span>Wajib Nisab (2.5%)</span>
              <span>Multiplier Auf (30%)</span>
            </div>
          </div>
        </div>

        {/* Diagnosis & Rekomendasi Hasil Alokasi */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
            <BrainCircuit className="w-4 h-4" />
            <span>Diagnosis Sosiologi-Ekonomi Al-Muqaddimah Terhadap Portofolio Anda:</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {digitalLiquidityPct > 45 ? (
              <span className="text-amber-300">
                ⚠️ <strong>Peringatan Ibnu Khaldun:</strong> Porsi aset digital Anda ({digitalLiquidityPct}%) terlalu dominan. Risiko ketergantungan pada uang maya (*al-amwal al-wahmiyyah*) dapat memicu guncangan mental saat bear market. Sebaiknya alihkan sebagian keuntungan ke sektor riil bernilai tambah (Sana'i).
              </span>
            ) : realEquityPct >= 50 && zakatEndowmentPct >= 5 ? (
              <span className="text-emerald-300">
                ✨ <strong>Konfigurasi Khaldunian Sempurna:</strong> Anda mengombinasikan jangkar sektor riil yang tangguh ({realEquityPct}%), kelincahan kas ({digitalLiquidityPct}%), serta komitmen zakat & wakaf berdaya ({zakatEndowmentPct}%). Ini menciptakan *multiplier effect* kemakmuran seperti kafilah dagang Abdurrahman bin Auf.
              </span>
            ) : (
              <span className="text-slate-300">
                ⚖️ <strong>Posisi Seimbang:</strong> Portofolio Anda cukup stabil. Untuk meningkatkan ketahanan sosial, pertimbangkan untuk meningkatkan alokasi zakat produktif atau kemitraan syirkah bagi kelompok binaan akar rumput.
              </span>
            )}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onNavigateToCalculator && (
              <button
                onClick={onNavigateToCalculator}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Hitung Zakat Mal Portofolio Ini</span>
              </button>
            )}
            {onNavigateToInvestment && (
              <button
                onClick={onNavigateToInvestment}
                className="bg-teal-700 hover:bg-teal-600 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Salurkan Surplus ke Sektor Riil Pilihan</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
