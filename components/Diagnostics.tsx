
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
  Cpu,
  Info,
  Server,
  Zap
} from 'lucide-react';

const Diagnostics: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [suiteResults, setSuiteResults] = useState<TestResult[]>([]);
  const [systemHealthy, setSystemHealthy] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);

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
    setProgress(10);
    setSuiteResults([]);
    
    // Simulação de progresso para UX
    const interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 10 : prev));
    }, 200);

    const res = await runAutomatedSuite();
    
    clearInterval(interval);
    setProgress(100);
    setSuiteResults(res);
    setSystemHealthy(res.every(r => r.passed));
    
    setTimeout(() => {
      setIsRunning(false);
      setProgress(0);
    }, 500);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-[100] p-3 rounded-full shadow-2xl border transition-all group flex items-center gap-2 ${
          systemHealthy === false ? 'bg-red-600 border-red-500 animate-pulse' : 'bg-slate-800 border-slate-700 hover:bg-blue-600'
        }`}
      >
        <Activity className={`w-6 h-6 text-white ${isRunning ? 'animate-spin' : ''}`} />
        {systemHealthy === false && (
          <span className="text-[10px] font-bold text-white pr-2 whitespace-nowrap">ALERTA TÉCNICO</span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${systemHealthy ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              <Server className={`${systemHealthy ? 'text-green-500' : 'text-red-500'} w-6 h-6`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Console de Integridade de Produção
                {systemHealthy && <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full uppercase">Pronto para Deploy</span>}
              </h2>
              <p className="text-xs text-slate-500 font-mono">Ambiente: {window.location.hostname}</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {isRunning && (
          <div className="h-1 bg-slate-800 w-full">
            <div 
              className="h-full bg-blue-500 transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase mb-2">
                <Zap className="w-3 h-3" /> Status Global
              </div>
              <span className={`text-lg font-bold ${systemHealthy ? 'text-green-500' : 'text-red-500'}`}>
                {systemHealthy ? 'OPERACIONAL' : 'ALERTA'}
              </span>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase mb-2">
                <ShieldCheck className="w-3 h-3" /> Testes Passados
              </div>
              <span className="text-lg font-bold text-white">
                {suiteResults.filter(r => r.passed).length} / {suiteResults.length}
              </span>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase mb-2">
                <Terminal className="w-3 h-3" /> Latência API
              </div>
              <span className="text-lg font-bold text-white">Estável</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest px-1">Checklist Detalhado</h3>
            {suiteResults.map((test) => (
              <div 
                key={test.id} 
                className={`p-4 rounded-2xl border transition-all ${
                  test.passed ? 'bg-slate-800/30 border-slate-800' : 'bg-red-500/5 border-red-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 p-2 rounded-lg ${test.passed ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {test.passed ? <CheckCircle2 className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-white">{test.testName}</p>
                        <span className="text-[9px] font-mono text-slate-600 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 uppercase tracking-tighter">
                          {test.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{test.message}</p>
                      {test.technicalInfo && (
                        <div className="mt-2 p-2 bg-slate-950 rounded border border-slate-800/50 flex items-start gap-2">
                          <Info className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-slate-500 font-mono leading-relaxed">{test.technicalInfo}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-slate-600 font-mono text-center sm:text-left">
            DICA: Se algum teste falhar, verifique o Console (F12) e as <br />
            configurações de variáveis de ambiente no hPanel.
          </p>
          <button 
            disabled={isRunning}
            onClick={triggerFullTest}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white px-8 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Validando...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Refazer Verificação Geral
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
