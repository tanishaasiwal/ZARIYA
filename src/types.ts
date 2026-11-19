export type CollectionSlug =
  | 'banarasi-silk'
  | 'kanjivaram-silk'
  | 'chanderi-sarees'
  | 'organza-sarees'
  | 'patola-silk'
  | 'jamdani-sarees'
  | 'mysore-silk'
  | 'bandhani-silk'
  | 'handloom-collection'
  | 'bridal-collection'
  | 'festive-collection'
  | 'contemporary-sarees';

export interface CollectionInfo {
  slug: CollectionSlug;
  name: string;
  origin: string;
  tagline: string;
  description: string;
  craftNote: string;
  image: string;
  aspect?: '3:4' | '16:9';
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  priceINR: number;
  collectionSlug: CollectionSlug;
  collectionName: string;
  fabric:
    | 'Katan Silk'
    | 'Kanjivaram Silk'
    | 'Chanderi Silk-Cotton'
    | 'Silk Organza'
    | 'Paithani Silk'
    | 'Tissue Silk'
    | 'Tussar Silk'
    | 'Patola Silk'
    | 'Jamdani Muslin'
    | 'Mysore Crepe Silk'
    | 'Gajji Bandhani Silk';
  weave: string;
  color:
    | 'Peacock Teal'
    | 'Sindoori Crimson'
    | 'Pearl Ivory'
    | 'Muted Sage'
    | 'Champagne Gold'
    | 'Charcoal Slate'
    | 'Indigo Navy'
    | 'Royal Plum'
    | 'Haldi Mustard'
    | 'Gajri Crimson'
    | 'Midnight Sapphire'
    | 'Bronze Maroon'
    | 'Pistachio Mint'
    | 'Dusty Rose'
    | 'Terracotta Rust'
    | 'Emerald Gold'
    | 'Antique Copper'
    | 'Muted Lavender'
    | 'Vermilion Saffron';
  colorHex: string;
  occasion: 'Bridal' | 'Festive' | 'Evening Cocktail' | 'Daytime Heritage' | 'Ceremonial';
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  isBridal?: boolean;
  popularity: number;
  createdAt: string;
  images: string[];
  description: string;
  blouseInfo: string;
  dimensions: string;
  careInstructions: string;
  artisanOrigin: string;
  craftHours: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  blouseOption: 'Unstitched Blouse Included' | 'Complimentary Custom Tailoring';
}

export interface JournalEntry {
  slug: string;
  title: string;
  kicker: string;
  category?: 'Craft Chronicle' | 'Lookbook' | 'Material Study';
  byline?: string;
  pullQuote?: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  paragraphs: string[];
  stylingNotes: string[];
  featuredProductIds: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  sareeName: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Craft & Authenticity' | 'Orders & Shipping' | 'Blouse & Tailoring' | 'Care';
}
