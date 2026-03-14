
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

  return (
    <div className="min-h-screen bg-black selection:bg-pink-500 selection:text-white">
      
      {/* Nueva Sección de Introducción CIMUA */}
<section id="festival" style={{ 
  display: 'flex', 
  backgroundColor: '#000', 
  color: '#fff', 
  minHeight: '110vh',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  paddingRight: '5%' 
  
}}>
  {/* Contenedor de la Imagen */}
  <div style={{ flex: '1.2', minWidth: '300px', height: '90vh', overflow: 'hidden' }}>
    <motion.img 
      src="/cimua_assets/grainy girl_02.png" 
      alt="CIMUA Festival" 

      animate={{ 
    y: [-200, -220, -200], // Sube y baja 40px solo
    x: [0, -60, 0]  // Se mueve de lado 20px
  }}
  transition={{ 
    duration: 6, // Movimiento lento de 8 segundos
    repeat: Infinity, 
    ease: "easeInOut" 
  }}
      style={{ width: '160%',
      height: '120vh',
      objectFit: 'cover',
     position: 'absolute',
    top:0,
    left:'-10%',
    display: 'block'
    }} 
    />
  </div>

  {/* Contenedor del Glass */}
  <div style={{ 
  flex: '1', 
  backgroundColor: 'rgba(30, 144, 255, 0.25)', 
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(30, 144, 255, 0.25)',
  padding: '60px 50px', 
  minWidth: '400px',
  maxWidth: '900px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '70vh',
  zIndex: '10',
  marginLeft: '-80px'
 }}>
    {/* Título con Fechas Actualizadas */}
    <p style={{ 
      fontSize: '2.8rem',
      lineHeight: '1.1',
      marginBottom: '40px', 
      fontWeight: '400', 
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
        
        <div className="bg-[#e4a5c5] p-16 md:p-24 lg:p-32 min-h-[550px] flex flex-col justify-center text-black">
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-12">
            <strong className="font-black">CIMUA</strong> es un festival que reúne artistas, creadores y emergentes para ampliar la visión creativa de la música, el cine y proyectos audiovisuales en un mismo lugar.
          </p>
          
          {/* FRASE RESALTADA COMO EN LA IMAGEN */}
          <p className="text-lg">
            <span style={{ 
              backgroundColor: '#E6007Eca', // El rosa CIMUA de tu paleta
              color: '#fff',            // Letras blancas
              padding: '4px 8px',       // Espacio alrededor del texto para que parezca marca-textos
              fontWeight: '400',
              display: 'inline-block',  // Para que el fondo cubra bien la frase
              lineHeight: '1.4'
            }}>
              Un espacio para hacer comunidad, guardar recuerdos y compartir experiencias.
            </span>
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

{/* --- MARQUEE BLANCO (SOLO UNO) --- */}
<div className="bg-white text-black py-4 overflow-hidden border-y border-black mt-12 mb-12">
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

      {/* Calendario Section */}
      <section id="calendario" className="py-24 bg-black">
        <Calendar />
      </section>
      
{/* --- SECCIÓN CONVOCATORIA --- */}
<section id="convocatoria" style={{ 
  width: '100%',
  height: '100vh', // Misma altura que la intro para mantener el ritmo
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
    src="/cimua_assets/backgorund2k_.png" // <--- Cambia esto por el nombre de tu foto
    alt="Convocatoria CIMUA"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: '0.66' // Bajamos la opacidad para que el texto se lea bien
    }}
  />
  
  {/* El Contenido encima de la imagen */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    style={{
      position: 'relative', // Para que flote sobre la imagen
      zIndex: 2,
      textAlign: 'center',
      padding: '0 20px'
    }}
  >
    <h2 style={{ 
      color: '#fff', 
      fontSize: 'clamp(3rem, 10vw, 6rem)', 
      fontWeight: '200',
      textTransform: 'uppercase', 
      letterSpacing: '0.2em',
      margin: '0 0 30px 0',
      textAlign: 'center'
    }}>
      CONVOCATORIA 2026
    </h2>
    
  <p style={{ 
  color: '#ccc', 
  maxWidth: '700px', 
  fontSize: '1.5rem', 
  lineHeight: '1.6',
  marginBottom: '40px',
  textAlign: 'center', // <--- ESTO centra las líneas de texto
  marginLeft: 'auto',   // <--- ESTO centra el bloque completo
  marginRight: 'auto'   // <--- ESTO centra el bloque completo
}}>
  Forma parte del festival más importante de artes visuales. 
  <br /> {/* Opcional: un salto de línea para mejor ritmo */}
  Buscamos creadores que desafíen los límites de la imagen.
</p>
{/* BOTÓN ACTUALIZADO CON LINK Y ESTILO FESTIVAL */}
    <a 
      href="https://drive.google.com/file/d/1JIPUwelUgeZI0sRDz5LWzeMSN-Uo2sn_/view?usp=drivesdk" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', display: 'inline-block' }}
    >
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-12 py-4 bg-pink-gradient rounded-full text-black font-bold uppercase tracking-widest text-sm shadow-xl shadow-pink-500/20"
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
