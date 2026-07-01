import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, Compass, Info, Sparkles, AlertTriangle } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

// Coordinates of Calle Galileo 21, Las Palmas de Gran Canaria
const STORE_COORDS = { lat: 28.14027, lng: -15.4364 };

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY.trim() !== '';

export default function StoreLocation() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>('canteras');
  const [showKeyInstructions, setShowKeyInstructions] = useState(false);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  // Common starting points for directions
  const startingPoints = [
    {
      id: 'canteras',
      name: 'Playa de Las Canteras (Paseo)',
      desc: 'A solo 1 minuto a pie. Camina hacia el este por la calle Galileo una cuadra y llegarás a nuestra puerta.',
      time: '1 min pie',
      distance: '80m'
    },
    {
      id: 'catalina',
      name: 'Parque de Santa Catalina',
      desc: 'Sigue la Calle Luis Morote en dirección oeste hacia Las Canteras, gira a la izquierda en la Calle General Vives, luego a la derecha en la Calle Galileo hasta el número 21.',
      time: '6 min pie',
      distance: '450m'
    },
    {
      id: 'mesa',
      name: 'Zona Comercial Mesa y López',
      desc: 'Sube por la Calle Presidente Alvear hacia el norte, gira a la izquierda por la Calle Bernardo de la Torre y continúa recto hasta conectar con Galileo.',
      time: '12 min pie',
      distance: '1.0 km'
    },
    {
      id: 'aeropuerto',
      name: 'Aeropuerto de Gran Canaria (LPA)',
      desc: 'Toma la autopista GC-1 hacia el norte (Las Palmas de G.C.). Toma la salida hacia el Puerto/Plaza de España, continúa por la Av. Marítima y entra a la zona de Santa Catalina por la Calle León y Castillo.',
      time: '22 min coche',
      distance: '26 km'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="store-location-page">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-pink-500 font-mono text-xs font-bold uppercase tracking-widest bg-pink-500/10 px-3 py-1.5 rounded-full">
          Tienda Física & Showroom
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 font-serif italic">
          Ven a Visitarnos en <span className="text-pink-500 font-sans not-italic">Gran Canaria</span>
        </h1>
        <p className="text-sm text-zinc-400 mt-2">
          Siente la frescura de nuestras telas, pruébate tus creaciones personalizadas y vive la experiencia AFRIVIBE en persona.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left column: Store Details and Route Planner */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Main Info Card */}
          <div className="bg-zinc-900 border border-zinc-850 rounded-3xl p-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl -mr-8 -mt-8" />
            
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <MapPin className="text-pink-500 w-5 h-5 animate-bounce" />
              AFRIVIBE Beach Boutique
            </h2>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block font-mono">Dirección</span>
                  <span className="text-white font-medium text-sm">Calle Galileo 21, Santa Catalina</span>
                  <span className="text-zinc-500 text-xs block">35010 Las Palmas de Gran Canaria, España</span>
                  <span className="text-pink-500 text-xs font-semibold block mt-1">Cerca de la Playa de Las Canteras</span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block font-mono">Horario de Apertura</span>
                  <div className="text-white font-medium text-sm flex justify-between gap-4 mt-0.5">
                    <span>Lunes a Sábado:</span>
                    <span className="font-bold">10:00 – 20:30</span>
                  </div>
                  <div className="text-white font-medium text-sm flex justify-between gap-4">
                    <span>Domingos:</span>
                    <span className="font-bold text-pink-400">11:00 – 18:00</span>
                  </div>
                </div>
              </div>

              {/* Phone / Contact */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block font-mono">Contacto</span>
                  <span className="text-white font-medium text-sm block">+34 928 123 456</span>
                  <span className="text-zinc-500 text-xs block">hola@afrivibe.es</span>
                </div>
              </div>
            </div>

            {/* Quick Promo alert */}
            <div className="bg-pink-500/5 border border-pink-500/10 rounded-2xl p-4 mt-6 flex items-start gap-3">
              <Sparkles className="text-pink-500 w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold text-xs block">¿Sabías que...?</span>
                <p className="text-xs text-zinc-300 mt-1">
                  Puedes diseñar tu ropa con nuestro <strong>Diseñador IA</strong> en la web, reservarla y probártela directamente en nuestro vestidor físico de la tienda. ¡Te la confeccionamos en el día!
                </p>
              </div>
            </div>
          </div>

          {/* Route Planner */}
          <div className="bg-zinc-900 border border-zinc-850 rounded-3xl p-6 shadow-xl flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-md font-bold text-white mb-4 flex items-center gap-2">
                <Navigation className="text-pink-500 w-4 h-4" />
                ¿Cómo llegar a la tienda?
              </h3>
              <p className="text-xs text-zinc-400 mb-4">
                Elige tu punto de partida para ver las instrucciones de llegada y tiempos estimados de trayecto:
              </p>

              <div className="space-y-2 max-h-56 overflow-y-auto scrollbar-none pr-1">
                {startingPoints.map((point) => (
                  <button
                    key={point.id}
                    onClick={() => setSelectedRoute(point.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedRoute === point.id
                        ? 'bg-pink-500/10 border-pink-500 text-white'
                        : 'bg-zinc-950/40 border-zinc-850 hover:border-zinc-800 text-zinc-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs">{point.name}</span>
                      <span className="text-[10px] bg-zinc-800 text-pink-400 font-mono font-semibold px-2 py-0.5 rounded-full shrink-0">
                        {point.time} ({point.distance})
                      </span>
                    </div>
                    {selectedRoute === point.id && (
                      <p className="text-xs text-zinc-300 mt-2 leading-relaxed animate-fade-in">
                        {point.desc}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {selectedRoute && (
              <button
                onClick={() => setSelectedRoute(null)}
                className="w-full text-center mt-4 text-[11px] text-zinc-500 hover:text-pink-500 font-bold tracking-wider uppercase transition-all"
              >
                Limpiar ruta seleccionada
              </button>
            )}
          </div>
        </div>

        {/* Right column: Interactive Map / Dynamic Fallback Panel */}
        <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-zinc-850 bg-zinc-950 min-h-[480px] lg:min-h-full flex flex-col relative shadow-2xl">
          
          {hasValidKey ? (
            /* Google Maps API active Map */
            <div className="w-full h-full min-h-[480px] relative flex-grow">
              <APIProvider apiKey={API_KEY} version="weekly">
                <Map
                  defaultCenter={STORE_COORDS}
                  defaultZoom={16}
                  mapId="AFRIVIBE_STORE_MAP"
                  gestureHandling="cooperative"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%', minHeight: '480px' }}
                >
                  <AdvancedMarker
                    ref={markerRef}
                    position={STORE_COORDS}
                    onClick={() => setIsInfoWindowOpen(true)}
                    title="AFRIVIBE Beach Boutique"
                  >
                    {/* Exquisite custom hot fuchsia pin for the boutique */}
                    <Pin
                      background="#ec4899"
                      borderColor="#f472b6"
                      glyphColor="#ffffff"
                      scale={1.15}
                    />
                  </AdvancedMarker>

                  {isInfoWindowOpen && (
                    <InfoWindow anchor={marker} onCloseClick={() => setIsInfoWindowOpen(false)}>
                      <div className="p-2 text-zinc-900 max-w-xs">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                          <strong className="text-xs font-bold text-zinc-950">AFRIVIBE Boutique</strong>
                        </div>
                        <p className="text-[10px] text-zinc-600 font-medium">
                          Calle Galileo 21, Santa Catalina.
                          <br />
                          ¡A pasos de Las Canteras!
                        </p>
                        <span className="text-[9px] bg-pink-500/10 text-pink-600 font-bold px-1.5 py-0.5 rounded-full mt-1.5 inline-block">
                          Abierto hoy hasta 20:30
                        </span>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </APIProvider>

              {/* Tiny indicator that map is fully interactive */}
              <div className="absolute top-3 left-3 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-lg px-2.5 py-1 text-[10px] text-zinc-400 font-mono shadow-md flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                Mapa de Google Live
              </div>
            </div>
          ) : (
            /* High-fidelity Fallback Interactive UI when GOOGLE_MAPS_PLATFORM_KEY is missing */
            <div className="w-full h-full flex flex-col justify-between p-6 relative flex-grow bg-gradient-to-b from-zinc-900 to-zinc-950 text-white">
              
              {/* Artistic Schematic Vector / Top view representing coordinates and the sea */}
              <div className="flex-grow flex flex-col items-center justify-center py-6 text-center">
                
                {/* Visual schematic of the block */}
                <div className="relative w-full max-w-sm h-52 bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-inner mb-6 flex flex-col justify-between p-4">
                  {/* Simulated sea wave at the top representing Las Canteras Beach */}
                  <div className="absolute top-0 inset-x-0 h-10 bg-sky-950/40 border-b border-sky-800/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/10 via-transparent to-transparent" />
                    <span className="text-[10px] text-sky-400 uppercase font-mono tracking-widest font-bold">
                      🌊 PLAYA DE LAS CANTERAS (A 80 Metros)
                    </span>
                  </div>

                  {/* Intersecting Streets grid */}
                  <div className="absolute inset-0 top-10 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-px h-full bg-white/40 absolute left-1/4" />
                    <div className="w-px h-full bg-white/40 absolute left-3/4" />
                    <div className="h-px w-full bg-white/40 absolute top-1/3" />
                    <div className="h-px w-full bg-white/40 absolute top-2/3" />
                  </div>

                  {/* Landmarks on map simulation */}
                  <div className="mt-8 flex justify-between text-[9px] font-mono text-zinc-500 px-2 relative z-10">
                    <span>Calle Sagasta</span>
                    <span>Calle Galileo</span>
                    <span>Calle Tomás Miller</span>
                  </div>

                  {/* Pulsing central marker */}
                  <div className="flex flex-col items-center justify-center relative z-20">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-pink-500/30 rounded-full animate-ping" />
                      <div className="absolute -inset-1 bg-pink-500/40 rounded-full blur-sm" />
                      <div className="w-8 h-8 rounded-full bg-pink-500 border border-white flex items-center justify-center text-white shadow-lg relative">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                    </div>
                    <span className="text-[10px] bg-zinc-900 text-white font-bold px-2 py-0.5 rounded-md mt-2 shadow-md border border-pink-500/20">
                      AFRIVIBE Galileo 21
                    </span>
                  </div>

                  {/* Bottom landmarks */}
                  <div className="flex justify-between text-[9px] font-mono text-zinc-500 px-2 relative z-10">
                    <span>Hacia Mesa y López</span>
                    <span className="text-pink-400 font-bold">★ Santa Catalina</span>
                  </div>
                </div>

                {/* Instructions Text */}
                <h4 className="text-md font-bold text-white mb-2">
                  Calle Galileo 21, Las Palmas de Gran Canaria
                </h4>
                <p className="text-xs text-zinc-400 max-w-md px-4 leading-relaxed">
                  Estamos situados exactamente en el corazón de <strong>Santa Catalina</strong>, a tan solo una manzana de la emblemática <strong>Playa de Las Canteras</strong>. Es un local moderno con fachada acristalada y decoraciones florales y de estampados africanos fucsia.
                </p>
              </div>

              {/* Key Setup Instructions Section */}
              <div className="mt-auto bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-pink-500 animate-pulse" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white block">Activar Mapa Interactivo de Google</span>
                      <button
                        onClick={() => setShowKeyInstructions(!showKeyInstructions)}
                        className="text-[10px] text-pink-500 hover:underline font-bold tracking-wide cursor-pointer shrink-0"
                      >
                        {showKeyInstructions ? 'Ocultar Guía' : 'Ver Guía de Activación'}
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                      Para ver el mapa real interactivo con Street View y cálculo de rutas en tiempo real, añade una API Key de Google Maps Platform.
                    </p>
                  </div>
                </div>

                {showKeyInstructions && (
                  <div className="mt-4 border-t border-zinc-800 pt-3 text-xs text-zinc-300 space-y-2 animate-fade-in font-mono bg-zinc-950 p-3 rounded-xl border border-zinc-850">
                    <div className="flex items-center gap-1.5 text-pink-400 font-bold">
                      <Info className="w-3.5 h-3.5" />
                      <span>Sigue estos simples pasos para activarlo:</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-zinc-400 pl-1">
                      <li>
                        Consigue una clave API en{' '}
                        <a
                          href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-500 hover:underline inline-flex items-center"
                        >
                          Google Maps Console ↗
                        </a>
                      </li>
                      <li>
                        Abre los <strong>Ajustes</strong> del espacio de trabajo de AI Studio (el icono de ⚙️ en la esquina superior derecha).
                      </li>
                      <li>
                        Ve a la pestaña <strong>Secrets</strong>.
                      </li>
                      <li>
                        Escribe <code className="text-pink-400 font-bold">GOOGLE_MAPS_PLATFORM_KEY</code> como nombre del secreto, introduce tu clave API en el valor y presiona <strong>Enter</strong>.
                      </li>
                      <li>
                        El servidor reconstruirá automáticamente la aplicación con tu clave segura sin perder tus datos.
                      </li>
                    </ol>
                  </div>
                )}
              </div>
              
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
