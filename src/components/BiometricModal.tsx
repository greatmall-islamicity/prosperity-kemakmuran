import React, { useState } from 'react';
import { 
  Fingerprint, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Role } from '../types';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: Role;
  isBiometricEnrolled: boolean;
  onEnrollBiometric: () => void;
}

export const BiometricModal: React.FC<BiometricModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  isBiometricEnrolled,
  onEnrollBiometric,
}) => {
  const [scanning, setScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [biometricType, setBiometricType] = useState<'fingerprint' | 'faceid'>('fingerprint');

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanning(true);
    setScanSuccess(false);

    setTimeout(() => {
      setScanning(false);
      setScanSuccess(true);
      onEnrollBiometric();
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-sm w-full p-6 text-center space-y-5 border border-slate-200 dark:border-slate-700 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Otentikasi Biometrik WebAuthn FIDO2</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>

        <div className="py-2">
          {/* Sensor Graphic */}
          <div className="relative inline-block">
            <div
              className={`w-28 h-28 rounded-full border-4 flex items-center justify-center mx-auto transition-all ${
                scanSuccess
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-600'
                  : scanning
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-950 animate-pulse text-teal-600'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-400'
              }`}
            >
              {scanSuccess ? (
                <CheckCircle2 className="w-14 h-14 text-emerald-600" />
              ) : (
                <Fingerprint className={`w-14 h-14 ${scanning ? 'animate-bounce' : ''}`} />
              )}
            </div>

            {scanning && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-400 rounded-full animate-ping opacity-75" />
            )}
          </div>

          <div className="mt-4 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {scanSuccess
                ? 'Biometrik Terverifikasi Enkripsi AES-256!'
                : scanning
                ? 'Memindai Sensor Sidik Jari / Kredensial Perangkat...'
                : 'Pindai Sidik Jari atau Kunci Perangkat'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Peran Aktif: <strong className="capitalize">{currentRole}</strong> • Melindungi aset zakat dan integritas smart contract.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSimulateScan}
            disabled={scanning || scanSuccess}
            className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isBiometricEnrolled ? 'Otentikasi Sekarang' : 'Daftarkan Sidik Jari'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
