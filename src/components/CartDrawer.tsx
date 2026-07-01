import React from 'react';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [checkoutName, setCheckoutName] = React.useState('');
  const [checkoutEmail, setCheckoutEmail] = React.useState('');
  const [checkoutAddress, setCheckoutAddress] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [orderConfirmed, setOrderConfirmed] = React.useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setOrderConfirmed(true);
      setTimeout(() => {
        setOrderConfirmed(false);
        setIsCheckoutOpen(false);
        onClearCart();
        onClose();
      }, 4000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div 
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300" 
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md">
            <div className="flex h-full flex-col bg-white shadow-2xl border-l border-pink-100">
              
              {/* Drawer Header */}
              <div className="px-6 py-6 border-b border-pink-50 bg-pink-50/20 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-pink-600" />
                  <h2 className="text-lg font-black text-gray-900">Tu Cesta de Verano</h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-pink-50 text-pink-400 rounded-full flex items-center justify-center mb-4">
                      🎒
                    </div>
                    <h3 className="text-md font-bold text-gray-900">Tu cesta está vacía</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs">
                      Explora la colección y añade prendas vibrantes o crea tus estampados personalizados con IA.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-4 py-2 text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 rounded-xl shadow-sm transition-all"
                    >
                      Volver a la Tienda
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div 
                        key={`${item.product.id}-${index}`} 
                        className="flex items-center space-x-4 p-3 rounded-2xl border border-pink-50/80 bg-white shadow-sm"
                      >
                        {/* Image */}
                        <div className="w-16 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Specs */}
                        <div className="flex-grow min-w-0">
                          <h4 className="text-sm font-black text-gray-900 truncate leading-snug">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-50 border text-gray-500 rounded uppercase">
                              Talla {item.selectedSize}
                            </span>
                            <span className="text-[10px] text-gray-400 truncate max-w-[80px]">
                              {item.selectedColor}
                            </span>
                          </div>
                          
                          <span className="block text-xs font-mono font-bold text-pink-600 mt-1">
                            {item.product.price.toFixed(2)}€
                          </span>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex flex-col items-end space-y-2">
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                              className="px-2 py-0.5 hover:bg-gray-100 text-gray-600"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold font-mono text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                              className="px-2 py-0.5 hover:bg-gray-100 text-gray-600"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer summary */}
              {cart.length > 0 && (
                <div className="border-t border-pink-100 px-6 py-6 bg-pink-50/10 space-y-4">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-mono">{subtotal.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Envío (España)</span>
                      <span className="font-mono">
                        {shipping === 0 ? '¡GRATIS!' : `${shipping.toFixed(2)}€`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[10px] text-gray-400 text-right">
                        ¡Envío gratis para compras superiores a 100€!
                      </p>
                    )}
                    <div className="flex justify-between font-black text-gray-900 border-t border-pink-100/60 pt-3 text-base">
                      <span>Total</span>
                      <span className="font-mono">{total.toFixed(2)}€</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-pink-500/10 flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Proceder al Pago Seguro</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Mock Checkout Overlay Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div 
            onClick={() => { if(!isProcessing && !orderConfirmed) setIsCheckoutOpen(false); }} 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs" 
          />
          
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-pink-100 shadow-2xl relative z-10 animate-scale-up">
            
            {orderConfirmed ? (
              <div className="text-center py-6 space-y-4 animate-fade-in">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce">
                  🎉
                </div>
                <h3 className="text-2xl font-black text-gray-900">¡Pedido Confirmado!</h3>
                <p className="text-sm text-gray-600">
                  Hemos recibido tu pago con éxito. Tu pedido exclusivo está siendo confeccionado artesanalmente por nuestros sastres.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-2xl space-y-2.5 text-left text-xs border border-pink-50 mt-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Truck className="w-4 h-4 text-pink-500" />
                    <span><strong>Envío Estimado:</strong> 5-7 días laborables</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <ShieldCheck className="w-4 h-4 text-pink-500" />
                    <span><strong>Garantía:</strong> Tela orgánica con Ankara auténtica.</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 pt-2 animate-pulse">
                  Cerrando y limpiando la cesta en unos instantes...
                </p>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-lg font-black text-gray-900 flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-pink-500" />
                    <span>Checkout Seguro</span>
                  </h3>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => setIsCheckoutOpen(false)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-gray-500 leading-normal">
                  Rellena los datos para simular tu compra de verano. El importe total a procesar es <strong className="text-gray-900 font-mono">{total.toFixed(2)}€</strong>.
                </p>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Nombre del Sostenedor</label>
                    <input
                      type="text"
                      required
                      disabled={isProcessing}
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      placeholder="Ej. Juan de Dios"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      disabled={isProcessing}
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      placeholder="juan@correo.com"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Dirección de Despacho (España)</label>
                    <input
                      type="text"
                      required
                      disabled={isProcessing}
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      placeholder="Calle Gran Vía 45, 3B, Madrid"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  {/* Visa details dummy */}
                  <div className="p-3.5 bg-pink-50/50 rounded-2xl border border-pink-100 flex items-center justify-between space-x-4">
                    <div className="shrink-0 text-2xl">💳</div>
                    <div className="flex-grow space-y-1">
                      <span className="block text-[9px] font-bold text-pink-500 uppercase font-mono">Simulador de Pago Directo</span>
                      <span className="block text-xs text-gray-700 font-medium">Tarjeta de crédito ficticia segura integrada</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gray-900 hover:bg-pink-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center space-x-2.5 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin text-pink-400" />
                      <span>Procesando pago...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span>Completar Pago Seguro</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
