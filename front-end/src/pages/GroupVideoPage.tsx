import { Participant, Room, RoomEvent, VideoTrack } from 'livekit-client';
import { useEffect, useState } from 'react';

import VideoComponent from '@components/video/VideoComponent';
import AudioComponent from '@components/video/AudioComponent';
import EmptyVideo from '@components/video/EmptyVideo';
import {
    useRoomStateStore,
    useRoomAddParticipantStore,
    useRoomManagerNameStore,
    useRoomMyNameStore,
    useRoomParticipantsStore,
    useRoomSetManagerNameStore,
    useRoomSetMyNameStore,
    useSetRoomStateStore,
} from '@stores/video/roomStore';
import GameStartButton from '@components/video/GameStartButton';
import {
    useCreateVideoRoomMutation,
    useJoinVideoRoomMutation,
    useLeaveVideoRoomMutation,
    useVideoRoomDetailQuery,
} from '@queries/useVideoQuery';
import { GROUP_VIDEO_END_SEC } from '@components/video/VideoConstants';
import { PATH } from '@routers/PathConstants';
import VideoTimer from '@components/video/GroupVideoTimer';
const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;

function GroupVideoPage() {
    const ROOM_SETTING = {
        videoCaptureDefaults: {
            deviceId: '',
            facingMode: 'user' as 'user' | 'environment' | 'left' | 'right',
            resolution: {
                width: 355,
                height: 260,
                frameRate: 30,
            },
        },
    };
    const [localParticipant, setLocalParticipant] = useState<Participant>();
    const [remoteParticipants, setRemoteParticipants] = useState<Participant[]>([]);

    const [videoRoomId, setVideoRoomId] = useState<number | null>(null);

    const room = useRoomStateStore();
    const setRoom = useSetRoomStateStore();

    const myName = useRoomMyNameStore();
    const setMyName = useRoomSetMyNameStore();

    const managerName = useRoomManagerNameStore();
    const setManagerName = useRoomSetManagerNameStore();

    const participants = useRoomParticipantsStore();
    const addParticipant = useRoomAddParticipantStore();

    const { data } = useVideoRoomDetailQuery(videoRoomId);
    const createVideoRoom = useCreateVideoRoomMutation();
    const joinVideoRoom = useJoinVideoRoomMutation();
    const leaveVideoRoom = useLeaveVideoRoomMutation();

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

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

    async function leaveRoom() {
        await room?.disconnect();
        setRoom(undefined);
    }

    return (
        <>
            <div className="flex flex-col items-center justify-between w-full h-screen">
                <div className="flex w-full gap-4">
                    {Array(4)
                        .fill(0)
                        .map((_, idx) =>
                            idx < participants.length ? (
                                <VideoComponent
                                    key={participants[idx].name}
                                    track={
                                        Array.from(participants[idx].videoTrackPublications.values())[0]
                                            .track as VideoTrack
                                    }
                                    isManager={participants[idx].name === managerName}
                                    participateName={participants[idx].name!}
                                />
                            ) : (
                                <EmptyVideo />
                            ),
                        )}
                </div>
                <div>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => {
                                createRoom();
                            }}
                        >
                            생성하기
                        </button>

                        <button
                            onClick={() => {
                                joinRoom(77);
                            }}
                        >
                            입장하기
                        </button>
                        <button onClick={() => leaveVideoRoom.mutate(77)}>나가기</button>
                    </div>

                    <VideoTimer
                        endSec={GROUP_VIDEO_END_SEC}
                        afterFunc={() => {
                            location.href = PATH.ROOT;
                        }}
                    />
                    <GameStartButton />
                </div>
                <div className="flex w-full gap-4">
                    {Array(4)
                        .fill(0)
                        .map((_, idx) =>
                            idx + 4 < participants.length ? (
                                <VideoComponent
                                    key={participants[idx + 4].name}
                                    track={
                                        Array.from(participants[idx + 4].videoTrackPublications.values())[0]
                                            .track as VideoTrack
                                    }
                                    isManager={participants[idx + 4].name === managerName}
                                    participateName={participants[idx + 4].name!}
                                />
                            ) : (
                                <EmptyVideo />
                            ),
                        )}
                </div>
                <div className="hidden">
                    {participants.map((participant) => (
                        <AudioComponent
                            key={participant.name}
                            track={participant.audioTrackPublications.values().next().value.track}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default GroupVideoPage;
