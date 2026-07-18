import { create } from 'zustand';

export interface PlaygroundItem {
  id: string; // Unique ID for this instance on the canvas
  componentId: string; // The ID of the component type (e.g., 'magnetic-button')
  name: string; // Human readable name
  props?: Record<string, any>; // Any configurable props
}

interface PlaygroundState {
  items: PlaygroundItem[];
  addItem: (item: Omit<PlaygroundItem, 'id'>) => void;
  removeItem: (id: string) => void;
  reorderItems: (startIndex: number, endIndex: number) => void;
  clearCanvas: () => void;
}

// Generate a random ID for canvas items
const generateId = () => Math.random().toString(36).substring(2, 9);

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  items: [],
  
  addItem: (item) => 
    set((state) => ({ 
      items: [...state.items, { ...item, id: generateId() }] 
    })),
    
  removeItem: (id) => 
    set((state) => ({ 
      items: state.items.filter((item) => item.id !== id) 
    })),
    
  reorderItems: (startIndex, endIndex) => 
    set((state) => {
      const result = Array.from(state.items);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { items: result };
    }),
    
  clearCanvas: () => set({ items: [] }),
}));
