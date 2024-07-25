import { Participant, Room, RoomEvent, VideoTrack } from 'livekit-client';
import { useState } from 'react';

import VideoComponent from '@components/video/VideoComponent';
import AudioComponent from '@components/video/AudioComponent';
import EmptyVideo from '@components/video/EmptyVideo';
import {
    useRoom,
    useRoomAddParticipant,
    useRoomManagerName,
    useRoomMyName,
    useRoomParticipants,
    useRoomSetManagerName,
    useRoomSetMyName,
    useSetRoom,
} from '@stores/video/roomStore';
import GameStartButton from '@components/video/GameStartButton';
import { getToken } from '@components/video/getToken';
const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;

function GroupVideoPage() {
    const [localParticipant, setLocalParticipant] = useState<Participant>();
    const [remoteParticipants, setRemoteParticipants] = useState<Participant[]>([]);

    const room = useRoom();
    const setRoom = useSetRoom();

    const myName = useRoomMyName();
    const setMyName = useRoomSetMyName();

    const managerName = useRoomManagerName();
    const setManagerName = useRoomSetManagerName();

    const participants = useRoomParticipants();
    const addParticipant = useRoomAddParticipant();

    const roomName = 'test Room';

    async function joinRoom() {
        const room = new Room({
            videoCaptureDefaults: {
                deviceId: '',
                facingMode: 'user',
                resolution: {
                    width: 355,
                    height: 260,
                    frameRate: 30,
                },
            },
        });
        setRoom(room);

        room.on(RoomEvent.ParticipantConnected, (participant) => {
            addParticipant(participant);
            setRemoteParticipants((prev) => [...prev, participant]);
        });

        try {
            const token = await getToken(roomName, myName);
            await room.connect(LIVEKIT_URL, token);
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
        } catch (error) {
            console.log('There was an error connecting to the room:', (error as Error).message);
            await leaveRoom();
        }
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
                    <input placeholder="이름을 입력해주세요" onChange={(e) => setMyName(e.target.value)} />

                    <button onClick={joinRoom} type="submit">
                        입장하기
                    </button>

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
