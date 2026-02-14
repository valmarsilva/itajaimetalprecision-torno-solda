
import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import ServiceSection from './components/ServiceSection';
import AIQuoteAssistant from './components/AIQuoteAssistant';
import ContactForm from './components/ContactForm';
import WeldingBackground from './components/WeldingBackground';
import { Layers, MessageCircle, Truck, Cog, Sparkles } from 'lucide-react';

const LeadDashboard = lazy(() => import('./components/LeadDashboard'));
const Diagnostics = lazy(() => import('./components/Diagnostics'));

const App: React.FC = () => {
  const whatsappNumber = "5547992460045";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('servicos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <WeldingBackground />
        
        {/* Camada de Luminosidade Superior - Azul Vibrante */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none"></div>
        
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            alt="Usinagem Industrial"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-sm font-bold mb-8 uppercase tracking-widest backdrop-blur-md animate-pulse">
              <Sparkles className="w-4 h-4" />
              Precisão Industrial em Itajaí
            </div>
            
            <h1 className="text-5xl md:text-7xl font-industrial text-white font-black leading-[1.1] mb-6 uppercase">
              Usinagem e <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-500">Solda Técnica</span>
            </h1>

            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-blue-500"></div>
              <p className="text-xl md:text-2xl text-white font-bold tracking-tight uppercase">
                Protótipos 3D <span className="text-blue-500 mx-2">|</span> ABS • PETG • PLA
              </p>
            </div>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl border-l-2 border-blue-500/50 pl-6">
              Especialistas em componentes de alta precisão, soldagem MIG/TIG de Inox e Alumínio, e desenvolvimento de projetos do protótipo à peça final.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-lg text-center transition-all shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-3 active:scale-95">
                <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Iniciar Orçamento
              </a>
              <button 
                onClick={scrollToServices}
                className="bg-slate-800/60 backdrop-blur-xl hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-bold text-lg text-center transition-all border border-slate-700 hover:border-blue-500/50 active:scale-95"
              >
                Conhecer Serviços
              </button>
            </div>
          </div>
        </div>
      </section>

      <ServiceSection />
      
      <div className="relative">
        <div className="absolute inset-0 bg-blue-600/5 pointer-events-none"></div>
        <AIQuoteAssistant />
      </div>

      <ContactForm />

      {/* Seção de Qualidade */}
      <section className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                alt="Tecnologia Industrial"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            </div>
          </div>
          
          <div>
            <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">Diferenciais Técnicos</h2>
            <h3 className="text-4xl font-industrial text-white mb-8">Usinagem de Última Geração</h3>
            <div className="space-y-6">
              {[
                { icon: <Layers />, title: "Prototipagem Ágil", desc: "Validação dimensional com impressão 3D antes da usinagem final." },
                { icon: <Truck />, title: "Logística e Reboques", desc: "Manutenção técnica em eixos e estruturas de carretas e carretinhas." },
                { icon: <Cog />, title: "Engenharia Reversa", desc: "Recuperação de peças fora de catálogo através de medição digital." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 p-4 rounded-2xl hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-800">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                    {React.cloneElement(item.icon as React.ReactElement, { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="font-industrial text-2xl mb-4 text-white">
            <span className="text-blue-500">ITAJAÍ</span> METAL<span className="text-blue-500">PRECISION</span>
          </div>
          <p className="text-slate-500 text-sm mb-8">
            Excelência em Metalurgia e Prototipagem Digital • Valmar Silva
          </p>
          <p className="text-slate-700 text-[10px] uppercase tracking-[0.2em]">
            Itajaí - Santa Catarina - Brasil
          </p>
        </div>
      </footer>

      <Suspense fallback={null}>
        <LeadDashboard />
        <Diagnostics />
      </Suspense>
      
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      >
        <div className="absolute -inset-2 bg-green-500/20 rounded-full animate-ping group-hover:hidden"></div>
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};

export default App;
