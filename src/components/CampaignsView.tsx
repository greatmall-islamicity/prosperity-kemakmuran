import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Search, 
  Filter, 
  Clock, 
  Users, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { DonationCampaign, AsnafType } from '../types';

interface CampaignsViewProps {
  campaigns: DonationCampaign[];
  onSelectCampaignForDonation: (campaign: DonationCampaign) => void;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({
  campaigns,
  onSelectCampaignForDonation,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filtered = campaigns.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <HeartHandshake className="w-4 h-4" />
            Program Penyaluran Berdaya
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Program Bantuan Modal & Logistik Umat
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Setiap donasi disalurkan menggunakan smart contract dengan audit trail terbuka untuk memastikan akuntabilitas 100%.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari program atau lokasi..."
              className="pl-8 pr-3 py-1.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
          >
            <option value="ALL">Semua Kategori</option>
            <option value="Ekonomi Produktif">Ekonomi Produktif</option>
            <option value="Pangan & Beras">Pangan & Beras</option>
            <option value="Gharimin (Bebas Riba)">Gharimin (Bebas Riba)</option>
            <option value="Beasiswa">Beasiswa</option>
          </select>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => {
          const progressPercent = Math.min(100, Math.round((item.collectedAmountIdr / item.targetAmountIdr) * 100));

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur-xs">
                      {item.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-amber-300 backdrop-blur-xs border border-amber-400/40">
                      Asnaf: {item.asnafTarget}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        Rp {item.collectedAmountIdr.toLocaleString('id-ID')}
                      </span>
                      <span className="text-slate-400">
                        Target: Rp {item.targetAmountIdr.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {item.beneficiariesCount} Mustahik Binaan
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.daysLeft} hari lagi
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectCampaignForDonation(item)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Dukung Program Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
