import { ArrowRight, Droplets, Clock, Layers, Sparkles } from 'lucide-react';
import type { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const handleView = (e: React.MouseEvent) => {
    if (onViewDetails) {
      e.preventDefault();
      onViewDetails(product);
    }
  };

  return (
    <div className="card-premium overflow-hidden group reveal">
      <div className="relative h-56 bg-gradient-to-br from-warm-gray to-warm-gray-light overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover img-hover-zoom"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              <Droplets className="w-16 h-16 text-warm-gray" />
              <Sparkles className="w-6 h-6 text-gold/40 absolute -top-2 -right-2" />
            </div>
          </div>
        )}
        {product.featured && (
          <div className="absolute top-4 left-4 bg-gold text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded">
            Featured
          </div>
        )}
        {product.finish_type && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-charcoal text-[10px] font-semibold tracking-wider px-3 py-1.5 rounded">
            {product.finish_type}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-3">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gold mb-1.5">
            {product.categories?.name || 'Paint'}
          </p>
          <h3 className="font-serif text-xl font-medium text-charcoal group-hover:text-gold transition-colors">
            {product.name}
          </h3>
        </div>

        <p className="text-sm text-charcoal-muted leading-relaxed mb-5 line-clamp-2">
          {product.short_description}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {product.finish_type && (
            <div className="text-center p-2.5 bg-warm-gray rounded-lg">
              <Layers className="w-3.5 h-3.5 mx-auto mb-1 text-charcoal-muted" />
              <p className="text-[9px] text-charcoal-muted uppercase tracking-wider">Finish</p>
              <p className="text-[11px] font-medium text-charcoal mt-0.5">{product.finish_type}</p>
            </div>
          )}
          {product.durability && (
            <div className="text-center p-2.5 bg-warm-gray rounded-lg">
              <Clock className="w-3.5 h-3.5 mx-auto mb-1 text-charcoal-muted" />
              <p className="text-[9px] text-charcoal-muted uppercase tracking-wider">Life</p>
              <p className="text-[11px] font-medium text-charcoal mt-0.5">{product.durability}</p>
            </div>
          )}
          {product.washability && (
            <div className="text-center p-2.5 bg-warm-gray rounded-lg">
              <Droplets className="w-3.5 h-3.5 mx-auto mb-1 text-charcoal-muted" />
              <p className="text-[9px] text-charcoal-muted uppercase tracking-wider">Care</p>
              <p className="text-[11px] font-medium text-charcoal mt-0.5 line-clamp-2">{product.washability}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleView}
          className="inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-gold transition-colors group/link"
        >
          View Details
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
