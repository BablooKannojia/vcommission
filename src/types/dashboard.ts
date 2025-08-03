export interface PartnershipData {
  activeBrands: number;
  invitedBrands: number;
}

export interface MarketplaceMetric {
  id: number;
  date: string;
  clicks: number;
  dpv: number;
  atc: number;
  salesCommission: number;
  conversionRate: number;
  earningsPerClick: number;
}

export interface ClicksData {
  date: string | number | Date;
  month: string;
  clicks: number;
  dpv: number;
  atc: number;
  conversion: number;
  sales: number;
  commission: number;
}