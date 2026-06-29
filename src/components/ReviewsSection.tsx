import React from 'react';
import { Star, MessageSquare, Check, User } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export default function ReviewsSection({ reviews, onAddReview }: ReviewsSectionProps) {
  const [name, setName] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState('');
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      userName: name,
      rating,
      comment,
      date: new Date().toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 500000)}?w=150&auto=format&fit=crop&q=80`
    };

    onAddReview(newReview);
    setHasSubmitted(true);
    setName('');
    setComment('');
    setRating(5);
    setTimeout(() => setHasSubmitted(false), 3000);
  };

  const averageRating = (
    reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length
  ).toFixed(1);

  // Distribution counts for the progress bars
  const totalReviews = reviews.length;
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((rev) => {
    const key = Math.floor(rev.rating) as 5 | 4 | 3 | 2 | 1;
    if (ratingCounts[key] !== undefined) {
      ratingCounts[key]++;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase mb-4">
          <MessageSquare className="w-3.5 h-3.5 text-pink-500" />
          <span>Experiencias</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none mb-4">
          Lo que Dicen Nuestros Clientes
        </h2>
        <p className="text-zinc-300 text-base">
          Únete a la familia AfriVibe. Lee opiniones reales de amantes de la moda africana y comparte tu propia experiencia veraniega.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Summary Metrics */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-6">
          <h3 className="text-lg font-black text-gray-900">Resumen de Calificaciones</h3>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <span className="block text-5xl font-black text-gray-900 font-mono">{averageRating}</span>
              <div className="flex items-center justify-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-4.5 h-4.5 ${
                      star <= Math.round(Number(averageRating))
                        ? 'text-pink-500 fill-pink-500' 
                        : 'text-gray-200'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-bold block mt-1.5 uppercase tracking-wide">
                {totalReviews} Opiniones
              </span>
            </div>

            <div className="flex-grow space-y-2 border-l border-pink-50 pl-6">
              {([5, 4, 3, 2, 1] as const).map((star) => {
                const count = ratingCounts[star];
                const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center space-x-2 text-xs">
                    <span className="font-bold text-gray-600 font-mono w-3">{star}</span>
                    <Star className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                    <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-gray-400 font-mono w-5 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review form */}
          <form onSubmit={handleSubmit} className="border-t border-pink-50 pt-6 space-y-4">
            <h4 className="text-md font-black text-gray-900">Escribe tu opinión</h4>
            
            {hasSubmitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center space-x-2 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>¡Muchas gracias por tu opinión! Se ha publicado de inmediato.</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-500 uppercase">Nombre Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Ndaye Bengue"
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:bg-white transition-all"
              />
            </div>

            {/* Interactive Stars */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-500 uppercase">Calificación</label>
              <div className="flex items-center space-x-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-0.5 focus:outline-none cursor-pointer"
                  >
                    <Star 
                      className={`w-6 h-6 transition-colors ${
                        star <= (hoverRating ?? rating)
                          ? 'text-pink-500 fill-pink-500'
                          : 'text-gray-200'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-500 uppercase">Comentario</label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Cuéntanos qué te pareció el diseño, la tela y el calce..."
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:bg-white resize-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-pink-500/10 transition-all duration-300 cursor-pointer"
            >
              Publicar Opinión
            </button>
          </form>
        </div>

        {/* Right Column: Reviews List */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-lg font-black text-gray-900 mb-2 flex items-center space-x-2">
            <span>Últimos comentarios</span>
            <span className="text-xs px-2 py-0.5 bg-pink-100 text-pink-700 rounded-full font-bold">
              {totalReviews}
            </span>
          </h3>

          <div className="space-y-4 max-h-[45rem] overflow-y-auto pr-2">
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-white p-5 rounded-3xl border border-pink-50 shadow-sm space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center border border-pink-200">
                      {rev.avatarUrl ? (
                        <img 
                          src={rev.avatarUrl} 
                          alt={rev.userName} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <User className="w-5 h-5 text-pink-500" />
                      )}
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-gray-900 leading-tight">
                        {rev.userName}
                      </span>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase mt-0.5 font-mono">
                        {rev.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-0.5 bg-pink-50 px-2 py-1 rounded-lg border border-pink-100">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-3.5 h-3.5 ${
                          star <= rev.rating 
                            ? 'text-pink-500 fill-pink-500' 
                            : 'text-gray-200'
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
