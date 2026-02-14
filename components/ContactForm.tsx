
import React, { useState } from 'react';
import { User, Phone, MessageSquare, ClipboardList, CheckCircle, Loader2, Send } from 'lucide-react';
import { leadService } from '../services/leadService';
import { Lead } from '../types';

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    interest: 'Outro' as Lead['interest'],
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await leadService.saveLead(formData);
      setIsSuccess(true);
      setFormData({ name: '', contact: '', interest: 'Outro', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      alert("Erro ao enviar pedido. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato-direto" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4">Contato Direto</h2>
          <h3 className="text-4xl font-industrial text-white mb-6 uppercase">Inicie seu Projeto</h3>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Preencha os dados abaixo e entraremos em contato com uma proposta técnica detalhada. 
            Nossa equipe analisa cada pedido individualmente para garantir a máxima qualidade.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span>Atendimento especializado para empresas e particulares.</span>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span>Desenvolvimento de protótipos e usinagem sob medida.</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-xl relative overflow-hidden">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Pedido Recebido!</h4>
              <p className="text-slate-400">Valmar Silva entrará em contato em breve.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-blue-500 hover:underline font-bold"
              >
                Enviar outro pedido
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                    <User className="w-3 h-3" /> Nome Completo
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="João Silva"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                    <Phone className="w-3 h-3" /> WhatsApp / E-mail
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.contact}
                    onChange={e => setFormData({...formData, contact: e.target.value})}
                    placeholder="(47) 99999-9999"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                  <ClipboardList className="w-3 h-3" /> Tipo de Serviço
                </label>
                <select
                  value={formData.interest}
                  onChange={e => setFormData({...formData, interest: e.target.value as any})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="Torno">Usinagem / Torno</option>
                  <option value="Solda MIG/TIG">Solda Técnica (MIG/TIG)</option>
                  <option value="Protótipos 3D">Protótipos / Impressão 3D</option>
                  <option value="Móveis Industriais">Móveis Industriais</option>
                  <option value="Carretinhas">Carretinhas / Reboques</option>
                  <option value="Outro">Outro / Especial</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> Descrição do Pedido
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="Descreva o que você precisa..."
                  className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Solicitar Orçamento
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
