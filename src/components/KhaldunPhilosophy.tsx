import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Scale, 
  Coins, 
  Lightbulb, 
  ArrowRight, 
  Compass, 
  Award,
  Zap,
  Repeat
} from 'lucide-react';
import { Language } from '../types';

interface KhaldunPhilosophyProps {
  currentLang: Language;
  onNavigateToCalculator: () => void;
  onNavigateToCampaigns: () => void;
}

export const KhaldunPhilosophy: React.FC<KhaldunPhilosophyProps> = ({
  currentLang,
  onNavigateToCalculator,
  onNavigateToCampaigns,
}) => {
  // Interactive Simulator state for Khaldun Value Creation
  const [effortHours, setEffortHours] = useState<number>(40);
  const [specializationLevel, setSpecializationLevel] = useState<number>(4); // 1-5
  const [trustScore, setTrustScore] = useState<number>(95); // 0-100%
  const [productiveReinvestmentRatio, setProductiveReinvestmentRatio] = useState<number>(60); // %

  // Calculated values based on Ibn Khaldun's equations
  // Value = Amal * (1 + Specialization^1.2) * (TrustScore / 100)
  const baseRatePerHour = 50000; // Rp 50.000 / jam
  const monthlyGrossEstimate = Math.round(
    effortHours * 4 * baseRatePerHour * (1 + Math.pow(specializationLevel, 1.25) * 0.45) * (trustScore / 100)
  );
  const productiveReinvestmentAmount = Math.round((monthlyGrossEstimate * productiveReinvestmentRatio) / 100);
  const estimatedAnnualZakatMal = Math.round(monthlyGrossEstimate * 12 * 0.025);

  const fivePillars = [
    {
      num: '01',
      title: 'Rezeki adalah Buah dari Usaha Manusia (Value and Effort)',
      arabic: 'اعلم أن ما يكتسبه الإنسان ويسميه رزقاً أو مالاً إنما هو قيمة أعماله',
      quote: '"Ketahuilah bahwa apa yang diperoleh seseorang dan disebut sebagai \'kekayaan\' atau \'rezeki\', pada hakikatnya adalah nilai dari hasil usahanya sendiri (amal)."',
      desc: 'Rezeki tidak hadir secara pasif tanpa ikhtiar yang terukur. Dalam Al-Muqaddimah, nilai ekonomi suatu barang dan jasa berbanding lurus dengan tenaga terampil dan kecerdasan yang dicurahkan.',
      practical: 'Tingkatkan nilai manfaat (utility) dari jasa/produk yang Anda tawarkan ke pasar. Makin tinggi kualitas amal, makin melimpah rezeki berkah yang mengalir.',
      badge: 'Amal & Value Creation',
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-700',
    },
    {
      num: '02',
      title: 'Spesialisasi dan Pembagian Kerja (Division of Labor)',
      arabic: 'التعاون وتوزيع العمل يولد الفائض الاقتصادي',
      quote: '"Pekerjaan yang dikerjakan secara bersama-sama dan terspesialisasi akan menghasilkan surplus yang jauh lebih besar dibandingkan jika seseorang mengerjakannya sendiri secara serabutan."',
      desc: 'Pelopor sosiologi ekonomi ini membuktikan bahwa spesialisasi menciptakan efisiensi mutlak dan melahirkan nilai tukar pasar yang tinggi.',
      practical: 'Fokus kuasai 1 bidang keahlian strategis hingga menjadi otoritas terpercaya, lalu bangun sinergi kemitraan (syirkah) dengan sesama profesional.',
      badge: 'Division of Labor',
      icon: Users,
      color: 'from-cyan-600 to-blue-700',
    },
    {
      num: '03',
      title: 'Membangun Kejujuran dan Kepercayaan Pasar (Trust Capital)',
      arabic: 'التجارة أسرع الطرق للنماء ولكنها لا تقوم إلا بالأمانة',
      quote: '"Perdagangan adalah cara tercepat untuk mengembangkan harta, namun pasar sangat sensitif terhadap moralitas. Pedagang sejati adalah yang menjaga integritas."',
      desc: 'Kepercayaan (Amanah) adalah modal sosial tertinggi. Sekali kecurangan terjadi, reputasi hancur dan rantai rezeki jangka panjang terputus.',
      practical: 'Jadikan keterbukaan informasi, garansi mutu, dan kejujuran timbangan sebagai DNA bisnis Anda agar loyalitas pelanggan melipatgandakan omzet.',
      badge: 'Moralitas Pasar & Amanah',
      icon: ShieldCheck,
      color: 'from-amber-600 to-yellow-600',
    },
    {
      num: '04',
      title: 'Menolak Kedzaliman Sistem & Pajak yang Menindas',
      arabic: 'الظلم مؤذن بخراب العمران',
      quote: '"Ketidakadilan dan pungutan liar adalah tanda keruntuhan peradaban. Ketika hak milik tidak aman, motivasi bekerja masyarakat akan mati."',
      desc: 'Ibnu Khaldun merumuskan siklus peradaban: ketika penguasa memeras rakyat dan merampas kepemilikan privat, produktivitas anjlok dan negara runtuh.',
      practical: 'Patuhi regulasi syariah yang adil, jauhi praktik suap/korupsi, serta lindungi kepemilikan karyawan dan mitra melalui bagi hasil yang transparan.',
      badge: 'Keadilan Kepemilikan',
      icon: Scale,
      color: 'from-rose-600 to-pink-700',
    },
    {
      num: '05',
      title: 'Keseimbangan Produksi vs Gaya Hidup (Anti-Rafahiyah)',
      arabic: 'الترف يفسد الطباع ويهلك الثروات',
      quote: '"Gaya hidup mewah yang berlebihan melemahkan daya juang dan mengubah bangsa produktif menjadi konsumen yang rapuh."',
      desc: 'Kekayaan yang berkah adalah kekayaan yang terus diputar ke sektor riil produktif, bukan yang dihabiskan untuk konsumsi prestise yang menipu.',
      practical: 'Alokasikan minimal 40-60% surplus keuntungan bulanan untuk re-investasi modal usaha, pengembangan tim, dan Zakat/Infaq pembebas dhuafa.',
      badge: 'Aset Produktif vs Hedonisme',
      icon: Coins,
      color: 'from-purple-600 to-indigo-700',
    },
  ];

  const aufLessons = [
    {
      title: '"Tunjukkan Padaku di Mana Pasar Berada"',
      summary: 'Kemandirian finansial dan riset ekosistem nyata. Beliau tidak meminta-minta, melainkan langsung mempelajari supply & demand pasar.',
    },
    {
      title: 'Perputaran Uang Tunai yang Cepat (High Velocity of Money)',
      summary: 'Tidak menahan stok terlalu lama. Menjual dengan margin keuntungan yang wajar agar barang cepat berputar dan likuiditas tetap sehat.',
    },
    {
      title: 'Tidak Menjual Barang Cacat & Menolak Riba',
      summary: 'Transparansi penuh atas kondisi barang dagangan. Jika ada kekurangan, disampaikan di awal kepada pembeli tanpa manipulasi.',
    },
    {
      title: 'Sedekah Ekstrem sebagai Pengungkit (Multiplier Rezeki)',
      summary: 'Ketika menyedekahkan 700 unta bermuatan gandum untuk kota Madinah, kekayaan beliau justru bertambah berlipat ganda karena janji Allah SWT.',
    },
  ];

  return (
    <div className="space-y-10 py-6">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-emerald-500/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Paradigma Sosiologi & Ekonomi Muqaddimah
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-serif">
            Bagaimana Cara Cerdas Menjemput Rezeki dengan Kitab <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">Al-Muqaddimah</span> Ibnu Khaldun
          </h2>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Rezeki bukan sekadar mistisisme pasif, melainkan sebuah <strong>hukum peradaban, sistem ekonomi sosial, dan nilai tambah (amal)</strong> yang dihasilkan seseorang di tengah masyarakat. Dipadukan dengan strategi perniagaan etis sahabat <strong>Abdurrahman bin Auf</strong> dan gerakan <strong>Sadar Kaya</strong> untuk mengangkat martabat mustahik menjadi muzakki mandiri.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNavigateToCalculator}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 text-sm"
            >
              <Coins className="w-4 h-4 text-slate-950" />
              Simulasi Zakat Mal Berbasis Omzet
            </button>
            <button
              onClick={onNavigateToCampaigns}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-sm"
            >
              Lihat Program Modal Usaha Berkah
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </button>
          </div>
        </div>
      </div>

      {/* 5 Pillars Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              5 Pilar Rezeki Berkelanjutan Menurut Kitab Al-Muqaddimah
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Analisis sosiologi ekonomi klasik karya Waliyyuddin Abdurrahman Ibnu Khaldun (1332–1406 M)
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-800">
            Kaidah 'Umran Basyari
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fivePillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="group relative bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 transition-colors">
                      {p.num}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {p.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${p.color} text-white shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                      {p.title}
                    </h4>
                  </div>

                  <p className="text-xs text-amber-700 dark:text-amber-300 font-serif italic bg-amber-50/70 dark:bg-amber-950/30 p-2.5 rounded-lg border-l-2 border-amber-500">
                    {p.quote}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <div className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                    <span><strong>Cara Cerdasnya:</strong> {p.practical}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Special Gerakan Sadar Kaya Card */}
          <div className="bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 text-white rounded-2xl p-6 border border-emerald-400/30 shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Visi Gerakan Sadar Kaya
              </div>
              <h4 className="font-bold text-lg text-white">
                "Dari Mustahik Menjadi Muzakki Mandiri"
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pemberian zakat tidak boleh sekadar konsumtif sesaat. Dengan model Muqaddimah dan syirkah Abdurrahman bin Auf, dana zakat disalurkan untuk modal kerja alat produksi (gerobak, bibit, mesin jahit, jaring nelayan) sehingga keluarga dhuafa bertransformasi menjadi pembayar zakat dalam 1-2 tahun.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-emerald-800/80">
              <div className="text-xs font-medium text-emerald-200">
                Alur Transformasi: <strong>Fakir/Miskin → Pendampingan Usaha → Surplus Usaha → Muzakki Berdaya</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Khaldunian Value & Wealth Simulator */}
      <div className="bg-gradient-to-r from-slate-50 to-emerald-50/40 dark:from-slate-800 dark:to-slate-850 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-3xl mb-6">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            Simulator Sosiologi Ekonomi
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Kalkulator Surplus Nilai & Efek Spesialisasi Al-Muqaddimah
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Buktikan rumus Ibnu Khaldun: Nilai Rezeki = Kerja Keras (Amal) × Spesialisasi Keahlian × Modal Kepercayaan (Trust) × Rasio Aset Produktif.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sliders and Controls */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>1. Alokasi Waktu Kerja & Amal Terukur</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">{effortHours} jam / minggu</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                value={effortHours}
                onChange={(e) => setEffortHours(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>2. Tingkat Spesialisasi Keahlian (Division of Labor)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                  {specializationLevel === 1 && 'Umum / Serabutan (Level 1)'}
                  {specializationLevel === 2 && 'Terlatih Dasar (Level 2)'}
                  {specializationLevel === 3 && 'Kompeten Spesifik (Level 3)'}
                  {specializationLevel === 4 && 'Ahli Berlisensi (Level 4)'}
                  {specializationLevel === 5 && 'Master / Otoritas Pasar (Level 5)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={specializationLevel}
                onChange={(e) => setSpecializationLevel(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>3. Indeks Kepercayaan Pasar & Integritas Moral (Trust)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">{trustScore}% Terpercaya</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={trustScore}
                onChange={(e) => setTrustScore(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>4. Alokasi Surplus untuk Investasi Riil (Anti-Rafahiyah)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">{productiveReinvestmentRatio}% Produktif</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                value={productiveReinvestmentRatio}
                onChange={(e) => setProductiveReinvestmentRatio(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Simulation Output Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-500/30 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Proyeksi Nilai Rezeki Berkah
              </span>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-mono">
                Model Al-Muqaddimah
              </span>
            </div>

            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Estimasi Nilai Tambah / Penghasilan Bulanan:</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                Rp {monthlyGrossEstimate.toLocaleString('id-ID')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Modal Riil Diinvestasikan:</div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono">
                  Rp {productiveReinvestmentAmount.toLocaleString('id-ID')}
                </div>
                <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-0.5">Memutar roda ekonomi umat</div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="text-[11px] text-amber-800 dark:text-amber-300">Potensi Zakat Maal (2.5%):</div>
                <div className="text-sm font-bold text-amber-700 dark:text-amber-400 font-mono">
                  Rp {estimatedAnnualZakatMal.toLocaleString('id-ID')}/thn
                </div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">Penyucian & pelindung harta</div>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
              <strong>Kaidah Ibnu Khaldun:</strong> Dengan memperdalam keahlian ke Level {specializationLevel} dan menjaga integritas pasar di {trustScore}%, Anda menciptakan surplus nilai yang menolak jebakan kemiskinan dan membuka keran sedekah bagi asnaf dhuafa.
            </div>
          </div>
        </div>
      </div>

      {/* Abdurrahman bin Auf Business Wisdom Section */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/15 text-amber-600 dark:text-amber-400 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              7 Pilar Perniagaan Berkah Abdurrahman bin Auf (Sahabat Kaya Raya Ahli Surga)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Prinsip emas perniagaan syariah yang mengantarkan beliau dari tanpa modal di Madinah menjadi miliarder paling dermawan sepanjang sejarah Islam.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {aufLessons.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 hover:border-amber-400/50 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
                {index + 1}
              </div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                {item.title}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
