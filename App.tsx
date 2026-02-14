
import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import ServiceSection from './components/ServiceSection';
import AIQuoteAssistant from './components/AIQuoteAssistant';
import ContactForm from './components/ContactForm';
import WeldingBackground from './components/WeldingBackground';
import { Layers, MessageCircle, Truck, Cog, Sparkles, QrCode } from 'lucide-react';

const LeadDashboard = lazy(() => import('./components/LeadDashboard'));
const Diagnostics = lazy(() => import('./components/Diagnostics'));

const App: React.FC = () => {
  const whatsappNumber = "5547992460045";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const siteUrl = "https://itajaimetalprecision.com.br"; // URL fixa para o QR Code ser sempre válido
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(siteUrl)}&color=3b82f6&bgcolor=020617`;

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('servicos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />

      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Camada 20: Animação de Solda (Fica por cima de tudo no fundo) */}
        <WeldingBackground />
        
        {/* Camada 10: Elementos de fundo e QR Code */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none z-10"></div>
        
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-10 mix-blend-overlay grayscale"
            alt="Usinagem Industrial"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950"></div>
        </div>

        {/* QR CODE - Estilo "Placa de Identificação Técnica" */}
        <div className="absolute bottom-16 right-[38%] z-10 hidden lg:flex flex-col items-center animate-in fade-in zoom-in duration-1000 delay-700">
          <div className="relative p-4 bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-lg group transition-all hover:border-blue-500/40 shadow-2xl shadow-black">
            {/* Rebites Industriais nos cantos */}
            <div className="absolute top-1 left-1 w-1 h-1 bg-slate-700 rounded-full shadow-inner"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-slate-700 rounded-full shadow-inner"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-slate-700 rounded-full shadow-inner"></div>
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-slate-700 rounded-full shadow-inner"></div>
            
            {/* Cantos de mira para foco tecnológico */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-blue-500/40"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-blue-500/40"></div>
            
            <img 
              src={qrCodeUrl} 
              alt="QR Code do Site" 
              className="w-20 h-20 opacity-60 group-hover:opacity-100 transition-all duration-500 mix-blend-lighten"
            />
            
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
          <div className="mt-4 flex flex-col items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
            <span className="text-[9px] font-industrial text-blue-400 uppercase tracking-[0.3em] font-bold">
              Scan Tech-Link
            </span>
            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold mb-8 uppercase tracking-[0.2em] backdrop-blur-md">
              <Sparkles className="w-3 h-3" />
              Itajaí • Santa Catarina
            </div>
            
            <h1 className="text-5xl md:text-7xl font-industrial text-white font-black leading-[1.05] mb-6 uppercase">
              Usinagem e <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-100 to-blue-500">Solda Técnica</span>
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-blue-500 to-transparent"></div>
              <p className="text-lg md:text-xl text-blue-100/80 font-industrial tracking-tight uppercase">
                Torno Mecânico <span className="text-blue-500/50 mx-2">//</span> Soldagem MIG/TIG
              </p>
            </div>

            <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-xl border-l-2 border-blue-500/30 pl-6">
              Soluções em metalurgia de alta precisão. Do reparo de peças industriais ao desenvolvimento de protótipos complexos com engenharia de ponta.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-xl font-bold text-lg text-center transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-95">
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Orçamento Rápido
              </a>
              <button 
                onClick={scrollToServices}
                className="bg-slate-900/50 backdrop-blur-md hover:bg-slate-800 text-white px-10 py-5 rounded-xl font-bold text-lg text-center transition-all border border-slate-700 hover:border-blue-500/30 active:scale-95"
              >
                Serviços
              </button>
            </div>
          </div>
        </div>
      </section>

      <ServiceSection />

      <ContactForm />
      
      <div className="relative">
        <div className="absolute inset-0 bg-blue-600/5 pointer-events-none"></div>
        <AIQuoteAssistant />
      </div>

      <section className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
                alt="Tecnologia Industrial"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            </div>
          </div>
          
          <div>
            <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-xs">Excelência Técnica</h2>
            <h3 className="text-4xl font-industrial text-white mb-8 uppercase">Usinagem de Alta Performance</h3>
            <div className="grid gap-4">
              {[
                { icon: Layers, title: "Prototipagem Ágil", desc: "Desenvolvimento rápido de peças piloto com validação dimensional." },
                { icon: Truck, title: "Manutenção de Eixos", desc: "Recuperação especializada em eixos e estruturas de reboques." },
                { icon: Cog, title: "Engenharia Reversa", desc: "Fabricação de componentes descontinuados a partir de amostras." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 p-5 rounded-xl hover:bg-slate-900/50 transition-all border border-transparent hover:border-slate-800 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
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
          <p className="text-slate-500 text-xs mb-8 uppercase tracking-widest">
            Usinagem • Soldagem • Engenharia • Valmar Silva
          </p>
          <div className="h-px w-24 bg-blue-500/20 mx-auto mb-8"></div>
          <p className="text-slate-700 text-[10px] uppercase tracking-[0.3em]">
            Itajaí • Santa Catarina • Brasil
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
        className="fixed bottom-6 right-6 z-[100] bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      >
        <div className="absolute -inset-2 bg-green-600/20 rounded-full animate-ping group-hover:hidden"></div>
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};

export default App;
