import React from 'react';
import { TourPoint } from '../types';

interface ImageCardProps {
  point: TourPoint;
  onClick: (point: TourPoint) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ point, onClick }) => {
  return (
    <div 
      onClick={() => onClick(point)}
      className="group relative overflow-hidden rounded-[2.5rem] cursor-pointer transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_70px_rgba(45,252,82,0.3)] aspect-[4/5] bg-gray-900 border-2 border-white/10"
    >
      {/* Background Image - CAMBIADO de point.image a point.imageUrl */}
      <img 
        src={point.imageUrl}  // ✅ CAMBIO AQUÍ
        alt={point.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-125 opacity-70 group-hover:opacity-100"
        onError={(e) => {
          console.error('Error cargando imagen:', point.imageUrl);
          e.currentTarget.src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=1000&fit=crop';
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b1e] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700"></div>
      
      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-all duration-700">
        <h3 className="text-3xl font-black text-[#fdfd00] font-montserrat mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] group-hover:text-white transition-all duration-500 uppercase italic">
          {point.title}
        </h3>
        <p className="text-white/90 text-base font-semibold leading-snug mb-4 line-clamp-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
          {point.description}
        </p>
        
        {/* Neon Accent Line - Chiva Green */}
        <div className="h-1.5 w-12 bg-[#2dfc52] rounded-full group-hover:w-full transition-all duration-700 shadow-[0_0_15px_#2dfc52]"></div>
      </div>
    </div>
  );
};

export default ImageCard;