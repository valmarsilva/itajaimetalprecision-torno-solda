import { Lead } from "../types";

// Detecta a origem para chamadas de API
const API_BASE = window.location.origin;

export const leadService = {
  // Salva um novo contato
  saveLead: async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> => {
    const newLead: Lead = {
      ...leadData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pendente',
      createdAt: Date.now()
    };

    try {
      // Tenta enviar para o servidor (backend)
      const response = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });

      // Se o servidor não responder (ex: 404 ou 500), lança erro para cair no catch
      if (!response.ok) {
        throw new Error(`Servidor respondeu com status ${response.status}`);
      }
      
      console.log("Sucesso: Lead salvo no servidor leads.json");
      
      // Sincroniza também localmente para consulta rápida
      const localLeads = leadService.getLeadsFromLocal();
      localStorage.setItem('imp_leads_database', JSON.stringify([newLead, ...localLeads]));
      
      return newLead;
    } catch (error) {
      // Se cair aqui, significa que o servidor Node.js não está rodando ou está inacessível
      console.warn("Aviso: Servidor de banco de dados offline. Salvando apenas neste navegador.");
      
      const localLeads = leadService.getLeadsFromLocal();
      const updatedLeads = [newLead, ...localLeads];
      localStorage.setItem('imp_leads_database', JSON.stringify(updatedLeads));
      
      return newLead;
    }
  },

  // Recupera leads (Tenta API, se falhar pega Local)
  getLeads: async (): Promise<Lead[]> => {
    try {
      const response = await fetch(`${API_BASE}/api/leads`);
      if (response.ok) {
        const serverData = await response.json();
        // Atualiza o local com o que veio do servidor
        localStorage.setItem('imp_leads_database', JSON.stringify(serverData));
        return serverData;
      }
    } catch (e) {
      console.warn("Lendo dados do histórico local (Servidor Offline)");
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