
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
  
  // Septiembre 2026 empieza en Martes (índice 2). 
  // Ponemos 2 espacios vacíos ('') para que el día 1 caiga en Martes.
  const dates = [
    '', '', 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30
  ];

  // Actualizamos los días del festival: del 22 al 26
  const activeDays = [22, 23, 24, 25, 26];

  return (
    <div className="max-w-5xl mx-auto py-24 px-6">
      <div className="flex justify-end mb-4">
        <span className="text-xl font-bold text-gray-500">2026</span>
      </div>
      <div className="flex items-baseline gap-4 mb-16">
        {/* Cambiamos el título a Septiembre */}
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
  const [galleryIndex, setGalleryIndex] = useState(0);

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
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <div className="min-h-screen bg-black selection:bg-pink-500 selection:text-white">
      
      {/* Nueva Sección de Introducción CIMUA */}
<section id="festival" style={{ 
  display: 'flex', 
  flexDirection: 'column',
  backgroundColor: '#000', 
  color: '#fff', 
  minHeight: '110vh',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  flexWrap: 'wrap',
  paddingRight: '0 5% 0 0',
  
  
}}>
  {/* Contenedor de la Imagen */}
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 1 }}>
    <motion.img 
      src="/cimua_assets/grainy girl_02.png" 
      alt="CIMUA Festival" 

      animate={{ 
    y: [-200, -220, -200], // Sube y baja 40px solo
    x: [0, 0, 0]  // Se mueve de lado 0px
  }}
  transition={{ 
    duration: 6, // Movimiento lento de 8 segundos
    repeat: Infinity, 
    ease: "easeInOut" 
  }}
      style={{ width: '100%',
      height: '130vh',
      objectFit: 'cover',
     position: 'absolute',
    top:0,
    left:'0%',
    display: 'block'
    }} 
    />
  </div>

  {/* Contenedor del Glass */}
<div 
  // Usamos className para el margen responsivo
  // mx-auto: centra en móvil
  // md:mr-[15%]: aplica el margen del 15% solo en PC
  // md:ml-auto: mantiene el empuje desde la izquierda en PC
  className="mx-auto md:ml-auto md:mr-[18%]" 
  style={{ 
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(30, 144, 255, 0.25)', 
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '30px 40px', 
    width: '90%', 
    maxWidth: '500px', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '10px',
    // Quitamos los márgenes de aquí para que mande el className de arriba
    marginTop: '10vh' 
  }}
>

    {/* Título con Fechas Actualizadas */}
    <p style={{ 
      fontSize: '2.6rem',
      lineHeight: '1.1',
      marginBottom: '40px', 
      fontWeight: '300', 
      maxWidth: '600px', 
    }}>
      <strong style={{ fontWeight: '800' }}>CIMUA</strong> / Cine, Música y Audiovisual se lleva a cabo en Ciudad de México del <span style={{ fontWeight: '700' }}>22 al 26 de Septiembre</span> de 2026.
    </p>

    {/* Nuevo Gancho con énfasis en Música y Cine */}
    <p style={{ 
      fontSize: '2.2rem', 
      lineHeight: '1.3',
      maxWidth: '500px', 
      fontWeight: '300',
      color: 'rgba(255, 255, 255, 0.95)'
    }}>
      Vive el encuentro de la <strong style={{ fontWeight: '800', color: '#fff' }}>música</strong> y el <strong style={{ fontWeight: '800', color: '#fff' }}>cine</strong> en un solo lugar.
    </p>
  </div>
</section>
{/* --- MARQUEE BLANCO (SOLO UNO) --- */}
<div className="bg-white text-black py-4 overflow-hidden border-y border-black mt0 mb-12">
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
   {/* Nosotrxs Section */}
<section id="nosotrxs" className="pt-24 pb-10 px-6 md:px-20 bg-black overflow-hidden"> 
  <div className="w-full max-w-7xl mx-auto"> 
    
    {/* Título: Estirado de orilla a orilla */}
    <h2 style={{ 
      fontSize: '11vw', // Manteniendo el tamaño imponente que ya tenías
      lineHeight: '.5',
      display: 'flex',
      justifyContent: 'space-between', // ESTO ESTIRA LAS LETRAS AL ANCHO TOTAL
      width: '100%',
      marginBottom: isMobile ? '60px' : '120px', 
  marginTop: '10px',
      marginRight: '-1em' // Compensa el espacio de la última letra si es necesario
    }} 
    className="font-display uppercase mb-8 text-white">
      {"NOSOTRXS".split("").map((letra, index) => (
        <span key={index}>{letra}</span>
      ))}
    </h2>

    {/* Grid equilibrado */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
      
      {/* Columna Izquierda: Caja Rosa */}
      <div className="flex flex-col">
        <div className="bg-[#e4a5c5] p-10 md:p-16 flex flex-col justify-center text-black h-full rounded-[10px]">
          <p className="text-xl md:text-2xl lg:text-3xl font-light leading-tight mb-10">
            <strong className="font-black">CIMUA</strong> es un festival que reúne artistas, creadores y emergentes para ampliar la visión creativa de la música, el cine y proyectos audiovisuales en un mismo lugar.
          </p>
          
          <p className="text-base md:text-lg">
            <span className="bg-[#E6007E] text-white px-4 py-2 font-medium inline-block rounded-sm">
              Un espacio para hacer comunidad, guardar recuerdos y compartir experiencias.
            </span>
          </p>
        </div>
      </div>
      
      {/* Columna Derecha: Imagen */}
      <div className="relative w-full h-[400px] lg:h-auto overflow-hidden bg-zinc-900 rounded-[10px]">
        <img 
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop" 
          className="w-full h-full object-cover grayscale brightness-110 contrast-125 hover:scale-105 transition-transform duration-700" 
          alt="Artist CIMUA" 
        />
        <div className="absolute inset-0 bg-[#E6007E]/5 mix-blend-multiply" />
      </div>

    </div>
  </div>
</section>

      {/* Calendario Section */}
      <section id="calendario" className="py 0 bg-black">
        <Calendar />
      </section>
      
{/* --- SECCIÓN CONVOCATORIA --- */}
<section id="convocatoria" style={{ 
  width: '100%',
  height: '100vh', 
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#000',
  marginTop: '-80px',
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
      width: '100%', // Asegura que el contenedor no mida más que la pantalla
      boxSizing: 'border-box'
    }}
  >
    <h2 style={{ 
      color: '#fff', 
      // Ajustamos el clamp: el mínimo ahora es 1.8rem para que quepa en móviles pequeños
      fontSize: 'clamp(1.8rem, 8vw, 6rem)', 
      fontWeight: '200',
      textTransform: 'uppercase', 
      // Bajamos el letterSpacing en móvil para que no desborde
      letterSpacing: '0.1em', 
      margin: '0 0 30px 0',
      textAlign: 'center',
      wordWrap: 'break-word' // Si aun así no cabe, la palabra se corta
    }}>
      CONVOCATORIA 2026
    </h2>
    
    <p style={{ 
      color: '#ccc', 
      maxWidth: '700px', 
      // Ajustamos el tamaño del texto para móvil usando clamp
      fontSize: 'clamp(1rem, 4vw, 1.5rem)', 
      lineHeight: '1.6',
      marginBottom: '40px',
      textAlign: 'center', 
      marginLeft: 'auto',   
      marginRight: 'auto',
      wordBreak: 'break-word' // Evita que el texto empuje hacia la derecha
    }}>
      Forma parte del festival más importante de artes visuales. 
      <br className="hidden md:block" /> {/* Solo salta línea en PC */}
      Buscamos creadores que desafíen los límites de la imagen.
    </p>

    <a 
      href="https://drive.google.com/file/d/1JIPUwelUgeZI0sRDz5LWzeMSN-Uo2sn_/view?usp=drivesdk" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', display: 'inline-block' }}
    >
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 md:px-12 py-4 bg-pink-gradient rounded-full text-black font-bold uppercase tracking-widest text-xs md:text-sm shadow-xl shadow-pink-500/20"
      >
        APLICA AHORA
      </motion.button>
    </a>
  </motion.div>
</section>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md px-6 py-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-display text-5xl tracking-tighter">CIMUA</div>
          
          <div className="hidden md:flex gap-12 text-base font-normal tracking-[0.2em] uppercase">
            {['Festival', 'Nosotrxs', 'Calendario', 'Convocatoria'].map((item) => (
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
            {['Festival', 'Nosotrxs', 'Calendario', 'Convocatoria'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left">{item}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    {/* Footer */}
<footer className="py-32 px-6 border-t border-white/5">
  <div className="max-w-7xl mx-auto text-center">
    <h1 className="text-[15vw] font-display uppercase leading-[0.8] tracking-tighter mb-4">CIMUA</h1>
    <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-60">Cine, Música y Audiovisual</p>
    
    <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-widest opacity-40">
      <span>© 2026 CIMUA Festival</span>
      <div className="flex gap-8">
        {/* ENLACE DE INSTAGRAM ACTUALIZADO */}
        <a 
          href="https://www.instagram.com/cimua.fest?igsh=MTZrdmFjazc3czhxYw%3D%3D" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:opacity-100 transition-opacity"
        >
          Instagram
        </a>
        
        {/* Enlace de Contacto */}
        <a href="mailto:tuemail@ejemplo.com" className="hover:opacity-100 transition-opacity">
          Contact
        </a>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};

export default App;
