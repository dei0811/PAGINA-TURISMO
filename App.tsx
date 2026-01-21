import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import TourModal from './components/TourModal';
import { TourPoint } from './types';
import { client } from './sanity_client/client';
import { GET_CONTENT_BY_LANG } from './sanity_client/queries';

// Interface para los videos de Sanity
interface SanityVideo {
  title?: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

const App: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<TourPoint | null>(null);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [lang]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const data = await client.fetch(GET_CONTENT_BY_LANG, { lang });
      console.log('Datos recibidos:', data);
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = (num: string) => {
    window.open(`https://wa.me/${num}`, '_blank');
  };

  // Videos por defecto si no hay en Sanity
  const defaultVideos: SanityVideo[] = [
    { videoUrl: "videos/vid1.mp4", title: "Live Cam 01" },
    { videoUrl: "videos/vid2.mp4", title: "Live Cam 02" },
    { videoUrl: "videos/vid3.mp4", title: "Live Cam 03" }
  ];

  // Usa videos de Sanity o por defecto
  const videos: SanityVideo[] = content?.videos || defaultVideos;

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-[#0a0b1e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2dfc52] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white/60">Cargando contenido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-[#2dfc52] selection:text-black overflow-x-hidden bg-[#0a0b1e] text-white font-montserrat">
      {/* Selector de Idioma Flotante */}
      <nav className="fixed top-0 right-0 p-6 z-50 flex gap-4">
        <div className="bg-black/60 backdrop-blur-2xl rounded-full px-5 py-2 border border-white/10 flex gap-3 text-sm font-bold shadow-2xl">
          <button 
            onClick={() => setLang('es')} 
            className={`${lang === 'es' ? 'text-[#00e5ff]' : 'text-white/40 hover:text-white'} transition-colors uppercase tracking-widest`}
          >
            ES
          </button>
          <span className="text-white/10">|</span>
          <button 
            onClick={() => setLang('en')} 
            className={`${lang === 'en' ? 'text-[#00e5ff]' : 'text-white/40 hover:text-white'} transition-colors uppercase tracking-widest`}
          >
            EN
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-4 py-32 bg-hero-company">
        <div className="relative text-center space-y-10 max-w-5xl mx-auto px-4 z-10">
          <div className="inline-block px-8 py-2 bg-[#2dfc52] text-black rounded-full text-[10px] font-black tracking-[0.4em] uppercase mb-4 shadow-[0_0_20px_rgba(45,252,82,0.6)]">
            {content.heroTag}
          </div>

          <h1 className="font-pacifico text-7xl md:text-9xl text-white neon-text-green drop-shadow-2xl leading-tight">
            {content.heroTitle} <br className="md:hidden" /> <span className="text-[#fdfd00] neon-text-yellow">{content.heroTitleHighlight}</span>
          </h1>

          <p className="text-xl md:text-3xl font-semibold text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-md pt-4">
            {content.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12 items-center">
            <button 
              onClick={() => handleWhatsApp('573022481583')} 
              className="w-full sm:w-auto bg-[#fdfd00] text-black font-black py-6 px-10 rounded-2xl text-lg uppercase tracking-wider shadow-2xl hover:scale-105 transition-all animate-neon-green flex items-center justify-center gap-4"
            >
              <span>{content.btnReserve} 1</span>
            </button>
            <button 
              onClick={() => handleWhatsApp('573005451083')} 
              className="w-full sm:w-auto bg-[#9d00ff] text-white font-black py-6 px-10 rounded-2xl text-lg uppercase tracking-wider shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-4 border-2 border-white/20"
            >
              <span>{content.btnReserve} 2</span>
            </button>
          </div>
        </div>
      </header>

      {/* Galería de Puntos de Interés - CORREGIDO */}
      <section className="py-32 px-4 relative z-10 bg-[#0a0b1e] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            {/* CAMBIA servicesTitle por tourZonesTitle */}
            <h2 className="font-pacifico text-6xl text-[#2dfc52] neon-text-green italic">
              {content.tourZonesTitle || "Nuestro Recorrido"}
            </h2>
            <div className="w-40 h-1.5 bg-[#00e5ff] mx-auto rounded-full shadow-[0_0_15px_#00e5ff]"></div>
            {/* CAMBIA servicesSubtitle por tourZonesSubtitle */}
            <p className="max-w-2xl mx-auto text-xl text-white/60 font-medium leading-relaxed">
              {content.tourZonesSubtitle || "Descubre las mejores zonas"}
            </p>
          </div>

          {/* Verifica si hay puntos */}
          {content.points && content.points.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {content.points.map((point: TourPoint) => (
                <ImageCard key={point.id} point={point} onClick={setSelectedPoint} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-white/60 text-lg">No hay puntos de tour disponibles.</p>
              <p className="text-white/40 text-sm mt-2">
                Agrega puntos en Sanity Studio en el campo "Puntos/Zonas del Tour"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Section - La Fiesta en Vivo - CORREGIDO */}
      <section className="py-32 px-4 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-pacifico text-[#fdfd00] neon-text-yellow mb-4">
              {content.liveTitle}
            </h3>
            <p className="text-white/40 font-black text-xs tracking-[0.4em] uppercase italic">
              Siente la energía del tour
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* CAMBIA videoUrls por videos */}
            {videos.map((video: SanityVideo, idx: number) => (
              <div key={idx} className="aspect-[9/16] md:aspect-video bg-black rounded-[2.5rem] overflow-hidden border-4 border-white/5 hover:border-[#2dfc52] transition-all relative group shadow-2xl">
                <video 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  poster={video.thumbnailUrl}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Tu navegador no soporta videos HTML5.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-8 left-8 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#2dfc52] rounded-full flex items-center justify-center animate-pulse shadow-[0_0_15px_#2dfc52]">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50">
                    {video.title || `Live Cam 0${idx + 1}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 px-4 bg-[#0a0b1e]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pacifico text-5xl text-[#fdfd00] text-center mb-20 neon-text-yellow">
            {content.whyTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {content.whyUs?.map((item: string, i: number) => (
              <div key={i} className="flex flex-col gap-5 bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-[#2dfc52] transition-all group overflow-hidden">
                <div className="w-14 h-14 bg-[#9d00ff] rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-lg">🎊</div>
                <span className="font-montserrat font-black text-2xl text-white italic uppercase tracking-tighter leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[#050612] text-center px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="font-pacifico text-4xl text-[#fdfd00] neon-text-yellow">Agencia López Tour</h2>
          <p className="text-white/20 text-xs font-black uppercase tracking-[0.5em]">
            © 2026 López Tour Cartagena – {content.footerTag}
          </p>
          <div className="h-1 w-32 bg-[#2dfc52] mx-auto rounded-full opacity-50 shadow-[0_0_10px_#2dfc52]"></div>
        </div>
      </footer>

      <TourModal point={selectedPoint} onClose={() => setSelectedPoint(null)} />
    </div>
  );
};

export default App;