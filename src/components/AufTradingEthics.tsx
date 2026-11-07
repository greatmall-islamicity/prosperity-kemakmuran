import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Printer, 
  RotateCcw, 
  HelpCircle, 
  BookOpen,
  DollarSign,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';

interface AufTradingEthicsProps {
  currentLang: Language;
  onNavigateToCalculator: () => void;
  onNavigateToInvestment: () => void;
}

interface ChecklistItem {
  id: string;
  category: 'Kejujuran & Kualitas' | 'Perputaran & Anti-Ihtikar' | 'Keadilan Karyawan & Mitra' | 'Kedermawanan & Zakat';
  title: string;
  desc: string;
  hadithSirah: string;
  points: number;
}

export const AufTradingEthics: React.FC<AufTradingEthicsProps> = ({
  currentLang,
  onNavigateToCalculator,
  onNavigateToInvestment,
}) => {
  const checklistData: ChecklistItem[] = [
    {
      id: 'c1',
      category: 'Kejujuran & Kualitas',
      title: 'Transparansi Cacat & Kekurangan Barang Tanpa Manipulasi',
      desc: 'Selalu menjelaskan secara jujur jika ada kekurangan, cacat fisik, atau kelemahan produk sebelum pembeli menyetujui transaksi.',
      hadithSirah: 'Abdurrahman bin Auf menolak keras menjual unta yang pincang atau barang cacat tanpa menerangkan kondisinya secara terbuka.',
      points: 9,
    },
    {
      id: 'c2',
      category: 'Kejujuran & Kualitas',
      title: 'Presisi Takaran, Timbangan & Spesifikasi Mutu Digital',
      desc: 'Tidak pernah mengurangi berat, ukuran, kuota, atau deskripsi spesifikasi produk demi meraup untung lebih (anti-Muthaffifin).',
      hadithSirah: '"Celakalah bagi orang-orang yang curang, yaitu orang-orang yang apabila menerima takaran dari orang lain mereka minta dipenuhi..." (QS. Al-Muthaffifin: 1-2).',
      points: 9,
    },
    {
      id: 'c3',
      category: 'Kejujuran & Kualitas',
      title: 'Bebas Sumpah Palsu & Pemasaran Berlebihan (Overclaiming)',
      desc: 'Menghindari sumpah atas nama Allah atau klaim bombastis palsu sekadar untuk melariskan dagangan di media sosial atau toko fisik.',
      hadithSirah: 'Rasulullah SAW bersabda: "Sumpah palsu itu memang melariskan barang dagangan, namun memusnahkan keberkahan usahanya." (HR. Bukhari & Muslim).',
      points: 8,
    },
    {
      id: 'c4',
      category: 'Perputaran & Anti-Ihtikar',
      title: 'Tidak Menimbun Barang Saat Pasar Langka (Anti-Ihtikar)',
      desc: 'Tidak menahan stok kebutuhan masyarakat untuk menciptakan kelangkaan buatan demi mendongkrak harga secara sepihak.',
      hadithSirah: '"Tidak akan menimbun barang (ihtikar) kecuali orang yang berdosa/durhaka." (HR. Muslim). Sahabat Abdurrahman selalu menjaga pasokan pasar tetap lancar.',
      points: 9,
    },
    {
      id: 'c5',
      category: 'Perputaran & Anti-Ihtikar',
      title: 'Margin Wajar & Kecepatan Perputaran Uang (High Velocity of Money)',
      desc: 'Mengambil margin keuntungan yang wajar dan realistis agar barang dagangan cepat terjual dan modal tunai segera berputar kembali.',
      hadithSirah: 'Rahasia sukses Abdurrahman bin Auf di Madinah: "Aku tidak menolak keuntungan sedikit (asalkan tunai dan cepat berputar), dan aku tidak menjual barang cacat."',
      points: 8,
    },
    {
      id: 'c6',
      category: 'Perputaran & Anti-Ihtikar',
      title: 'Disiplin Pembayaran Hutang Usaha & Menepati Tempo Pemasok',
      desc: 'Segera melunasi tagihan supplier atau mitra tepat pada waktu yang dijanjikan tanpa menunda-nunda padahal mampu membayar.',
      hadithSirah: 'Rasulullah SAW bersabda: "Penundaan pembayaran hutang oleh orang yang mampu adalah sebuah kezaliman." (HR. Bukhari).',
      points: 8,
    },
    {
      id: 'c7',
      category: 'Keadilan Karyawan & Mitra',
      title: 'Gaji Karyawan Dibayar Tepat Waktu Sebelum Keringat Kering',
      desc: 'Menjamin hak upah pokok, insentif, dan jaminan kesehatan tim kerja disalurkan tepat waktu tanpa pemotongan sepihak.',
      hadithSirah: '"Berikanlah upah kepada pekerja sebelum keringatnya kering." (HR. Ibnu Majah). Abdurrahman bin Auf memperlakukan pekerjanya sebagai saudara mulia.',
      points: 9,
    },
    {
      id: 'c8',
      category: 'Keadilan Karyawan & Mitra',
      title: 'Operasional 100% Bebas Riba, Bunga & Denda Keterlambatan',
      desc: 'Tidak menggunakan pinjaman berbunga ribawi, tidak memungut bunga dari piutang pelanggan, dan menolak skema denda yang mengeksploitasi.',
      hadithSirah: '"Allah memusnahkan riba dan menyuburkan sedekah..." (QS. Al-Baqarah: 276). Bisnis berkah tumbuh dari akad bagi hasil (Syirkah/Mudharabah).',
      points: 9,
    },
    {
      id: 'c9',
      category: 'Keadilan Karyawan & Mitra',
      title: 'Memberi Kelonggaran bagi Mitra/Debitur yang Pailit (Inzhār al-Mu\'sir)',
      desc: 'Memberikan restrukturisasi yang adil, penundaan tempo, atau pemutihan sebagian piutang kepada mitra bisnis dhuafa yang sungguh-sungguh ditimpa musibah.',
      hadithSirah: '"Dan jika orang yang berutang itu dalam kesukaran, maka berilah tenggang waktu sampai dia lapang..." (QS. Al-Baqarah: 280).',
      points: 8,
    },
    {
      id: 'c10',
      category: 'Kedermawanan & Zakat',
      title: 'Kepatuhan Zakat Maal & Omzet Perniagaan (2.5%) Tepat Waktu',
      desc: 'Menghitung secara cermat neraca aset lancar bisnis setiap tahun/bulan dan menyalurkannya langsung kepada 8 Asnaf tanpa dikurangi.',
      hadithSirah: 'Abdurrahman bin Auf selalu menyucikan kekayaannya dengan zakat dan menjadi penopang utama Baitul Maal kaum Muslimin.',
      points: 9,
    },
    {
      id: 'c11',
      category: 'Kedermawanan & Zakat',
      title: 'Sedekah Subuh / Harian sebagai Pengungkit (Multiplier Rezeki)',
      desc: 'Memiliki alokasi sedekah rutin dari keuntungan kotor perusahaan untuk anak yatim dan dhuafa sebagai pembuka pintu keberkahan perniagaan.',
      hadithSirah: 'Saat menyedekahkan 700 kafilah unta bermuatan gandum di Madinah, kekayaan Abdurrahman bin Auf justru berlipat ganda karena janji balasan Allah SWT.',
      points: 8,
    },
    {
      id: 'c12',
      category: 'Kedermawanan & Zakat',
      title: 'Akad Kemitraan Tertulis Jelas & Transparan (Tanpa Gharar)',
      desc: 'Semua hak, kewajiban, nisbah bagi hasil, dan skenario risiko kerugian dituangkan dalam perjanjian resmi yang dipahami kedua belah pihak.',
      hadithSirah: '"Wahai orang-orang yang beriman, penuhilah akad-akadmu." (QS. Al-Maidah: 1). Menolak transaksi yang mengandung ketidakjelasan (gharar).',
      points: 6,
    },
  ];

  // Checked state for items (default some checked for engaging onboarding)
  const [checkedIds, setCheckedIds] = useState<string[]>(['c1', 'c2', 'c4', 'c5', 'c7', 'c10']);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('ALL');

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      const nextChecked = [...checkedIds, id];
      setCheckedIds(nextChecked);
      // Trigger celebratory confetti if user achieves 100%
      if (nextChecked.length === checklistData.length) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleSelectAll = () => {
    setCheckedIds(checklistData.map((c) => c.id));
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleReset = () => {
    setCheckedIds([]);
  };

  // Calculate Total Score
  const totalPointsAchieved = checklistData
    .filter((c) => checkedIds.includes(c.id))
    .reduce((acc, curr) => acc + curr.points, 0);

  let statusTitle = 'Zona Bahaya (Risiko Riba & Cacat Muamalah)';
  let statusBadge = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800';
  let statusAdvice = 'Operasional bisnis Anda memiliki celah syubhat yang tinggi. Segera eliminasi transaksi ribawi, benahi transparansi takaran, dan bayar upah karyawan tepat waktu.';

  if (totalPointsAchieved >= 90) {
    statusTitle = 'Taraf Sahabat Abdurrahman bin Auf (Berkah Paripurna)';
    statusBadge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
    statusAdvice = 'MasyaAllah! Operasional bisnis Anda telah mencerminkan integritas tinggi, transparansi penuh, dan perputaran berkah pedagang ahli surga. Pertahankan istiqomah ini!';
  } else if (totalPointsAchieved >= 70) {
    statusTitle = 'Pedagang Amanah & Berkeadilan (Taraf Muhsin)';
    statusBadge = 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-300 dark:border-teal-800';
    statusAdvice = 'Bisnis Anda telah berada di jalur syariah yang kokoh. Tingkatkan pos sedekah harian dan pastikan pembukuan zakat maal diaudit secara berkala.';
  } else if (totalPointsAchieved >= 50) {
    statusTitle = 'Perlu Pembenahan Serius (Rentan Syubhat & Ihtikar)';
    statusBadge = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    statusAdvice = 'Hati-hati terhadap jebakan menunda hutang atau menahan stok (ihtikar). Terapkan perputaran kas cepat dan margin wajar agar rezeki mengalir lancar.';
  }

  const filteredItems = checklistData.filter(
    (item) => selectedFilterCategory === 'ALL' || item.category === selectedFilterCategory
  );

  return (
    <div className="space-y-10 py-6">
      {/* Header Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-10 border border-amber-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Audit Mandiri Etika Sirah Nabawiyah
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold">
              Kaidah Abdurrahman bin Auf
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-serif">
            Checklist Etika Dagang <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-200 to-teal-300">Abdurrahman bin Auf</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Sahabat Abdurrahman bin Auf tiba di Madinah tanpa sepeser pun uang, namun dalam waktu singkat menjadi miliarder paling dermawan berkat 3 prinsip emas: <strong>kejujuran mutlak (*shiddiq*)</strong>, <strong>kecepatan perputaran uang (*velocity of money*) tanpa menimbun barang</strong>, dan <strong>sedekah yang melipatgandakan rezeki</strong>. Lakukan audit mandiri pada bisnis Anda melalui checklist interaktif di bawah ini.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleSelectAll}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              Tandai Semua Selesai (100% Poin)
            </button>
            <button
              onClick={onNavigateToCalculator}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-xs"
            >
              <Coins className="w-4 h-4 text-emerald-300" />
              Hitung Zakat Maal Bisnis
            </button>
          </div>
        </div>
      </div>

      {/* Main Score & Audit Diagnosis Dashboard */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Circular Score Metric */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Skor Integritas Dagang Anda
            </span>
            <div className="text-5xl font-black font-mono text-amber-500 dark:text-amber-400">
              {totalPointsAchieved}%
            </div>
            <div className="text-xs text-slate-500">
              {checkedIds.length} dari {checklistData.length} Indikator Terpenuhi
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${totalPointsAchieved}%` }}
              />
            </div>
          </div>

          {/* Diagnosis & Recommendations */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase font-mono">Status Muamalah Bisnis:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusBadge}`}>
                {statusTitle}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {statusAdvice}
            </p>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-300/40 dark:border-amber-800/40 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <span>
                <strong>Kaidah Utama Sirah:</strong> "Pedagang yang jujur dan terpercaya akan dibangkitkan bersama para nabi, orang-orang benar (shiddiqin), dan para syuhada." (HR. Tirmidzi).
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['ALL', 'Kejujuran & Kualitas', 'Perputaran & Anti-Ihtikar', 'Keadilan Karyawan & Mitra', 'Kedermawanan & Zakat'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedFilterCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'Semua Indikator (12)' : cat}
              </button>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Checklist</span>
          </button>
        </div>

        {/* Interactive Checklist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  isChecked
                    ? 'border-emerald-500/60 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/40 hover:border-slate-300'
                }`}
              >
                {/* Custom Checkbox */}
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/60 px-1.5 py-0.2 rounded">
                      +{item.points} Poin
                    </span>
                  </div>

                  <h4 className={`text-sm font-bold leading-snug transition-colors ${
                    isChecked ? 'text-slate-900 dark:text-white line-through opacity-85' : 'text-slate-900 dark:text-white'
                  }`}>
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="pt-1 text-[11px] text-emerald-800 dark:text-emerald-400 font-serif italic flex items-start gap-1">
                    <BookOpen className="w-3.5 h-3.5 shrink-0 mt-0.5 text-teal-600 dark:text-teal-400" />
                    <span>{item.hadithSirah}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Printable Pledge / Commitment Sheet */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-xl space-y-6 print:border-none print:p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Piagam Pakta Integritas Pedagang Muslim
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
              Komitmen Perniagaan Berkah Abdurrahman bin Auf
            </h3>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Piagam Komitmen</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">1. Prinsip Kejujuran</div>
            <p className="leading-relaxed">
              Kami berikrar tidak menyembunyikan cacat barang, menjaga ketepatan timbangan, dan menolak sumpah palsu dalam berniaga.
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-white text-sm">2. Prinsip Efisiensi & Keadilan</div>
            <p className="leading-relaxed">
              Kami berkomitmen mengambil keuntungan yang wajar, menjaga perputaran kas cepat tanpa menimbun barang (*anti-ihtikar*), dan menolak transaksi ribawi.
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-white text-sm">3. Prinsip Kedermawanan</div>
            <p className="leading-relaxed">
              Kami menyucikan harta perniagaan dengan zakat 2,5% tepat waktu dan rutin bersedekah untuk memuliakan kaum mustahik dan dhuafa.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            Diverifikasi oleh Platform <strong>Muqaddimah Wealth & Zakat Hub</strong> • Tanggal Audit: {new Date().toLocaleDateString('id-ID')}
          </div>
          <div className="font-mono text-amber-400 font-bold">
            Status Audit: {totalPointsAchieved}% Sesuai Sirah Nabawiyah
          </div>
        </div>
      </div>
    </div>
  );
};
