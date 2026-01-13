
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin } from 'lucide-react';

const CIMUA_PINK = "#f0a6ca";
const CIMUA_BLUE = "#63b3ed";

const WORKS = [
  { id: 1, title: 'ESCUCHANDO ROCAS', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop', color: 'bg-blue-500/40' },
  { id: 2, title: 'VISIÓN CREATIVA', img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop', color: 'bg-purple-500/40' },
  { id: 3, title: 'SONIDO URBANO', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop', color: 'bg-pink-500/40' },
  { id: 4, title: 'CINE LIBRE', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop', color: 'bg-cyan-500/40' },
];

const GALLERY = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514525253361-bee8d4001db1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',
];

const Marquee = () => (
  <div className="bg-white text-black py-4 overflow-hidden border-y border-black">
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      {[...Array(10)].map((_, i) => (
        <span key={i} className="text-sm font-bold mx-8 uppercase">
          12 / JUNIO / 2026 Estreno "La Danza, una expresión con ritmo" • 24 / JUNIO / 2026 Conferencia "La música en la calle" •
        </span>
      ))}
    </motion.div>
  </div>
);

const Calendar = () => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const dates = [
  '', '', '', '', '', '', 1, // 6 espacios para que el 1 sea Sábado
  2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29,
  30, 31
  ];
  const activeDays = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="max-w-5xl mx-auto py-24 px-6">
      <div className="flex justify-end mb-4">
        <span className="text-xl font-bold text-gray-500">2026</span>
      </div>
      <div className="flex items-baseline gap-4 mb-16">
        <h3 className="text-7xl md:text-9xl font-display text-white uppercase tracking-tighter">Agosto</h3>
        <div className="h-1 flex-1 bg-white/10 hidden md:block"></div>
      </div>
      
      <div className="bg-cimua-gradient rounded-full p-2 mb-12">
        <div className="flex justify-between px-8 py-4">
          {days.map(d => <span key={d} className="text-sm md:text-lg font-black uppercase text-black">{d}</span>)}
        </div>
      </div>

     <div className="grid grid-cols-7 gap-y-2 md:gap-y-4 text-center">
  {dates.map((d, i) => {
    const isActive = typeof d === 'number' && activeDays.includes(d);
    return (
      <div key={i} className="flex items-center justify-center relative h-16 md:h-24">
        {/* Círculo de color para días activos */}
        {isActive && (
          <div 
            className="absolute bg-cimua-gradient rounded-full z-0 w-12 h-12 md:w-20 md:h-20 shadow-[0_0_20px_rgba(240,166,202,0.4)]"
            style={{ display: 'block' }} // Forzamos que se muestre
          />
        )}
        
        {/* Número del día */}
        <span className={`relative z-10 text-xl md:text-4xl font-black transition-colors 
          ${typeof d === 'number' 
            ? (isActive ? 'text-black' : 'text-white') 
            : 'text-transparent'
          }`}
        >
          {d}
        </span>
      </div>
    );
  })}
</div>
      <div className="mt-8 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-4 items-center">
           <div className="w-4 h-4 rounded-full bg-cimua-gradient"></div>
           <span className="text-xs uppercase font-bold tracking-widest text-gray-400">Días de Festival</span>
        </div>
        <p className="text-sm font-light text-gray-500 max-w-sm text-center md:text-right">
          Programación sujeta a cambios. Consulta la sección de Media para actualizaciones de último minuto.
        </p>
      </div>
    </div>
  );
};

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black selection:bg-pink-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md px-6 py-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-display text-2xl tracking-tighter">CIMUA</div>
          
          <div className="hidden md:flex gap-12 text-[10px] font-bold tracking-[0.2em] uppercase">
            {['Festival', 'Nosotrxs', 'Calendario', 'Media'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-pink-400 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[60] bg-black p-12 flex flex-col gap-8 text-4xl font-display uppercase"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6"><X size={32}/></button>
            {['Festival', 'Nosotrxs', 'Calendario', 'Media'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left">{item}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Slider */}
      <section className="pt-24 pb-12 px-6">
        <div className="w-full px-30">
          <h2 className="text-center text-4xl font-display mb-12 italic opacity-80">works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
  {WORKS.map((work) => (
    <div key={work.id} className="relative group overflow-hidden h-[480px] bg-zinc-900 border border-white/10">
      <img 
        src={work.img} 
        className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0" 
        alt={work.title} 
      />
      <div className={`absolute inset-0 ${work.color} opacity-30`} />
      <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/40 group-hover:bg-transparent transition-colors">
        <span className="text-xl font-display text-center leading-tight tracking-tight uppercase px-4 py-2 border border-white/20 backdrop-blur-sm">
          {work.title}
        </span>
      </div>
    </div>
  ))}
</div>
       
        </div>
      </section>

      <Marquee />

      {/* Festival Section */}
      <section id="festival" className="py-24 px- text-center">
        <div className="w-full px-30">
          <h1 className="text-[18vw] font-display uppercase leading-[0.8] mb-12 w-full text-center">FESTIVAL</h1>
          <div className="space-y-6 text-lg md:text-xl font-light text-gray-300">
            <p>
              <strong className="text-white">CIMUA / Cine, Música y Audiovisual</strong> se lleva a cabo en Ciudad de México del 3 al 12 de Agosto de 2026.
            </p>
            <p>
              Disfruta de distintas locaciones como cines, jardines, cafeterías en el centro de la ciudad.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="mt-12 px-12 py-4 bg-pink-gradient rounded-full text-black font-bold uppercase tracking-widest text-sm shadow-xl shadow-pink-500/20"
          >
            Locaciones
          </motion.button>
        </div>
      </section>

     {/* Nosotrxs Section */}
<section id="nosotrxs" className="py-24 px-20">
  {/* Ajustamos el contenedor al mismo ancho que tus fotos de arriba */}
  <div className="w-full px-20 mx-auto"> 
    
    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_0.45fr] gap-12 items-start">
      
      {/* Columna Izquierda: Título + Texto */}
      <div className="space-y-12">
        <h2 className="text-[12vw] md:text-[13vw] font-display uppercase leading-[0.7] tracking-tighter break-words max-w-full">
    NOSOTRXS
        </h2>
        
        <div className="bg-[#e4a5c5] p-12 md:p-35 text-black">
          {/* Contenido del cuadro rosa */}
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-12">
            <strong className="font-black">CIMUA</strong> es un festival que reúne artistas, creadores y emergentes para ampliar la visión creativa de la música, el cine y proyectos audiovisuales en un mismo lugar.
          </p>
          <p className="text-lg opacity-80">
            Un espacio para hacer comunidad, guardar recuerdos y compartir experiencias.
          </p>
        </div>
      </div>
      
      {/* Columna Derecha: Foto (ahora subirá al nivel del título) */}
      <div className="relative aspect-[3/4] overflow-hidden bg-white mt-4 md:mt-0">
        <img 
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop" 
          className="w-full h-full object-cover grayscale brightness-125 contrast-150" 
          alt="Artist" 
        />
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
      </div>

    </div>
  </div>
</section>

      {/* Calendario Section */}
      <section id="calendario" className="py-24 bg-black">
        <Calendar />
      </section>

      {/* Media Section */}
<section id="media" className="py-24 px-6 bg-black">
  <div className="max-w-7xl mx-auto relative group">
    
    <div className="overflow-hidden">
      <motion.div 
        className="flex gap-4"
        animate={{ x: `-${galleryIndex * (100 / 3)}%` }} // Mueve el carrusel
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {GALLERY.map((img, i) => (
          <div 
            key={i} 
            className="min-w-[calc(33.333%-11px)] aspect-[4/3] border border-white/10 bg-zinc-900 overflow-hidden"
          >
            <img 
              src={img} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              alt={`Gallery ${i}`} 
            />
          </div>
        ))}
      </motion.div>
    </div>

    {/* Flecha Izquierda */}
<button 
  onClick={() => setGalleryIndex((prev) => (prev === 0 ? GALLERY.length - 3 : prev - 1))}
  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md text-white rounded-full z-20 hover:bg-cimua-pink hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-2xl"
>
  <ChevronLeft size={24} />
</button>

{/* Flecha Derecha */}
<button 
  onClick={() => setGalleryIndex((prev) => (prev >= GALLERY.length - 3 ? 0 : prev + 1))}
  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md text-white rounded-full z-20 hover:bg-cimua-pink hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-2xl"
>
  <ChevronRight size={24} />
</button>

    {/* Indicadores */}
    <div className="flex justify-center gap-2 mt-12">
      {GALLERY.map((_, i) => (
        <div 
          key={i} 
          className={`h-1 transition-all duration-500 ${i === galleryIndex ? 'w-12 bg-cimua-pink' : 'w-4 bg-white/10'}`}
        />
      ))}
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-[15vw] font-display uppercase leading-[0.8] tracking-tighter mb-4">CIMUA</h1>
          <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-60">Cine, Música y Audiovisual</p>
          
          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-widest opacity-40">
            <span>© 2026 CIMUA Festival</span>
            <div className="flex gap-8">
              <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
