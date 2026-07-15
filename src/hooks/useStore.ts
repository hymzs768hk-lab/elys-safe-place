import { create } from 'zustand'

interface GameState {
  currentScene: string
  setCurrentScene: (scene: string) => void
  isDoorOpen: boolean
  setDoorOpen: (open: boolean) => void
  selectedCDSlot: number | null
  setSelectedCDSlot: (slot: number | null) => void
}

export const useGameStore = create<GameState>((set) => ({
  currentScene: 'exterior',
  setCurrentScene: (scene) => set({ currentScene: scene }),
  isDoorOpen: false,
  setDoorOpen: (open) => set({ isDoorOpen: open }),
  selectedCDSlot: null,
  setSelectedCDSlot: (slot) => set({ selectedCDSlot: slot }),
}))
