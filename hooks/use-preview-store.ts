import { create } from 'zustand';

interface PreviewState {
  // Global configurations for the currently previewed component
  speed: number;
  duration: number;
  scale: number;
  color: string;
  theme: 'dark' | 'light';
  isPlaying: boolean;
  triggerKey: number; // Used to force re-render/re-trigger animations
  activeVariant: string;

  // Actions
  setSpeed: (speed: number) => void;
  setDuration: (duration: number) => void;
  setScale: (scale: number) => void;
  setColor: (color: string) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setActiveVariant: (variant: string) => void;
  retrigger: () => void;
  reset: () => void;
}

const initialState = {
  speed: 1,
  duration: 1,
  scale: 1,
  color: '#6366f1', // indigo-500
  theme: 'dark' as const,
  isPlaying: true,
  triggerKey: 0,
  activeVariant: 'Default',
};

export const usePreviewStore = create<PreviewState>((set) => ({
  ...initialState,
  
  setSpeed: (speed) => set({ speed }),
  setDuration: (duration) => set({ duration }),
  setScale: (scale) => set({ scale }),
  setColor: (color) => set({ color }),
  setTheme: (theme) => set({ theme }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setActiveVariant: (activeVariant) => set({ activeVariant }),
  retrigger: () => set((state) => ({ triggerKey: state.triggerKey + 1, isPlaying: true })),
  reset: () => set(initialState),
}));

