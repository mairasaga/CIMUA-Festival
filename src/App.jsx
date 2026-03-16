import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
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
    '', '', 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30
  ];
  const activeDays = [22, 23, 24, 25, 26];

  return (
    <div className="max-w-5xl mx-auto py-24 px-6">
      <div className="flex justify-end mb-4">
        <span className="text-xl font-bold text-gray-500">2026</span>
      </div>
      <div className="flex items-baseline gap-4 mb-16">
        <h3 className="text-7xl md:text-9xl font-display text-white uppercase tracking-tighter">Septiembre</h3>
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
              {isActive && (
                <div 
                  className="absolute bg-cimua-gradient rounded-full z-0 w-12 h-12 md:w-20 md:h-20 shadow-[0_0_20px_rgba(240,166,202,0.4)]"
                  style={{ display: 'block' }}
                />
              )}
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
  const { scrollYProgress } = useScroll(); 
  const yPos = useTransform(scrollYProgress, [0, 600], [0, -300]);

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
      
      {/* SECCIÓN FESTIVAL - TEXTO SUBIDO EN MÓVIL */}
      <section id="festival" style={{ 
        backgroundColor: '#f7aebb', 
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: typeof window !== 'undefined' && window.innerWidth < 768 ? 'flex-start' : 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '60px 5% 0 5%' : '0 5%', 
      }}>

        {/* --- IMÁGENES MÓVIL --- */}
        {typeof window !== 'undefined' && window.innerWidth < 768 && (
          <div style={{
            width: '150%', 
            marginLeft: '-25%', 
            marginTop: '-280px', 
            display: 'flex',
            position: 'relative', 
            marginBottom: '0px', // Quitamos margen para que el texto suba más
            zIndex: 1
          }}>
            <img src="/cimua_assets/Capa 1.png" style={{ width: '100%', height: 'auto' }} alt="ojos" />
            <img 
              src="/cimua_assets/Capa 2.png" 
              style={{ 
                position: 'absolute',
                top: '25%', 
                left: '20%', 
                width: '35%',
                zIndex: 2
              }} 
              alt="capa2"
            />
          </div>
        )}

        {/* --- BLOQUE DE TEXTO (Subido con margen negativo en móvil) --- */}
        <div className="mx-auto md:ml-auto md:mr-[2%]" style={{ 
          position: 'relative',
          zIndex: 10,
          width: '95%', 
          maxWidth: '500px', 
          textAlign: 'center',
          // marginTop negativo en móvil para que aparezca "arriba" de la imagen
          marginTop: typeof window !== 'undefined' && window.innerWidth < 768 ? '-60px' : '15vh'
        }}>
          <p style={{ 
            fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '1.8rem' : '2.6rem',
            lineHeight: '1.1',
            marginBottom: '30px', 
            fontWeight: '300', 
            color: typeof window !== 'undefined' && window.innerWidth < 768 ? '#fff' : '#000'
          }}>
            <strong style={{ fontWeight: '800' }}>CIMUA</strong> / Cine, Música y Audiovisual se lleva a cabo en Ciudad de México del <span style={{ fontWeight: '700' }}>22 al 26 de Septiembre</span> de 2026.
          </p>
          <p style={{ 
            fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '1.4rem' : '2.2rem', 
            lineHeight: '1.3',
            fontWeight: '300',
            color: typeof window !== 'undefined' && window.innerWidth < 768 ? '#fff' : 'rgba(0, 0, 0, 0.8)' 
          }}>
            Vive el encuentro de la <strong style={{ fontWeight: '800' }}>música</strong> y el <strong style={{ fontWeight: '800' }}>cine</strong> en un solo lugar.
          </p>
        </div>

        {/* --- IMÁGENES PC (Sin cambios) --- */}
        {typeof window !== 'undefined' && window.innerWidth >= 768 && (
          <>
            <motion.img 
              src="/cimua_assets/Capa 1.png" 
              initial={{ x: "-80%", y: 50, opacity: 0 }}
              animate={{ x: "-85%", y: 200, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ position: 'absolute', bottom: 0, left: '50%', width: '100%', maxWidth: '700px', zIndex: 1 }} 
            />
            <motion.img 
              src="/cimua_assets/Capa 2.png" 
              initial={{ x: "-100%", y: 0, opacity: 0 }} 
              animate={{ x: "-160%", y: 0, opacity: 1 }} 
              transition={{ duration: 1.2, delay: 0.3 }} 
              style={{ position: 'absolute', bottom: 10, left: '40%', width: '100%', maxWidth: '300px', zIndex: 2 }} 
            />
          </>
        )}
      </section>

      {/* --- MARQUEE --- */}
      <div className="bg-white text-black py-4 overflow-hidden border-y border-black mt1 mb0">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-sm font-bold mx-8 uppercase flex items-center">
              CONVOCATORIA ABIERTA DEL 16 DE MARZO AL 3 DE AGOSTO <span className="mx-4">•</span> 
              FESTIVAL DEL 22 AL 26 DE SEPTIEMBRE <span className="mx-4">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* --- NOSOTRXS --- */}
      <section id="nosotrxs" style={{ backgroundColor: '#2b7cc2', color: '#fff', minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 5%' }}>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <div style={{ flex: '1 1 400px', textAlign: 'left', zIndex: 2, padding: '20px' }}>
            <h2 style={{ fontSize: 'clamp(3.8rem, 10vw, 9rem)', fontWeight: '900', lineHeight: '0.8', textTransform: 'uppercase', marginBottom: '30px' }}>NOSOTRXS</h2>
            <div style={{ maxWidth: '550px' }}>
              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', lineHeight: '1.2', marginBottom: '1.5rem' }}>CIMUA es un festival que reúne artistas, creadores y emergentes para ampliar la visión creativa.</p>
              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', lineHeight: '1.2' }}>Un espacio para hacer comunidad, guardar recuerdos y compartir experiencias.</p>
            </div>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <img src="/cimua_assets/Capa 4.png" alt="Cámara" style={{ width: '100%', maxWidth: '450px', transform: 'translateY(50px)', zIndex: 1 }} />
          </div>
        </div>
      </section>

      <section id="calendario" className="py 0 bg-black"><Calendar /></section>

     {/* --- SECCIÓN CONVOCATORIA --- */}
<section id="convocatoria" style={{ 
  width: '100%',
  height: '100vh', 
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}}>
  {/* La Imagen de Fondo */}
  <img 
    src="/cimua_assets/backgorund2k_.png" 
    alt="Convocatoria CIMUA"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: '0.66' 
    }}
  />
  
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    style={{
      position: 'relative', 
      zIndex: 2,
      textAlign: 'center',
      padding: '0 20px',
      width: '100%',
      boxSizing: 'border-box'
    }}
  >
    <h2 style={{ 
      color: '#fff', 
      fontSize: 'clamp(1.8rem, 8vw, 6rem)', 
      fontWeight: '200',
      textTransform: 'uppercase', 
      letterSpacing: '0.1em', 
      margin: '0 0 30px 0',
      textAlign: 'center',
      wordWrap: 'break-word'
    }}>
      CONVOCATORIA 2026
    </h2>
    
    <p style={{ 
      color: '#ccc', 
      maxWidth: '700px', 
      fontSize: 'clamp(1rem, 4vw, 1.5rem)', 
      lineHeight: '1.6',
      marginBottom: '40px',
      textAlign: 'center', 
      marginLeft: 'auto',   
      marginRight: 'auto',
      wordBreak: 'break-word'
    }}>
      Forma parte del festival más importante de artes visuales. 
      <br className="hidden md:block" /> 
      Buscamos creadores que desafíen los límites de la imagen.
    </p>

    {/* CONTENEDOR DE BOTONES ROSAS */}
    <div style={{ 
      display: 'flex', 
      flexDirection: typeof window !== 'undefined' && window.innerWidth < 768 ? 'column' : 'row', 
      gap: '20px', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      {/* Botón 1: Bases */}
      <a 
        href="https://drive.google.com/file/d/1yow02LN8v2tPJ5SuLDJA_knouHkkFn2Q/view?usp=drive_link" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 md:px-12 py-4 bg-pink-gradient rounded-full text-black font-bold uppercase tracking-widest text-xs md:text-sm shadow-xl shadow-pink-500/20"
        >
          BASES
        </motion.button>
      </a>

      {/* Botón 2: Filmfreeway (Ahora Rosa) */}
      <a 
        href="https://filmfreeway.com/CIMUA" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 md:px-12 py-4 bg-pink-gradient rounded-full text-black font-bold uppercase tracking-widest text-xs md:text-sm shadow-xl shadow-pink-500/20"
        >
          FILMFREEWAY
        </motion.button>
      </a>
    </div>
  </motion.div>
</section>

      {/* --- NAVEGACIÓN --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md px-6 py-6 border-b border-white/5 flex items-center justify-between">
          <div className="font-display text-5xl tracking-tighter text-white">CIMUA</div>
          <div className="hidden md:flex gap-12 text-base font-normal tracking-[0.2em] uppercase text-white">
            {['Festival', 'Nosotrxs', 'Calendario', 'Convocatoria'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-pink-400 transition-colors">{item}</button>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[60] bg-black p-12 flex flex-col gap-8 text-4xl text-white font-display uppercase">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6"><X size={32}/></button>
            {['Festival', 'Nosotrxs', 'Calendario', 'Convocatoria'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left">{item}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER --- */}
      <footer className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-[15vw] font-display uppercase leading-[0.8] tracking-tighter mb-4">CIMUA</h1>
          <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-60">Cine, Música y Audiovisual</p>
          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-widest opacity-40">
            <span>© 2026 CIMUA Festival</span>
            <div className="flex gap-8">
              <a href="https://www.instagram.com/cimua.fest" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="mailto:direcciongral@cimua.com.mx">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;