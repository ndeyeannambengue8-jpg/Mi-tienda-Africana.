import React from 'react';
import { ShoppingCart, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onTryOn: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onTryOn }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = React.useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0] || 'Original');
  const [isHovered, setIsHovered] = React.useState(false);
  const [addedMessage, setAddedMessage] = React.useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <div 
      className="bg-zinc-900 rounded-3xl border border-zinc-850 hover:border-pink-500/30 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group h-full text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Panel */}
      <div className="relative pt-[133%] overflow-hidden bg-zinc-950">
        {product.tag && (
          <span className="absolute top-4 left-4 z-10 bg-black text-white font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
            {product.tag}
          </span>
        )}
        
        {product.isCustom && (
          <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-pink-500 to-black text-white font-semibold text-xs px-3 py-1 rounded-full shadow-sm flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Creado por Ti</span>
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Action Overlays */}
        <div className={`absolute inset-0 bg-black/40 flex flex-col justify-end p-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => onTryOn(product)}
            className="w-full bg-white hover:bg-pink-600 hover:text-white text-gray-900 font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
          >
            Probar en Probador Virtual
          </button>
        </div>
      </div>

      {/* Details Panel */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Rating Row */}
        <div className="flex items-center space-x-1 mb-2">
          <Star className="w-4 h-4 text-pink-500 fill-pink-500" />
          <span className="text-sm font-bold text-zinc-100">{product.rating}</span>
          <span className="text-xs text-zinc-500 font-medium">({product.reviewsCount})</span>
        </div>

        <h3 className="text-lg font-black text-white leading-snug tracking-tight mb-1 group-hover:text-pink-500 transition-colors duration-200">
          {product.name}
        </h3>

        <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        {/* Interactive Customization Selectors */}
        <div className="space-y-3 pt-3 border-t border-zinc-800 mb-5">
          {/* Sizes */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Talla</span>
            <div className="flex gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-7 h-7 text-xs font-bold rounded-lg border flex items-center justify-center transition-all ${
                    selectedSize === size
                      ? 'bg-pink-500 text-white border-pink-500'
                      : 'border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Tono / Estilo</span>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="text-xs font-semibold text-zinc-300 bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-pink-500"
            >
              {product.colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing & Add Button */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Precio</span>
            <span className="text-2xl font-black text-white font-mono">
              {product.price.toFixed(2)}€
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={addedMessage}
            className={`px-5 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all duration-300 cursor-pointer ${
              addedMessage
                ? 'bg-emerald-500 text-white'
                : 'bg-pink-500 text-white hover:bg-pink-600 shadow-md hover:shadow-pink-500/10'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{addedMessage ? '¡Añadido!' : 'Añadir'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
