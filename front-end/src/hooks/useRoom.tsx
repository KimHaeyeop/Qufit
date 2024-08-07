import { LIVEKIT_URL, ROOM_SETTING } from '@components/video/VideoConstants';
import {
    useCreateVideoRoomMutation,
    useJoinVideoRoomMutation,
    useLeaveVideoRoomMutation,
    useVideoRoomDetailQuery,
} from '@queries/useVideoQuery';
import {
    RoomParticipant,
    useRoomAddParticipantStore,
    useRoomManagerNameStore,
    useRoomMyNameStore,
    useRoomSetManagerNameStore,
    useRoomSetParticipantsStore,
    useRoomStateStore,
    useSetRoomStateStore,
} from '@stores/video/roomStore';
import { Room, RoomEvent } from 'livekit-client';
import { useEffect, useState } from 'react';

const useRoom = () => {
    const [_, setVideoRoomId] = useState<number | null>(null);
    const room = useRoomStateStore();
    const setRoom = useSetRoomStateStore();
    const managerName = useRoomManagerNameStore();
    const myName = useRoomMyNameStore();
    const { member } = useMember();
    const [isManager, setIsManager] = useState(false);

    useEffect(() => {
        setIsManager(!!myName && !!managerName && managerName === myName);
    }, [managerName, myName]);

    const setManagerName = useRoomSetManagerNameStore();
    const addParticipant = useRoomAddParticipantStore();
    const setParticipants = useRoomSetParticipantsStore();

    const createVideoRoom = useCreateVideoRoomMutation();
    const joinVideoRoom = useJoinVideoRoomMutation();
    const leaveVideoRoom = useLeaveVideoRoomMutation();

    const addRoomEventHandler = async (room: Room) => {
        room.on(RoomEvent.ParticipantConnected, (participant) => {
            //상대방이 접속하면 셍서조회를 다시해서 가져온다.
            //id가 같은애랑 매칭하면 되네.
            refetch();

            const newParticipant = videoRoom?.data.members.find(
                (member: { id: number; gender: 'f' | 'm'; nickname: string }) =>
                    member.id === Number(participant.identity),
            );
            addParticipant({ ...newParticipant, info: participant });
        });
    };

    const decideManager = async (room: Room) => {
        await room.localParticipant.enableCameraAndMicrophone();

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
                    console.log(data);
                    setVideoRoomId(data.data.videoRoomId);
                    const room = new Room(ROOM_SETTING);
                    await room.connect(LIVEKIT_URL, data?.data.token);
                    setRoom(room);
                    addRoomEventHandler(room);
                    decideManager(room);
                    addParticipant({
                        id: member?.memberId,
                        gender: member?.gender,
                        nickname: member?.nickname,
                        info: room.localParticipant,
                    });
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
        console.log(room);
        joinVideoRoom.mutate(videoRoomId, {
            onSuccess: async (response) => {
                console.log(response?.data.token);
                await room.connect(LIVEKIT_URL, response?.data.token);
                const curParticipants: RoomParticipant[] = [];
                // console.log(data?.data);
                Array.from(room.remoteParticipants.values()).forEach((participant) => {
                    const newParticipant = videoRoom?.data.members.find(
                        (member: { id: number; gender: 'f' | 'm'; nickname: string }) =>
                            String(member.id) === participant.identity,
                    );
                    videoRoom?.data.members.forEach((member: { id: number; gender: 'f' | 'm'; nickname: string }) =>
                        console.log(String(member.id) === participant.identity),
                    );
                    console.log(participant);
                    console.log(newParticipant);
                    curParticipants.push({ ...newParticipant, info: participant });
                    curParticipants.push({
                        id: member?.memberId,
                        gender: member?.gender,
                        nickname: member?.nickname,
                        info: room.localParticipant,
                    });
                    setParticipants(curParticipants);
                });
                addRoomEventHandler(room);
                decideManager(room);
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
