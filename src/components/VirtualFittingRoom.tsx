import React from 'react';
import { Shirt, Sparkles, Check, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data';

interface VirtualFittingRoomProps {
  customProducts: Product[];
  selectedProductToTryOn?: Product | null;
  onClearTryOn: () => void;
}

const MODELS = [
  { id: 'amina', name: 'Amina', gender: 'Femenino', icon: '👩🏾' },
  { id: 'kofi', name: 'Kofi', gender: 'Masculino', icon: '👨🏾' }
];

export default function VirtualFittingRoom({ 
  customProducts, 
  selectedProductToTryOn,
  onClearTryOn 
}: VirtualFittingRoomProps) {
  const [selectedModel, setSelectedModel] = React.useState('amina');
  const [activeProduct, setActiveProduct] = React.useState<Product | null>(null);

  // Combine standard and custom products for try-on catalog
  const tryOnCatalog = [...INITIAL_PRODUCTS, ...customProducts];

  React.useEffect(() => {
    if (selectedProductToTryOn) {
      setActiveProduct(selectedProductToTryOn);
      // Auto-switch model if garment is gender-specific
      if (selectedProductToTryOn.category === 'camisas') {
        setSelectedModel('kofi');
      } else {
        setSelectedModel('amina');
      }
    } else if (tryOnCatalog.length > 0 && !activeProduct) {
      setActiveProduct(tryOnCatalog[0]);
    }
  }, [selectedProductToTryOn]);

  const handleSelectProduct = (prod: Product) => {
    setActiveProduct(prod);
    onClearTryOn(); // Clear the parent trigger
    if (prod.category === 'camisas') {
      setSelectedModel('kofi');
    } else {
      setSelectedModel('amina');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase mb-4">
          <Shirt className="w-3.5 h-3.5 text-pink-500" />
          <span>Espejo Virtual</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none mb-4">
          Probador Virtual de Verano
        </h2>
        <p className="text-zinc-300 text-base">
          Elige un modelo y vístelo instantáneamente con nuestras prendas exclusivas o con tus propios estampados creados con Inteligencia Artificial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Model and Closet selection */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          
          {/* Model selection */}
          <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm space-y-4">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">1. Elige tu Modelo</span>
            <div className="grid grid-cols-2 gap-3">
              {MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                    selectedModel === model.id
                      ? 'border-pink-500 bg-pink-50/50 text-pink-600 font-bold'
                      : 'border-gray-100 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <span className="text-3xl">{model.icon}</span>
                  <span className="text-sm block">{model.name}</span>
                  <span className="text-[10px] uppercase text-gray-400 font-medium">{model.gender}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Closet Selection */}
          <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm space-y-4 flex-grow mt-6">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">2. Tu Armario de Verano</span>
            
            <div className="space-y-3 max-h-[22rem] overflow-y-auto pr-1">
              {tryOnCatalog.map((prod) => {
                const isSelected = activeProduct?.id === prod.id;
                return (
                  <button
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-pink-500 bg-pink-50/40 shadow-sm'
                        : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                  >
                    <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center space-x-1">
                        <span className="block text-sm font-bold text-gray-900 truncate leading-tight">
                          {prod.name}
                        </span>
                        {prod.isCustom && (
                          <Sparkles className="w-3 h-3 text-pink-500 shrink-0" />
                        )}
                      </div>
                      <span className="block text-xs text-pink-600 font-mono font-bold mt-0.5">
                        {prod.price.toFixed(2)}€
                      </span>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase mt-1">
                        Categoría: {prod.category}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Center column: Virtual mirror representation */}
        <div className="lg:col-span-5 flex items-center justify-center bg-pink-50/20 rounded-3xl border border-pink-100 p-6 min-h-[30rem]">
          <div className="relative w-full max-w-sm aspect-[3/4] bg-white rounded-3xl shadow-lg border border-pink-100 flex flex-col items-center justify-center p-6">
            
            {/* Mirror Frame Header */}
            <div className="absolute top-4 left-0 right-0 flex justify-between px-6">
              <span className="text-xs font-mono text-gray-400 font-bold tracking-widest uppercase">AFRIVIBE FITTING MIRROR</span>
              <span className="text-xs text-pink-500 font-mono font-bold animate-pulse">● LIVE</span>
            </div>

            {/* Silhouette & Garment Overlay Display */}
            <div className="relative w-full h-[85%] mt-6 flex items-center justify-center">
              
              {/* Amina Silhouette (Woman) */}
              {selectedModel === 'amina' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Underlay Body */}
                  <div className="text-center select-none text-9xl filter grayscale saturate-50 opacity-15">
                    👩🏾‍💼
                  </div>
                  
                  {/* Dynamic Dress Pattern Layer */}
                  {activeProduct && (activeProduct.category === 'vestidos' || activeProduct.category === 'faldas' || activeProduct.category === 'conjuntos' || activeProduct.category === 'playa' || activeProduct.category === 'personalizado') ? (
                    <div className="absolute inset-0 z-20 flex items-center justify-center animate-fade-in pointer-events-none">
                      <svg className="w-full h-full drop-shadow-xl max-w-[260px]" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="tryon-amina-fill" width="40" height="40" patternUnits="userSpaceOnUse">
                            <image href={activeProduct.image} x="0" y="0" width="40" height="40" />
                          </pattern>
                        </defs>
                        {/* Dress path fitted nicely onto Amina's avatar center */}
                        <path d="M 50 25 C 47 25, 41 29, 38 35 C 33 48, 38 52, 33 65 L 18 120 L 82 120 L 67 65 C 62 52, 67 48, 62 35 C 59 29, 53 25, 50 25 Z" fill="url(#tryon-amina-fill)" stroke="#ec4899" stroke-width="1.5" />
                        <path d="M 38 35 Q 50 42 62 35 M 34 60 Q 50 66 66 60 M 25 90 Q 50 98 75 90" fill="none" stroke="#000000" stroke-width="1" opacity="0.1" />
                      </svg>
                    </div>
                  ) : activeProduct?.category !== 'zapatos' ? (
                    <div className="absolute top-[35%] text-xs font-bold text-gray-400 bg-gray-50 border px-3 py-1.5 rounded-full z-20">
                      Sin vestido seleccionado
                    </div>
                  ) : null}

                  {/* Shoe overlay at the feet */}
                  {activeProduct && activeProduct.category === 'zapatos' && (
                    <div className="absolute bottom-6 z-30 flex flex-col items-center animate-fade-in pointer-events-none">
                      <div className="w-16 h-14 bg-white border border-pink-200 rounded-xl shadow-md p-0.5 overflow-hidden flex items-center justify-center">
                        <img 
                          src={activeProduct.image} 
                          alt={activeProduct.name} 
                          className="w-full h-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[9px] bg-pink-500 text-white font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full mt-1 shadow-xs">
                        Puestos
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Kofi Silhouette (Man) */}
              {selectedModel === 'kofi' && (
                <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                  {/* Underlay Body */}
                  <div className="text-center select-none text-9xl filter grayscale saturate-50 opacity-15">
                    👨🏾‍💼
                  </div>

                  {/* Dynamic Shirt Pattern Layer */}
                  {activeProduct && (activeProduct.category === 'camisas' || activeProduct.category === 'playa' || activeProduct.category === 'personalizado') ? (
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                      <svg className="w-full h-full drop-shadow-xl max-w-[260px]" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="tryon-kofi-fill" width="50" height="50" patternUnits="userSpaceOnUse">
                            <image href={activeProduct.image} x="0" y="0" width="50" height="50" />
                          </pattern>
                        </defs>
                        {/* Shirt path fitted nicely onto Kofi's avatar center */}
                        <path d="M 50 25 L 34 25 L 20 45 L 29 55 L 34 46 L 34 115 L 66 115 L 66 46 L 71 55 L 80 45 L 66 25 Z" fill="url(#tryon-kofi-fill)" stroke="#000000" stroke-width="1.5" />
                        <path d="M 34 25 L 50 38 L 66 25 M 50 38 L 50 115" fill="none" stroke="#000000" stroke-width="1" opacity="0.15" />
                      </svg>
                    </div>
                  ) : activeProduct?.category !== 'zapatos' ? (
                    <div className="absolute top-[35%] text-xs font-bold text-gray-400 bg-gray-50 border px-3 py-1.5 rounded-full z-20">
                      Selecciona una Camisa o Prenda IA
                    </div>
                  ) : null}

                  {/* Shoe overlay at the feet */}
                  {activeProduct && activeProduct.category === 'zapatos' && (
                    <div className="absolute bottom-6 z-30 flex flex-col items-center animate-fade-in pointer-events-none">
                      <div className="w-16 h-14 bg-white border border-pink-200 rounded-xl shadow-md p-0.5 overflow-hidden flex items-center justify-center">
                        <img 
                          src={activeProduct.image} 
                          alt={activeProduct.name} 
                          className="w-full h-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[9px] bg-pink-500 text-white font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full mt-1 shadow-xs">
                        Puestos
                      </span>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Mirror footer */}
            <div className="absolute bottom-4 text-center">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                {activeProduct ? activeProduct.name : 'Vistiéndose...'}
              </span>
            </div>

          </div>
        </div>

        {/* Right column: Previews / Product specs */}
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col justify-center">
          {activeProduct ? (
            <div className="space-y-4">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Prenda en Espejo</span>
              
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border">
                <img 
                  src={activeProduct.image} 
                  alt={activeProduct.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-black text-gray-900 leading-tight">
                  {activeProduct.name}
                </h4>
                <p className="text-xs text-pink-600 font-mono font-bold">
                  {activeProduct.price.toFixed(2)}€
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {activeProduct.description}
                </p>
              </div>

              <div className="pt-2 border-t">
                <span className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Tallas del Probador</span>
                <div className="flex gap-1.5">
                  {activeProduct.sizes.map((sz) => (
                    <span 
                      key={sz} 
                      className="px-2 py-1 bg-gray-50 border text-gray-700 font-bold text-xs rounded-md"
                    >
                      {sz}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              Selecciona una prenda de tu armario para ver las especificaciones de diseño.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
