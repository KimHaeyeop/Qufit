import { Room } from 'livekit-client';
import { Participant } from 'livekit-client';
import { create } from 'zustand';

interface State {
    participants: Participant[];
    room: Room | undefined;
}

interface Action {
    setParticipants: (participant: Participant) => void;
    setRoom: (room: Room | undefined) => void;
}

const useGroupVideoStore = create<State & Action>((set) => ({
    room: undefined,
    participants: [],

    setRoom: (room) => set({ room: room }),
    setParticipants: (participant) =>
        set((state) => ({
            participants: [...state.participants, participant],
        })),
}));

export const useGroupVideoRoom = () => useGroupVideoStore((state) => state.room);
export const useGroupVideoParticipants = () => useGroupVideoStore((state) => state.participants);
export const useGroupVideoSetRoom = () => useGroupVideoStore((state) => state.setRoom);
export const useGroupVideoSetParticipants = () => useGroupVideoStore((state) => state.setParticipants);
