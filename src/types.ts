export type PageView =
  | { type: 'home' }
  | { type: 'about' }
  | { type: 'leader'; leaderId: string }
  | { type: 'investor' }
  | { type: 'accreditations' }
  | { type: 'division'; divisionId: string }
  | { type: 'project'; projectId: string }
  | { type: 'media'; tab: 'news' | 'photos' | 'videos' }
  | { type: 'sustainability'; tab: 'environment' | 'csr' }
  | { type: 'contact' };

export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  category: 'township' | 'resort' | 'hotel';
  heroImage: string;
  logoBadgeText: string;
  location: string;
  totalLandArea: string;
  totalPlots: string;
  purchaseStatus: string;
  plotAreaPercent: string;
  facilitiesPercent: string;
  standardPlotSizes: string;
  roadWidth: string;
  earthFilling: string;
  handoverSchedule: string;
  vat: string;
  approvalStatus: string;
  developmentStatus: string;
  description: string;
  locationHighlights: string[];
  investmentReasons: string[];
  roadNetwork: string[];
  amenities: string[];
  concernName: string;
  banglaName?: string;
  banglaLocation?: string;
  banglaPlotSizes?: string;
  badgeTag?: string;
  verifiedTag?: string;
  roadWidthShort?: string;
  projectLogoUrl?: string;
}

export interface DivisionData {
  id: string;
  name: string;
  subtitle: string;
  concernName: string;
  concernLogoText: string;
  heroImage: string;
  approachTitle: string;
  approachDescription: string;
  capabilities: {
    title: string;
    description: string;
    icon: string;
  }[];
  vision: string;
}

export interface LeaderData {
  id: string;
  name: string;
  title: string;
  roleDescription: string;
  photoUrl: string;
  bioParagraphs: string[];
  socialLinks?: {
    facebook?: string;
    x?: string;
    whatsapp?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  image: string;
  readTime: string;
}
