import { Lead } from "../types";

const API_BASE = window.location.origin;

export const leadService = {
  saveLead: async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> => {
    const newLead: Lead = {
      ...leadData,
      id: Math.random().toString(36).substring(2, 11),
      status: 'Pendente',
      createdAt: Date.now()
    };

    // Salva localmente primeiro (Segurança)
    const local = localStorage.getItem('imp_leads_database');
    const leads = local ? JSON.parse(local) : [];
    localStorage.setItem('imp_leads_database', JSON.stringify([newLead, ...leads]));

    // Tenta API
    try {
      await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
        signal: AbortSignal.timeout(4000)
      });
    } catch (e) {
      console.warn("API Offline, lead salvo apenas localmente.");
    }

    return newLead;
  },

  getLeads: async (): Promise<Lead[]> => {
    try {
      const res = await fetch(`${API_BASE}/api/leads`);
      if (res.ok) return await res.json();
    } catch (e) {}
    const local = localStorage.getItem('imp_leads_database');
    return local ? JSON.parse(local) : [];
  },

  deleteLead: (id: string): void => {
    const local = localStorage.getItem('imp_leads_database');
    if (local) {
      const filtered = JSON.parse(local).filter((l: any) => l.id !== id);
      localStorage.setItem('imp_leads_database', JSON.stringify(filtered));
    }
  },

  updateStatus: (id: string, status: Lead['status']): void => {
    const local = localStorage.getItem('imp_leads_database');
    if (local) {
      const updated = JSON.parse(local).map((l: any) => l.id === id ? { ...l, status } : l);
      localStorage.setItem('imp_leads_database', JSON.stringify(updated));
    }
  }
};