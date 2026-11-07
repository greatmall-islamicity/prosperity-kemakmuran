import React from 'react';
import { 
  Bell, 
  Clock, 
  Coins, 
  Package, 
  BrainCircuit, 
  CheckCircle2, 
  Sparkles,
  Heart
} from 'lucide-react';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'zakat_reminder' | 'prayer_time' | 'wms_alert' | 'smart_contract';
  read: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/40 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-sm w-full p-5 space-y-4 border border-slate-200 dark:border-slate-700 shadow-2xl animate-in slide-in-from-top-4 duration-200 mt-12 sm:mt-14">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-white">
            <Bell className="w-4 h-4 text-emerald-600" />
            <span>Pusat Notifikasi & Pengingat Ibadah</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>{notifications.filter((n) => !n.read).length} notifikasi belum dibaca</span>
          <button onClick={onMarkAllAsRead} className="text-emerald-600 hover:underline">
            Tandai semua dibaca
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border text-xs space-y-1 transition-colors ${
                item.read
                  ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-850 opacity-75'
                  : 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  {item.type === 'zakat_reminder' && <Coins className="w-3.5 h-3.5 text-amber-500" />}
                  {item.type === 'prayer_time' && <Clock className="w-3.5 h-3.5 text-emerald-500" />}
                  {item.type === 'wms_alert' && <Package className="w-3.5 h-3.5 text-rose-500" />}
                  {item.type === 'smart_contract' && <Sparkles className="w-3.5 h-3.5 text-blue-500" />}
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                {item.message}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
