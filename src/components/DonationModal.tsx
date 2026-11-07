import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  QrCode, 
  CreditCard, 
  Wallet, 
  Coins, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AsnafType, BlockchainTransaction } from '../types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonationSuccess: (tx: BlockchainTransaction) => void;
  prefilledAmount?: number;
  prefilledAkad?: string;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  onDonationSuccess,
  prefilledAmount = 1000000,
  prefilledAkad = 'Zakat Maal - Modal Usaha Mustahik',
}) => {
  const [amount, setAmount] = useState<number>(prefilledAmount);
  const [donorName, setDonorName] = useState<string>('Hamba Allah (Muzakki)');
  const [akad, setAkad] = useState<string>(prefilledAkad);
  const [asnafTarget, setAsnafTarget] = useState<AsnafType>('Miskin');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'ewallet' | 'va' | 'crypto'>('qris');
  const [selectedWallet, setSelectedWallet] = useState<'gopay' | 'ovo' | 'dana' | 'shopeepay'>('gopay');
  const [selectedBank, setSelectedBank] = useState<'bsi' | 'bca_syariah' | 'muamalat'>('bsi');

  const [step, setStep] = useState<'input' | 'payment' | 'success'>('input');
  const [countdownSeconds, setCountdownSeconds] = useState<number>(600); // 10 minutes QRIS timer
  const [generatedTx, setGeneratedTx] = useState<BlockchainTransaction | null>(null);

  useEffect(() => {
    if (prefilledAmount) {
      setAmount(prefilledAmount);
    }
    if (prefilledAkad) {
      setAkad(prefilledAkad);
    }
  }, [prefilledAmount, prefilledAkad]);

  useEffect(() => {
    let timer: any;
    if (step === 'payment' && countdownSeconds > 0) {
      timer = setInterval(() => setCountdownSeconds((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdownSeconds]);

  if (!isOpen) return null;

  const handleProceedToPayment = () => {
    setStep('payment');
  };

  const handleConfirmPayment = () => {
    const randomHex = Math.random().toString(16).substring(2, 10);
    const newTx: BlockchainTransaction = {
      id: `tx-${Date.now()}`,
      hash: `0x${randomHex}${Date.now().toString(16)}8f44`,
      blockNumber: 489211 + Math.floor(Math.random() * 10),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      from: `0x${randomHex.substring(0, 4)}...${randomHex.substring(4, 8)} (${donorName})`,
      donorName,
      to: '0x889B...4410 (Baitul Maal Smart Contract)',
      recipientName: `Mustahik Asnaf ${asnafTarget} Binaan`,
      asnafCategory: asnafTarget,
      amountIdr: amount,
      akad,
      smartContract: '0xZakatCoreContract_v3',
      gasFee: '0.00 IDR (Subsidized)',
      status: 'CONFIRMED',
      verifiedNodes: 16,
      qrPayload: `ZKT-LIVE-TX-${Date.now()}-IDR${amount}-${asnafTarget}`,
      distributionLocation: 'DKI Jakarta & Jawa Barat',
    };

    setGeneratedTx(newTx);
    onDonationSuccess(newTx);
    setStep('success');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const shareViaWhatsApp = () => {
    if (!generatedTx) return;
    const msg = encodeURIComponent(
      `Alhamdulillah, telah ditunaikan amanah ${generatedTx.akad} sebesar Rp ${generatedTx.amountIdr.toLocaleString('id-ID')} melalui Muqaddimah Wealth & Zakat Hub.\n\nHash Smart Contract: ${generatedTx.hash}\nVerifikasi Blockchain Publik: 100% Transparan untuk Asnaf ${generatedTx.asnafCategory}.\n\nSemoga menjadi amal jariyah yang melipatgandakan keberkahan rezeki.`
    );
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {step === 'input' && 'Tunaikan Zakat / Infaq Terpercaya'}
                {step === 'payment' && 'Instruksi Pembayaran Digital'}
                {step === 'success' && 'Akad Sah & Tercatat di Blockchain!'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Transparansi Real-Time Berbasis Smart Contract
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* STEP 1: INPUT DETAILS */}
        {step === 'input' && (
          <div className="space-y-4 py-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nominal Pembayaran (IDR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400">Rp</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[500000, 1000000, 2500000, 5000000].map((quick) => (
                  <button
                    key={quick}
                    onClick={() => setAmount(quick)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px] hover:bg-emerald-500 hover:text-white transition-colors"
                  >
                    Rp {(quick / 1000).toLocaleString('id-ID')}k
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nama Muzakki / Donatur
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Hamba Allah / Nama Perusahaan"
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Akad Penyaluran
                </label>
                <select
                  value={akad}
                  onChange={(e) => setAkad(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                >
                  <option value="Zakat Maal - Modal Usaha Mustahik">Zakat Maal (Perniagaan/Harta)</option>
                  <option value="Zakat Profesi - Tunjangan Da'i">Zakat Profesi (Penghasilan)</option>
                  <option value="Infaq Berkah - Lumbung Pangan">Infaq Berkah (Pangan)</option>
                  <option value="Wakaf Produktif - Alat Kerja">Wakaf Produktif (Alat Usaha)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Asnaf
                </label>
                <select
                  value={asnafTarget}
                  onChange={(e) => setAsnafTarget(e.target.value as AsnafType)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                >
                  <option value="Miskin">Miskin (Modal Usaha)</option>
                  <option value="Fakir">Fakir (Bantuan Pangan)</option>
                  <option value="Gharimin">Gharimin (Bebas Riba)</option>
                  <option value="Fisabilillah">Fisabilillah (Da'i & Santri)</option>
                  <option value="Ibnu Sabil">Ibnu Sabil (Musafir Dhuafa)</option>
                </select>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Metode Pembayaran Digital
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'qris', label: 'QRIS Dinamis', icon: QrCode },
                  { id: 'ewallet', label: 'E-Wallet', icon: Wallet },
                  { id: 'va', label: 'VA Syariah', icon: CreditCard },
                  { id: 'crypto', label: 'Web3 Crypto', icon: Coins },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === item.id
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm mt-2"
            >
              <span>Lanjut ke Pembayaran Digital</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: PAYMENT INSTRUCTION */}
        {step === 'payment' && (
          <div className="space-y-4 py-4 text-xs text-center">
            <div className="flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400 font-mono text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>Selesaikan dalam: {formatTimer(countdownSeconds)}</span>
            </div>

            {/* QRIS Screen */}
            {paymentMethod === 'qris' && (
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 inline-block shadow-md">
                  <div className="w-48 h-48 bg-slate-950 p-2.5 rounded-xl flex flex-col items-center justify-between text-white font-mono text-[9px]">
                    <div className="flex justify-between w-full">
                      <div className="w-12 h-12 border-4 border-white bg-slate-950 flex items-center justify-center">
                        <div className="w-5 h-5 bg-white" />
                      </div>
                      <div className="w-12 h-12 border-4 border-white bg-slate-950 flex items-center justify-center">
                        <div className="w-5 h-5 bg-white" />
                      </div>
                    </div>
                    <div className="text-center font-bold text-emerald-400 tracking-wider">
                      QRIS NASIONAL STANDAR
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="w-12 h-12 border-4 border-white bg-slate-950 flex items-center justify-center">
                        <div className="w-5 h-5 bg-white" />
                      </div>
                      <div className="text-[8px] text-slate-400 text-right self-end">
                        NMID: ID1029481920
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Scan menggunakan aplikasi Mobile Banking (BSI, BCA, Mandiri) atau E-Wallet (GoPay, OVO, DANA, ShopeePay)
                </div>
              </div>
            )}

            {/* E-Wallet Screen */}
            {paymentMethod === 'ewallet' && (
              <div className="space-y-3 text-left">
                <div className="grid grid-cols-2 gap-2">
                  {(['gopay', 'ovo', 'dana', 'shopeepay'] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWallet(w)}
                      className={`p-3 rounded-xl border text-center uppercase font-bold text-xs ${
                        selectedWallet === w
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                  <div className="text-slate-400 text-[10px]">Nomor Pembayaran Otomatis:</div>
                  <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                    0812-9840-7712 (Zakat Hub)
                  </div>
                </div>
              </div>
            )}

            {/* Virtual Account Screen */}
            {paymentMethod === 'va' && (
              <div className="space-y-3 text-left">
                <div className="grid grid-cols-3 gap-2">
                  {(['bsi', 'bca_syariah', 'muamalat'] as const).map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBank(b)}
                      className={`p-2 rounded-xl border text-center uppercase font-bold text-[10px] ${
                        selectedBank === b
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600'
                      }`}
                    >
                      {b.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-center font-mono">
                  <div className="text-slate-400 text-[10px]">NOMOR VIRTUAL ACCOUNT:</div>
                  <div className="font-bold text-base text-emerald-600 dark:text-emerald-400">
                    9928 0812 7748 1029
                  </div>
                </div>
              </div>
            )}

            {/* Crypto Screen */}
            {paymentMethod === 'crypto' && (
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-left font-mono space-y-1">
                <div className="text-slate-400 text-[10px]">SMART CONTRACT DEPOSIT (USDT / IDR-Z):</div>
                <div className="text-emerald-600 font-bold break-all text-[11px]">
                  0x77b9A46b1C51190BcA930e1C526F7990449C7721
                </div>
              </div>
            )}

            {/* Total Summary */}
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl flex items-center justify-between text-xs">
              <span className="text-emerald-800 dark:text-emerald-300 font-medium">Total Dana Amanah:</span>
              <span className="font-mono font-black text-base text-emerald-700 dark:text-emerald-400">
                Rp {amount.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep('input')}
                className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium"
              >
                Kembali
              </button>
              <button
                onClick={handleConfirmPayment}
                className="w-2/3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulasi Konfirmasi Bayar</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS & BLOCKCHAIN RECEIPT */}
        {step === 'success' && generatedTx && (
          <div className="space-y-4 py-4 text-xs text-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                Zakat Berhasil Dicatat On-Chain!
              </h4>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Alhamdulillah, dana Anda telah masuk ke smart contract terdesentralisasi dan dijamin langsung diterima asnaf tanpa perantara liar.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl text-left space-y-2 border border-slate-200 dark:border-slate-700 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Tx Hash:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold truncate max-w-[180px]">
                  {generatedTx.hash}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Blok:</span>
                <span className="text-slate-800 dark:text-slate-200">#{generatedTx.blockNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Nominal:</span>
                <span className="text-slate-900 dark:text-white font-bold">
                  Rp {generatedTx.amountIdr.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Akad:</span>
                <span className="text-slate-800 dark:text-slate-200">{generatedTx.akad}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Asnaf:</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{generatedTx.asnafCategory}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={shareViaWhatsApp}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan ke WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-medium"
              >
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
