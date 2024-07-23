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
import VideoComponent from './VideoComponent';
import AudioComponent from './AudioComponent';
import { getToken } from '@components/video/getToken';
import { useRoomStore } from '@stores/video/roomStore';

type TrackInfo = {
    trackPublication: RemoteTrackPublication;
    participantIdentity: string;
};

interface IParticipant {
    participant: Participant;
    createdDate: Date;
}
interface IParticipantVideoInfo {
    [key: string]: { videoTrack: Track; trackPublication: TrackPublication };
}
interface IParticipantAudioInfo {
    [key: string]: { audioTrack: Track; trackPublication: TrackPublication };
}
const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;

function LiveKitTest() {
    const [participants, setParticipants] = useState<IParticipant[]>([]);
    const [localParaticipant, setLocalParticipant] = useState<Participant>();
    const [participantsVideoInfo, setParticipantsVideoInfo] = useState<IParticipantVideoInfo>({});
    const [participantsAudioInfo, setParticipantsAudioInfo] = useState<IParticipantAudioInfo>({});

    const room = useRoomStore((state) => state.room);
    const setRoom = useRoomStore((state) => state.setRoom);

    const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(undefined);
    const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);

    const roomName = 'test Room';
    const participantName = String(Math.random() * 100);

    const getManagerSid = () => {
        const arr = participants.sort((a, b) => {
            if (a.createdDate > b.createdDate) return 1;
            else return -1;
        });
        return arr[0].participant.sid;
    };

    const handleTrackUnsubscribed = (track: RemoteTrack, publication: RemoteTrackPublication) => {
        setRemoteTracks((prev) =>
            prev.filter((track) => {
                return track.trackPublication.trackSid !== publication.trackSid;
            }),
        );
        console.log(remoteTracks);
    };

    const handleTrackSubscribed = (
        track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant,
    ) => {
        track.kind === 'video' &&
            setParticipants((prev) => [...prev, { participant: participant, createdDate: new Date() }]);

        track.kind === 'video' &&
            setParticipantsVideoInfo((prev) => ({
                ...prev,
                [participant.sid]: { videoTrack: track, trackPublication: publication },
            }));

        track.kind === 'audio' &&
            setParticipantsAudioInfo((prev) => ({
                ...prev,
                [participant.sid]: { audioTrack: track, trackPublication: publication },
            }));
    };

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

        room.on(
            RoomEvent.TrackSubscribed,
            (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
                publication.setEnabled(true);
                console.log(publication);
            },
        );

        room.on(
            RoomEvent.TrackSubscribed,
            (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
                handleTrackSubscribed(track, publication, participant);
            },
        );

        room.on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack, publication: RemoteTrackPublication) => {
            handleTrackUnsubscribed(track, publication);
        });

        try {
            const token = await getToken(roomName, participantName);
            await room.connect(LIVEKIT_URL, token);
            await room.localParticipant.enableCameraAndMicrophone();
            setLocalTrack(room.localParticipant.videoTrackPublications.values().next().value.videoTrack);
            setLocalParticipant(room.localParticipant);
            setParticipants((prev) => [...prev, { participant: room.localParticipant, createdDate: new Date() }]);
        } catch (error) {
            console.log('There was an error connecting to the room:', (error as Error).message);
            await leaveRoom();
        }
    }

    async function leaveRoom() {
        await room?.disconnect();
        setRoom(undefined);
        setLocalTrack(undefined);
        setRemoteTracks([]);
    }
    console.log(room);
    return (
        <>
            <button onClick={joinRoom} type="submit">
                입장하기
            </button>

            <button onClick={leaveRoom}>Leave Room</button>
            <div className="flex flex-col justify-between h-full">
                <div className="flex gap-4">
                    {localTrack && (
                        <VideoComponent
                            track={localTrack}
                            isManager={getManagerSid() === localParaticipant?.sid}
                            participantIdentity={participantName}
                            local={true}
                        />
                    )}
                    {participants.map(
                        (participant, idx) =>
                            participant.participant.sid !== localParaticipant?.sid &&
                            idx % 2 === 1 && (
                                <VideoComponent
                                    // participants={participants}
                                    key={participant.participant.sid}
                                    track={
                                        participantsVideoInfo[participant.participant.sid]
                                            .videoTrack as RemoteVideoTrack
                                    }
                                    isManager={getManagerSid() === participant.participant.sid}
                                    participantIdentity={participant.participant.name || ''}
                                />
                            ),
                    )}
                </div>
                <div className="flex gap-4">
                    {participants.map(
                        (participant, idx) =>
                            participant.participant.sid !== localParaticipant?.sid &&
                            idx % 2 === 0 && (
                                <VideoComponent
                                    key={participant.participant.sid}
                                    track={
                                        participantsVideoInfo[participant.participant.sid]
                                            .videoTrack as RemoteVideoTrack
                                    }
                                    isManager={getManagerSid() === participant.participant.sid}
                                    participantIdentity={participant.participant.name || ''}
                                />
                            ),
                    )}
                </div>
                <div>
                    {participants.map(
                        (participant) =>
                            participant.participant.sid !== localParaticipant?.sid && (
                                <AudioComponent
                                    key={participant.participant.audioTrackPublications.size}
                                    track={
                                        (participantsAudioInfo[participant.participant.sid].audioTrack as AudioTrack) ||
                                        ''
                                    }
                                />
                            ),
                    )}
                </div>
            </div>
        </>
    );
}

export default LiveKitTest;
