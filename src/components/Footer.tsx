import React from 'react';
import { Mail, Shield, Award, Sparkles, Send, Check, Phone, Instagram, Facebook, Ghost } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-pink-500">
      
      {/* Newsletter Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Sparkles className="w-5.5 h-5.5 text-pink-500" />
              <span>Suscríbete al Club AfriVibe</span>
            </h3>
            <p className="text-sm text-gray-400">
              Recibe notificaciones exclusivas de nuevas telas Ankara, lanzamientos de colección y tips de moda de verano africana.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="relative flex max-w-md lg:ml-auto">
              {subscribed ? (
                <div className="w-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-4 py-3 rounded-xl text-xs flex items-center space-x-2 animate-fade-in">
                  <Check className="w-4 h-4" />
                  <span>¡Suscripción exitosa! Bienvenido al club AfriVibe.</span>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo electrónico..."
                    className="w-full pl-4 pr-12 py-3.5 bg-gray-800 text-white border border-gray-700 focus:border-pink-500 rounded-xl text-sm focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg px-3.5 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Blocks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 via-black to-pink-600 flex items-center justify-center text-white font-bold text-base">
                A
              </div>
              <span className="text-base font-bold text-white tracking-tight">AFRIVIBE</span>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              Dedicados a fusionar los ricos textiles tradicionales africanos con siluetas modernas y frescas de verano. Moda con historia, sostenibilidad y exclusividad.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-pink-500 uppercase tracking-widest font-mono">Categorías</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Vestidos Ankara Maxi</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Camisas Dashiki</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Faldas Wrap de Verano</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Conjuntos Étnicos Completos</span></li>
            </ul>
          </div>

          {/* Experience Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-pink-500 uppercase tracking-widest font-mono">Experiencias IA</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Estampador en Tiempo Real</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Probador Virtual Integrado</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Diseño con Gemini 3.1</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Sastrería bajo Demanda</span></li>
            </ul>
          </div>

          {/* Sizing/Assurances & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-pink-500 uppercase tracking-widest font-mono">Contacto y Redes</h4>
            
            <div className="space-y-3 text-xs">
              {/* Phone / Mobile */}
              <a href="tel:+34600123456" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform shrink-0" />
                <span className="font-mono font-medium">+34 600 123 456</span>
              </a>

              <div className="pt-2 border-t border-gray-800 space-y-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Síguenos en Redes</p>
                
                {/* TikTok */}
                <a href="https://tiktok.com/@afrivibe.oficial" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group">
                  <span className="w-4 h-4 text-[11px] bg-black text-pink-500 rounded-sm flex items-center justify-center font-black border border-gray-700 select-none group-hover:scale-110 transition-transform">♬</span>
                  <span>TikTok</span>
                </a>

                {/* Instagram */}
                <a href="https://instagram.com/afrivibe.oficial" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group">
                  <Instagram className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform shrink-0" />
                  <span>Instagram</span>
                </a>

                {/* Facebook */}
                <a href="https://facebook.com/afrivibe.oficial" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group">
                  <Facebook className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform shrink-0" />
                  <span>Facebook</span>
                </a>

                {/* Snapchat */}
                <a href="https://snapchat.com/add/afrivibe.snap" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group">
                  <Ghost className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span>Snapchat</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© 2026 AfriVibe. Todos los derechos reservados. Diseñado con amor por la cultura africana y empoderado por Google AI Studio.</p>
        </div>
      </div>

    </footer>
  );
}
