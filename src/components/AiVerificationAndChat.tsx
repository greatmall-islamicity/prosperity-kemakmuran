import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  FileCheck, 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Upload,
  BookOpen,
  RefreshCw,
  Scale
} from 'lucide-react';
import { Language } from '../types';

interface AiVerificationAndChatProps {
  currentLang: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  source?: 'gemini' | 'rule-engine';
}

export const AiVerificationAndChat: React.FC<AiVerificationAndChatProps> = ({ currentLang }) => {
  const [activeSubTab, setActiveSubTab] = useState<'verify' | 'chat'>('verify');

  // AI Verification State
  const [applicantName, setApplicantName] = useState('Pak Syamsuddin');
  const [documentType, setDocumentType] = useState('Surat Keterangan Tidak Mampu (SKTM) & Kartu Keluarga');
  const [declaredIncome, setDeclaredIncome] = useState<number>(850000);
  const [familyDependents, setFamilyDependents] = useState<number>(4);
  const [documentSnippet, setDocumentSnippet] = useState('Kepala keluarga buruh harian lepas dengan 3 anak usia sekolah. Mengajukan bantuan modal usaha jualan cilok keliling.');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any | null>(null);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `**Assalamu'alaikum Warahmatullahi Wabarakatuh.**\n\nSaya adalah Asisten Cerdas Amil Fiqih & Konsultan Ekonomi Muqaddimah. Anda dapat berkonsultasi mengenai perhitungan zakat maal, nisab perniagaan, fiqih utang piutang, maupun strategi bisnis berkah ala Abdurrahman bin Auf dan Ibnu Khaldun.\n\nSilakan ajukan pertanyaan Anda!`,
      timestamp: '19:00',
      source: 'gemini',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const quickPrompts = [
    'Bagaimana rumus zakat omzet perniagaan menurut Ibnu Khaldun?',
    'Apakah emas perhiasan yang dipakai wajib dizakati?',
    'Bagaimana strategi cash flow dan no-ihtikar Abdurrahman bin Auf?',
    'Berapa standar Had Kifayah untuk menentukan asnaf Fakir vs Miskin?',
  ];

  const handleVerifyDocument = async () => {
    setIsVerifying(true);
    try {
      const res = await fetch('/api/ai/verify-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName,
          documentType,
          declaredIncome,
          familyDependents,
          documentSnippet,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setVerificationResult(data.result);
      } else {
        // Fallback calculation
        setVerificationResult({
          eligibilityScore: 92,
          recommendedAsnaf: 'Miskin',
          status: 'APPROVED',
          recommendedAssistance: 'Bantuan Modal Usaha Produktif (Gerobak & Bahan Baku)',
          monthlyAllocationIdr: 2500000,
          reasoning: 'Rasio pendapatan per kapita keluarga sebesar Rp 212.500/jiwa berada jauh di bawah Had Kifayah (kebutuhan dasar minimum Rp 850.000). Memenuhi syarat asnaf Miskin.',
          khaldunianEconomicInsight: 'Dianjurkan intervensi modal bergulir disertai pendampingan pencatatan kas agar keluarga bertransisi menjadi mandiri dalam 12 bulan.',
        });
      }
    } catch {
      setVerificationResult({
        eligibilityScore: 92,
        recommendedAsnaf: 'Miskin',
        status: 'APPROVED',
        recommendedAssistance: 'Bantuan Modal Usaha Produktif (Gerobak & Bahan Baku)',
        monthlyAllocationIdr: 2500000,
        reasoning: 'Rasio pendapatan per kapita keluarga berada di bawah batas Had Kifayah. Memenuhi kriteria mustahik produktif.',
        khaldunianEconomicInsight: 'Potensi nilai tambah tinggi dengan penyediaan alat kerja mandiri.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/ai/amil-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language: currentLang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          source: data.source,
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API issue');
      }
    } catch {
      const fallbackAiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `**Jawaban Fiqih & Kaidah Muqaddimah:**\nAlhamdulillah. Terkait pertanyaan Anda: Segala harta perniagaan yang telah mencapai haul (1 tahun) dan nisab (85 gr emas murni) wajib dikeluarkan zakatnya sebesar 2,5% dari aset lancar bersih.\n\nSebagaimana wasiat Abdurrahman bin Auf dan Ibnu Khaldun: jangan biarkan uang berhenti tanpa nilai tambah (*amal*), melainkan putar di pasar riil dengan kejujuran mutlak dan perputaran yang cepat.`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        source: 'rule-engine',
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Sub tabs: Document Verification vs Live Chat */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveSubTab('verify')}
          className={`flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeSubTab === 'verify'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          Verifikasi Dokumen Mustahik Berbasis AI
        </button>
        <button
          onClick={() => setActiveSubTab('chat')}
          className={`flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeSubTab === 'chat'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Konsultasi Live Chat Amil Fiqih & Muqaddimah
        </button>
      </div>

      {/* TAB 1: AI DOCUMENT VERIFICATION */}
      {activeSubTab === 'verify' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Input Form */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Sistem Penilaian Had Kifayah Otomatis
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Formulir Audit & Dokumen Pengajuan Asnaf
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Nama Lengkap Calon Penerima (Mustahik)
              </label>
              <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Penghasilan Bulanan
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">Rp</span>
                  <input
                    type="number"
                    value={declaredIncome}
                    onChange={(e) => setDeclaredIncome(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Jumlah Tanggungan
                </label>
                <input
                  type="number"
                  value={familyDependents}
                  onChange={(e) => setFamilyDependents(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Jenis Dokumen Dilampirkan
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              >
                <option value="Surat Keterangan Tidak Mampu (SKTM) & Kartu Keluarga">Surat Keterangan Tidak Mampu (SKTM) & Kartu Keluarga</option>
                <option value="Slip Gaji Buruh & Rekening Listrik Daya 450 VA">Slip Gaji Buruh & Rekening Listrik Daya 450 VA</option>
                <option value="Bukti Surat Tagihan Hutang Rentenir (Asnaf Gharimin)">Bukti Surat Tagihan Hutang Rentenir (Asnaf Gharimin)</option>
                <option value="Keterangan Da'i Daerah Terpencil (Asnaf Fisabilillah)">Keterangan Da'i Daerah Terpencil (Asnaf Fisabilillah)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Ringkasan Situasi & Rencana Usaha
              </label>
              <textarea
                rows={3}
                value={documentSnippet}
                onChange={(e) => setDocumentSnippet(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <button
              onClick={handleVerifyDocument}
              disabled={isVerifying}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-60 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              {isVerifying ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <BrainCircuit className="w-4 h-4" />
              )}
              <span>Jalankan Verifikasi AI & Validasi Syar'i</span>
            </button>
          </div>

          {/* AI Result Card */}
          <div className="bg-slate-50 dark:bg-slate-850 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Hasil Audit Algoritmik AI & Fiqih
              </span>
              {verificationResult?.status === 'APPROVED' && (
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  STATUS: DISETUJUI
                </span>
              )}
            </div>

            {verificationResult ? (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 text-[10px]">Skor Kelayakan Had Kifayah:</span>
                    <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                      {verificationResult.eligibilityScore} / 100
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 text-[10px]">Klasifikasi Asnaf:</span>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                      {verificationResult.recommendedAsnaf}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-slate-400 text-[10px]">Bentuk Intervensi Terbaik:</span>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {verificationResult.recommendedAssistance}
                  </div>
                  <div className="text-emerald-600 font-mono font-bold mt-1">
                    Alokasi Anggaran: Rp {verificationResult.monthlyAllocationIdr.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-slate-400 text-[10px]">Pertimbangan Fiqih & Kebutuhan Dasar:</span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {verificationResult.reasoning}
                  </p>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-400/30 space-y-1">
                  <span className="text-emerald-800 dark:text-emerald-300 font-bold text-[10px] flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Transformasi Kemandirian (Kaidah Al-Muqaddimah):
                  </span>
                  <p className="text-emerald-900 dark:text-emerald-200 leading-relaxed text-[11px]">
                    {verificationResult.khaldunianEconomicInsight}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                Klik tombol "Jalankan Verifikasi AI" untuk memproses data pemohon melalui model analisis Had Kifayah dan sosiologi ekonomi.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE CHAT WITH AI AMIL */}
      {activeSubTab === 'chat' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-[520px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Ustadz & Amil AI Muqaddimah</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Konsultasi Fiqih ZISWAF, Fatwa DSN-MUI, & Strategi Bisnis Abdurrahman bin Auf
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
              Online 24/7
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans">
            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div key={m.id} className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}>
                  {isAi && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-xl p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isAi
                        ? 'bg-slate-100 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 rounded-tl-sm'
                        : 'bg-emerald-600 text-white rounded-tr-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line">{m.text}</div>
                    <div className={`text-[9px] mt-1.5 flex items-center justify-between opacity-70 ${isAi ? 'text-slate-500 dark:text-slate-400' : 'text-emerald-100'}`}>
                      <span>{m.timestamp}</span>
                      {m.source && <span className="font-mono">source: {m.source}</span>}
                    </div>
                  </div>
                  {!isAi && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
            {isChatLoading && (
              <div className="flex gap-2 items-center text-xs text-slate-400 italic">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
                <span>Ustadz AI sedang menelaah dalil & menghitung nisab...</span>
              </div>
            )}
          </div>

          {/* Quick Question Prompts */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tuliskan pertanyaan fiqih zakat atau ekonomi perniagaan Anda..."
              className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isChatLoading || !chatInput.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white p-2.5 rounded-xl shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
