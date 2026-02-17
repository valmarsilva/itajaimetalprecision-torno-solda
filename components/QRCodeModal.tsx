import React from 'react';
import { X, QrCode, Download, Share2 } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const siteUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(siteUrl)}&color=3b82f6&bgcolor=0f172a`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Itajaí Metal',
          text: 'Conheça nossos serviços de Usinagem e Solda Técnica!',
          url: siteUrl,
        });
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      navigator.clipboard.writeText(siteUrl);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 text-center">
          <div className="inline-flex items-center gap-2 text-blue-500 font-bold mb-6 uppercase tracking-[0.3em] text-[10px]">
            <QrCode className="w-4 h-4" /> Compartilhar Site
          </div>
          
          <h3 className="text-xl font-industrial text-white mb-6 uppercase">Acesso Rápido</h3>
          
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 inline-block shadow-inner">
            <img 
              src={qrCodeUrl} 
              alt="QR Code do Site" 
              className="w-48 h-48 md:w-56 md:h-56 rounded-lg"
            />
          </div>

          <div className="space-y-3">
            <button 
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold transition-all active:scale-95"
            >
              <Share2 className="w-5 h-5" />
              Compartilhar Link
            </button>
            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mt-4">
              Aponte a câmera para escanear
            </p>
          </div>
        </div>
        
        <div className="bg-slate-800/30 p-4 text-center border-t border-slate-800">
          <span className="text-[9px] text-slate-600 font-mono uppercase tracking-tighter">
            itajaimetal.com.br
          </span>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;