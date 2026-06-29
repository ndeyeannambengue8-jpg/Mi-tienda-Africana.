import React from 'react';
import { Sparkles, ArrowRight, ShoppingCart, RefreshCw, Layers, Check, AlertTriangle } from 'lucide-react';
import { Product } from '../types';
import { PRESET_PATTERNS } from '../data';

interface PrintDesignerProps {
  onAddCustomProduct: (product: Product) => void;
}

const TRIVIA_MESSAGES = [
  "Los estampados Ankara originalmente usaban técnicas de batik indonesio...",
  "El tejido Kente de Ghana tradicionalmente comunica significados espirituales mediante colores...",
  "El color dorado en la moda africana simboliza realeza, riqueza y sol de verano...",
  "El azul representa paz, armonía y la brisa del océano que baña las costas africanas...",
  "Los patrones geométricos a menudo representan proverbios locales y sabiduría ancestral..."
];

export default function PrintDesigner({ onAddCustomProduct }: PrintDesignerProps) {
  const [prompt, setPrompt] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [triviaIndex, setTriviaIndex] = React.useState(0);
  
  const [generatedImage, setGeneratedImage] = React.useState<string | null>(null);
  const [isFallback, setIsFallback] = React.useState(false);
  const [isMock, setIsMock] = React.useState(false);
  
  const [selectedGarment, setSelectedGarment] = React.useState<'dress' | 'shirt'>('dress');
  const [customName, setCustomName] = React.useState('Mi Vestido Solar Africano');
  const [selectedSize, setSelectedSize] = React.useState('M');
  const [hasAdded, setHasAdded] = React.useState(false);

  // Rotate trivia during generation
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      interval = setInterval(() => {
        setTriviaIndex((prev) => (prev + 1) % TRIVIA_MESSAGES.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handlePresetClick = (presetPrompt: string, presetName: string) => {
    setPrompt(presetPrompt);
    // Suggest a name matching the design vibe
    if (selectedGarment === 'dress') {
      setCustomName(`Vestido ${presetName}`);
    } else {
      setCustomName(`Camisa ${presetName}`);
    }
  };

  const handleGarmentChange = (garment: 'dress' | 'shirt') => {
    setSelectedGarment(garment);
    // Keep custom name synchronized
    const cleanBase = customName.replace(/^(Vestido|Camisa|Prenda)\s+/i, '');
    if (garment === 'dress') {
      setCustomName(`Vestido ${cleanBase || 'Ankara Personalizado'}`);
    } else {
      setCustomName(`Camisa ${cleanBase || 'Ankara Personalizada'}`);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedImage(null);
    setIsFallback(false);
    setIsMock(false);
    
    try {
      const response = await fetch('/api/generate-print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setIsFallback(data.fallbackUsed || false);
        setIsMock(data.isMock || false);
      } else {
        throw new Error(data.error || 'No se recibió la imagen del servidor.');
      }
    } catch (err) {
      console.error('Error calling generate endpoint:', err);
      // Fallback directly to a beautiful styled mock
      setIsMock(true);
      // We render an Ankara-style Pink, Black, and White geometric design as default client fallback
      const defaultSvg = `<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#ec4899"/>
        <g stroke="#000000" stroke-width="15" fill="none" opacity="0.8">
          <circle cx="250" cy="250" r="160" stroke-dasharray="15 15" stroke="#ffffff"/>
          <circle cx="250" cy="250" r="100" stroke="#000000"/>
          <circle cx="250" cy="250" r="40" fill="#ffffff"/>
          <path d="M 0 0 L 500 500 M 500 0 L 0 500" stroke="#ffffff" stroke-width="8"/>
        </g>
      </svg>`;
      const base64 = btoa(defaultSvg);
      setGeneratedImage(`data:image/svg+xml;base64,${base64}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddToCart = () => {
    if (!generatedImage) return;

    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: customName || (selectedGarment === 'dress' ? 'Vestido Personalizado IA' : 'Camisa Personalizada IA'),
      description: `Prenda única diseñada por Inteligencia de Imagen (Gemini 3.1) basada en el diseño: "${prompt}". Confeccionada a medida con tu estampado exclusivo.`,
      price: selectedGarment === 'dress' ? 129.99 : 79.99,
      image: generatedImage,
      category: 'personalizado',
      sizes: [selectedSize],
      colors: ['Estampado Exclusivo'],
      rating: 5.0,
      reviewsCount: 1,
      isCustom: true,
      customPrintUrl: generatedImage,
      customPrompt: prompt
    };

    onAddCustomProduct(customProduct);
    setHasAdded(true);
    setTimeout(() => setHasAdded(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Diseñador Autónomo</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none mb-4">
          Estampador de Ropa con Inteligencia Artificial
        </h2>
        <p className="text-zinc-300 text-base">
          Crea tus propios estampados estilo Ankara o Kente mediante descripciones en texto. Nuestro motor de IA generará un patrón único que podrás aplicar instantáneamente sobre un modelo de vestido o camisa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Creator inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-5">
            <h3 className="text-lg font-black text-gray-900 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-pink-500" />
              <span>1. Diseña el Estampado</span>
            </h3>

            {/* Prompt input */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Describe tu visión artística</label>
              <textarea
                rows={3}
                placeholder="Ej. Espirales concéntricas tradicionales en color rosa fucsia vibrante, con espirales negras profundas y detalles en blanco..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white resize-none transition-all duration-200"
              />
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Inspiraciones de Estilo</span>
              <div className="flex flex-wrap gap-2">
                {PRESET_PATTERNS.map((pat) => (
                  <button
                    key={pat.id}
                    onClick={() => handlePresetClick(pat.prompt, pat.name)}
                    className="text-xs px-3 py-1.5 rounded-full border border-pink-100 bg-pink-50/50 hover:bg-pink-100 text-gray-700 font-medium transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pat.color }} />
                    <span>{pat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-pink-500 via-black to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-pink-500/20 flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-pink-200" />
              <span>{isGenerating ? 'Generando en Gemini...' : 'Generar Estampado Exclusivo'}</span>
            </button>
          </div>

          {/* Garment Selector */}
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-gray-900 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-pink-500" />
              <span>2. Elige la Prenda</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleGarmentChange('dress')}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                  selectedGarment === 'dress'
                    ? 'border-pink-500 bg-pink-50/50 text-pink-600 font-bold'
                    : 'border-gray-100 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                  👗
                </div>
                <span className="text-sm">Vestido de Verano</span>
              </button>

              <button
                onClick={() => handleGarmentChange('shirt')}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                  selectedGarment === 'shirt'
                    ? 'border-pink-500 bg-pink-50/50 text-pink-600 font-bold'
                    : 'border-gray-100 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-700">
                  👔
                </div>
                <span className="text-sm">Camisa Unisex</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Visualizer & Applicator */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col items-center justify-center min-h-[35rem] relative">
            
            {/* Generating State Overlay */}
            {isGenerating && (
              <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center p-8 text-center rounded-3xl animate-fade-in">
                <div className="w-16 h-16 rounded-full border-4 border-pink-100 border-t-pink-500 animate-spin mb-6" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Creando estampado africano...</h4>
                <p className="text-sm text-gray-500 max-w-sm mb-6">
                  Gemini está tejiendo tus hilos de texto en un tejido visual Ankara.
                </p>
                <div className="p-4 bg-pink-50 rounded-2xl border border-pink-100 max-w-md">
                  <p className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-1 font-mono">Sabías que...</p>
                  <p className="text-xs text-pink-700 italic">
                    "{TRIVIA_MESSAGES[triviaIndex]}"
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!generatedImage && !isGenerating && (
              <div className="text-center py-12 max-w-md">
                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-pink-500 text-3xl mb-6 shadow-sm">
                  🎨
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Tu Lienzo de Diseño está Listo</h4>
                <p className="text-sm text-gray-500 mb-6">
                  Escribe una idea en la izquierda (o selecciona una plantilla pre-diseñada) y presiona "Generar" para ver tu estampado en 3D sobre la prenda.
                </p>
                <div className="flex justify-center">
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-pink-500 uppercase tracking-widest animate-bounce">
                    <span>Escribe un diseño para empezar</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-90 lg:rotate-0" />
                  </span>
                </div>
              </div>
            )}

            {/* Content State: Image & Applied Canvas */}
            {generatedImage && !isGenerating && (
              <div className="w-full space-y-6">
                
                {/* Fallback alerts if applicable */}
                {(isFallback || isMock) && (
                  <div className="p-3 bg-pink-50 border border-pink-200 text-pink-800 rounded-xl text-xs flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-pink-600 shrink-0" />
                    <span>
                      {isMock 
                        ? 'Se cargó una plantilla Ankara clásica debido a la configuración de red. ¡Sigue siendo totalmente interactiva!'
                        : 'Utilizando modelo optimizado para entrega ultra rápida de tu estampado africano.'}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  
                  {/* Swatch Swat Panel */}
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Tejido Original</span>
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-pink-100 shadow-inner group">
                      <img
                        src={generatedImage}
                        alt="Ankara swatch generated by AI"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs text-white font-bold bg-gray-900/80 px-3 py-1.5 rounded-full">Zoom Estampado</span>
                      </div>
                    </div>
                  </div>

                  {/* Applied Clothing Stencil Mockup */}
                  <div className="space-y-2 flex flex-col items-center">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Modelo de Prenda</span>
                    
                    <div className="relative w-full max-w-[240px] aspect-[3/4] bg-pink-50/50 rounded-2xl border border-pink-100 overflow-hidden shadow-sm flex items-center justify-center p-4">
                      {/* We render a custom SVG mask container */}
                      <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          {/* Pattern fill using the generated base64 image URL */}
                          <pattern id="custom-pattern-fill" width="50" height="50" patternUnits="userSpaceOnUse">
                            <image href={generatedImage} x="0" y="0" width="50" height="50" />
                          </pattern>

                          {/* Custom Dress Silhouette Mask */}
                          <mask id="dress-stencil-mask">
                            <path d="M 50 15 L 35 15 C 33 22, 38 28, 30 45 L 20 115 L 80 115 L 70 45 C 62 28, 67 22, 65 15 Z" fill="white" />
                          </mask>

                          {/* Custom Shirt Silhouette Mask */}
                          <mask id="shirt-stencil-mask">
                            <path d="M 50 15 L 35 15 L 25 35 L 32 45 L 36 38 L 36 115 L 64 115 L 64 38 L 68 45 L 75 35 L 65 15 Z" fill="white" />
                          </mask>
                        </defs>

                        {/* Silhouette Pattern rendering */}
                        {selectedGarment === 'dress' ? (
                          <>
                            {/* Dress silhouette containing the custom pattern fill */}
                            <path d="M 50 15 L 35 15 C 33 22, 38 28, 30 45 L 20 115 L 80 115 L 70 45 C 62 28, 67 22, 65 15 Z" fill="url(#custom-pattern-fill)" />
                            {/* Outline and shading for a premium high-end look */}
                            <path d="M 50 15 L 35 15 C 33 22, 38 28, 30 45 L 20 115 L 80 115 L 70 45 C 62 28, 67 22, 65 15 Z" fill="none" stroke="#ec4899" stroke-width="1.5" stroke-linejoin="round" />
                            {/* Dress folds */}
                            <path d="M 30 45 Q 50 55 70 45 M 40 80 Q 50 90 60 80 M 35 100 Q 50 110 65 100" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" opacity="0.15" />
                            {/* Neck drop */}
                            <path d="M 35 15 Q 50 25 65 15" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.5" />
                          </>
                        ) : (
                          <>
                            {/* Shirt silhouette containing the custom pattern fill */}
                            <path d="M 50 15 L 35 15 L 25 35 L 32 45 L 36 38 L 36 115 L 64 115 L 64 38 L 68 45 L 75 35 L 65 15 Z" fill="url(#custom-pattern-fill)" />
                            <path d="M 50 15 L 35 15 L 25 35 L 32 45 L 36 38 L 36 115 L 64 115 L 64 38 L 68 45 L 75 35 L 65 15 Z" fill="none" stroke="#000000" stroke-width="1.5" stroke-linejoin="round" />
                            {/* Collar fold details */}
                            <path d="M 35 15 L 50 30 L 65 15 M 50 30 L 50 115" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" opacity="0.25" />
                            {/* Left pocket */}
                            <path d="M 40 45 L 47 45 L 47 55 L 40 55 Z" fill="url(#custom-pattern-fill)" stroke="#000000" stroke-width="0.5" opacity="0.7" />
                          </>
                        )}
                      </svg>
                    </div>
                  </div>

                </div>

                {/* Custom Product Naming & Adding Form */}
                <div className="bg-gray-50 p-5 rounded-2xl border border-pink-100 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase">Nombre de tu prenda</label>
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 text-gray-900 rounded-lg text-sm font-bold focus:outline-none focus:ring-1 focus:ring-pink-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase">Talla Preferida</label>
                      <div className="flex gap-1.5">
                        {['S', 'M', 'L', 'XL'].map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`w-8 h-8 text-xs font-bold rounded-lg border flex items-center justify-center cursor-pointer ${
                              selectedSize === sz
                                ? 'bg-pink-500 text-white border-pink-500'
                                : 'bg-white border-gray-200 hover:border-gray-400 text-gray-600'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-pink-100 pt-4 mt-2">
                    <div>
                      <span className="block text-xs text-gray-400 font-bold uppercase leading-none">Precio Especial</span>
                      <span className="text-xl font-black text-gray-900 font-mono">
                        {selectedGarment === 'dress' ? '129.99' : '79.99'}€
                      </span>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={hasAdded}
                      className={`px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                        hasAdded
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-900 text-white hover:bg-pink-600 shadow-md'
                      }`}
                    >
                      {hasAdded ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                      <span>{hasAdded ? '¡Prenda Exclusiva Añadida!' : 'Comprar Prenda Customizada'}</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
