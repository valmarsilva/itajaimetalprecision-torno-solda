
import { Lead } from "../types";

// Detecta se estamos rodando localmente ou em produção
const API_BASE = window.location.origin;

export const leadService = {
  saveLead: async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> => {
    const newLead: Lead = {
      ...leadData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pendente',
      createdAt: Date.now()
    };

    // 1. Sempre salva localmente primeiro (Segurança máxima)
    const localLeads = leadService.getLeadsFromLocal();
    localStorage.setItem('imp_leads_database', JSON.stringify([newLead, ...localLeads]));

    // 2. Tenta sincronizar com o servidor se ele existir
    try {
      const response = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
        signal: AbortSignal.timeout(3000) // Timeout de 3s para não travar a UI
      });

      if (response.ok) {
        console.log("Sincronizado com o servidor com sucesso.");
      }
    } catch (error) {
      console.warn("Modo Offline: Lead salvo apenas no navegador.");
    }

    return newLead;
  },

  getLeads: async (): Promise<Lead[]> => {
    try {
      const response = await fetch(`${API_BASE}/api/leads`, { signal: AbortSignal.timeout(3000) });
      if (response.ok) {
        const serverData = await response.json();
        localStorage.setItem('imp_leads_database', JSON.stringify(serverData));
        return serverData;
      }
    } catch (e) {
      console.log("Usando banco de dados local.");
    }
    return leadService.getLeadsFromLocal();
  },

  getLeadsFromLocal: (): Lead[] => {
    const data = localStorage.getItem('imp_leads_database');
    return data ? JSON.parse(data) : [];
  },

  deleteLead: (id: string): void => {
    const filtered = leadService.getLeadsFromLocal().filter(l => l.id !== id);
    localStorage.setItem('imp_leads_database', JSON.stringify(filtered));
  },

  updateStatus: (id: string, status: Lead['status']): void => {
    const updated = leadService.getLeadsFromLocal().map(l => l.id === id ? { ...l, status } : l);
    localStorage.setItem('imp_leads_database', JSON.stringify(updated));
  }
};
