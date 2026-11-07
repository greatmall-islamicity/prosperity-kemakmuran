export type Role = 'muzakki' | 'mustahik' | 'amil' | 'logistician';
export type Language = 'id' | 'en' | 'ar';

export type AsnafType = 
  | 'Fakir' 
  | 'Miskin' 
  | 'Amil' 
  | 'Muallaf' 
  | 'Riqab' 
  | 'Gharimin' 
  | 'Fisabilillah' 
  | 'Ibnu Sabil';

export interface BlockchainTransaction {
  id: string;
  hash: string;
  blockNumber: number;
  timestamp: string;
  from: string;
  donorName: string;
  to: string;
  recipientName: string;
  asnafCategory: AsnafType;
  amountIdr: number;
  akad: string;
  smartContract: string;
  gasFee: string;
  status: 'CONFIRMED' | 'PENDING' | 'DISBURSED';
  verifiedNodes: number;
  qrPayload: string;
  distributionLocation: string;
  proofDocumentUrl?: string;
}

export interface MustahikRecord {
  id: string;
  name: string;
  nikMasked: string;
  city: string;
  province: string;
  asnaf: AsnafType;
  monthlyIncome: number;
  familyDependents: number;
  requestedHelp: string;
  status: 'APPROVED' | 'IN_REVIEW' | 'DISBURSED' | 'FLAGGED';
  aiScore: number;
  aiRecommendation: string;
  assignedFundsIdr: number;
  dateApplied: string;
  lat: number;
  lng: number;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'Pangan' | 'Modal Usaha' | 'Kesehatan' | 'Pendidikan' | 'Logistik Darurat';
  quantity: number;
  unit: string;
  minThreshold: number;
  warehouseLocation: string;
  lastUpdated: string;
  batchQr: string;
  estimatedValuePerUnitIdr: number;
}

export interface DonationCampaign {
  id: string;
  title: string;
  category: 'Ekonomi Produktif' | 'Pangan & Beras' | 'Gharimin (Bebas Riba)' | 'Beasiswa' | 'Infrastruktur Umat';
  location: string;
  targetAmountIdr: number;
  collectedAmountIdr: number;
  beneficiariesCount: number;
  daysLeft: number;
  description: string;
  imageUrl: string;
  asnafTarget: AsnafType;
  smartContractAddress: string;
}

export interface GamificationState {
  points: number;
  levelTitle: string;
  streakMonths: number;
  badges: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
  }>;
}

export interface PredictiveRegionForecast {
  zone: string;
  vulnerabilityIndex: number; // 0 - 1
  projectedMustahik: number;
  criticalNeed: string;
  recommendedAllocationRatio: string;
  economicImpactForecast: string;
  lat: number;
  lng: number;
}
