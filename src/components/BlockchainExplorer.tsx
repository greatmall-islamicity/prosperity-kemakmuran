import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  QrCode, 
  ShieldCheck, 
  Cpu, 
  FileCheck, 
  Copy, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BlockchainTransaction, AsnafType } from '../types';

interface BlockchainExplorerProps {
  transactions: BlockchainTransaction[];
  onOpenDonateModal: () => void;
}

export const BlockchainExplorer: React.FC<BlockchainExplorerProps> = ({
  transactions,
  onOpenDonateModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsnaf, setSelectedAsnaf] = useState<string>('ALL');
  const [selectedTx, setSelectedTx] = useState<BlockchainTransaction | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const asnafList: AsnafType[] = [
    'Fakir',
    'Miskin',
    'Amil',
    'Muallaf',
    'Riqab',
    'Gharimin',
    'Fisabilillah',
    'Ibnu Sabil',
  ];

  const filteredTx = transactions.filter((tx) => {
    const matchSearch =
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.akad.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.distributionLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchAsnaf = selectedAsnaf === 'ALL' || tx.asnafCategory === selectedAsnaf;
    return matchSearch && matchAsnaf;
  });

  const totalFundsTracked = transactions.reduce((acc, curr) => acc + curr.amountIdr, 0);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Top Ledger Metrics Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Total Dana On-Chain</span>
            <Layers className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
            Rp {totalFundsTracked.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            100% Terverifikasi Smart Contract
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Tinggi Blok Terkini</span>
            <Cpu className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
            #489,210
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 font-mono">
            Konsensus: Proof of Sadaqah (PoS)
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Biaya Gas (Gas Fee)</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
            Rp 0,- (Gratis)
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Didukung baitul maal node validator
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Node Validator Aktif</span>
            <ShieldCheck className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
            24 Lembaga Amil
          </div>
          <div className="text-[11px] text-teal-600 dark:text-teal-400 mt-1">
            Terakreditasi BAZNAS & DSN-MUI
          </div>
        </div>
      </div>

      {/* Main Ledger Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        {/* Controls: Search & Asnaf Filter */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-slate-50/50 dark:bg-slate-850/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Tx Hash, Muzakki, Mustahik, Akad, atau Kota..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Asnaf:
            </span>
            <button
              onClick={() => setSelectedAsnaf('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedAsnaf === 'ALL'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
              }`}
            >
              Semua (8 Asnaf)
            </button>
            {asnafList.map((asnaf) => (
              <button
                key={asnaf}
                onClick={() => setSelectedAsnaf(asnaf)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedAsnaf === asnaf
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                }`}
              >
                {asnaf}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Tx Hash & Blok</th>
                <th className="py-3 px-4">Waktu</th>
                <th className="py-3 px-4">Dari (Muzakki)</th>
                <th className="py-3 px-4">Kepada (Mustahik)</th>
                <th className="py-3 px-4">Akad & Asnaf</th>
                <th className="py-3 px-4 text-right">Nominal (IDR)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-sans">
              {filteredTx.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400">
                    Tidak ditemukan transaksi blockchain yang cocok dengan kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredTx.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-750 transition-colors">
                    {/* Hash & Block */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold truncate max-w-[120px] sm:max-w-[160px]">
                          {tx.hash}
                        </span>
                        <button
                          onClick={() => copyToClipboard(tx.hash, tx.id)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          title="Salin Hash"
                        >
                          {copiedHash === tx.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Blok #{tx.blockNumber} • {tx.verifiedNodes} node
                      </div>
                    </td>

                    {/* Timestamp */}
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {tx.timestamp}
                    </td>

                    {/* Donor */}
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">
                      <div>{tx.donorName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{tx.from}</div>
                    </td>

                    {/* Recipient */}
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">
                      <div>{tx.recipientName}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{tx.distributionLocation}</div>
                    </td>

                    {/* Akad & Asnaf */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800 dark:text-slate-200">{tx.akad}</div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                        Asnaf: {tx.asnafCategory}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                      Rp {tx.amountIdr.toLocaleString('id-ID')}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {tx.status}
                      </span>
                    </td>

                    {/* Audit action */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedTx(tx)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1 mx-auto transition-colors"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Detail Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Audit Bukti Aliran Dana Smart Contract
                </h4>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-1 font-mono">
                <div className="text-slate-400 text-[10px]">TRANSACTION HASH:</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold break-all">
                  {selectedTx.hash}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="text-slate-400 text-[10px]">BLOK TERSERTIFIKASI:</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">#{selectedTx.blockNumber}</div>
                  <div className="text-[10px] text-slate-500">{selectedTx.verifiedNodes} Consensus Nodes</div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="text-slate-400 text-[10px]">NOMINAL DANA AMANAH:</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    Rp {selectedTx.amountIdr.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[10px] text-slate-500">Gas: 0.00 IDR (Subsidized)</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Muzakki (Donatur):</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTx.donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mustahik Penerima:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTx.recipientName} ({selectedTx.asnafCategory})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Akad Zakat:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTx.akad}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lokasi Penyaluran:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTx.distributionLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Smart Contract Address:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{selectedTx.smartContract}</span>
                </div>
              </div>

              {/* QR Verification Payload */}
              <div className="border border-dashed border-emerald-500/40 rounded-xl p-3 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5" />
                    Kode Verifikasi Lapangan (QR Payload)
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 dark:text-slate-400 break-all mt-0.5">
                    {selectedTx.qrPayload}
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-600 text-white font-semibold px-2 py-1 rounded shrink-0">
                  Valid On-Chain
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-medium text-xs hover:bg-slate-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
