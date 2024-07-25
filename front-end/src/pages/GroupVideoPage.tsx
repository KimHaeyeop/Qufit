import { Participant, Room, RoomEvent, Track, TrackPublication, VideoTrack } from 'livekit-client';
import { useEffect, useRef, useState } from 'react';

import { getToken } from '@components/video/getToken';
import { useRoomStore } from '@stores/video/roomStore';
import VideoComponent from '@components/video/VideoComponent';
import AudioComponent from '@components/video/AudioComponent';
import { EmptyChatIcon } from '@assets/svg/chat';
import EmptyVideo from '@components/video/EmptyVideo';
import Lottie from 'lottie-web';
import LottieComponent from '@components/video/LottieComponent';
import animateData from '@assets/lottie/heart button.json';
const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;

function GroupVideoPage() {
    const [managerName, setManagerName] = useState('');
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [localParticipant, setLocalParticipant] = useState<Participant>();
    const [remoteParticipants, setRemoteParticipants] = useState<Participant[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const [isStopped, setIsStopped] = useState(false);

    const [init, setInit] = useState(0);

    const [end, setEnd] = useState(69);

    const [hover, setHover] = useState(70);

    const [isStart, setIsStart] = useState(false);
    console.log(participants);

    const [name, setName] = useState('');
    const room = useRoomStore((state) => state.room);
    const setRoom = useRoomStore((state) => state.setRoom);

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
            console.log(participants);
            setParticipants((prev) => [...prev, participant]);
            setRemoteParticipants((prev) => [...prev, participant]);
        });

        try {
            const token = await getToken(roomName, name);
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
            setParticipants(curParticipants);
            setLocalParticipant(room.localParticipant);
            setRemoteParticipants(Array.from(room.remoteParticipants.values()));
        } catch (error) {
            console.log('There was an error connecting to the room:', (error as Error).message);
            await leaveRoom();
        }
    }
    const gameStart = () => {
        if (name && managerName && managerName === name) {
            setIsStart(true);
        }
    };

    async function leaveRoom() {
        await room?.disconnect();
        setRoom(undefined);
    }

    // for (let i = 0; i < participants.length - 1; i++) {
    //     console.log(Array.from(participants[i].videoTrackPublications.values())[0].track);
    // }
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
                    <input placeholder="이름을 입력해주세요" onChange={(e) => setName(e.target.value)} />

                    <div className="flex gap-8 group" onClick={gameStart}>
                        {!isStart ? (
                            <LottieComponent
                                animationData={animateData}
                                speed={0.5}
                                isPaused={isPaused}
                                isStopped={isStopped}
                                loop={false}
                                init={0}
                                end={69}
                            />
                        ) : (
                            <LottieComponent
                                animationData={animateData}
                                speed={0.3}
                                isPaused={isPaused}
                                isStopped={isStopped}
                                loop={true}
                                init={70}
                            />
                        )}
                    </div>
                    <button onClick={joinRoom} type="submit">
                        입장하기
                    </button>
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
