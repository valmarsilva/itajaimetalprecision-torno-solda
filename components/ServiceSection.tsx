
import React from 'react';
import { Settings, Zap, Flame, Target } from 'lucide-react';

const services = [
  {
    id: 'torno',
    title: 'Usinagem de Precisão',
    icon: <Settings className="w-8 h-8 text-blue-500" />,
    description: 'Fabricação técnica de eixos, porcas e peças cilíndricas com tolerâncias rigorosas.',
    features: ['Eixos Industriais', 'Porcas Especiais', 'Torno Mecânico']
  },
  {
    id: 'buchas',
    title: 'Buchas Técnicas',
    icon: <Target className="w-8 h-8 text-green-500" />,
    description: 'Usinagem especializada em buchas de bronze e nylon para diversas aplicações mecânicas.',
    features: ['Bronze Grafitado', 'Nylon 6.0 / Technyl', 'Ajustes de Folga']
  },
  {
    id: 'solda-especial',
    title: 'Solda Inox e Alumínio',
    icon: <Flame className="w-8 h-8 text-cyan-500" />,
    description: 'Soldagem TIG de alta qualidade para aço inox e alumínio, com foco em resistência e estética.',
    features: ['Alumínio TIG', 'Aço Inox', 'Recuperação de Peças']
  },
  {
    id: 'solda-aço',
    title: 'Soldagem MIG / Aço',
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    description: 'Solda em aço carbono para estruturas e reparos pesados com rapidez e segurança.',
    features: ['Aço Carbono', 'Processo MIG/MAG', 'Reparos Estruturais']
  }
];

const ServiceSection: React.FC = () => {
  return (
    <section id="servicos" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4">Nossa Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-industrial text-white uppercase">Usinagem de Peças e Solda</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="mb-6 bg-slate-900 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
              <p className="text-slate-400 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center text-sm text-slate-300">
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
