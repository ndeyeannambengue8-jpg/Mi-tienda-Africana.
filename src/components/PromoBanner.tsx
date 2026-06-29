import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PromoBannerProps {
  onSelectCategory: (category: string) => void;
}

export default function PromoBanner({ onSelectCategory }: PromoBannerProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gray-900 text-white min-h-[380px] flex items-center group">
        {/* Background Image with gorgeous warm summer colors */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=1200&auto=format&fit=crop&q=80"
            alt="Moda de Playa y Calzado de Verano"
            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-900/60 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-10 flex flex-col justify-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>Colección Destacada</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3 font-serif italic text-white">
            Estilo Resort & <span className="font-sans not-italic font-black text-pink-400">Calzado Exclusivo</span>
          </h2>
          
          <p className="text-sm sm:text-base text-gray-200 mb-6 max-w-lg leading-relaxed">
            Completa tu maleta de vacaciones con nuestros nuevos diseños de playa y zapatos artesanales. Telas fluidas, bañadores de alta costura y alpargatas de yute para caminar sobre el sol.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                onSelectCategory('playa');
                const element = document.getElementById('collection-anchor');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-5 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-pink-500/20 transition-all duration-300 cursor-pointer"
            >
              <span>Ver Ropa de Playa</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>

            <button
              onClick={() => {
                onSelectCategory('zapatos');
                const element = document.getElementById('collection-anchor');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold backdrop-blur-xs transition-all duration-300 cursor-pointer"
            >
              <span>Ver Calzado</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-pink-400" />
            </button>
          </div>
        </div>

        {/* Floating badge for added polish */}
        <div className="absolute bottom-6 right-6 hidden md:block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 max-w-xs text-right text-white">
          <p className="text-[10px] font-bold text-pink-300 uppercase tracking-widest font-mono mb-1">Última Tendencia</p>
          <p className="text-xs font-semibold text-gray-200">Kaftanes ligeros de seda de lino y alpargatas de yute Kente.</p>
        </div>
      </div>
    </div>
  );
}
