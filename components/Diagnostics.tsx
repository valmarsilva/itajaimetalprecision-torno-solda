
import React, { useState, useEffect } from 'react';
import { runAutomatedSuite, TestResult } from '../healthCheck';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Play, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal,
  Activity,
  Cpu
} from 'lucide-react';

const Diagnostics: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [suiteResults, setSuiteResults] = useState<TestResult[]>([]);
  const [systemHealthy, setSystemHealthy] = useState<boolean | null>(null);

  // Executa um teste rápido ao montar para determinar saúde do sistema
  useEffect(() => {
    const silentTest = async () => {
      const res = await runAutomatedSuite();
      setSuiteResults(res);
      setSystemHealthy(res.every(r => r.passed));
    };
    silentTest();
  }, []);

  const triggerFullTest = async () => {
    setIsRunning(true);
    // Simula delay de processamento para feedback visual
    await new Promise(r => setTimeout(r, 1200));
    const res = await runAutomatedSuite();
    setSuiteResults(res);
    setSystemHealthy(res.every(r => r.passed));
    setIsRunning(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-[100] p-3 rounded-full shadow-2xl border transition-all group flex items-center gap-2 ${
          systemHealthy === false ? 'bg-red-600 border-red-500' : 'bg-slate-800 border-slate-700 hover:bg-blue-600'
        }`}
      >
        <Activity className={`w-6 h-6 text-white ${isRunning ? 'animate-pulse' : ''}`} />
        {systemHealthy === false && (
          <span className="text-[10px] font-bold text-white pr-2">SISTEMA COM ALERTAS</span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${systemHealthy ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              <Cpu className={`${systemHealthy ? 'text-green-500' : 'text-red-500'} w-6 h-6`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Console de Integridade
                {systemHealthy && <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full uppercase">Estável</span>}
              </h2>
              <p className="text-xs text-slate-500 font-mono">Último scan: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <span className="text-slate-500 text-[10px] font-bold uppercase block mb-1">Status Geral</span>
              <span className={`text-lg font-bold ${systemHealthy ? 'text-green-500' : 'text-red-500'}`}>
                {systemHealthy ? 'OPERACIONAL' : 'REQUER ATENÇÃO'}
              </span>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <span className="text-slate-500 text-[10px] font-bold uppercase block mb-1">Total de Testes</span>
              <span className="text-lg font-bold text-white">{suiteResults.length} Pontos de Verificação</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Relatório Detalhado
            </h3>
            {suiteResults.map((test) => (
              <div 
                key={test.id} 
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                  test.passed ? 'bg-slate-800/30 border-slate-800 hover:border-green-500/30' : 'bg-red-500/5 border-red-500/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${test.passed ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {test.passed ? <CheckCircle2 className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{test.testName}</p>
                    <p className="text-xs text-slate-500">{test.message}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-900/50 px-2 py-1 rounded">
                  {test.category}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <p className="text-[10px] text-slate-600 font-mono italic">
            * Testes automáticos executados no ambiente do cliente.
          </p>
          <button 
            disabled={isRunning}
            onClick={triggerFullTest}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all"
          >
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Rodar Suite Completa
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente Loader interno auxiliar
const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
);

export default Diagnostics;
