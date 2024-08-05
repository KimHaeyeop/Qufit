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
    useRoomParticipantsStore,
    useRoomSetManagerNameStore,
    useRoomStateStore,
    useSetRoomStateStore,
} from '@stores/video/roomStore';
import { Room, RoomEvent } from 'livekit-client';
import { useEffect, useState } from 'react';

const useRoom = () => {
    const [videoRoomId, setVideoRoomId] = useState<number | null>(null);

    const managerName = useRoomManagerNameStore();
    const myName = useRoomMyNameStore();

    const [isManager, setIsManager] = useState(false);
    useEffect(() => {
        setIsManager(!!myName && !!managerName && managerName === myName);
    }, [managerName, myName]);
    const room = useRoomStateStore();
    const setRoom = useSetRoomStateStore();

    const setManagerName = useRoomSetManagerNameStore();

    const participants = useRoomParticipantsStore();
    const addParticipant = useRoomAddParticipantStore();

    const { data } = useVideoRoomDetailQuery(videoRoomId);
    const createVideoRoom = useCreateVideoRoomMutation();
    const joinVideoRoom = useJoinVideoRoomMutation();
    const leaveVideoRoom = useLeaveVideoRoomMutation();

    const addRoomEventHandler = async (room: Room) => {
        room.on(RoomEvent.ParticipantConnected, (participant) => {
            console.log(participant + ' 가 참가했습니다.');
            addParticipant({ memberId: 1, gender: 'f', nickname: '현명', info: participant });
        });

        // await room.localParticipant.enableCameraAndMicrophone();
        await room.localParticipant.setCameraEnabled(true);
        //입장시 방장 정하자
        const curParticipants = [];
        curParticipants.push(room.localParticipant);
        Array.from(room.remoteParticipants.values()).forEach((participant) => curParticipants.push(participant));
        curParticipants.sort((partA, partB) => {
            if (new Date(partA.joinedAt!).getTime() > new Date(partB.joinedAt!).getTime()) return 1;
            else return -1;
        });

        setManagerName(curParticipants[0].name!);
        addParticipant({ memberId: 1, gender: 'f', nickname: '현명', info: room.localParticipant });
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
                    addRoomEventHandler(room);
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
                addRoomEventHandler(room);
                setVideoRoomId(videoRoomId!);
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
