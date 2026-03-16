import { createClient } from '@supabase/supabase-js';

export type OrderStatus = 'Otrzymane' | 'W przygotowaniu' | 'Gotowe do odbioru' | 'Wydane';

export interface Order {
  id: string;
  customer_name: string;
  items: any[];
  total_price: number;
  status: OrderStatus;
  created_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
