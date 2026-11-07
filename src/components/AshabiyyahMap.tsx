import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Share2, 
  Zap, 
  RotateCcw, 
  Compass, 
  Coins, 
  Sparkles, 
  Info,
  Maximize2,
  Filter,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { Language } from '../types';

export interface AshabiyyahD3Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  region: string;
  ashabiyyahScore: number; // 0 - 100
  category: 'Pangan & Agrikultur' | 'Finansial & Muzakki' | 'Maritim & Nelayan' | 'Pengolahan & Herbal' | 'Pusat Keahlian & Amil';
  monthlyVolumeIdr: number;
  communalMembers: number; // KK
  primaryTradition: string;
  khaldunConcept: string;
  radius: number;
  color: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface AshabiyyahD3Link extends d3.SimulationLinkDatum<AshabiyyahD3Node> {
  id: string;
  source: string | AshabiyyahD3Node;
  target: string | AshabiyyahD3Node;
  flowType: 'zakat_produktif' | 'syirkah_modal' | 'pasokan_komoditas';
  amountIdr: number;
  akad: string;
  trustIndex: number; // %
}

interface AshabiyyahMapProps {
  currentLang?: Language;
  onNavigateToCalculator?: () => void;
  onNavigateToInvestment?: () => void;
}

export const AshabiyyahMap: React.FC<AshabiyyahMapProps> = ({
  currentLang = 'id',
  onNavigateToCalculator,
  onNavigateToInvestment,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedNode, setSelectedNode] = useState<AshabiyyahD3Node | null>(null);
  const [selectedFlowType, setSelectedFlowType] = useState<string>('ALL');
  const [isCrossIslandSynergyActive, setIsCrossIslandSynergyActive] = useState<boolean>(true);
  const [simulationRunning, setSimulationRunning] = useState<boolean>(true);

  // Initial Regional Communities Dataset for D3
  const initialNodes: AshabiyyahD3Node[] = [
    {
      id: 'jakarta-hub',
      name: 'Konsorsium Muzakki Sadar Kaya (DKI Jakarta)',
      region: 'DKI Jakarta',
      ashabiyyahScore: 86,
      category: 'Finansial & Muzakki',
      monthlyVolumeIdr: 450000000,
      communalMembers: 65,
      primaryTradition: 'Baitul Maal Korporasi & Filantropi Terstruktur',
      khaldunConcept: 'Pusat akumulasi modal yang bertindak sebagai pemutar likuiditas tunai ke sentra produksi daerah.',
      radius: 34,
      color: '#f59e0b', // Amber
    },
    {
      id: 'karawang-tani',
      name: 'Lumbung Petani Padi Organik (Karawang)',
      region: 'Jawa Barat',
      ashabiyyahScore: 92,
      category: 'Pangan & Agrikultur',
      monthlyVolumeIdr: 210000000,
      communalMembers: 140,
      primaryTradition: 'Gotong Royong Perelek & Pengolahan Gabah Komunal',
      khaldunConcept: 'Penyedia kebutuhan asasi (Dharuriyyat) yang menjaga stamina pangan seluruh jejaring.',
      radius: 28,
      color: '#10b981', // Emerald
    },
    {
      id: 'muaraangke-nelayan',
      name: 'Koperasi Nelayan Pesisir & Cold Chain (Muara Angke)',
      region: 'DKI & Pantura',
      ashabiyyahScore: 89,
      category: 'Maritim & Nelayan',
      monthlyVolumeIdr: 175000000,
      communalMembers: 95,
      primaryTradition: 'Bagi Hasil Perahu Tangkap & Tabungan Paceklik',
      khaldunConcept: 'Penerapan strategi Abdurrahman bin Auf: Perputaran uang cepat tanpa penimbunan ikan busuk.',
      radius: 26,
      color: '#06b6d4', // Cyan
    },
    {
      id: 'priangan-herbal',
      name: 'Sentra Pengrajin Jamu & Rimpang (Priangan)',
      region: 'Jawa Barat',
      ashabiyyahScore: 88,
      category: 'Pengolahan & Herbal',
      monthlyVolumeIdr: 120000000,
      communalMembers: 75,
      primaryTradition: 'Budaya Sauyunan & Ekstraksi Herbal Higienis',
      khaldunConcept: 'Spesialisasi pengolahan bernilai tambah tinggi (Sana\'i) dari bahan mentah pertanian.',
      radius: 24,
      color: '#14b8a6', // Teal
    },
    {
      id: 'sukabumi-vokasi',
      name: 'Pesantren Vokasi Ahli Fiqih & Digital (Sukabumi)',
      region: 'Jawa Barat',
      ashabiyyahScore: 96,
      category: 'Pusat Keahlian & Amil',
      monthlyVolumeIdr: 135000000,
      communalMembers: 320,
      primaryTradition: 'Khidmah Santri, Audit Syariah, & Inkubasi Keahlian',
      khaldunConcept: 'Pencetak pembagian kerja (division of labor) spesifik yang menopang efisiensi ekonomi.',
      radius: 30,
      color: '#8b5cf6', // Violet
    },
    {
      id: 'minang-saudagar',
      name: 'Jejaring Saudagar Rantau & Nagari (Sumatera Barat)',
      region: 'Sumatera Barat',
      ashabiyyahScore: 94,
      category: 'Finansial & Muzakki',
      monthlyVolumeIdr: 280000000,
      communalMembers: 110,
      primaryTradition: 'Tanah Ulayat Nagari & Kongsi Perniagaan Syariah',
      khaldunConcept: 'Ketahanan modal sosial berbasis ikatan kekerabatan yang kebal dari guncangan inflasi.',
      radius: 30,
      color: '#f59e0b', // Amber
    },
    {
      id: 'jateng-sambatan',
      name: 'Paguyuban Tani Sambatan & BMT Mandiri (Klaten - DIY)',
      region: 'Jawa Tengah & DIY',
      ashabiyyahScore: 93,
      category: 'Pangan & Agrikultur',
      monthlyVolumeIdr: 195000000,
      communalMembers: 180,
      primaryTradition: 'Budaya Sambatan, Gugur Gunung, & Lumbung Paceklik',
      khaldunConcept: 'Kekuatan tolong-menolong tanpa upah uang melipatgandakan produktivitas riil masyarakat.',
      radius: 28,
      color: '#10b981', // Emerald
    },
    {
      id: 'makassar-maritim',
      name: 'Saudagar Maritim & Pelaut (Sulawesi Selatan)',
      region: 'Sulawesi Selatan',
      ashabiyyahScore: 91,
      category: 'Maritim & Nelayan',
      monthlyVolumeIdr: 240000000,
      communalMembers: 130,
      primaryTradition: 'Filosofi Siri\' Na Pacce & Ekspedisi Dagang Antarpulau',
      khaldunConcept: 'Keberanian ekspansi membuka pasar baru dan menjaga perputaran kas di jalur laut nusantara.',
      radius: 28,
      color: '#06b6d4', // Cyan
    },
  ];

  const initialLinks: AshabiyyahD3Link[] = [
    {
      id: 'l1',
      source: 'jakarta-hub',
      target: 'karawang-tani',
      flowType: 'syirkah_modal',
      amountIdr: 150000000,
      akad: 'Musyarakah Modal Tani & Benih Unggul',
      trustIndex: 98,
    },
    {
      id: 'l2',
      source: 'karawang-tani',
      target: 'jakarta-hub',
      flowType: 'pasokan_komoditas',
      amountIdr: 130000000,
      akad: 'Pasokan Beras Organik Langsung ke Konsumen',
      trustIndex: 96,
    },
    {
      id: 'l3',
      source: 'jakarta-hub',
      target: 'sukabumi-vokasi',
      flowType: 'zakat_produktif',
      amountIdr: 85000000,
      akad: 'Zakat Maal - Beasiswa Vokasi Santri Dhuafa',
      trustIndex: 99,
    },
    {
      id: 'l4',
      source: 'sukabumi-vokasi',
      target: 'priangan-herbal',
      flowType: 'zakat_produktif',
      amountIdr: 45000000,
      akad: 'Wakaf Produktif Mesin Ekstraksi & Pendampingan BPOM',
      trustIndex: 95,
    },
    {
      id: 'l5',
      source: 'priangan-herbal',
      target: 'jakarta-hub',
      flowType: 'pasokan_komoditas',
      amountIdr: 60000000,
      akad: 'Distribusi Produk Jamu Kemasan ke Ritel Muzakki',
      trustIndex: 93,
    },
    {
      id: 'l6',
      source: 'jakarta-hub',
      target: 'muaraangke-nelayan',
      flowType: 'syirkah_modal',
      amountIdr: 95000000,
      akad: 'Syirkah Modal Pengadaan Cold Storage Tenaga Surya',
      trustIndex: 94,
    },
    {
      id: 'l7',
      source: 'muaraangke-nelayan',
      target: 'jakarta-hub',
      flowType: 'pasokan_komoditas',
      amountIdr: 90000000,
      akad: 'Pasokan Ikan Segar Berkualitas Tanpa Tengkulak',
      trustIndex: 95,
    },
    {
      id: 'l8',
      source: 'minang-saudagar',
      target: 'jakarta-hub',
      flowType: 'syirkah_modal',
      amountIdr: 120000000,
      akad: 'Kongsi Dagang Rantau & Penempatan Likuiditas',
      trustIndex: 97,
    },
    {
      id: 'l9',
      source: 'jateng-sambatan',
      target: 'karawang-tani',
      flowType: 'pasokan_komoditas',
      amountIdr: 70000000,
      akad: 'Pertukaran Benih Padi Organik & Pupuk Silase',
      trustIndex: 95,
    },
    // Dynamic Cross-Island Synergy links
    ...(isCrossIslandSynergyActive ? [
      {
        id: 'l10-cross',
        source: 'makassar-maritim',
        target: 'muaraangke-nelayan',
        flowType: 'pasokan_komoditas' as const,
        amountIdr: 110000000,
        akad: 'Jalur Logistik Ikan Antarpulau Bebas Calo',
        trustIndex: 96,
      },
      {
        id: 'l11-cross',
        source: 'sukabumi-vokasi',
        target: 'jateng-sambatan',
        flowType: 'zakat_produktif' as const,
        amountIdr: 40000000,
        akad: 'Pelatihan Sertifikasi Pembukuan BMT Anti-Riba',
        trustIndex: 97,
      }
    ] : [])
  ];

  // Filter links based on user selection
  const filteredLinks = initialLinks.filter((link) => {
    if (selectedFlowType === 'ALL') return true;
    return link.flowType === selectedFlowType;
  });

  // Calculate Metrics
  const totalFlowIdr = filteredLinks.reduce((acc, curr) => acc + curr.amountIdr, 0);
  const averageAshabiyyahScore = Math.round(
    initialNodes.reduce((acc, curr) => acc + curr.ashabiyyahScore, 0) / initialNodes.length
  );
  const totalPeopleImpacted = initialNodes.reduce((acc, curr) => acc + curr.communalMembers, 0);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 900;
    const height = 560;

    // Clear previous SVG contents
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    // Container for zooming & panning
    const g = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.6, 2.5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Deep copy data for D3 mutation
    const nodes: AshabiyyahD3Node[] = initialNodes.map((d) => ({ ...d }));
    const links: AshabiyyahD3Link[] = filteredLinks.map((d) => ({ ...d }));

    // Define Arrow Marker in defs
    const defs = svg.append('defs');
    
    // Glow filter for Ashabiyyah energy
    const filter = defs.append('filter')
      .attr('id', 'ashabiyyah-glow')
      .attr('x', '-30%')
      .attr('y', '-30%')
      .attr('width', '160%')
      .attr('height', '160%');
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Arrow markers
    ['zakat_produktif', 'syirkah_modal', 'pasokan_komoditas'].forEach((type) => {
      defs.append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 28)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', type === 'zakat_produktif' ? '#8b5cf6' : type === 'syirkah_modal' ? '#f59e0b' : '#10b981');
    });

    // D3 Force Simulation
    const simulation = d3.forceSimulation<AshabiyyahD3Node>(nodes)
      .force('link', d3.forceLink<AshabiyyahD3Node, AshabiyyahD3Link>(links)
        .id((d) => d.id)
        .distance((d) => (d.amountIdr > 100000000 ? 150 : 180))
        .strength(0.7)
      )
      .force('charge', d3.forceManyBody().strength(-480))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.radius + 24));

    // Render Links (Curves)
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', (d) => {
        if (d.flowType === 'zakat_produktif') return '#8b5cf6';
        if (d.flowType === 'syirkah_modal') return '#f59e0b';
        return '#10b981';
      })
      .attr('stroke-width', (d) => Math.max(1.8, Math.min(5, d.amountIdr / 35000000)))
      .attr('stroke-opacity', 0.65)
      .attr('marker-end', (d) => `url(#arrow-${d.flowType})`);

    // Render Link Text Labels (Amount)
    const linkText = g.append('g')
      .attr('class', 'link-labels')
      .selectAll('text')
      .data(links)
      .enter()
      .append('text')
      .attr('font-size', '8px')
      .attr('font-family', 'monospace')
      .attr('fill', '#94a3b8')
      .attr('text-anchor', 'middle')
      .attr('dy', -4)
      .text((d) => `Rp ${(d.amountIdr / 1000000).toFixed(0)} Jt`);

    // Drag behavior
    const drag = d3.drag<SVGGElement, AshabiyyahD3Node>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    // Render Node Groups
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node-group cursor-pointer')
      .call(drag as any)
      .on('click', (_event, d) => {
        setSelectedNode(d);
      });

    // Outer Aura Pulse for High Ashabiyyah
    node.append('circle')
      .attr('r', (d) => d.radius + 6)
      .attr('fill', (d) => d.color)
      .attr('fill-opacity', 0.15)
      .attr('stroke', (d) => d.color)
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .attr('filter', 'url(#ashabiyyah-glow)');

    // Main Node Circle
    node.append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', '#090d16')
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', 2.5)
      .attr('class', 'transition-all duration-200');

    // Inner Core
    node.append('circle')
      .attr('r', (d) => d.radius * 0.45)
      .attr('fill', (d) => d.color)
      .attr('fill-opacity', 0.85);

    // Score Text inside core
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#ffffff')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'monospace')
      .text((d) => `${d.ashabiyyahScore}%`);

    // Label below node
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => d.radius + 14)
      .attr('fill', '#e2e8f0')
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .text((d) => d.region);

    // Simulation tick handler
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      linkText
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2);

      node.attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);
    });

    // Default select first node
    setSelectedNode(nodes[0]);

    return () => {
      simulation.stop();
    };
  }, [selectedFlowType, isCrossIslandSynergyActive]);

  return (
    <div className="space-y-8 py-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 text-white p-6 sm:p-10 border border-teal-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-mono font-bold uppercase tracking-wider">
              <Share2 className="w-3.5 h-3.5" />
              D3.js Force Simulation Engine
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold">
              Konsep: 'Ashabiyyah Komunal & Efisiensi Transaksi
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-serif">
            Peta <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300">Ashabiyyah Map</span> D3.js
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Visualisasi fisika dinamis menggunakan <strong>D3.js Force Graph</strong> untuk memetakan bagaimana kekuatan kohesi sosial (*'Ashabiyyah*) menghubungkan simpul produsen tani, nelayan, saudagar muzakki, dan pesantren di berbagai wilayah Indonesia. Hubungan gotong royong ini melipatgandakan kecepatan perputaran modal (*velocity of money*) dan menghapus biaya perantara liar.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsCrossIslandSynergyActive(!isCrossIslandSynergyActive)}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-xs"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>{isCrossIslandSynergyActive ? 'Sinergi Antarpulau Aktif (+Rp 150 Jt)' : 'Aktifkan Sinergi Antarpulau'}</span>
            </button>
            {onNavigateToInvestment && (
              <button
                onClick={onNavigateToInvestment}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-xs"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Salurkan Modal ke Simpul Produktif</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Real-Time Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Total Aliran Modal Terhubung</span>
            <Coins className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
            Rp {(totalFlowIdr / 1000000).toFixed(0)} Jt / bln
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Terdistribusi ke 8 Simpul Wilayah
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Rata-Rata Indeks 'Ashabiyyah</span>
            <ShieldCheck className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-2xl font-black text-teal-600 dark:text-teal-400 font-mono mt-2">
            {averageAshabiyyahScore}%
          </div>
          <div className="text-[11px] text-teal-600 mt-1">
            Tingkat solidaritas & amanah akad
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Masyarakat Binaan Terkoneksi</span>
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
            {totalPeopleImpacted.toLocaleString('id-ID')} KK
          </div>
          <div className="text-[11px] text-purple-600 dark:text-purple-400 mt-1">
            Petani, Nelayan, & Santri Vokasi
          </div>
        </div>
      </div>

      {/* Main D3 Canvas Container */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-4">
        {/* Controls Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filter Aliran:
            </span>
            {[
              { id: 'ALL', label: 'Semua Aliran' },
              { id: 'syirkah_modal', label: 'Syirkah Modal Usaha (Kuning)' },
              { id: 'zakat_produktif', label: 'Zakat & Wakaf Produktif (Ungu)' },
              { id: 'pasokan_komoditas', label: 'Pasokan Komoditas Riil (Hijau)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFlowType(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedFlowType === f.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Pangan
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Maritim
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Finansial
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Vokasi
            </span>
          </div>
        </div>

        {/* D3 SVG Stage */}
        <div 
          ref={containerRef} 
          className="relative w-full h-[460px] sm:h-[560px] bg-slate-900/60 rounded-2xl border border-slate-800/80 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

          <svg ref={svgRef} className="w-full h-full select-none" />

          {/* D3 Interaction Tips */}
          <div className="absolute bottom-3 left-4 text-[10px] text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 pointer-events-none">
            🖱️ <strong>Interaksi D3:</strong> Drag node untuk memindahkan • Scroll/Pinch untuk Zoom & Pan • Klik node untuk telaah sosiologi
          </div>
        </div>

        {/* Selected Community Dossier Card */}
        {selectedNode && (
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                    {selectedNode.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    Wilayah: <strong>{selectedNode.region}</strong> • {selectedNode.communalMembers} Kepala Keluarga
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedNode.name}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono">Volume Ekonomi:</span>
                  <div className="text-base font-black text-amber-400 font-mono">
                    Rp {selectedNode.monthlyVolumeIdr.toLocaleString('id-ID')} / bln
                  </div>
                </div>
                <div className="text-right pl-3 border-l border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono">Skor 'Ashabiyyah:</span>
                  <div className="text-base font-black text-teal-400 font-mono">
                    {selectedNode.ashabiyyahScore}%
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono">Tradisi Sosial & Modal Budaya:</span>
                <p className="text-slate-200 font-medium">{selectedNode.primaryTradition}</p>
              </div>

              <div className="space-y-1">
                <span className="text-teal-400 text-[10px] uppercase font-mono">Korelasi Sosiologi Al-Muqaddimah:</span>
                <p className="text-slate-300 font-serif italic">"{selectedNode.khaldunConcept}"</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400 text-[11px]">
                Jejaring ini mengimplementasikan prinsip perputaran uang cepat tanpa penimbunan (*anti-ihtikar*).
              </span>
              {onNavigateToInvestment && (
                <button
                  onClick={onNavigateToInvestment}
                  className="text-xs font-bold text-teal-400 hover:underline flex items-center gap-1"
                >
                  <span>Dukung Komunitas Ini</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
