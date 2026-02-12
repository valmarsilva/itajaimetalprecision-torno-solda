
import React, { useState, useEffect } from 'react';
import { leadService } from '../services/leadService';
import { Lead } from '../types';
import { LayoutDashboard, Users, Trash2, CheckCircle, Clock, X, PhoneCall, ExternalLink, Calendar, RefreshCcw } from 'lucide-react';

const LeadDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    const data = await leadService.getLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  const handleDelete = (id: string) => {
    if (confirm("Excluir este contato do seu histórico local?")) {
      leadService.deleteLead(id);
      setLeads(prev => prev.filter(l => l.id !== id));
    }
  };

  const updateStatus = (id: string, status: Lead['status']) => {
    leadService.updateStatus(id, status);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'Concluído': return 'text-green-500 bg-green-500/10';
      case 'Em Atendimento': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-orange-400 bg-orange-400/10';
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-[90] p-4 bg-blue-600 border border-blue-500 rounded-full text-white shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2 group"
        title="Ver Orçamentos Recebidos"
      >
        <LayoutDashboard className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-xs font-bold uppercase tracking-widest">
          Painel de Orçamentos
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[150] bg-slate-950/95 backdrop-blur-xl flex flex-col p-6 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-industrial text-white uppercase">Painel de Contatos</h2>
              <p className="text-slate-500 text-sm">Gerenciamento de interessados - {leads.length} pedidos registrados</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchLeads}
              className={`p-3 bg-slate-900 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-all border border-slate-800 ${loading ? 'animate-spin' : ''}`}
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-3 bg-slate-900 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-all border border-slate-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {leads.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-3xl">
              <Clock className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-lg">Ainda não há pedidos salvos no servidor.</p>
              <p className="text-sm mt-2">Os pedidos feitos via formulário aparecerão aqui automaticamente.</p>
            </div>
          ) : (
            leads.map((lead) => (
              <div key={lead.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl group hover:border-slate-600 transition-all">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{lead.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                      <span className="text-[10px] text-slate-600 font-mono">#{lead.id}</span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1"><PhoneCall className="w-3 h-3 text-blue-500" /> {lead.contact}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-blue-500" /> {new Date(lead.createdAt).toLocaleString('pt-BR')}</span>
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs font-semibold">{lead.interest}</span>
                    </div>

                    <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 text-slate-300 text-sm italic">
                      "{lead.message}"
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-2 justify-end">
                    <button 
                      onClick={() => updateStatus(lead.id, lead.status === 'Pendente' ? 'Em Atendimento' : 'Concluído')}
                      className="p-2 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
                      title="Mudar Status"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <a 
                      href={`https://wa.me/${lead.contact.replace(/\D/g,'')}`}
                      target="_blank"
                      className="p-2 bg-green-600/10 text-green-500 hover:bg-green-600 hover:text-white rounded-lg transition-all"
                      title="Responder no WhatsApp"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <button 
                      onClick={() => handleDelete(lead.id)}
                      className="p-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                      title="Remover do Painel"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-8 text-center text-[10px] text-slate-600 font-mono uppercase tracking-tighter">
          Os dados acima são carregados do arquivo leads.json no seu servidor Hostinger.
        </div>
      </div>
    </div>
  );
};

export default LeadDashboard;
