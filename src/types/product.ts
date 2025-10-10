export interface Product {
  id: string;
  name: string;
  category: string;
  miniPrice?: number;
  regularPrice: number;
  image?: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  size?: 'mini' | 'regular';
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
}
