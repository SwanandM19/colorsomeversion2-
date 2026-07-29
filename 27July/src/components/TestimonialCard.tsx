import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../lib/supabase';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="card-premium p-7 lg:p-8 relative">
      <Quote className="w-8 h-8 text-gold/15 absolute top-6 right-6" />

      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
        ))}
      </div>

      <blockquote className="text-charcoal leading-relaxed mb-6 text-[15px]">
        "{testimonial.quote}"
      </blockquote>

      <div className="flex items-center gap-4 pt-5 border-t border-warm-gray">
        <div className="w-11 h-11 rounded-full bg-warm-gray flex items-center justify-center">
          <span className="font-serif text-base font-medium text-charcoal-muted">
            {testimonial.customer_name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-medium text-charcoal text-sm">{testimonial.customer_name}</p>
          <p className="text-xs text-charcoal-muted">
            {testimonial.location}
            {testimonial.project_type && ` · ${testimonial.project_type}`}
          </p>
        </div>
      </div>
    </div>
  );
}

// import { Star, Quote } from 'lucide-react';

// type Testimonial = {
//   id: number;
//   name: string;
//   quote: string;
//   location?: string;
//   rating?: number;
//   project_type?: string;
// };

// interface TestimonialCardProps {
//   testimonial: Testimonial;
// }

// export function TestimonialCard({ testimonial }: TestimonialCardProps) {
//   const customerName = testimonial.name || 'Customer';
//   const rating = testimonial.rating || 5;

//   return (
//     <div className="card-premium p-7 lg:p-8 relative">
//       <Quote className="w-8 h-8 text-gold/15 absolute top-6 right-6" />

//       <div className="flex gap-0.5 mb-4">
//         {Array.from({ length: rating }).map((_, i) => (
//           <Star key={i} className="w-4 h-4 fill-gold text-gold" />
//         ))}
//       </div>

//       <blockquote className="text-charcoal leading-relaxed mb-6 text-[15px]">
//         "{testimonial.quote}"
//       </blockquote>

//       <div className="flex items-center gap-4 pt-5 border-t border-warm-gray">
//         <div className="w-11 h-11 rounded-full bg-warm-gray flex items-center justify-center">
//           <span className="font-serif text-base font-medium text-charcoal-muted">
//             {customerName.charAt(0)}
//           </span>
//         </div>

//         <div>
//           <p className="font-medium text-charcoal text-sm">{customerName}</p>
//           <p className="text-xs text-charcoal-muted">
//             {testimonial.location || ''}
//             {testimonial.project_type ? ` · ${testimonial.project_type}` : ''}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }