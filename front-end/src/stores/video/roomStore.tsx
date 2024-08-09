import { Room } from 'livekit-client';
import { Participant } from 'livekit-client';
import { create } from 'zustand';

export interface RoomParticipant {
    id: number | undefined;
    gender: 'f' | 'm' | undefined;
    nickname: string | undefined;
    info: Participant | undefined;
}

interface State {
    room: Room | undefined;
    participants: RoomParticipant[];
    hostId: number | undefined;
    roomId: number | undefined;
}

interface Action {
    setRoom: (room: Room | undefined) => void;
    addParticipant: (participant: RoomParticipant) => void;
    setParticipants: (participant: RoomParticipant[]) => void;
    setHostId: (id: number) => void;
    setRoomId: (id: number) => void;
}

const useRoomStore = create<State & Action>((set) => ({
    room: undefined,
    participants: [],
    myName: '',
    hostId: undefined,
    roomId: undefined,

    setRoom: (room) => set({ room: room }),
    addParticipant: (participant) =>
        set((state) => ({
            participants: [...state.participants, participant],
        })),

    setParticipants: (participants) => set({ participants: participants }),

    setHostId: (hostId) => set({ hostId: hostId }),

    setRoomId: (roomId) => set({ roomId: roomId }),
}));

export const useRoomStateStore = () => useRoomStore((state) => state.room);
export const useRoomParticipantsStore = () => useRoomStore((state) => state.participants);
export const useHostIdStore = () => useRoomStore((state) => state.hostId);
export const useRoomIdStore = () => useRoomStore((state) => state.roomId);

export const useSetRoomStateStore = () => useRoomStore((state) => state.setRoom);
export const useRoomAddParticipantStore = () => useRoomStore((state) => state.addParticipant);
export const useRoomSetParticipantsStore = () => useRoomStore((state) => state.setParticipants);
export const useSetHostIdStore = () => useRoomStore((state) => state.setHostId);
export const useSetRoomIdStore = () => useRoomStore((state) => state.setRoomId);
