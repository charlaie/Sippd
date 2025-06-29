import { create } from 'zustand';

interface UIState {
  isDrinkLogDrawerVisible: boolean;
  openDrinkLogDrawer: () => void;
  closeDrinkLogDrawer: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDrinkLogDrawerVisible: false,
  openDrinkLogDrawer: () => set({ isDrinkLogDrawerVisible: true }),
  closeDrinkLogDrawer: () => set({ isDrinkLogDrawerVisible: false }),
}));