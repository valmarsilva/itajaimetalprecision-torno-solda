
import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import ServiceSection from './components/ServiceSection';
import AIQuoteAssistant from './components/AIQuoteAssistant';
import ContactForm from './components/ContactForm';
import WeldingBackground from './components/WeldingBackground';
import { Layers, MessageCircle, Truck, Cog, Loader2 } from 'lucide-react';

// Carregamento Preguiçoso (Lazy Loading) para o que não é essencial no início
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
    <div className="min-h-screen flex flex-col scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden bg-slate-950">
        <WeldingBackground />
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-20 grayscale"
            alt="Oficina Metalurgia"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm font-bold mb-6 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              Tecnologia em Metal & Polímeros
            </div>
            <h1 className="text-4xl md:text-6xl font-industrial text-white font-black leading-tight mb-2 uppercase drop-shadow-2xl">
              Usinagem, Solda e <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Metalurgia Técnica</span>
            </h1>
            <p className="text-2xl md:text-3xl text-indigo-400 mb-6 font-bold italic tracking-wide uppercase drop-shadow-md">
              PROTOTIPOS EM 3D COM ABS - PETG, PLA
            </p>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Desenvolvemos seu projeto do zero em Itajaí. Execução metalúrgica com solda técnica, torno mecânico e inovação em manufatura aditiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg text-center transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6" />
                WhatsApp Orçamento
              </a>
              <button 
                onClick={scrollToServices}
                className="bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg text-center transition-all border border-slate-700 active:scale-95"
              >
                Ver Especialidades
              </button>
            </div>
          </div>
        </div>
      </section>

      <ServiceSection />
      <AIQuoteAssistant />
      <ContactForm />

      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">Nossos Diferenciais</h2>
            <h3 className="text-4xl font-industrial text-white mb-8">Usinagem Inteligente</h3>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                  <Layers className="text-indigo-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Prototipagem de Peças</h4>
                  <p className="text-slate-400">Imprimimos em 3D peças complexas em ABS, PETG e PLA para teste de encaixe.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Truck className="text-orange-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Carretinhas e Logística</h4>
                  <p className="text-slate-400">Fabricação e manutenção de reboques com alinhamento e resistência garantidos.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Cog className="text-green-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Engenharia Reversa</h4>
                  <p className="text-slate-400">Recriamos peças desgastadas através de medição técnica e modelagem computacional.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden border-8 border-slate-800 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070" 
                className="w-full h-full object-cover"
                alt="Impressão 3D e Engenharia"
              />
            </div>
          </div>
        </div>
      </section>

      <footer id="contato" className="bg-slate-950 py-12 border-t border-slate-900 text-center">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Itajaí Metal Precision - Valmar Silva. Itajaí/SC.
        </p>
      </footer>

      {/* Componentes Administrativos carregados sob demanda */}
      <Suspense fallback={<div className="fixed bottom-6 left-6 z-[100] bg-slate-800 p-3 rounded-full"><Loader2 className="animate-spin text-white w-6 h-6" /></div>}>
        <LeadDashboard />
        <Diagnostics />
      </Suspense>
      
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};

export default App;
