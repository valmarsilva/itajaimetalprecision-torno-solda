
import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const whatsappNumber = "5547992460045";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const instagramUrl = "https://www.instagram.com/itajaimetalprecision/";

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-industrial text-white font-bold text-base">
              IMP
            </div>
            <span className="font-industrial text-lg tracking-tighter text-white hidden sm:block">
              <span className="text-blue-500">ITAJAÍ</span> METAL<span className="text-blue-500">PRECISION</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="flex items-center gap-3 md:gap-4 md:pr-6 md:border-r border-slate-800">
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-pink-500 transition-all hover:scale-110 p-2"
                title="Siga-nos no Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-green-500 transition-all hover:scale-110 p-2"
                title="Fale conosco no WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="text-slate-300 hover:text-blue-500 transition-colors font-medium text-sm">Início</a>
              <a href="#servicos" onClick={(e) => handleScroll(e, '#servicos')} className="text-slate-300 hover:text-blue-500 transition-colors font-medium text-sm">Serviços</a>
              <a href="#orcamento" onClick={(e) => handleScroll(e, '#orcamento')} className="text-slate-300 hover:text-blue-500 transition-colors font-medium text-sm">Orçamento</a>
              <a 
                href="#contato" 
                onClick={(e) => handleScroll(e, '#contato')} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 text-sm"
              >
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
