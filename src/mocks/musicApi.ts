// Mock CD slots (10 slots, pre-seeded)
const mockCdSlots = Array.from({ length: 10 }, (_, i) => ({
  id: `slot-${i + 1}`,
  slotNumber: i + 1,
  title: null,
  audioObjectPath: null,
  updatedAt: new Date().toISOString(),
}))

let cdSlots = [...mockCdSlots]

export function useListCdSlots() {
  return {
    data: cdSlots,
    isLoading: false,
  }
}

export function useUpdateCdSlot() {
  return {
    mutateAsync: async ({
      slotNumber,
      title,
      audioObjectPath,
    }: {
      slotNumber: number
      title?: string | null
      audioObjectPath?: string | null
    }) => {
      await new Promise((r) => setTimeout(r, 300))
      const slot = cdSlots.find((s) => s.slotNumber === slotNumber)
      if (slot) {
        if (title !== undefined) slot.title = title
        if (audioObjectPath !== undefined) slot.audioObjectPath = audioObjectPath
        slot.updatedAt = new Date().toISOString()
      }
      return slot
    },
  }
}

export function getListCdSlotsQueryKey() {
  return ['cdSlots']
}
