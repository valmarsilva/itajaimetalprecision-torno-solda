
import React, { useState, useEffect } from 'react';
import { analyzeProject } from '../services/geminiService';
import { AIResponse, QuoteHistoryItem } from '../types';
import { 
  Sparkles, 
  Loader2, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  History, 
  Trash2, 
  Clock, 
  ChevronRight 
} from 'lucide-react';

const AIQuoteAssistant: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIResponse | null>(null);
  const [history, setHistory] = useState<QuoteHistoryItem[]>([]);

  const whatsappNumber = "5547992460045";

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('metalprecision_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Erro ao carregar histórico", e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('metalprecision_history', JSON.stringify(history));
  }, [history]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      const result = await analyzeProject(description);
      setAnalysis(result);
      
      // Add to history
      const newItem: QuoteHistoryItem = {
        ...result,
        id: Math.random().toString(36).substr(2, 9),
        originalDescription: description,
        timestamp: Date.now()
      };
      setHistory(prev => [newItem, ...prev].slice(0, 5)); // Keep last 5
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getComplexityColor = (comp: string) => {
    switch (comp) {
      case 'Baixa': return 'text-green-400 bg-green-400/10';
      case 'Média': return 'text-yellow-400 bg-yellow-400/10';
      case 'Alta': return 'text-red-400 bg-red-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  const handleWhatsAppChat = (desc: string) => {
    const text = encodeURIComponent(`Olá Valmar, gostaria de um orçamento para o seguinte projeto: ${desc}.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  const clearHistory = () => {
    if (window.confirm("Deseja limpar seu histórico de consultas?")) {
      setHistory([]);
      localStorage.removeItem('metalprecision_history');
    }
  };

  const loadFromHistory = (item: QuoteHistoryItem) => {
    setAnalysis({
      analysis: item.analysis,
      suggestedProcess: item.suggestedProcess,
      complexity: item.complexity
    });
    setDescription(item.originalDescription);
    window.scrollTo({ top: document.getElementById('orcamento')?.offsetTop, behavior: 'smooth' });
  };

  return (
    <section id="orcamento" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Consultor de Projetos</h2>
            </div>
            <p className="text-blue-100 opacity-90">
              Descreva sua peça e nosso sistema sugerirá o melhor processo de fabricação instantaneamente.
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleAnalyze} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  O que você precisa fabricar ou reparar?
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Preciso soldar uma trinca em um bloco de motor de alumínio..."
                  className="w-full h-32 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !description}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Obter Recomendação
                  </>
                )}
              </button>
            </form>

            {analysis && (
              <div className="mt-8 p-6 bg-slate-800 border border-slate-700 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 ring-1 ring-blue-500/30">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-blue-500" />
                    <h3 className="text-xl font-bold text-white">Sugestão</h3>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                      {analysis.suggestedProcess}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-current ${getComplexityColor(analysis.complexity)}`}>
                      Nível: {analysis.complexity}
                    </span>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed italic border-l-2 border-blue-500 pl-4 py-1">
                    "{analysis.analysis}"
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-slate-400">Gostou da sugestão? Fale agora com Valmar Silva.</p>
                  <button 
                    onClick={() => handleWhatsAppChat(description)}
                    className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Enviar via WhatsApp
                  </button>
                </div>
              </div>
            )}

            {/* History Section */}
            {history.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <History className="w-4 h-4" />
                    <h4 className="text-sm font-bold uppercase tracking-widest">Consultas Recentes</h4>
                  </div>
                  <button 
                    onClick={clearHistory}
                    className="text-slate-600 hover:text-red-500 transition-colors flex items-center gap-1 text-xs"
                  >
                    <Trash2 className="w-3 h-3" />
                    Limpar
                  </button>
                </div>
                
                <div className="grid gap-3">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => loadFromHistory(item)}
                      className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-800 rounded-xl hover:bg-slate-800/60 hover:border-slate-700 transition-all text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-900 rounded-lg group-hover:text-blue-400 transition-colors">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-slate-200 font-medium text-sm line-clamp-1 max-w-[200px] md:max-w-md">
                            {item.originalDescription}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">{item.suggestedProcess}</span>
                            <span className="text-[10px] text-slate-600">•</span>
                            <span className="text-[10px] text-slate-600 italic">
                              {new Date(item.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-500 transition-all group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIQuoteAssistant;
