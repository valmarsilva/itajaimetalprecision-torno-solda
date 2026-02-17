
import React, { useState } from 'react';
import { Camera, Maximize2, X, ChevronRight } from 'lucide-react';

const portfolioData = [
  {
    category: "Usinagem Industrial",
    tag: "torno",
    images: [
      { url: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800", title: "Torneamento de Eixo" },
      { url: "https://images.unsplash.com/photo-1565264315340-278078170068?q=80&w=800", title: "Peça de Precisão" },
      { url: "https://images.unsplash.com/photo-1549410190-679a95393a67?q=80&w=800", title: "Engrenagem Especial" }
    ]
  },
  {
    category: "Solda Técnica MIG/TIG",
    tag: "solda",
    images: [
      { url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800", title: "Solda TIG Alumínio" },
      { url: "https://images.unsplash.com/photo-1623939660011-baba88df3602?q=80&w=800", title: "Cordão em Inox" },
      { url: "https://images.unsplash.com/photo-1530124566582-a618bc2615ad?q=80&w=800", title: "Estrutura Soldada" }
    ]
  },
  {
    category: "Protótipos e Impressão 3D",
    tag: "3d",
    images: [
      { url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800", title: "Peça Técnica 3D" },
      { url: "https://images.unsplash.com/photo-1581092162384-8987c17b4926?q=80&w=800", title: "Validação de Molde" },
      { url: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=800", title: "Protótipo Funcional" }
    ]
  },
  {
    category: "Carretinhas e Reboques",
    tag: "carretinhas",
    images: [
      { url: "https://images.unsplash.com/photo-1585829365234-78db933f382a?q=80&w=800", title: "Reforma de Chassi" },
      { url: "https://images.unsplash.com/photo-1517420812314-8b17179f59f7?q=80&w=800", title: "Estrutura Reforçada" },
      { url: "https://images.unsplash.com/photo-1621905252507-b354bcadcabc?q=80&w=800", title: "Eixo Especial" }
    ]
  },
  {
    category: "Móveis Industriais",
    tag: "moveis",
    images: [
      { url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800", title: "Mesa Industrial" },
      { url: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?q=80&w=800", title: "Estante Aço/Madeira" },
      { url: "https://images.unsplash.com/photo-1540638349517-3abd5afc5847?q=80&w=800", title: "Banqueta Metal" }
    ]
  }
];

const PortfolioGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-xs flex items-center gap-2">
              <Camera className="w-4 h-4" /> Portfólio de Qualidade
            </h2>
            <h3 className="text-4xl font-industrial text-white uppercase">Nossos Trabalhos</h3>
          </div>
          <p className="text-slate-500 max-w-md text-sm leading-relaxed">
            Galeria de peças e projetos finalizados. Excelência em cada detalhe de usinagem e soldagem.
          </p>
        </div>

        <div className="space-y-16">
          {portfolioData.map((group, gIdx) => (
            <div key={gIdx} className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-slate-800"></div>
                <h4 className="text-slate-400 font-industrial text-xs uppercase tracking-[0.3em] font-bold">
                  {group.category}
                </h4>
                <div className="h-px w-8 bg-blue-500/30"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {group.images.map((img, iIdx) => (
                  <div 
                    key={iIdx} 
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer"
                    onClick={() => setSelectedImage(img.url)}
                  >
                    <img 
                      src={img.url} 
                      alt={img.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 opacity-70 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <p className="text-white font-bold text-sm mb-1">{img.title}</p>
                      <div className="flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver Detalhes <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 p-2 bg-slate-900/80 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 border border-slate-700">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[300] bg-slate-950/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2 bg-slate-900 rounded-full border border-slate-800">
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            className="max-w-full max-h-full rounded-2xl shadow-2xl border border-slate-800 object-contain"
            alt="Vista Expandida"
          />
        </div>
      )}
    </section>
  );
};

export default PortfolioGallery;
