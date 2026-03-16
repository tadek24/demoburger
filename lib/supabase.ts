// Mock of Supabase Client
// For demo purposes, this simulates inserting orders and subscribing to real-time status updates.

export type OrderStatus = 'Received' | 'Preparing' | 'On the way' | 'Delivered';

export interface Order {
  id: string;
  items: any[];
  total: number;
  customerDetails: {
    name: string;
    address: string;
  };
  status: OrderStatus;
  createdAt: string;
}

// Global active orders to mock a database state between Admin and User
const mockDatabase: Record<string, Order> = {};
const listeners: Record<string, ((payload: any) => void)[]> = {};

export const mockSupabase = {
  from: (table: string) => ({
    insert: async (data: any) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const newOrder: Order = {
        ...data[0],
        id: Math.random().toString(36).substring(2, 9),
        status: 'Received',
        createdAt: new Date().toISOString(),
      };
      
      mockDatabase[newOrder.id] = newOrder;
      
      return { data: [newOrder], error: null };
    },
    select: async (query?: string) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { data: Object.values(mockDatabase), error: null };
    },
    update: async (data: { status: OrderStatus }) => {
      return {
        eq: async (column: string, value: string) => {
          await new Promise((resolve) => setTimeout(resolve, 300));
          if (mockDatabase[value]) {
            mockDatabase[value].status = data.status;
            
            // Notify listeners about the change
            if (listeners[value]) {
              listeners[value].forEach(cb => cb({ 
                new: mockDatabase[value] 
              }));
            }
          }
          return { data: [mockDatabase[value]], error: null };
        }
      };
    }
  }),
  channel: (channelName: string) => {
    let currentEvent: string = '';
    let currentFilter: string = '';
    let currentCallback: (payload: any) => void;
    
    return {
      on: (event: string, filter: { event: string, schema: string, table: string, filter?: string }, callback: (payload: any) => void) => {
        if (filter.filter && filter.filter.startsWith('id=eq.')) {
          const id = filter.filter.split('.')[1];
          if (!listeners[id]) listeners[id] = [];
          listeners[id].push(callback);
        }
        return mockSupabase.channel(channelName);
      },
      subscribe: () => {
        return { unsubscribe: () => {} };
      }
    };
  }
};

// Helper for Admin to get all orders directly and listen
export const getActiveOrders = () => {
  return Object.values(mockDatabase).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};
