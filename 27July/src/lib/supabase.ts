

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  short_description: string | null;
  long_description: string | null;
  finish_type: string | null;
  durability: string | null;
  washability: string | null;
  coverage: string | null;
  recommended_for: string | null;
  image_url: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
  categories?: Category | null;

  image?: string | null;
  description?: string | null;
  category?: string | null;
}

export interface Shade {
  id: string;
  name: string;
  hex_code: string;
  collection: string | null;
  collection_type: string | null;
  image_url: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
}

export interface Consultation {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string;
  property_type: string;
  interior_exterior: string;
  area_size: string | null;
  preferred_finish: string | null;
  timeline: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

export interface ConsultationInput {
  name: string;
  phone: string;
  email?: string | null;
  city: string;
  property_type: string;
  interior_exterior: string;
  area_size?: string | null;
  preferred_finish?: string | null;
  timeline?: string | null;
  notes?: string | null;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  location: string;
  quote: string;
  rating: number;
  project_type: string | null;
  created_at: string;
}

function mapProduct(product: any): Product {
  return {
    ...product,
    image: product.image_url,
    description: product.short_description,
    category: product.categories?.name ?? null,
  };
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*, categories(*)')
    .order('display_order', { ascending: true });

  if (categorySlug) {
    query = query.eq('categories.slug', categorySlug);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data || []).map(mapProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('featured', true)
    .order('display_order', { ascending: true })
    .limit(18);

  if (error) throw error;
  return (data || []).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProduct(data) : null;
}

export async function getShades(collectionType?: string): Promise<Shade[]> {
  let query = supabase
    .from('shades')
    .select('*')
    .order('display_order', { ascending: true });

  if (collectionType) {
    query = query.eq('collection_type', collectionType);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

export async function getFeaturedShades(): Promise<Shade[]> {
  const { data, error } = await supabase
    .from('shades')
    .select('*')
    .eq('featured', true)
    .order('display_order', { ascending: true })
    .limit(12);

  if (error) throw error;
  return data || [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}



export async function submitConsultation(
  consultation: ConsultationInput
): Promise<Consultation> {
  const payload = {
    ...consultation,
    email: consultation.email || null,
    area_size: consultation.area_size || null,
    preferred_finish: consultation.preferred_finish || null,
    timeline: consultation.timeline || null,
    notes: consultation.notes || null,
  };

  const { data, error } = await supabase
    .from('consultations')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;

  return data as Consultation;
}