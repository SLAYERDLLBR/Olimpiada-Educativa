import { create } from "zustand";

interface PlayerState {
  playerId: string | null;
  sessionToken: string | null;
  username: string;
  series: number;
  avatarIndex: number;
  setIdentity: (data: { playerId: string; sessionToken: string; username: string; series: number; avatarIndex: number }) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  playerId: null,
  sessionToken: null,
  username: "",
  series: 1,
  avatarIndex: 0,
  setIdentity: (data) => set(data),
}));
