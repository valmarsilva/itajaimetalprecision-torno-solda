
import React from 'react';
import { Settings, Zap, Flame, Target, Truck, Sofa, Box, Layers } from 'lucide-react';

const services = [
  {
    id: 'torno',
    title: 'Usinagem Industrial',
    icon: <Settings className="w-8 h-8 text-blue-500" />,
    description: 'Fabricação e recuperação de componentes mecânicos industriais com acabamento de alta qualidade.',
    features: ['Torno Mecânico', 'Peças Sob Medida', 'Usinagem Geral']
  },
  {
    id: 'prototipos-3d',
    title: 'Protótipos e Impressão 3D',
    icon: <Layers className="w-8 h-8 text-indigo-500" />,
    description: 'Desenvolvimento de protótipos funcionais em 3D para validação de projetos e modelos técnicos.',
    features: ['Modelagem CAD', 'Impressão FDM/Resina', 'Peças de Reposição']
  },
  {
    id: 'carretinhas',
    title: 'Carretinhas e Reboques',
    icon: <Truck className="w-8 h-8 text-amber-500" />,
    description: 'Fabricação e reforma de carretinhas com estrutura reforçada e foco em segurança.',
    features: ['Projetos Sob Medida', 'Reformas Estruturais', 'Solda Alta Resistência']
  },
  {
    id: 'moveis',
    title: 'Móveis Industriais',
    icon: <Sofa className="w-8 h-8 text-purple-500" />,
    description: 'Confecção de móveis com estrutura metálica de alto padrão para residências e empresas.',
    features: ['Design Industrial', 'Acabamento Premium', 'Mesas e Estantes']
  },
  {
    id: 'solda-especial',
    title: 'Solda Inox e Alumínio',
    icon: <Flame className="w-8 h-8 text-cyan-500" />,
    description: 'Soldagem TIG de alta qualidade para aço inox e alumínio, com foco em estética.',
    features: ['Alumínio TIG', 'Aço Inox', 'Recuperação de Peças']
  }
];

const ServiceSection: React.FC = () => {
  return (
    <section id="servicos" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4">Nossa Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-industrial text-white uppercase">Soluções em Metal e Manutenção</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service) => (
            <div key={service.id} className="group bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col">
              <div className="mb-6 bg-slate-900 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
              <p className="text-slate-400 mb-6 leading-relaxed flex-grow text-sm">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center text-[13px] text-slate-300">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
