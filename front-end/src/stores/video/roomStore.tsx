import { Room } from 'livekit-client';
import { create } from 'zustand';

interface RoomStateProps {
    room: Room | undefined;
    setRoom: (room: Room | undefined) => void;
}
export const useRoomStore = create<RoomStateProps>((set) => ({
    room: undefined,
    setRoom: (room) => set({ room: room }),
}));
