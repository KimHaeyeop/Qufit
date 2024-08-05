import { LIVEKIT_URL, ROOM_SETTING } from '@components/video/VideoConstants';
import {
    useCreateVideoRoomMutation,
    useJoinVideoRoomMutation,
    useLeaveVideoRoomMutation,
    useVideoRoomDetailQuery,
} from '@queries/useVideoQuery';
import {
    useRoomAddParticipantStore,
    useRoomManagerNameStore,
    useRoomMyNameStore,
    useRoomSetManagerNameStore,
    useRoomStateStore,
    useSetRoomStateStore,
} from '@stores/video/roomStore';
import { Participant, Room, RoomEvent } from 'livekit-client';
import { useEffect, useState } from 'react';

const useRoom = () => {
    const [videoRoomId, setVideoRoomId] = useState<number | null>(null);

    const managerName = useRoomManagerNameStore();
    const myName = useRoomMyNameStore();

    const [isManager, setIsManager] = useState(false);
    useEffect(() => {
        setIsManager(!!myName && !!managerName && managerName === myName);
    }, [managerName, myName]);
    const [localParticipant, setLocalParticipant] = useState<Participant>();
    const [remoteParticipants, setRemoteParticipants] = useState<Participant[]>([]);
    const room = useRoomStateStore();
    const setRoom = useSetRoomStateStore();

    const setManagerName = useRoomSetManagerNameStore();

    const addParticipant = useRoomAddParticipantStore();

    const { data } = useVideoRoomDetailQuery(videoRoomId);
    const createVideoRoom = useCreateVideoRoomMutation();
    const joinVideoRoom = useJoinVideoRoomMutation();
    const leaveVideoRoom = useLeaveVideoRoomMutation();

    const addEventHandler = async (room: Room) => {
        console.log(room);
        room.on(RoomEvent.ParticipantConnected, (participant) => {
            addParticipant(participant);
            setRemoteParticipants((prev) => [...prev, participant]);
        });
        await room.localParticipant.enableCameraAndMicrophone();
        //입장시 방장 정하자
        const curParticipants = [];
        curParticipants.push(room.localParticipant);
        Array.from(room.remoteParticipants.values()).forEach((participant) => curParticipants.push(participant));
        curParticipants.sort((partA, partB) => {
            if (new Date(partA.joinedAt!).getTime() > new Date(partB.joinedAt!).getTime()) return 1;
            else return -1;
        });

        setManagerName(curParticipants[0].name!);
        addParticipant(room.localParticipant);
        setLocalParticipant(room.localParticipant);
        setRemoteParticipants(Array.from(room.remoteParticipants.values()));
    };

    const createRoom = () => {
        createVideoRoom.mutate(
            {
                videoRoomName: 'test11',
                maxParticipants: 4,
                videoRoomHobbies: [],
                videoRoomPersonalities: [],
            },
            {
                onSuccess: async (data) => {
                    setVideoRoomId(data.data.videoRoomId);
                    const room = new Room(ROOM_SETTING);
                    await room.connect(LIVEKIT_URL, data?.data.token);
                    setRoom(room);
                    addEventHandler(room);
                },
                onError: async (data) => {
                    console.log(data);
                },
            },
        );
    };

    async function joinRoom(videoRoomId: number) {
        const room = new Room(ROOM_SETTING);
        setRoom(room);

        joinVideoRoom.mutate(videoRoomId, {
            onSuccess: async (data) => {
                await room.connect(LIVEKIT_URL, data?.data.token);
                addEventHandler(room);
                setVideoRoomId(videoRoomId!);
                console.log(data);
            },
        });
    }

    async function leaveRoom(videoRoomId: number) {
        leaveVideoRoom.mutate(videoRoomId, {
            onSuccess: async () => {
                await room?.disconnect();
                setRoom(undefined);
            },
        });
    }
    return { isManager, createRoom, joinRoom, leaveRoom };
};

export default useRoom;
