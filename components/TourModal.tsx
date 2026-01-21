
import React from 'react';
import { TourPoint } from '../types';

interface TourModalProps {
  point: TourPoint | null;
  onClose: () => void;
}

const TourModal: React.FC<TourModalProps> = ({ point, onClose }) => {
  if (!point) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all scale-up-center border-4 border-[#2dfc52]/20">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-[#9d00ff] text-white rounded-full hover:rotate-90 transition-transform duration-300 shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img 
              src={point.image} 
              alt={point.title} 
              className="w-full h-[300px] md:h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white">
            <span className="text-[#00e5ff] font-black text-xs uppercase tracking-[0.3em] mb-3">Parada del Tour</span>
            <h2 className="text-4xl font-black text-[#0a0b1e] font-montserrat mb-6 leading-tight uppercase italic">
              {point.title}
            </h2>
            <div className="w-16 h-2 bg-[#2dfc52] mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
              {point.description}
            </p>
            <a 
              href="https://wa.me/573022481583" 
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-black py-5 px-8 rounded-2xl hover:bg-[#2dfc52] hover:text-black transition-all duration-300 shadow-xl"
            >
              Consultar disponibilidad en WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourModal;
