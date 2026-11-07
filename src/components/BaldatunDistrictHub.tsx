import React, { useState } from 'react';
import { 
  Building2, 
  Sprout, 
  ShieldCheck, 
  Coins, 
  Users, 
  Scale, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Droplets, 
  Store, 
  HeartHandshake, 
  Layers, 
  Calendar, 
  Compass, 
  Sliders, 
  FileText, 
  BookOpen,
  Package,
  Award
} from 'lucide-react';
import { Language } from '../types';

interface BaldatunDistrictHubProps {
  currentLang?: Language;
  onNavigateToCalculator?: () => void;
  onNavigateToWarehouse?: () => void;
  onNavigateToAshabiyyah?: () => void;
  onNavigateToCampaigns?: () => void;
}

export const BaldatunDistrictHub: React.FC<BaldatunDistrictHubProps> = ({
  currentLang = 'id',
  onNavigateToCalculator,
  onNavigateToWarehouse,
  onNavigateToAshabiyyah,
  onNavigateToCampaigns,
}) => {
  const [activeTab, setActiveTab] = useState<'principles' | 'calculator' | 'pipeline' | 'roadmap'>('principles');

  // Interactive District Baldatun Index Simulator
  const [foodSelfSufficiency, setFoodSelfSufficiency] = useState<number>(70); // % pangan mandiri
  const [antiLoanSharkRate, setAntiLoanSharkRate] = useState<number>(65); // % bebas rentenir
  const [communalBarnActive, setCommunalBarnActive] = useState<boolean>(true); // lumbung paceklik
  const [cleanWaterSanitation, setCleanWaterSanitation] = useState<number>(80); // % air bersih
  const [zakatParticipation, setZakatParticipation] = useState<number>(60); // % muzakki aktif

  // Calculated Baldatun Index (0 - 100)
  const calculatedIndex = Math.min(
    100,
    Math.round(
      (foodSelfSufficiency * 0.25) +
      (antiLoanSharkRate * 0.25) +
      (communalBarnActive ? 15 : 0) +
      (cleanWaterSanitation * 0.20) +
      (zakatParticipation * 0.15)
    )
  );

  const getDistrictStatus = (score: number) => {
    if (score >= 85) return { 
      label: 'Kecamatan Percontohan Baldatun Thoyyibatun (Mandiri & Berkah)', 
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      desc: 'Kecamatan memiliki ketahanan pangan mandiri, bebas rentenir, dan aliran kas zakat produktif yang memutus lingkaran kemiskinan.'
    };
    if (score >= 70) return { 
      label: 'Kecamatan Menuju Berdaya (Tumbuh Berkelanjutan)', 
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
      desc: 'Pondasi lumbung pangan dan pasar berjalan baik, perlu percepatan pembentukan sentra pengolahan nilai tambah.'
    };
    if (score >= 50) return { 
      label: 'Kecamatan Rawan Rentenir & Ketergantungan Pasokan', 
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
      desc: 'Sebagian besar petani/pedagang masih terjerat ijon, surplus komoditas dijual mentah dengan margin rendah.'
    };
    return { 
      label: 'Kecamatan Kritis: Rentan Bencana Sosial-Ekonomi', 
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
      desc: 'Sanitasi minim, air bersih terbatas, dan hilangnya kohesi sosial rukun warga; intervensi darurat ZISWAF sangat mendesak.'
    };
  };

  const status = getDistrictStatus(calculatedIndex);

  // 6 Prinsip Pembangunan Kota Kecamatan Khaldunian
  const principles = [
    {
      num: '01',
      title: 'Ketahanan Pangan & Lumbung Komunal (Hifzh al-Aqwat)',
      arabic: 'حفظ الأقوات وادخار الحبوب',
      icon: Sprout,
      color: 'from-emerald-600 to-teal-700',
      khaldunConcept: 'Ibnu Khaldun menegaskan bahwa kota yang tidak mandiri pangan adalah tawanan dari penyuplai luar. Kecamatan harus memiliki lumbung paceklik komunal di setiap desa.',
      actionPoint: 'Membangun Lumbung Pangan Sadar Kaya: gabah petani dibeli dengan harga adil saat panen raya dan disimpan untuk menjaga stabilitas harga saat paceklik.',
    },
    {
      num: '02',
      title: 'Pasar Bebas Pungli & Anti-Tengkulak (Suq Maftuh wa Nafy al-Muks)',
      arabic: 'إسقاط المكوس وفتح الأسواق',
      icon: Store,
      color: 'from-amber-600 to-yellow-600',
      khaldunConcept: 'Menghapuskan retribusi liar (muks) dan sewa lapak yang memeras pedagang kecil, meniru Pasar Madinah binaan Rasulullah SAW dan Abdurrahman bin Auf.',
      actionPoint: 'Pasar kecamatan terbuka bagi pedagang keliling dan petani tanpa calo; transaksi tunai langsung dengan timbangan tera digital terverifikasi.',
    },
    {
      num: '03',
      title: 'Sentra Pengolahan & Nilai Tambah Vokasi (Sana\'i wa Taqsim al-A\'mal)',
      arabic: 'تطوير الصنائع والقيمة المضافة',
      icon: Building2,
      color: 'from-cyan-600 to-blue-700',
      khaldunConcept: 'Kecamatan tidak boleh menjual bahan mentah secara murah. Peningkatan keahlian industri (Sana\'i) melipatgandakan upah kerja dan menciptakan lapangan kerja pemuda.',
      actionPoint: 'Pengolahan pasca-panen: pengering gabah bertenaga surya, sentra pengemasan beras organik higienis, dan ekstraksi rimpang herbal binaan santri.',
    },
    {
      num: '04',
      title: 'Baitul Maal & BMT Bebas Riba (Mal al-Jiddiyyah)',
      arabic: 'بيت المال والقرض الحسن',
      icon: Coins,
      color: 'from-purple-600 to-indigo-700',
      khaldunConcept: 'Perputaran uang harus mengalir di antara masyarakat lokal (Local Multiplier Effect), bukan tersedot keluar oleh bunga bank ribawi atau rentenir keliling.',
      actionPoint: 'Baitul Maal tingkat kecamatan: menyediakan modal qardhul hasan (pinjaman tanpa bunga) dan syirkah mudharabah bagi mustahik yang merintis usaha kecil.',
    },
    {
      num: '05',
      title: 'Sanitasi, Air Bersih, & Proteksi Ekologis (Thib al-Hawa\' wa al-Ma\')',
      arabic: 'طيب الهواء وعذوبة المياه',
      icon: Droplets,
      color: 'from-blue-600 to-cyan-600',
      khaldunConcept: 'Dalam Bab IV Al-Muqaddimah, syarat utama kota peradaban adalah kualitas udara yang sejuk dan air bersih yang melimpah untuk mencegah wabah penyakit.',
      actionPoint: 'Pengelolaan saluran irigasi tanpa limbah plastik, bank sampah sirkular komunal, dan penghijauan sabuk hijau (green belt) sumber mata air desa.',
    },
    {
      num: '06',
      title: 'Kohesi Rukun Warga & Gotong Royong (\'Ashabiyyah al-Mahalliyyah)',
      arabic: 'العصبية المحلية والتكافل الاجتماعي',
      icon: Users,
      color: 'from-rose-600 to-red-700',
      khaldunConcept: 'Keamanan dan kesejahteraan lahir dari rasa saling menjaga antarwarga (Siri\' Na Pacce, Sambatan, Perelek), bukan sekadar penjagaan pos keamanan formal.',
      actionPoint: 'Tradisi Jimpitan Beras Perelek: setiap kepala keluarga menyumbang sejumput beras mingguan untuk menjamin tidak ada satu pun tetangga yang kelaparan.',
    },
  ];

  // 4 Tahap Roadmap Transformasi Kecamatan
  const roadmapStages = [
    {
      phase: 'Fase 1 (Bulan 1-6)',
      title: 'Pembebasan Mustahik & Konsolidasi Baitul Maal',
      focus: 'Audit Hutang Rentenir & Penguatan Dharuriyyat (Pangan)',
      milestones: [
        'Pendataan mustahik dengan Had Kifayah AI Scoring untuk memetakan keluarga terlilit ijon.',
        'Penyaluran Zakat Maal & Qardhul Hasan untuk melunasi jeratan rentenir dengan akad adil.',
        'Aktivasi gerakan Jimpitan Perelek di setiap masjid/musholla tingkat RW untuk stok pangan darurat.',
      ],
      icon: ShieldCheck,
      badge: 'Fase Pembebasan',
    },
    {
      phase: 'Fase 2 (Bulan 7-18)',
      title: 'Pembangunan Sentra Nilai Tambah (Sana\'i) & Lumbung',
      focus: 'Modernisasi Pasca Panen & Vokasi Pemuda Desa',
      milestones: [
        'Pengadaan mesin pengering gabah, cold storage ikan komunal, dan penggilingan padi terintegrasi.',
        'Pelatihan literasi keuangan syariah & pencatatan pembukuan digital anti-riba bagi pedagang pasar.',
        'Pembentukan Koperasi Syariah BMT Kecamatan untuk permodalan bergulir tanpa bunga.',
      ],
      icon: Building2,
      badge: 'Fase Industrialisasi Riil',
    },
    {
      phase: 'Fase 3 (Bulan 19-36)',
      title: 'Pasar Bebas Pungli & Kemitraan Antar-Kecamatan',
      focus: 'Efisiensi Rantai Pasok & Perputaran Kas Lokal',
      milestones: [
        'Deklarasi Pasar Kecamatan Bebas Retribusi Liar berstandar timbangan jujur Abdurrahman bin Auf.',
        'Integrasi jaringan logistik antarkecamatan menggunakan sistem pelacakan aset QR Code WMS.',
        'Peningkatan status 40% mustahik awal menjadi muzakki baru yang mulai membayar zakat maal.',
      ],
      icon: Store,
      badge: 'Fase Kedaulatan Pasar',
    },
    {
      phase: 'Fase 4 (Bulan 37+)',
      title: 'Baldatun Thoyyibatun wa Rabbun Ghofur Penuh',
      focus: 'Kemandirian Pangan, Ekspor Surplus, & Keberkahan Peradaban',
      milestones: [
        'Kecamatan mandiri pangan 100% dan menjadi lumbung penyuplai bagi kota-kota metropolitan sekitar.',
        'Transparansi aliran dana publik tercatat di blockchain tanpa gas fee (akuntabilitas publik 100%).',
        'Kecamatan diakui sebagai percontohan nasional dalam sinergi ulama, umara, dan saudagar zakat.',
      ],
      icon: Award,
      badge: 'Fase Kemakmuran Paripurna',
    },
  ];

  return (
    <div className="space-y-10 py-6">
      {/* Hero Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 text-white p-6 sm:p-10 border border-teal-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              Tata Ruang & Ekonomi Wilayah Peradaban
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold">
              QS. Saba': 15 • Kitab Al-Muqaddimah Bab IV
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-serif">
            Masterplan Kecamatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300">Baldatun Thoyyibatun</span> wa Rabbun Ghofur
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Panduan cerdas membangun dan mengembangkan kota kecamatan berdaya: menggabungkan teori <strong>Perencanaan Kota Peradaban (*Bina' al-Mudun*) Ibnu Khaldun</strong>, etika <strong>Pasar Bebas Riba Abdurrahman bin Auf</strong>, dan <strong>Gerakan Sadar Kaya</strong>. Mewujudkan kecamatan yang mandiri pangan, bebas jeratan rentenir, berkeadilan sosial, dan diberkahi Allah SWT.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('calculator')}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-xs"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span>Uji Indeks Kemakmuran Kecamatan Anda</span>
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-xs"
            >
              <Layers className="w-4 h-4 text-teal-300" />
              <span>Diagram Aliran Ekonomi Sirkular</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quranic & Theological Anchor Quote Box */}
      <div className="bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/30 rounded-2xl p-5 sm:p-6 text-slate-800 dark:text-slate-200 space-y-2">
        <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider font-mono">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Landasan Teologis Kemakmuran Negeri
          </span>
          <span>Surah Saba': 15</span>
        </div>
        <p className="text-sm sm:text-base font-serif italic text-amber-900 dark:text-amber-200">
          "لَقَدْ كَانَ لِسَبَإٍ فِي مَسْكَنِهِمْ آيَةٌ ۖ جَنَّتَانِ عَن يَمِينٍ وَشِمَالٍ ۖ كُلُوا مِن رِّزْقِ رَبِّكُمْ وَاشْكُرُوا لَهُ ۚ بَلْدَةٌ طَيِّبَةٌ وَرَبٌّ غَفُورٌ"
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <em>"Sungguh, bagi kaum Saba' ada tanda (kekuasaan Allah) di tempat kediaman mereka yaitu dua buah kebun di sebelah kanan dan di sebelah kiri. (Kepada mereka dikatakan), 'Makanlah olehmu dari rezeki yang (dianugerahkan) Tuhanmu dan bersyukurlah kepada-Nya. (Negerimu) adalah negeri yang baik, nyaman, makmur (baldatun thoyyibatun) dan (Tuhanmu) adalah Tuhan Yang Maha Pengampun.'"</em>
        </p>
      </div>

      {/* Main Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        {[
          { id: 'principles', label: '1. 6 Pilar Kota Kecamatan Khaldunian', icon: Building2 },
          { id: 'calculator', label: '2. Kalkulator Indeks Kecamatan Baldatun', icon: Sliders },
          { id: 'pipeline', label: '3. Peta Aliran Sirkular Ekonomi Lokal', icon: Layers },
          { id: 'roadmap', label: '4. Roadmap Transformasi 4 Fase', icon: Calendar },
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

      {/* TAB 1: 6 PILAR KOTA KECAMATAN KHALDUNIAN */}
      {activeTab === 'principles' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
                6 Pilar Tata Ruang & Pembangunan Peradaban Wilayah
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Disarikan langsung dari Bab IV Kitab Al-Muqaddimah: <em>"Fi Bina' al-Mudun wa al-Amsar"</em> (Pembangunan Kota & Wilayah)
              </p>
            </div>
            <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/30 self-start sm:self-auto">
              Standar Ibnu Khaldun & Auf
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-teal-500/50 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                        {item.num}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </h3>
                      <span className="text-xs font-serif text-teal-600 dark:text-teal-400 italic">
                        {item.arabic}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.khaldunConcept}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                      Langkah Konkret di Kecamatan:
                    </span>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                      {item.actionPoint}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: KALKULATOR INDEKS KECAMATAN BALDATUN */}
      {activeTab === 'calculator' && (
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-teal-500/30 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 text-xs font-mono font-bold">
                  Diagnostic Simulator
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  District Resilience Assessment
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                Kalkulator Indeks Kemakmuran Kecamatan Baldatun
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed mt-1">
                Sesuaikan 5 parameter kunci di bawah ini sesuai kondisi riil kecamatan Anda saat ini untuk melihat skor ketahanan sosiologis-ekonomi.
              </p>
            </div>

            <div className="text-right bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shrink-0">
              <span className="text-[10px] text-slate-400 font-mono uppercase">Indeks Baldatun Thoyyibatun:</span>
              <div className="text-3xl font-black font-mono text-teal-400">
                {calculatedIndex}/100
              </div>
              <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded mt-1 border ${status.color}`}>
                {status.label}
              </span>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider 1: Food Self Sufficiency */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Sprout className="w-4 h-4" />
                  Kemandirian Pangan Pokok Kecamatan
                </span>
                <span className="font-mono text-base">{foodSelfSufficiency}%</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Persentase kebutuhan beras, jagung, dan protein yang diproduksi oleh petani/peternak di wilayah kecamatan sendiri.
              </p>
              <input
                type="range"
                min="10"
                max="100"
                value={foodSelfSufficiency}
                onChange={(e) => setFoodSelfSufficiency(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                <span>Ketergantungan Impor (10%)</span>
                <span>Swasembada Total (100%)</span>
              </div>
            </div>

            {/* Slider 2: Anti Loan Shark */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Pembebasan dari Rentenir & Ijon
                </span>
                <span className="font-mono text-base">{antiLoanSharkRate}%</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Persentase pedagang pasar dan petani yang memiliki akses ke pembiayaan syariah bebas bunga/qardhul hasan.
              </p>
              <input
                type="range"
                min="10"
                max="100"
                value={antiLoanSharkRate}
                onChange={(e) => setAntiLoanSharkRate(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                <span>Didominasi Rentenir (10%)</span>
                <span>Bebas Rentenir Penuh (100%)</span>
              </div>
            </div>

            {/* Slider 3: Clean Water & Sanitation */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-blue-400">
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-4 h-4" />
                  Akses Air Bersih & Sanitasi Higienis
                </span>
                <span className="font-mono text-base">{cleanWaterSanitation}%</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Syarat mutlak Ibnu Khaldun: sanitasi lingkungan mencegah wabah dan menjaga produktivitas kerja masyarakat.
              </p>
              <input
                type="range"
                min="20"
                max="100"
                value={cleanWaterSanitation}
                onChange={(e) => setCleanWaterSanitation(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                <span>Sanitasi Buruk (20%)</span>
                <span>Higienis & Hijau (100%)</span>
              </div>
            </div>

            {/* Slider 4: Zakat & Filantropi Lokal */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                <span className="flex items-center gap-1.5">
                  <Coins className="w-4 h-4" />
                  Partisipasi Zakat Maal Saudagar Lokal
                </span>
                <span className="font-mono text-base">{zakatParticipation}%</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Kepatuhan para pengusaha, juragan toko, dan petani kaya di kecamatan dalam membayar zakat maal 2.5% secara rutin.
              </p>
              <input
                type="range"
                min="10"
                max="100"
                value={zakatParticipation}
                onChange={(e) => setZakatParticipation(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                <span>Hanya Sedekah Lepas (10%)</span>
                <span>ZISWAF Terstruktur (100%)</span>
              </div>
            </div>
          </div>

          {/* Toggle Lumbung Komunal */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">
                  Keberadaan Lumbung Pangan Paceklik / Perelek Warga Aktif
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Adanya lumbung fisik bersama di tingkat kecamatan yang menyimpan stok gabah darurat minimal 3 bulan konsumsi.
              </p>
            </div>

            <button
              onClick={() => setCommunalBarnActive(!communalBarnActive)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                communalBarnActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{communalBarnActive ? 'Lumbung Komunal: Aktif (+15 Poin)' : 'Lumbung Komunal: Belum Ada'}</span>
            </button>
          </div>

          {/* Diagnosis & Action Advice */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Diagnosis Sosiologis & Rekomendasi Aksi Cepat:</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {status.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {onNavigateToWarehouse && (
                <button
                  onClick={onNavigateToWarehouse}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Atur Inventaris Lumbung & Gudang WMS</span>
                </button>
              )}
              {onNavigateToCalculator && (
                <button
                  onClick={onNavigateToCalculator}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Kalkulasi Zakat Omzet Pengusaha Kecamatan</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PETA ALIRAN SIRKULAR EKONOMI LOKAL */}
      {activeTab === 'pipeline' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
              Model Ekonomi Sirkular Kecamatan (Local Multiplier Effect)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Prinsip Abdurrahman bin Auf & Ibnu Khaldun: Uang yang dihasilkan di kecamatan tidak boleh menguap ke luar, melainkan berputar menghidupi ekosistem lokal.
            </p>
          </div>

          {/* Interactive Flow Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '1. Hulu Produksi',
                title: 'Petani & Nelayan Desa',
                desc: 'Memproduksi bahan pangan pokok (beras, sayur, ikan) didanai syirkah modal modal tani halal.',
                badge: 'Sektor Dharuriyyat',
                color: 'border-emerald-500/40 bg-emerald-500/5',
              },
              {
                step: '2. Sentra Pengolahan',
                title: 'Sentra Sana\'i Kecamatan',
                desc: 'Penggilingan gabah, pengemasan vakum, cold chain higienis untuk melipatgandakan nilai jual.',
                badge: 'Nilai Tambah (Sana\'i)',
                color: 'border-teal-500/40 bg-teal-500/5',
              },
              {
                step: '3. Pasar Terbuka',
                title: 'Pasar Rakyat Tanpa Pungli',
                desc: 'Bebas sewa lapak pencekik, timbangan jujur, arus kas berputar cepat setiap hari.',
                badge: 'Etika Pasar Madinah',
                color: 'border-amber-500/40 bg-amber-500/5',
              },
              {
                step: '4. Akumulasi Berkah',
                title: 'Baitul Maal & BMT Syariah',
                desc: 'Zakat maal 2.5% dan tabungan wadiah dihimpun untuk mendanai mustahik yang membutuhkan modal.',
                badge: 'Filantropi Terstruktur',
                color: 'border-purple-500/40 bg-purple-500/5',
              },
              {
                step: '5. Transformasi Dhuafa',
                title: 'Mustahik Naik Menjadi Muzakki',
                desc: 'Mustahik terbantu modal dan pendampingan bisnis hingga mandiri dan mulai membayar zakat.',
                badge: 'Kemakmuran Hakiki',
                color: 'border-blue-500/40 bg-blue-500/5',
              },
            ].map((node, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${node.color} space-y-2 flex flex-col justify-between`}>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                    {node.step}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                    {node.desc}
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 border border-slate-200 dark:border-slate-700 inline-block self-start mt-2">
                  {node.badge}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-start gap-3 text-xs">
            <HeartHandshake className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Hukum Sirkularitas Ibnu Khaldun:</strong>{' '}
              <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Ketika sirkulasi kekayaan di tingkat kecamatan tidak bocor keluar karena riba atau penimbunan, perputaran uang (velocity of money) di antara 20.000–50.000 warga kecamatan sanggup menghasilkan surplus kemakmuran yang melampaui bantuan subsidi pemerintah pusat.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ROADMAP TRANSFORMASI 4 FASE */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
              Roadmap 4 Fase Membangun Kota Kecamatan Baldatun
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Langkah terstruktur bertahap dari pembebasan mustahik darurat hingga kemandirian peradaban penuh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmapStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-teal-500/40 transition-all"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">
                          {stage.phase}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {stage.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {stage.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                      Fokus Utama: {stage.focus}
                    </span>
                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      {stage.milestones.map((ms, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                          <span>{ms}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-teal-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold font-serif text-white">
                Siap Meluncurkan Program Kecamatan Binaan Anda?
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Daftarkan kecamatan Anda ke dalam program asistensi Gerakan Sadar Kaya untuk pendampingan lumbung pangan dan BMT syariah terverifikasi smart contract.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {onNavigateToCampaigns && (
                <button
                  onClick={onNavigateToCampaigns}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Daftarkan Program Bantuan Kecamatan</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
