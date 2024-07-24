import {
    AudioTrack,
    LocalVideoTrack,
    Participant,
    RemoteParticipant,
    RemoteTrack,
    RemoteTrackPublication,
    RemoteVideoTrack,
    Room,
    RoomEvent,
    Track,
    TrackPublication,
} from 'livekit-client';
import { useState } from 'react';

import { getToken } from '@components/video/getToken';
import { useRoomStore } from '@stores/video/roomStore';
import VideoComponent from '@components/video/VideoComponent';
import AudioComponent from '@components/video/AudioComponent';

type TrackInfo = {
    trackPublication: RemoteTrackPublication;
    participantIdentity: string;
};

interface IParticipantVideoInfo {
    [key: string]: { videoTrack: Track; trackPublication: TrackPublication };
}
interface IParticipantAudioInfo {
    [key: string]: { audioTrack: Track; trackPublication: TrackPublication };
}
const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;

function GroupVideoPage() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [managerName, setManagerName] = useState('');

    const [localParticipant, setLocalParticipant] = useState<Participant>();
    const [remoteParticipants, setRemoteParticipants] = useState<Participant[]>([]);
    // const [participantsVideoInfo, setParticipantsVideoInfo] = useState<IParticipantVideoInfo>({});
    // const [participantsAudioInfo, setParticipantsAudioInfo] = useState<IParticipantAudioInfo>({});

    const room = useRoomStore((state) => state.room);
    const setRoom = useRoomStore((state) => state.setRoom);

    // const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(undefined);
    // const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);

    const roomName = 'test Room';
    const participantName = String(Math.random() * 100);

    // const handleTrackUnsubscribed = (track: RemoteTrack, publication: RemoteTrackPublication) => {
    //     setRemoteTracks((prev) =>
    //         prev.filter((track) => {
    //             return track.trackPublication.trackSid !== publication.trackSid;
    //         }),
    //     );
    //     console.log(remoteTracks);
    // };

    // const handleTrackSubscribed = (
    //     track: RemoteTrack,
    //     publication: RemoteTrackPublication,
    //     participant: RemoteParticipant,
    // ) => {
    //     track.kind === 'video' &&
    //         setParticipantsVideoInfo((prev) => ({
    //             ...prev,
    //             [participant.sid]: { videoTrack: track, trackPublication: publication },
    //         }));

    //     track.kind === 'audio' &&
    //         setParticipantsAudioInfo((prev) => ({
    //             ...prev,
    //             [participant.sid]: { audioTrack: track, trackPublication: publication },
    //         }));
    // };

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

        // room.on(
        //     RoomEvent.TrackSubscribed,
        //     (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
        //         publication.setEnabled(true);
        //     },
        // );

        room.on(RoomEvent.ParticipantConnected, (participant) => {
            setParticipants((prev) => [...prev, participant]);
            setRemoteParticipants((prev) => [...prev, participant]);
        });

        // room.on(
        //     RoomEvent.TrackSubscribed,
        //     (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
        //         handleTrackSubscribed(track, publication, participant);
        //     },
        // );

        // room.on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack, publication: RemoteTrackPublication) => {
        //     handleTrackUnsubscribed(track, publication);
        // });

        try {
            const token = await getToken(roomName, participantName);
            await room.connect(LIVEKIT_URL, token);
            await room.localParticipant.enableCameraAndMicrophone();

            //입장시 방장 정하자
            const curParticipants = [];
            curParticipants.push(room.localParticipant);
            Array.from(room.remoteParticipants.values()).forEach((participant) => curParticipants.push(participant));
            setParticipants(curParticipants);

            curParticipants.sort((partA, partB) => {
                if (new Date(partA.joinedAt!).getTime() > new Date(partB.joinedAt!).getTime()) return 1;
                else return -1;
            });

            setManagerName(curParticipants[0].name!);
            setLocalParticipant(room.localParticipant);
            setRemoteParticipants(Array.from(room.remoteParticipants.values()));

            // setLocalTrack(room.localParticipant.videoTrackPublications.values().next().value.videoTrack);
            // setLocalParticipant(room.localParticipant);
        } catch (error) {
            console.log('There was an error connecting to the room:', (error as Error).message);
            await leaveRoom();
        }
    }

    async function leaveRoom() {
        await room?.disconnect();
        setRoom(undefined);
        // setLocalTrack(undefined);
        // setRemoteTracks([]);
    }
    return (
        <>
            <button onClick={leaveRoom}>Leave Room</button>
            <div className="flex flex-col justify-between h-full">
                <div className="flex gap-4">
                    {localParticipant && (
                        <VideoComponent
                            track={localParticipant.videoTrackPublications.values().next().value.track}
                            isManager={localParticipant.name === managerName}
                            participateName={localParticipant.name!}
                            local={true}
                        />
                    )}
                    {remoteParticipants.map(
                        (participant, idx) =>
                            idx % 2 === 1 && (
                                <VideoComponent
                                    key={participant.name}
                                    track={participant.videoTrackPublications.values().next().value.track}
                                    isManager={participant.name === managerName}
                                    participateName={participant.name!}
                                />
                            ),
                    )}
                </div>
                <button onClick={joinRoom} type="submit">
                    입장하기
                </button>

                <div className="flex gap-4">
                    {remoteParticipants.map(
                        (participant, idx) =>
                            idx % 2 === 0 && (
                                <VideoComponent
                                    key={participant.name}
                                    track={participant.videoTrackPublications.values().next().value.track}
                                    isManager={participant.name === managerName}
                                    participateName={participant.name!}
                                />
                            ),
                    )}
                </div>
                <div>
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
