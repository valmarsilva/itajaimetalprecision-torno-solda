
import React from 'react';
import Navbar from './components/Navbar';
import ServiceSection from './components/ServiceSection';
import AIQuoteAssistant from './components/AIQuoteAssistant';
import Diagnostics from './components/Diagnostics';
import { Hammer, Cog, HardHat, Phone, Mail, MapPin, Instagram, Facebook, Clock, MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const whatsappNumber = "5547992460045";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        {/* Hero Background with Sparks Animation Effect */}
        <div className="absolute inset-0 bg-slate-950">
          <img 
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-30 scale-105"
            alt="Oficina Metalurgia"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm font-bold mb-6">
              <HardHat className="w-4 h-4" />
              ITAJAÍ METAL PRECISION - ESPECIALIZADA
            </div>
            <h1 className="text-4xl md:text-6xl font-industrial text-white font-black leading-tight mb-6 uppercase">
              Usinagem e Solda <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">Alto Padrão</span> em Itajaí
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Fabricação técnica de <strong>roscas trapezoidais</strong>, porcas e buchas de <strong>bronze e nylon</strong>. Soldagem especializada em <strong>aço, alumínio e aço inox</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg text-center transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6" />
                WhatsApp Orçamento
              </a>
              <a href="#servicos" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg text-center transition-all border border-slate-700">
                Ver Especialidades
              </a>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 right-12 hidden lg:flex gap-12 bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-800">
          <div>
            <div className="text-3xl font-industrial font-bold text-blue-500">Bronze</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Usinagem de Buchas</div>
          </div>
          <div className="w-px h-12 bg-slate-800"></div>
          <div>
            <div className="text-3xl font-industrial font-bold text-blue-500">Inox</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Solda Especializada</div>
          </div>
          <div className="w-px h-12 bg-slate-800"></div>
          <div>
            <div className="text-3xl font-industrial font-bold text-blue-500">Nylon</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Peças Técnicas</div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServiceSection />

      {/* AI Assistant Section */}
      <AIQuoteAssistant />

      {/* Features / Why Us */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">Nossos Diferenciais</h2>
            <h3 className="text-4xl font-industrial text-white mb-8">Tecnologia e Experiência em Itajaí</h3>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Cog className="text-blue-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Peças Sob Medida</h4>
                  <p className="text-slate-400">Fabricação precisa de eixos, porcas especiais e buchas em materiais diversos como bronze e nylon industrial.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Hammer className="text-orange-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Solda em Metais Nobres</h4>
                  <p className="text-slate-400">Domínio em soldagem TIG/MIG para alumínio e aço inox, garantindo resistência e acabamento superior.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="text-green-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Agilidade em Itajaí</h4>
                  <p className="text-slate-400">Localizados na Volta de Cima, oferecemos o melhor tempo de resposta para reparos urgentes na região.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden border-8 border-slate-800 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1530124560676-5f7bc47474ff?auto=format&fit=crop&q=80&w=2070" 
                className="w-full h-full object-cover"
                alt="Detalhe de Usinagem"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-blue-600 p-6 rounded-2xl text-white max-w-[200px] shadow-xl">
              <p className="font-bold text-lg">Valmar Silva: Especialista Itajaí Metal Precision</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contato */}
      <footer id="contato" className="bg-slate-950 pt-24 pb-12 border-t border-slate-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center font-industrial text-white font-bold text-sm">
                  IMP
                </div>
                <span className="font-industrial text-lg text-white">ITAJAÍ METAL PRECISION</span>
              </div>
              <p className="text-slate-500 leading-relaxed mb-6">
                Referência em usinagem de eixos, porcas e buchas (bronze/nylon) e soldagem técnica em Itajaí/SC.
              </p>
              <div className="flex gap-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-green-500 transition-colors"><MessageCircle className="w-5 h-5" /></a>
                <a href="#" className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-blue-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Especialidades</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#servicos" className="hover:text-blue-500">Usinagem de Eixos</a></li>
                <li><a href="#servicos" className="hover:text-blue-500">Buchas Bronze/Nylon</a></li>
                <li><a href="#servicos" className="hover:text-blue-500">Solda Alumínio e Inox</a></li>
                <li><a href="#servicos" className="hover:text-blue-500">Porcas Sob Medida</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contato</h4>
              <ul className="space-y-4 text-slate-500">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>Rua Bruno Vicente da Luz, 801<br />Volta de Cima, Itajaí - SC</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>(47) 99246-0045</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>valmar.usinagem@hotmail.com</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300 font-semibold pt-2">
                   <HardHat className="w-5 h-5 text-blue-500 shrink-0" />
                   <span>Valmar Silva - WhatsApp: (47) 99246-0045</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Horário</h4>
              <ul className="space-y-4 text-slate-500">
                <li className="flex justify-between">
                  <span>Seg - Sex:</span>
                  <span className="text-slate-300">08:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sáb:</span>
                  <span className="text-slate-300">08:00 - 12:00</span>
                </li>
                <li className="text-orange-400 font-bold mt-4">
                  Atendimento Volta de Cima
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-900 text-center text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} Itajaí Metal Precision - Valmar Silva. Itajaí/SC.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Action */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90 flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap font-bold text-sm">
          Falar com Valmar
        </span>
      </a>

      {/* Floating Diagnostics Tool */}
      <Diagnostics />
    </div>
  );
};

export default App;
