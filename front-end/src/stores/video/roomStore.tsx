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
    managerName: string;
    myName: string;
}

interface Action {
    setRoom: (room: Room | undefined) => void;
    addParticipant: (participant: RoomParticipant) => void;
    setParticipants: (participant: RoomParticipant[]) => void;
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

    setParticipants: (participants) => set({ participants: participants }),
    setManagerName: (managerName) => set({ managerName: managerName }),
}));

export const useRoomStateStore = () => useRoomStore((state) => state.room);
export const useRoomParticipantsStore = () => useRoomStore((state) => state.participants);
export const useRoomMyNameStore = () => useRoomStore((state) => state.myName);
export const useRoomManagerNameStore = () => useRoomStore((state) => state.managerName);

export const useSetRoomStateStore = () => useRoomStore((state) => state.setRoom);
export const useRoomAddParticipantStore = () => useRoomStore((state) => state.addParticipant);
export const useRoomSetParticipantsStore = () => useRoomStore((state) => state.setParticipants);
export const useRoomSetMyNameStore = () => useRoomStore((state) => state.setMyName);
export const useRoomSetManagerNameStore = () => useRoomStore((state) => state.setManagerName);
