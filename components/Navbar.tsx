
import React from 'react';

const Navbar: React.FC = () => {
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
            <div className="w-12 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-industrial text-white font-bold text-lg">
              IMP
            </div>
            <span className="font-industrial text-xl tracking-tighter text-white">
              <span className="text-blue-500">ITAJAÍ</span> METAL<span className="text-blue-500 underline decoration-2 underline-offset-4">PRECISION</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="text-slate-300 hover:text-blue-500 transition-colors font-medium">Início</a>
            <a href="#servicos" onClick={(e) => handleScroll(e, '#servicos')} className="text-slate-300 hover:text-blue-500 transition-colors font-medium">Serviços</a>
            <a href="#orcamento" onClick={(e) => handleScroll(e, '#orcamento')} className="text-slate-300 hover:text-blue-500 transition-colors font-medium">Orçamento</a>
            <a 
              href="#contato" 
              onClick={(e) => handleScroll(e, '#contato')} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Contato
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
