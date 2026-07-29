/*
  # Colorsome Paints Database Schema

  1. New Tables
    - `categories`: Product categories like interior paints, exterior paints, primers, etc.
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `description` (text)
      - `image_url` (text)
      - `display_order` (integer)
      - `created_at` (timestamp)
    
    - `products`: Paint products with details
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `category_id` (uuid, foreign key)
      - `short_description` (text)
      - `long_description` (text)
      - `finish_type` (text)
      - `durability` (text)
      - `washability` (text)
      - `coverage` (text)
      - `recommended_for` (text)
      - `image_url` (text)
      - `featured` (boolean)
      - `display_order` (integer)
      - `created_at` (timestamp)
    
    - `shades`: Paint color shades
      - `id` (uuid, primary key)
      - `name` (text)
      - `hex_code` (text)
      - `collection` (text)
      - `collection_type` (text)
      - `image_url` (text)
      - `featured` (boolean)
      - `display_order` (integer)
      - `created_at` (timestamp)
    
    - `consultations`: Customer consultation requests
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text)
      - `email` (text, nullable)
      - `city` (text)
      - `property_type` (text)
      - `interior_exterior` (text)
      - `area_size` (text)
      - `preferred_finish` (text, nullable)
      - `timeline` (text, nullable)
      - `notes` (text, nullable)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
    
    - `testimonials`: Customer testimonials
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `location` (text)
      - `quote` (text)
      - `rating` (integer)
      - `project_type` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for products, categories, shades, testimonials
    - Public insert access for consultations
    - No update/delete access from public
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  short_description text,
  long_description text,
  finish_type text,
  durability text,
  washability text,
  coverage text,
  recommended_for text,
  image_url text,
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Shades table
CREATE TABLE IF NOT EXISTS shades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  hex_code text NOT NULL,
  collection text,
  collection_type text,
  image_url text,
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  city text NOT NULL,
  property_type text NOT NULL,
  interior_exterior text NOT NULL,
  area_size text,
  preferred_finish text,
  timeline text,
  notes text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  location text NOT NULL,
  quote text NOT NULL,
  rating integer DEFAULT 5,
  project_type text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shades ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policies for categories (public read)
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

-- Policies for products (public read)
CREATE POLICY "Public can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- Policies for shades (public read)
CREATE POLICY "Public can view shades"
  ON shades FOR SELECT
  TO public
  USING (true);

-- Policies for consultations (public insert, no read/update/delete)
CREATE POLICY "Public can submit consultations"
  ON consultations FOR INSERT
  TO public
  WITH CHECK (true);

-- Policies for testimonials (public read)
CREATE POLICY "Public can view testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (true);

-- Insert initial categories
INSERT INTO categories (name, slug, description, display_order) VALUES
('Interior Wall Paints', 'interior-wall-paints', 'Premium quality interior paints for beautiful, lasting walls', 1),
('Exterior Wall Paints', 'exterior-wall-paints', 'Weather-resistant exterior paints for lasting protection', 2),
('Primers', 'primers', 'Essential primers for perfect paint adhesion and coverage', 3),
('Enamels', 'enamels', 'High-gloss enamels for wood, metal, and specialty surfaces', 4),
('Waterproofing', 'waterproofing', 'Advanced waterproofing solutions for complete protection', 5),
('Wall Putty', 'wall-putty', 'Premium wall putty for smooth, flawless surfaces', 6),
('Textures', 'textures', 'Designer texture finishes for distinctive spaces', 7),
('Wood Coatings', 'wood-coatings', 'Premium wood finishes and protectants', 8);

-- Insert sample products
INSERT INTO products (name, slug, category_id, short_description, long_description, finish_type, durability, washability, coverage, recommended_for, featured, display_order) VALUES
('Colorsome Luxe Interior', 'luxe-interior', (SELECT id FROM categories WHERE slug = 'interior-wall-paints'), 'Ultra-premium matte finish for elegant interiors', 'Colorsome Luxe Interior delivers an exquisite matte finish with exceptional depth and richness. Formulated with advanced polymers for superior durability and a velvety-smooth appearance that transforms any living space.', 'Matte', '10+ years', 'Highly washable', '120-140 sq ft/ltr', 'Living rooms, bedrooms, dining areas', true, 1),

('Colorsome Silk Premium', 'silk-premium', (SELECT id FROM categories WHERE slug = 'interior-wall-paints'), 'Elegant silk finish with subtle sheen', 'Colorsome Silk Premium offers a refined silk finish that catches light beautifully. Perfect for modern homes seeking understated elegance with excellent stain resistance and durability.', 'Silk', '8-10 years', 'Stain resistant', '110-130 sq ft/ltr', 'Hallways, kids rooms, offices', true, 2),

('Colorsome Weather Guard', 'weather-guard', (SELECT id FROM categories WHERE slug = 'exterior-wall-paints'), 'Advanced weather protection for exterior walls', 'Colorsome Weather Guard is engineered with cutting-edge technology to withstand harsh weather conditions. UV-resistant, waterproof, and flexible coating that protects your home for years.', 'Matte', '12+ years', 'Weather resistant', '90-110 sq ft/ltr', 'Exterior walls, facades, boundary walls', true, 3),

('Colorsome Exterior Gloss', 'exterior-gloss', (SELECT id FROM categories WHERE slug = 'exterior-wall-paints'), 'High-gloss exterior finish with brilliant shine', 'Colorsome Exterior Gloss delivers a stunning high-gloss finish that enhances architectural features. Formulated with advanced pigments for vibrant, long-lasting color that resists fading.', 'High Gloss', '10-12 years', 'Easy clean', '85-100 sq ft/ltr', 'Exterior trim, doors, gates', true, 4),

('Colorsome Premium Primer', 'premium-primer', (SELECT id FROM categories WHERE slug = 'primers'), 'Superior adhesion primer for perfect paint application', 'Colorsome Premium Primer creates an ideal foundation for topcoat application. Its advanced formulation ensures excellent adhesion, seals porous surfaces, and provides uniform coverage.', 'Flat', 'N/A', 'N/A', '100-120 sq ft/ltr', 'All interior and exterior surfaces', false, 5),

('Colorsome Aqua Shield', 'aqua-shield', (SELECT id FROM categories WHERE slug = 'waterproofing'), 'Complete waterproofing protection for wet areas', 'Colorsome Aqua Shield provides impenetrable water protection for bathrooms, kitchens, terraces, and water-exposed areas. Flexible membrane technology prevents water seepage and structural damage.', 'Membrane', '15+ years', '100% waterproof', '50-60 sq ft/ltr', 'Bathrooms, terraces, balconies', true, 6),

('Colorsome Wall Putty', 'wall-putty', (SELECT id FROM categories WHERE slug = 'wall-putty'), 'Smooth wall putty for flawless paint finish', 'Colorsome Wall Putty fills imperfections and creates a perfectly smooth surface for paint application. White cement-based formula ensures excellent bonding and crack resistance.', 'Smooth', '5-7 years', 'N/A', '14-16 sq ft/kg', 'Interior and exterior walls', false, 7),

('Colorsome Designer Texture', 'designer-texture', (SELECT id FROM categories WHERE slug = 'textures'), 'Premium textured finish for designer walls', 'Colorsome Designer Texture creates distinctive textured wall finishes that add depth and character to spaces. Available in multiple patterns from subtle sand finishes to bold relief designs.', 'Textured', '8-10 years', 'Dust resistant', '60-80 sq ft/ltr', 'Feature walls, commercial spaces', true, 8),

('Colorsome Wood Glow', 'wood-glow', (SELECT id FROM categories WHERE slug = 'wood-coatings'), 'Premium wood finish for natural beauty', 'Colorsome Wood Glow enhances and protects wood surfaces with a rich, transparent finish. Highlights natural wood grain while providing UV protection and resistance to moisture.', 'Satin/Gloss', '6-8 years', 'Water resistant', '80-100 sq ft/ltr', 'Furniture, doors, windows', true, 9),

('Colorsome Metal Enamel', 'metal-enamel', (SELECT id FROM categories WHERE slug = 'enamels'), 'High-gloss enamel for metal surfaces', 'Colorsome Metal Enamel provides a durable, high-gloss finish for metal surfaces. Rust-inhibiting formula with excellent color retention and chip resistance.', 'High Gloss', '8-10 years', 'Rust resistant', '100-120 sq ft/ltr', 'Metal furniture, grills, gates', false, 10);

-- Insert sample shades
INSERT INTO shades (name, hex_code, collection, collection_type, featured, display_order) VALUES
('Ivory Silk', '#FFFFF0', 'Neutrals', 'Classic Neutrals', true, 1),
('Warm Sand', '#D4B896', 'Neutrals', 'Classic Neutrals', true, 2),
('Soft Cashmere', '#D1C7BD', 'Neutrals', 'Classic Neutrals', true, 3),
('Coastal Blue', '#6B8FA3', 'Blues', 'Ocean Collection', true, 4),
('Lagoon Teal', '#008080', 'Blues', 'Ocean Collection', true, 5),
('Evening Sky', '#4A5568', 'Blues', 'Ocean Collection', false, 6),
('Forest Green', '#228B22', 'Greens', 'Nature Palette', true, 7),
('Sage Mist', '#9DC183', 'Greens', 'Nature Palette', false, 8),
('Olive Grove', '#808000', 'Greens', 'Nature Palette', false, 9),
('Burgundy Wine', '#722F37', 'Reds', 'Rich Accents', true, 10),
('Terracotta', '#E2725B', 'Reds', 'Rich Accents', false, 11),
('Coral Sunset', '#FF6F61', 'Reds', 'Rich Accents', false, 12),
('Lavender Mist', '#E6E6FA', 'Purples', 'Pastel Dreams', false, 13),
('Muted Plum', '#614051', 'Purples', 'Pastel Dreams', false, 14),
('Mustard Gold', '#FFDB58', 'Yellows', 'Sunlight Series', false, 15),
('Soft Peach', '#FFDAB9', 'Yellows', 'Sunlight Series', false, 16),
('Charcoal Grey', '#36454F', 'Greys', 'Urban Modern', true, 17),
('Slate Blue', '#6A5ACD', 'Greys', 'Urban Modern', false, 18),
('Pure White', '#FFFFFF', 'Whites', 'Pure Collection', true, 19),
('Soft Pearl', '#EBF2F2', 'Whites', 'Pure Collection', false, 20);

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, location, quote, rating, project_type) VALUES
('Priya Sharma', 'Mumbai', 'Colorsome transformed our living room completely. The Luxe Interior finish is stunning - guests always compliment the walls. Worth every rupee for the quality.', 5, 'Interior Painting'),
('Rajesh Patel', 'Ahmedabad', 'The weather guard paint on our exterior has survived two monsoons without any issues. Color has not faded at all. Very impressed with durability.', 5, 'Exterior Painting'),
('Anita Desai', 'Pune', 'Excellent consultation service. They helped us choose the perfect shades for our new home. The texture finish in our living room is a conversation piece.', 5, 'Full Home Painting'),
('Vikram Singh', 'Delhi', 'Professional team, clean work, and beautiful finish. They completed our 4BHK flat in just 5 days. Highly recommend Colorsome.', 5, 'Interior Painting'),
('Meera Krishnan', 'Chennai', 'The waterproofing solution worked perfectly for our terrace. No more leaks even during heavy rains. Expert guidance made all the difference.', 5, 'Waterproofing');
