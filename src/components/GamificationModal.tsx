import React from 'react';
import { 
  Award, 
  Sparkles, 
  Flame, 
  Coins, 
  CheckCircle2, 
  ShieldCheck, 
  Star,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GamificationState } from '../types';

interface GamificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  gamification: GamificationState;
  onCelebrate: () => void;
}

export const GamificationModal: React.FC<GamificationModalProps> = ({
  isOpen,
  onClose,
  gamification,
  onCelebrate,
}) => {
  if (!isOpen) return null;

  const handleConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
    });
    onCelebrate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-slate-200 dark:border-slate-700 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Peringkat Kedermawanan (As-Sakhaw)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Gerakan Sadar Kaya • Motivasi Istiqomah ZISWAF
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>

        {/* Current Level Hero */}
        <div className="bg-gradient-to-br from-amber-500/15 via-emerald-500/15 to-teal-500/15 p-5 rounded-2xl border border-amber-500/30 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Peringkat Aktif</span>
          </div>

          <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {gamification.levelTitle}
          </h4>

          <div className="flex items-center justify-center gap-4 text-xs font-mono pt-1">
            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
              <Coins className="w-4 h-4" />
              <span>{gamification.points} Kedermawanan Poin</span>
            </div>
            <div className="flex items-center gap-1 text-rose-500 font-bold">
              <Flame className="w-4 h-4 fill-rose-500" />
              <span>{gamification.streakMonths} Bulan Rutin</span>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Lencana Pencapaian Khaldun & Sahabat
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {gamification.badges.map((b) => (
              <div
                key={b.id}
                className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{b.icon}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">{b.title}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{b.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Celebrate button */}
        <button
          onClick={handleConfetti}
          className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Rayakan Istiqomah Zakat (Confetti!)</span>
        </button>
      </div>
    </div>
  );
};
