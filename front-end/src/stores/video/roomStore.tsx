import { Room } from 'livekit-client';
import { Participant } from 'livekit-client';
import { create } from 'zustand';

interface State {
    room: Room | undefined;
    participants: Participant[];
    managerName: string;
    myName: string;
}

interface Action {
    setRoom: (room: Room | undefined) => void;
    addParticipant: (participant: Participant) => void;
    setManagerName: (managerName: string) => void;
    setMyName: (myName: string) => void;
}

const useRoomStore = create<State & Action>((set) => ({
    room: undefined,
    participants: [],
    myName: '',
    managerName: '',

    setRoom: (room) => set({ room: room }),
    setMyName: (myName) => set({ myName: myName }),
    addParticipant: (participant) =>
        set((state) => ({
            participants: [...state.participants, participant],
        })),

    setManagerName: (managerName) => set({ managerName: managerName }),
}));

export const useRoom = () => useRoomStore((state) => state.room);
export const useRoomParticipants = () => useRoomStore((state) => state.participants);
export const useRoomMyName = () => useRoomStore((state) => state.myName);
export const useRoomManagerName = () => useRoomStore((state) => state.managerName);

export const useSetRoom = () => useRoomStore((state) => state.setRoom);
export const useRoomAddParticipant = () => useRoomStore((state) => state.addParticipant);
export const useRoomSetMyName = () => useRoomStore((state) => state.setMyName);
export const useRoomSetManagerName = () => useRoomStore((state) => state.setManagerName);
