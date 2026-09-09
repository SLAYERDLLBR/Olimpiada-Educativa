import { create } from "zustand";
import type { RoomSnapshot } from "../types/index.ts";

interface RoomState {
  snapshot: RoomSnapshot | null;
  setSnapshot: (snapshot: RoomSnapshot | null) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  snapshot: null,
  setSnapshot: (snapshot) => set({ snapshot }),
}));
