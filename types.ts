
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  details: string[];
}

export interface QuoteRequest {
  name: string;
  email: string;
  serviceType: string;
  description: string;
}

export interface AIResponse {
  analysis: string;
  suggestedProcess: string;
  complexity: 'Baixa' | 'Média' | 'Alta';
}

export interface QuoteHistoryItem extends AIResponse {
  id: string;
  originalDescription: string;
  timestamp: number;
}
