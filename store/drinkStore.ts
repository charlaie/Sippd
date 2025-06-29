import { create } from 'zustand';

export interface DrinkEntry {
  id: string;
  drinkName: string;
  shopName: string;
  drinkType: string;
  sugarLevel: string;
  iceLevel: string;
  milkType: string;
  size: string;
  cupType: string;
  extraNotes?: string;
  createdAt: Date;
  rating?: number;
  price?: string;
  image?: string;
}

interface DrinkState {
  drinks: DrinkEntry[];
  isLoading: boolean;
  error: string | null;
  addDrink: (drink: Omit<DrinkEntry, 'id' | 'createdAt'>) => Promise<void>;
  updateDrink: (id: string, updates: Partial<DrinkEntry>) => void;
  deleteDrink: (id: string) => void;
  clearError: () => void;
}

export const useDrinkStore = create<DrinkState>((set, get) => ({
  drinks: [],
  isLoading: false,
  error: null,

  addDrink: async (drinkData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate random failure for demo (remove in production)
      if (Math.random() < 0.1) {
        throw new Error('Failed to save drink. Please try again.');
      }

      const newDrink: DrinkEntry = {
        ...drinkData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };

      set(state => ({
        drinks: [newDrink, ...state.drinks],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
      throw error;
    }
  },

  updateDrink: (id, updates) => {
    set(state => ({
      drinks: state.drinks.map(drink =>
        drink.id === id ? { ...drink, ...updates } : drink
      ),
    }));
  },

  deleteDrink: (id) => {
    set(state => ({
      drinks: state.drinks.filter(drink => drink.id !== id),
    }));
  },

  clearError: () => set({ error: null }),
}));