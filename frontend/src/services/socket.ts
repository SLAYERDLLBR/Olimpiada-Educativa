import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

/** One connection per session, authenticated with the short-lived session token. */
export function connectSocket(sessionToken: string): Socket {
  if (socket?.connected) return socket;

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token: sessionToken },
  });

  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}
