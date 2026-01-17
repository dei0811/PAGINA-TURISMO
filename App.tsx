
import React, { useState } from 'react';
import ImageCard from './components/ImageCard';
import TourModal from './components/TourModal';
import { CONTENT } from './constants';
import { TourPoint } from './types';

const App: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<TourPoint | null>(null);
  const [lang, setLang] = useState<'es' | 'en'>('es');

  const t = CONTENT[lang];

  const handleWhatsApp = (num: string) => {
    window.open(`https://wa.me/${num}`, '_blank');
  };

  /**
   * IMPORTANTE: Reemplaza estos enlaces por las URLs de tus videos subidos a la web.
   * He dejado videos de stock de alta calidad por ahora para que veas el efecto.
   */
  const videoUrls = [
    "https://assets.mixkit.co/videos/preview/mixkit-party-people-dancing-in-a-nightclub-4384-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-in-a-party-with-friends-4385-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-pumping-up-the-crowd-at-a-concert-23450-large.mp4"
  ];

  return (
    <div className="min-h-screen selection:bg-[#FF006E] selection:text-white overflow-x-hidden bg-[#0d0221] text-white font-montserrat">
      {/* Selector de Idioma Flotante */}
      <nav className="fixed top-0 right-0 p-6 z-50 flex gap-4">
        <div className="bg-black/60 backdrop-blur-2xl rounded-full px-5 py-2 border border-white/20 flex gap-3 text-sm font-bold shadow-2xl">
          <button 
            onClick={() => setLang('es')} 
            className={`${lang === 'es' ? 'text-[#FFBE0B]' : 'text-white/40 hover:text-white'} transition-colors uppercase tracking-widest`}
          >
            ES
          </button>
          <span className="text-white/10">|</span>
          <button 
            onClick={() => setLang('en')} 
            className={`${lang === 'en' ? 'text-[#FFBE0B]' : 'text-white/40 hover:text-white'} transition-colors uppercase tracking-widest`}
          >
            EN
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-4 py-32 bg-hero-company">
        <div className="relative text-center space-y-10 max-w-5xl mx-auto px-4 z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[280px] h-[280px] md:w-[600px] md:h-[600px] pointer-events-none opacity-10">
             <img src="https://cdn-icons-png.flaticon.com/512/3138/3138374.png" alt="Logo" className="w-full h-full object-contain animate-pulse" />
          </div>

          <div className="inline-block px-8 py-2 bg-[#FF006E] rounded-full text-[10px] font-black tracking-[0.4em] uppercase mb-4 shadow-[0_0_20px_rgba(255,0,110,0.6)]">
            {t.heroTag}
          </div>
          
          <h1 className="font-pacifico text-7xl md:text-9xl text-white neon-text-magenta drop-shadow-2xl leading-tight">
            {t.heroTitle} <br className="md:hidden" /> <span className="text-[#FFBE0B] neon-text-yellow">{t.heroTitleHighlight}</span>
          </h1>
          
          <p className="text-xl md:text-3xl font-semibold text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-md pt-4">
            {t.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12 items-center">
            <button 
              onClick={() => handleWhatsApp('573022481583')} 
              className="w-full sm:w-auto bg-[#FFBE0B] text-black font-black py-6 px-10 rounded-2xl text-lg uppercase tracking-wider shadow-2xl hover:scale-105 transition-all animate-neon flex items-center justify-center gap-4"
            >
              <span>{t.btnReserve} 1</span>
            </button>
            <button 
              onClick={() => handleWhatsApp('573005451083')} 
              className="w-full sm:w-auto bg-[#3A86FF] text-white font-black py-6 px-10 rounded-2xl text-lg uppercase tracking-wider shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-4 border-2 border-white/20"
            >
              <span>{t.btnReserve} 2</span>
            </button>
          </div>
        </div>
      </header>

      {/* Galería de Puntos de Interés */}
      <section className="py-32 px-4 relative z-10 bg-[#0d0221] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <h2 className="font-pacifico text-6xl text-[#FF006E] neon-text-magenta italic">{t.servicesTitle}</h2>
            <div className="w-40 h-1.5 bg-[#3A86FF] mx-auto rounded-full shadow-[0_0_15px_#3A86FF]"></div>
            <p className="max-w-2xl mx-auto text-xl text-white/60 font-medium leading-relaxed">{t.servicesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {t.points.map((point) => (
              <ImageCard key={point.id} point={point} onClick={setSelectedPoint} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Section - La Fiesta en Vivo */}
      <section className="py-32 px-4 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-pacifico text-[#FFBE0B] neon-text-yellow mb-4">{t.liveTitle}</h3>
            <p className="text-white/40 font-black text-xs tracking-[0.4em] uppercase italic">Siente la energía del tour</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {videoUrls.map((url, idx) => (
              <div key={idx} className="aspect-[9/16] md:aspect-video bg-black rounded-[2.5rem] overflow-hidden border-4 border-white/5 hover:border-[#FF006E] transition-all relative group shadow-2xl">
                <video 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                >
                  <source src={url} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-8 left-8 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#FF006E] rounded-full flex items-center justify-center animate-pulse shadow-[0_0_15px_#FF006E]">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Live Cam 0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 px-4 bg-[#0d0221]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pacifico text-5xl text-[#FFBE0B] text-center mb-20 neon-text-yellow">{t.whyTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {t.whyUs.map((item, i) => (
              <div key={i} className="flex flex-col gap-5 bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-[#FF006E] transition-all group overflow-hidden">
                <div className="w-14 h-14 bg-[#3A86FF] rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-lg">🎊</div>
                <span className="font-montserrat font-black text-2xl text-white italic uppercase tracking-tighter leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[#070112] text-center px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="font-pacifico text-4xl text-[#FFBE0B] neon-text-yellow">Agencia López Tour</h2>
          <p className="text-white/20 text-xs font-black uppercase tracking-[0.5em]">© 2026 López Tour Cartagena – {t.footerTag}</p>
          <div className="h-1 w-32 bg-[#FF006E] mx-auto rounded-full opacity-50 shadow-[0_0_10px_#FF006E]"></div>
        </div>
      </footer>

      <TourModal point={selectedPoint} onClose={() => setSelectedPoint(null)} />
    </div>
  );
};

export default App;
