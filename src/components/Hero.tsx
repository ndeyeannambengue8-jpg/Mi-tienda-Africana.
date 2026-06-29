import React from 'react';
import { Sparkles, ArrowRight, Eye } from 'lucide-react';
import { HERO_IMAGE } from '../data';

interface HeroProps {
  onExploreClick: () => void;
  onDesignerClick: () => void;
}

export default function Hero({ onExploreClick, onDesignerClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-zinc-950 py-8 sm:py-12 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
              <span>Nueva Colección de Verano 2026</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none mb-6 font-serif italic">
              Viste la Energía del <br />
              <span className="bg-gradient-to-r from-brand-pink via-brand-deeppink to-pink-300 bg-clip-text text-transparent font-sans not-italic font-black">
                Sol Africano
              </span>
            </h1>
            
            <p className="text-lg text-zinc-300 mb-8 max-w-xl">
              Descubre nuestra exclusiva colección de ropa de verano inspirada en estampados tradicionales africanos (Ankara, Kente y Dashiki). Diseños frescos, audaces y llenos de vida que celebran la riqueza cultural y el estilo contemporáneo.
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-pink-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <span>Explorar Colección</span>
                <ArrowRight className="w-5 h-5 ml-2.5" />
              </button>

              <button
                onClick={onDesignerClick}
                className="inline-flex items-center justify-center px-8 py-4 bg-zinc-900 hover:bg-zinc-850 text-pink-400 border border-zinc-800 hover:border-pink-500/30 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 mr-2.5 text-pink-400" />
                <span>Diseña tu Estampado IA</span>
              </button>
            </div>

            {/* Cultural highlights */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-zinc-800 pt-8 max-w-lg sm:mx-auto lg:mx-0">
              <div>
                <span className="block text-2xl font-black text-pink-500">100%</span>
                <span className="text-xs text-zinc-400 font-medium">Algodón Orgánico</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-pink-500">Ankara</span>
                <span className="text-xs text-zinc-400 font-medium">Estilo Auténtico</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-pink-500">AI Swatch</span>
                <span className="text-xs text-zinc-400 font-medium">Personalizable</span>
              </div>
            </div>
          </div>

          {/* Right Image/Banner Column */}
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6 relative">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl group border-4 border-zinc-900 bg-zinc-950">
              <img
                src={HERO_IMAGE}
                alt="Moda Africana de Verano"
                className="w-full h-[32rem] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-1.5 font-mono">Diseño de la Semana</p>
                <h3 className="text-xl font-bold tracking-tight mb-2">Keisha Maxi & Dashiki Golden</h3>
                <p className="text-sm text-gray-200">Encuentra tu vibra este verano.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
