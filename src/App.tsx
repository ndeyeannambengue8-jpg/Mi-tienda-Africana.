/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

import { Product, CartItem, Review, FilterState } from './types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from './data';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import PrintDesigner from './components/PrintDesigner';
import VirtualFittingRoom from './components/VirtualFittingRoom';
import ReviewsSection from './components/ReviewsSection';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import PromoBanner from './components/PromoBanner';
import StoreLocation from './components/StoreLocation';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<string>('shop');
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [customProducts, setCustomProducts] = React.useState<Product[]>([]);
  const [reviews, setReviews] = React.useState<Review[]>(INITIAL_REVIEWS);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  // Filter and Sorting states
  const [selectedCategory, setSelectedCategory] = React.useState<string>('todos');
  const [sortBy, setSortBy] = React.useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  // Trigger auto-try-on redirection
  const [selectedProductToTryOn, setSelectedProductToTryOn] = React.useState<Product | null>(null);

  // Combined catalog
  const fullCatalog = [...INITIAL_PRODUCTS, ...customProducts];

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: nextCart[existingIndex].quantity + 1,
        };
        return nextCart;
      }

      return [...prevCart, { product, selectedSize: size, selectedColor: color, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (index: number, nextQuantity: number) => {
    if (nextQuantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCart((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], quantity: nextQuantity };
      return copy;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // AI Print Designer integration
  const handleAddCustomProduct = (newCustomProduct: Product) => {
    setCustomProducts((prev) => [newCustomProduct, ...prev]);
    // Add custom designed garment immediately to the shopping cart
    handleAddToCart(newCustomProduct, newCustomProduct.sizes[0], newCustomProduct.colors[0]);
    // Notify they can also try it in the virtual fitting room
    setSelectedProductToTryOn(newCustomProduct);
  };

  // Redirection try-on click
  const handleTryOnRedirect = (product: Product) => {
    setSelectedProductToTryOn(product);
    setActiveTab('fitting');
  };

  const handleClearTryOn = () => {
    setSelectedProductToTryOn(null);
  };

  // Add reviews
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // Filtering & Sorting Logic
  const filteredProducts = fullCatalog
    .filter((prod) => {
      // Category filter
      if (selectedCategory !== 'todos') {
        if (selectedCategory === 'personalizado') {
          return prod.isCustom === true;
        }
        return prod.category === selectedCategory;
      }
      return true;
    })
    .filter((prod) => {
      // Search query filter
      const matchesName = prod.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDesc = prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesName || matchesDesc;
    })
    .sort((a, b) => {
      // Sorting
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // 'popular'
    });

  const categoriesList = [
    { id: 'todos', label: 'Ver Todo' },
    { id: 'vestidos', label: 'Vestidos' },
    { id: 'camisas', label: 'Camisas de Verano' },
    { id: 'faldas', label: 'Faldas' },
    { id: 'conjuntos', label: 'Conjuntos' },
    { id: 'playa', label: 'Ropa de Playa' },
    { id: 'zapatos', label: 'Zapatos' },
    { id: 'personalizado', label: 'Mis Creaciones IA' },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between font-sans selection:bg-pink-500 selection:text-white text-zinc-100">
      
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Core Container */}
      <main className="flex-grow bg-black">
        <AnimatePresence mode="wait">
          
          {/* Shop/Collection view */}
          {activeTab === 'shop' && (
            <motion.div
              key="shop-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Showcase Hero banner */}
              <Hero
                onExploreClick={() => {
                  const element = document.getElementById('collection-anchor');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                onDesignerClick={() => setActiveTab('designer')}
              />

              {/* Beautiful Summer & Shoe Showcase Banner Photo */}
              <PromoBanner onSelectCategory={setSelectedCategory} />

              {/* Anchored catalog content */}
              <div id="collection-anchor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif italic">
                      Nuestra Colección de <span className="font-sans not-italic font-black text-pink-500">Verano</span>
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                      Elige cortes elegantes, colores radiantes y fibras respirables.
                    </p>
                  </div>

                  {/* Filter and sorting actions panel */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Sorting dropdown */}
                    <div className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-semibold shadow-sm">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-pink-500" />
                      <span className="text-zinc-400">Ordenar por:</span>
                      <select
                        value={sortBy}
                        onChange={(e: any) => setSortBy(e.target.value)}
                        className="text-white bg-transparent font-bold focus:outline-none"
                      >
                        <option value="popular">Más popular</option>
                        <option value="price-asc">Precio: Menor a Mayor</option>
                        <option value="price-desc">Precio: Mayor a Menor</option>
                        <option value="rating">Calificación de Clientes</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Categories Scroll bar */}
                <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none mb-8">
                  {categoriesList.map((cat) => {
                    // Hide "Mis Creaciones" chip if user hasn't generated any custom clothing yet
                    if (cat.id === 'personalizado' && customProducts.length === 0) return null;
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4.5 py-2.5 rounded-full font-bold text-xs shrink-0 tracking-wider uppercase border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-500/10'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {cat.id === 'personalizado' && <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />}
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Empty Search Fallback */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-xs max-w-xl mx-auto">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-md font-bold text-white">No encontramos resultados</h3>
                    <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                      Intenta buscar palabras clave como "vestido", "camisa" o explora otra categoría diferente.
                    </p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategory('todos'); }}
                      className="mt-6 px-4 py-2 text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 rounded-xl"
                    >
                      Restablecer Filtros
                    </button>
                  </div>
                ) : (
                  /* Products grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onTryOn={handleTryOnRedirect}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* AI Pattern Customizer view */}
          {activeTab === 'designer' && (
            <motion.div
              key="designer-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <PrintDesigner onAddCustomProduct={handleAddCustomProduct} />
            </motion.div>
          )}

          {/* Virtual Mirror try-on view */}
          {activeTab === 'fitting' && (
            <motion.div
              key="fitting-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <VirtualFittingRoom
                customProducts={customProducts}
                selectedProductToTryOn={selectedProductToTryOn}
                onClearTryOn={handleClearTryOn}
              />
            </motion.div>
          )}

          {/* Customers Reviews view */}
          {activeTab === 'reviews' && (
            <motion.div
              key="reviews-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />
            </motion.div>
          )}

          {/* Store Location view */}
          {activeTab === 'location' && (
            <motion.div
              key="location-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <StoreLocation />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Cart Drawer Sliding Sidebar overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Elegant footer details */}
      <Footer />

    </div>
  );
}
