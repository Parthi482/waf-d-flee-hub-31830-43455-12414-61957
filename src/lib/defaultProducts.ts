import { Product } from '@/types/product';

export const defaultProducts: Product[] = [
  // WAFFLES
  { id: '1', name: 'Honey Butter Waffle', category: 'WAFFLES', miniPrice: 29, regularPrice: 49 },
  { id: '2', name: 'Peanut Butter Waffle', category: 'WAFFLES', miniPrice: 39, regularPrice: 69 },
  { id: '3', name: 'Maple Butter Waffle', category: 'WAFFLES', miniPrice: 49, regularPrice: 89 },
  
  // CHOCOLATES & FLAVORS
  { id: '4', name: 'Belgian Dark Chocolate', category: 'CHOCOLATES & FLAVORS', miniPrice: 49, regularPrice: 89 },
  { id: '5', name: 'Belgian Milk Chocolate', category: 'CHOCOLATES & FLAVORS', miniPrice: 49, regularPrice: 89 },
  { id: '6', name: 'Belgian White Chocolate', category: 'CHOCOLATES & FLAVORS', miniPrice: 49, regularPrice: 89 },
  { id: '7', name: 'Coffee Waffle', category: 'CHOCOLATES & FLAVORS', miniPrice: 49, regularPrice: 89 },
  { id: '8', name: 'Butterscotch Waffle', category: 'CHOCOLATES & FLAVORS', miniPrice: 49, regularPrice: 89 },
  
  // PREMIUM SPECIALS
  { id: '9', name: 'Red Velvet Waffle', category: 'PREMIUM SPECIALS', regularPrice: 99 },
  { id: '10', name: 'Cookies & Cream', category: 'PREMIUM SPECIALS', regularPrice: 99 },
  { id: '11', name: 'Dark Haki', category: 'PREMIUM SPECIALS', regularPrice: 99 },
  { id: '12', name: 'Soul White', category: 'PREMIUM SPECIALS', regularPrice: 99 },
  { id: '13', name: 'Duo Waf', category: 'PREMIUM SPECIALS', regularPrice: 99 },
  
  // SIGNATURE WAFFLES
  { id: '14', name: 'KitKat Waffle', category: 'SIGNATURE WAFFLES', regularPrice: 109 },
  { id: '15', name: 'Oreo Waffle', category: 'SIGNATURE WAFFLES', regularPrice: 109 },
  { id: '16', name: 'Snickers Waffle', category: 'SIGNATURE WAFFLES', regularPrice: 109 },
  
  // ULTIMATE TREATS
  { id: '17', name: 'Nico Nutella', category: 'ULTIMATE TREATS', regularPrice: 119 },
  { id: '18', name: 'Three Sword Chocolate', category: 'ULTIMATE TREATS', regularPrice: 119 },
];
