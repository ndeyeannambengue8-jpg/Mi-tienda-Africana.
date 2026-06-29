import React from 'react';
import { ShoppingBag, Sparkles, Shirt, MessageSquare, Menu, X, Search } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  searchQuery,
  setSearchQuery
}: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { id: 'shop', label: 'Colección', icon: Shirt },
    { id: 'designer', label: 'Diseñador IA', icon: Sparkles },
    { id: 'fitting', label: 'Probador Virtual', icon: Shirt },
    { id: 'reviews', label: 'Opiniones', icon: MessageSquare }
  ];

  return (
    <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-850 shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => setActiveTab('shop')} 
              className="flex items-center space-x-2 focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-black to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-md transform hover:rotate-12 transition-transform duration-300">
                A
              </div>
              <div className="text-left">
                <span className="block text-lg font-bold text-white tracking-tight font-sans">AFRI<span className="text-pink-500">VIBE</span></span>
                <span className="block text-xs text-pink-500 font-mono tracking-widest uppercase">Moda de Verano</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-pink-500/10 text-pink-500 shadow-sm border border-pink-500/20'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-pink-500' : 'text-zinc-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar & Cart Trigger */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar moda africana..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-zinc-500 transition-all duration-300"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-zinc-300 hover:text-pink-500 hover:bg-zinc-900 rounded-full transition-all duration-300 cursor-pointer"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu and cart controls */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-zinc-300"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-850 px-4 pt-2 pb-4 space-y-1">
          {/* Mobile search bar */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-zinc-500"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl font-medium text-base ${
                  isActive
                    ? 'bg-pink-500/10 text-pink-500'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-pink-500' : 'text-zinc-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
