import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  QrCode,
  FileSpreadsheet
} from 'lucide-react';
import { BlockchainTransaction, Language } from '../types';

interface ReportsAndExportProps {
  transactions: BlockchainTransaction[];
  currentLang: Language;
}

export const ReportsAndExport: React.FC<ReportsAndExportProps> = ({
  transactions,
  currentLang,
}) => {
  const [selectedMonth, setSelectedMonth] = useState('November 2026');
  const [reportType, setReportType] = useState<'monthly' | 'asnaf' | 'donor_certificate'>('monthly');

  const totalDisbursed = transactions.reduce((acc, curr) => acc + curr.amountIdr, 0);
  const totalBeneficiaries = transactions.length * 8; // average 8 souls/households per intervention

  // CSV / Excel exporter
  const exportToCsv = () => {
    const headers = ['TxID', 'Hash', 'BlockNumber', 'Timestamp', 'Donor', 'Recipient', 'Asnaf', 'AmountIDR', 'Akad', 'Location'];
    const rows = transactions.map((t) => [
      t.id,
      t.hash,
      t.blockNumber,
      `"${t.timestamp}"`,
      `"${t.donorName}"`,
      `"${t.recipientName}"`,
      t.asnafCategory,
      t.amountIdr,
      `"${t.akad}"`,
      `"${t.distributionLocation}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_ZISWAF_${selectedMonth.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const shareReportWhatsApp = () => {
    const summary = `*LAPORAN AKUNTABILITAS ZAKAT & INFAQ (MUQADDIMAH HUB)*\nPeriode: ${selectedMonth}\n\n• Total Dana Tersalurkan: Rp ${totalDisbursed.toLocaleString('id-ID')}\n• Penerima Manfaat: ${totalBeneficiaries} Jiwa / Asnaf\n• Transaksi On-Chain: ${transactions.length} Transaksi\n• Biaya Operasional Amil: 0% (Didukung Kas Wakaf)\n\nLaporan lengkap dan bukti smart contract dapat diakses secara real-time di portal transparansi publik.`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(summary)}`, '_blank');
  };

  return (
    <div className="space-y-8 py-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            Audit Terbuka & Akuntabilitas Penuh
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Dasbor Pelaporan & Ekspor Otomatis Multi-Format
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Unduh laporan berkala resmi dalam format PDF, spreadsheet Excel / Google Sheets, atau kirim rekap otomatis ke manajemen via WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
          >
            <option value="November 2026">November 2026</option>
            <option value="Oktober 2026">Oktober 2026</option>
            <option value="September 2026">September 2026</option>
            <option value="Tahunan 2026">Laporan Tahunan 2026</option>
          </select>

          <button
            onClick={exportToCsv}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Ekspor Excel/CSV</span>
          </button>

          <button
            onClick={handlePrintPdf}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>

          <button
            onClick={shareReportWhatsApp}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Kirim WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Official Printable Report Sheet Preview */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-700 shadow-lg space-y-8 font-sans print:border-none print:shadow-none print:p-0">
        {/* Letterhead */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-emerald-600 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-2xl font-serif shadow-md">
              م
            </div>
            <div>
              <h1 className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight">
                BAITUL MAAL MUQADDIMAH
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lembaga Amil Zakat & Pengelolaan Sumber Daya Sosial Berkelanjutan
              </p>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                Terakreditasi BAZNAS RI • Terintegrasi Smart Contract Explorer v3
              </div>
            </div>
          </div>

          <div className="text-right text-xs space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200">
              LAPORAN DISTRIBUSI RESMI
            </div>
            <div className="text-slate-500 text-[11px]">Periode: {selectedMonth}</div>
            <div className="text-emerald-600 font-mono text-[10px]">Doc-ID: ZKT-REP-2026-11</div>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Dana Tersalurkan</span>
            <div className="text-lg font-black text-emerald-600 font-mono mt-1">
              Rp {totalDisbursed.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Penerima Manfaat</span>
            <div className="text-lg font-black text-slate-800 dark:text-white font-mono mt-1">
              {totalBeneficiaries} Mustahik
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Audit Smart Contract</span>
            <div className="text-lg font-black text-blue-600 font-mono mt-1">
              100% On-Chain
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Tingkat Kemandirian UMKM</span>
            <div className="text-lg font-black text-teal-600 font-mono mt-1">
              87.4%
            </div>
          </div>
        </div>

        {/* Distribution Details Breakdown */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            Rincian Aliran Dana & Mutasi Kas ZISWAF
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="py-2.5 px-3 border-b">No</th>
                  <th className="py-2.5 px-3 border-b">Muzakki (Donatur)</th>
                  <th className="py-2.5 px-3 border-b">Mustahik / Pos Bantuan</th>
                  <th className="py-2.5 px-3 border-b">Asnaf</th>
                  <th className="py-2.5 px-3 border-b text-right">Nominal (IDR)</th>
                  <th className="py-2.5 px-3 border-b">Tx Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {transactions.map((t, idx) => (
                  <tr key={t.id}>
                    <td className="py-2 px-3 text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200">{t.donorName}</td>
                    <td className="py-2 px-3 text-slate-700 dark:text-slate-300">{t.recipientName} - {t.distributionLocation}</td>
                    <td className="py-2 px-3 font-medium text-emerald-700 dark:text-emerald-400">{t.asnafCategory}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                      Rp {t.amountIdr.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2 px-3 font-mono text-[10px] text-slate-400 truncate max-w-[120px]">
                      {t.hash}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signatures & Verification Seal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800 items-end">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 inline-block">
              <QrCode className="w-14 h-14 text-emerald-600" />
            </div>
            <div className="text-[10px] text-slate-500">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">Verifikasi Validitas:</span>
              Pindai QR untuk memeriksa validitas dokumen ini langsung di blockchain ledger terdesentralisasi.
            </div>
          </div>

          <div className="text-center text-xs space-y-1">
            <div className="text-slate-400 text-[10px]">DEWAN PENGAWAS SYARIAH</div>
            <div className="h-12 flex items-center justify-center font-serif italic text-emerald-700 dark:text-emerald-400 font-bold">
              K.H. Dr. Ahmad Fadhil, M.A.
            </div>
            <div className="font-semibold text-slate-700 dark:text-slate-300">Ketua DPS DSN-MUI</div>
          </div>

          <div className="text-center text-xs space-y-1">
            <div className="text-slate-400 text-[10px]">DIREKTUR EKSEKUTIF AMIL</div>
            <div className="h-12 flex items-center justify-center font-serif italic text-teal-700 dark:text-teal-400 font-bold">
              Ir. H. Muhammad Arifin
            </div>
            <div className="font-semibold text-slate-700 dark:text-slate-300">Direktur Baitul Maal</div>
          </div>
        </div>
      </div>
    </div>
  );
};
