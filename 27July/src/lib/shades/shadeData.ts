// Single source of truth for the 100-shade Colorsome dataset and the
// collection taxonomy — extracted from src/app/shades/page.tsx so it can be
// shared with the colour visualizer (and any future consumer) without
// duplicating 100 hardcoded records. No values changed in this move.

import type { Shade } from '../supabase';

export const collectionTypes = [
  { name: 'All Shades', slug: null },
  { name: 'Classic Neutrals', slug: 'Classic Neutrals' },
  { name: 'Ocean Collection', slug: 'Ocean Collection' },
  { name: 'Nature Palette', slug: 'Nature Palette' },
  { name: 'Rich Accents', slug: 'Rich Accents' },
  { name: 'Pastel Dreams', slug: 'Pastel Dreams' },
  { name: 'Sunlight Series', slug: 'Sunlight Series' },
  { name: 'Urban Modern', slug: 'Urban Modern' },
  { name: 'Pure Collection', slug: 'Pure Collection' },
  { name: 'Earthy Tones', slug: 'Earthy Tones' },
  { name: 'Jewel Tones', slug: 'Jewel Tones' },
  { name: 'Muted Pastels', slug: 'Muted Pastels' },
];

export const STATIC_SHADES: Shade[] = [
  // ── Classic Neutrals ──────────────────────────────
  { id: '1', name: 'Ivory Silk', hex_code: '#FFFFF0', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: true, display_order: 1, created_at: '' },
  { id: '2', name: 'Warm Sand', hex_code: '#D4B896', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: true, display_order: 2, created_at: '' },
  { id: '3', name: 'Soft Cashmere', hex_code: '#D1C7BD', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: true, display_order: 3, created_at: '' },
  { id: '4', name: 'Creamy Beige', hex_code: '#F5E6D3', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 4, created_at: '' },
  { id: '5', name: 'Warm Taupe', hex_code: '#C4A882', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 5, created_at: '' },
  { id: '6', name: 'Pale Almond', hex_code: '#E8D5C4', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 6, created_at: '' },
  { id: '7', name: 'Greige', hex_code: '#B8A99A', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 7, created_at: '' },

  // ── Ocean Collection ──────────────────────────────
  { id: '8', name: 'Coastal Blue', hex_code: '#6B8FA3', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: true, display_order: 8, created_at: '' },
  { id: '9', name: 'Lagoon Teal', hex_code: '#008080', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: true, display_order: 9, created_at: '' },
  { id: '10', name: 'Evening Sky', hex_code: '#4A5568', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 10, created_at: '' },
  { id: '11', name: 'Deep Navy', hex_code: '#1B2A4A', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 11, created_at: '' },
  { id: '12', name: 'Seafoam', hex_code: '#7CB9A8', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 12, created_at: '' },
  { id: '13', name: 'Cobalt Dream', hex_code: '#1E3A5F', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 13, created_at: '' },
  { id: '14', name: 'Blue Horizon', hex_code: '#5B7B8A', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 14, created_at: '' },

  // ── Nature Palette ──────────────────────────────
  { id: '15', name: 'Forest Green', hex_code: '#228B22', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: true, display_order: 15, created_at: '' },
  { id: '16', name: 'Sage Mist', hex_code: '#9DC183', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 16, created_at: '' },
  { id: '17', name: 'Olive Grove', hex_code: '#808000', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 17, created_at: '' },
  { id: '18', name: 'Moss Green', hex_code: '#5A7D5A', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 18, created_at: '' },
  { id: '19', name: 'Pistachio', hex_code: '#93C572', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 19, created_at: '' },
  { id: '20', name: 'Eucalyptus', hex_code: '#6A8D73', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 20, created_at: '' },
  { id: '21', name: 'Basil Green', hex_code: '#3D5C3A', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 21, created_at: '' },

  // ── Rich Accents ──────────────────────────────
  { id: '22', name: 'Burgundy Wine', hex_code: '#722F37', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: true, display_order: 22, created_at: '' },
  { id: '23', name: 'Terracotta', hex_code: '#E2725B', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 23, created_at: '' },
  { id: '24', name: 'Coral Sunset', hex_code: '#FF6F61', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 24, created_at: '' },
  { id: '25', name: 'Crimson Rose', hex_code: '#B22222', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 25, created_at: '' },
  { id: '26', name: 'Rustic Red', hex_code: '#A0522D', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 26, created_at: '' },
  { id: '27', name: 'Mahogany', hex_code: '#8B4513', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 27, created_at: '' },

  // ── Pastel Dreams ──────────────────────────────
  { id: '28', name: 'Lavender Mist', hex_code: '#E6E6FA', collection: 'Purples', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 28, created_at: '' },
  { id: '29', name: 'Muted Plum', hex_code: '#614051', collection: 'Purples', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 29, created_at: '' },
  { id: '30', name: 'Blush Pink', hex_code: '#F8C8C8', collection: 'Pinks', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 30, created_at: '' },
  { id: '31', name: 'Powder Blue', hex_code: '#B0C4DE', collection: 'Blues', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 31, created_at: '' },
  { id: '32', name: 'Mint Cream', hex_code: '#C8E6D9', collection: 'Greens', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 32, created_at: '' },
  { id: '33', name: 'Lilac', hex_code: '#C8A2C8', collection: 'Purples', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 33, created_at: '' },
  { id: '34', name: 'Baby Pink', hex_code: '#F4C2C2', collection: 'Pinks', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 34, created_at: '' },

  // ── Sunlight Series ──────────────────────────────
  { id: '35', name: 'Mustard Gold', hex_code: '#FFDB58', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 35, created_at: '' },
  { id: '36', name: 'Soft Peach', hex_code: '#FFDAB9', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 36, created_at: '' },
  { id: '37', name: 'Sunflower', hex_code: '#FFC72C', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 37, created_at: '' },
  { id: '38', name: 'Honey Glow', hex_code: '#E8A317', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 38, created_at: '' },
  { id: '39', name: 'Lemon Zest', hex_code: '#FFF44F', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 39, created_at: '' },
  { id: '40', name: 'Apricot', hex_code: '#FBCEB1', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 40, created_at: '' },

  // ── Urban Modern ──────────────────────────────
  { id: '41', name: 'Charcoal Grey', hex_code: '#36454F', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: true, display_order: 41, created_at: '' },
  { id: '42', name: 'Slate Blue', hex_code: '#6A5ACD', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 42, created_at: '' },
  { id: '43', name: 'Graphite', hex_code: '#383838', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 43, created_at: '' },
  { id: '44', name: 'Steel Grey', hex_code: '#71797E', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 44, created_at: '' },
  { id: '45', name: 'Anthracite', hex_code: '#293133', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 45, created_at: '' },
  { id: '46', name: 'Smoke Grey', hex_code: '#B0B5B9', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 46, created_at: '' },

  // ── Pure Collection ──────────────────────────────
  { id: '47', name: 'Pure White', hex_code: '#FFFFFF', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: true, display_order: 47, created_at: '' },
  { id: '48', name: 'Soft Pearl', hex_code: '#EBF2F2', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: false, display_order: 48, created_at: '' },
  { id: '49', name: 'Crisp White', hex_code: '#F8F9FA', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: false, display_order: 49, created_at: '' },
  { id: '50', name: 'Off White', hex_code: '#FAF9F6', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: false, display_order: 50, created_at: '' },

  // ── Earthy Tones ──────────────────────────────
  { id: '51', name: 'Clay Brown', hex_code: '#B85D3F', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 51, created_at: '' },
  { id: '52', name: 'Saddle Brown', hex_code: '#8B4513', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 52, created_at: '' },
  { id: '53', name: 'Chestnut', hex_code: '#954535', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 53, created_at: '' },
  { id: '54', name: 'Warm Cocoa', hex_code: '#7B5B3A', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 54, created_at: '' },
  { id: '55', name: 'Sand Dune', hex_code: '#C4A484', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 55, created_at: '' },

  // ── Jewel Tones ──────────────────────────────
  { id: '56', name: 'Emerald Green', hex_code: '#50C878', collection: 'Greens', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 56, created_at: '' },
  { id: '57', name: 'Sapphire Blue', hex_code: '#0F52BA', collection: 'Blues', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 57, created_at: '' },
  { id: '58', name: 'Ruby Red', hex_code: '#9B111E', collection: 'Reds', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 58, created_at: '' },
  { id: '59', name: 'Amethyst', hex_code: '#9966CC', collection: 'Purples', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 59, created_at: '' },
  { id: '60', name: 'Topaz', hex_code: '#FFC87C', collection: 'Yellows', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 60, created_at: '' },
  { id: '61', name: 'Citrine', hex_code: '#E4D00A', collection: 'Yellows', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 61, created_at: '' },

  // ── Muted Pastels ──────────────────────────────
  { id: '62', name: 'Dusty Rose', hex_code: '#C9A9A9', collection: 'Pinks', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 62, created_at: '' },
  { id: '63', name: 'Faded Denim', hex_code: '#7A8B99', collection: 'Blues', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 63, created_at: '' },
  { id: '64', name: 'Mauve', hex_code: '#B784A7', collection: 'Purples', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 64, created_at: '' },
  { id: '65', name: 'Sage Green', hex_code: '#BCB88A', collection: 'Greens', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 65, created_at: '' },
  { id: '66', name: 'Blush', hex_code: '#DEB887', collection: 'Reds', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 66, created_at: '' },
  { id: '67', name: 'Storm Grey', hex_code: '#A0A0A0', collection: 'Greys', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 67, created_at: '' },
  { id: '68', name: 'Linen', hex_code: '#E8DCC8', collection: 'Neutrals', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 68, created_at: '' },

  // ── Classic Neutrals (more) ──────────────────────────────
  { id: '69', name: 'Bone White', hex_code: '#EFE6D8', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 69, created_at: '' },
  { id: '70', name: 'Mushroom', hex_code: '#C2B8A3', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 70, created_at: '' },
  { id: '71', name: 'Oatmeal', hex_code: '#D9CBB5', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 71, created_at: '' },

  // ── Ocean Collection (more) ──────────────────────────────
  { id: '72', name: 'Aegean Blue', hex_code: '#3B6E8F', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 72, created_at: '' },
  { id: '73', name: 'Marine Teal', hex_code: '#167D7F', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 73, created_at: '' },
  { id: '74', name: 'Glacier Blue', hex_code: '#A9C6D6', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 74, created_at: '' },

  // ── Nature Palette (more) ──────────────────────────────
  { id: '75', name: 'Fern Green', hex_code: '#4F7942', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 75, created_at: '' },
  { id: '76', name: 'Juniper', hex_code: '#5B7065', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 76, created_at: '' },
  { id: '77', name: 'Willow Green', hex_code: '#98A869', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 77, created_at: '' },

  // ── Rich Accents (more) ──────────────────────────────
  { id: '78', name: 'Brick Red', hex_code: '#A63A2E', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 78, created_at: '' },
  { id: '79', name: 'Garnet', hex_code: '#6E1423', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 79, created_at: '' },
  { id: '80', name: 'Wine Red', hex_code: '#5B0A18', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 80, created_at: '' },

  // ── Pastel Dreams (more) ──────────────────────────────
  { id: '81', name: 'Cotton Candy', hex_code: '#F7C6D9', collection: 'Pinks', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 81, created_at: '' },
  { id: '82', name: 'Periwinkle', hex_code: '#C3CDE6', collection: 'Purples', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 82, created_at: '' },
  { id: '83', name: 'Vanilla Cream', hex_code: '#F5EACB', collection: 'Yellows', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 83, created_at: '' },

  // ── Sunlight Series (more) ──────────────────────────────
  { id: '84', name: 'Marigold', hex_code: '#EAA221', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 84, created_at: '' },
  { id: '85', name: 'Butterscotch', hex_code: '#D69C4F', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 85, created_at: '' },
  { id: '86', name: 'Golden Wheat', hex_code: '#E8C275', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 86, created_at: '' },

  // ── Urban Modern (more) ──────────────────────────────
  { id: '87', name: 'Iron Grey', hex_code: '#4B4E52', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 87, created_at: '' },
  { id: '88', name: 'Pewter', hex_code: '#8E9192', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 88, created_at: '' },
  { id: '89', name: 'Concrete', hex_code: '#9C9C94', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 89, created_at: '' },

  // ── Pure Collection (more) ──────────────────────────────
  { id: '90', name: 'Snow White', hex_code: '#FDFDFC', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: false, display_order: 90, created_at: '' },
  { id: '91', name: 'Alabaster', hex_code: '#EDEAE0', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: false, display_order: 91, created_at: '' },

  // ── Earthy Tones (more) ──────────────────────────────
  { id: '92', name: 'Terracotta Clay', hex_code: '#B5654A', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 92, created_at: '' },
  { id: '93', name: 'Umber', hex_code: '#6B4423', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 93, created_at: '' },
  { id: '94', name: 'Ochre', hex_code: '#C08A2E', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 94, created_at: '' },

  // ── Jewel Tones (more) ──────────────────────────────
  { id: '95', name: 'Peridot Green', hex_code: '#A8C63C', collection: 'Greens', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 95, created_at: '' },
  { id: '96', name: 'Rose Quartz', hex_code: '#E0A6A6', collection: 'Pinks', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 96, created_at: '' },
  { id: '97', name: 'Onyx', hex_code: '#2B2B2E', collection: 'Greys', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 97, created_at: '' },

  // ── Muted Pastels (more) ──────────────────────────────
  { id: '98', name: 'Taupe Grey', hex_code: '#A79A8B', collection: 'Greys', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 98, created_at: '' },
  { id: '99', name: 'Sandstone', hex_code: '#C9AE86', collection: 'Browns', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 99, created_at: '' },
  { id: '100', name: 'Fog Blue', hex_code: '#A9B7C0', collection: 'Blues', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 100, created_at: '' },
];

// Colour family options, in the data's natural first-seen order (a
// sensible rainbow-ish progression) rather than alphabetical — derived
// straight from real shade data, not a hand-maintained list that can drift.
export const FAMILY_OPTIONS: string[] = Array.from(
  new Set(STATIC_SHADES.map((s) => s.collection).filter((c): c is string => !!c))
);
