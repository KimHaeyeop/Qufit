import {
    LocalVideoTrack,
    RemoteParticipant,
    RemoteTrack,
    RemoteTrackPublication,
    Room,
    RoomEvent,
} from 'livekit-client';
import { useState } from 'react';
import VideoComponent from './VideoComponent';
import AudioComponent from './AudioComponent';
import { getToken } from '@components/video/getToken';

type TrackInfo = {
    trackPublication: RemoteTrackPublication;
    participantIdentity: string;
};

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;

function App() {
    const [room, setRoom] = useState<Room | undefined>(undefined);
    const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(undefined);
    const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);

    const [videoRemoteTracks, setVideoRemoteTracks] = useState<TrackInfo[]>([]);

    const [participantName, setParticipantName] = useState('Participant' + Math.floor(Math.random() * 100));
    const [roomName, setRoomName] = useState('Test Room');

    const handleTrackUnsubscribed = () => {};
    async function joinRoom() {
        const room = new Room();
        setRoom(room);

        room.on(
            //TrackSubscribed가 오디오할떄도 작동, 비디오할때도 작동이니까 2개가 계속 쌓였던거구나.
            RoomEvent.TrackSubscribed,
            (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
                setRemoteTracks((prev) => [
                    ...prev,
                    {
                        trackPublication: publication,
                        participantIdentity: participant.identity,
                    },
                ]);
                track.kind === 'video' &&
                    setVideoRemoteTracks((prev) => [
                        ...prev,
                        {
                            trackPublication: publication,
                            participantIdentity: participant.identity,
                        },
                    ]);
            },
        );

        // On every Track destroyed...
        room.on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack, publication: RemoteTrackPublication) => {
            setRemoteTracks((prev) =>
                prev.filter((track) => {
                    console.log(track);
                    return track.trackPublication.trackSid !== publication.trackSid;
                }),
            );
            console.log(remoteTracks);
        });

        try {
            const token = await getToken(roomName, participantName);
            await room.connect(LIVEKIT_URL, token);

            // Publish your camera and microphone
            await room.localParticipant.enableCameraAndMicrophone();
            setLocalTrack(room.localParticipant.videoTrackPublications.values().next().value.videoTrack);
        } catch (error) {
            console.log('There was an error connecting to the room:', (error as Error).message);
            await leaveRoom();
        }
    }

    async function leaveRoom() {
        console.log(remoteTracks);
        await room?.disconnect();
        setRoom(undefined);
        setLocalTrack(undefined);
        setRemoteTracks([]);
    }

    console.log(remoteTracks);
    return (
        <>
            <div>
                <form
                    onSubmit={(e) => {
                        joinRoom();
                        e.preventDefault();
                    }}
                >
                    <label className="flex gap-4">
                        닉네임
                        <input
                            type="text"
                            placeholder="닉네임 입력"
                            onChange={(e) => setParticipantName(e.target.value)}
                            required
                        />
                    </label>
                    <label className="flex gap-4">
                        Room
                        <input
                            placeholder="방이름 입력"
                            value={11}
                            type="text"
                            onChange={(e) => setRoomName(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" disabled={!roomName || !participantName}>
                        입장하기
                    </button>
                </form>
            </div>

            <button onClick={leaveRoom}>Leave Room</button>
            <div className="flex flex-col border-2">
                <div className="flex">
                    <div>
                        {localTrack && (
                            <VideoComponent track={localTrack} participantIdentity={participantName} local={true} />
                        )}
                    </div>
                    <div className="flex">
                        {remoteTracks.map(
                            (remoteTrack, idx) =>
                                idx % 2 === 1 &&
                                (remoteTrack.trackPublication.kind === 'video' ? (
                                    <VideoComponent
                                        key={remoteTrack.trackPublication.trackSid}
                                        track={remoteTrack.trackPublication.videoTrack!}
                                        participantIdentity={remoteTrack.participantIdentity}
                                    />
                                ) : (
                                    <AudioComponent
                                        key={remoteTrack.trackPublication.trackSid}
                                        track={remoteTrack.trackPublication.audioTrack!}
                                    />
                                )),
                        )}
                    </div>
                </div>
                <div className="flex border-2">
                    {remoteTracks.map(
                        (remoteTrack, idx) =>
                            idx % 2 === 0 &&
                            (remoteTrack.trackPublication.kind === 'video' ? (
                                <VideoComponent
                                    key={remoteTrack.trackPublication.trackSid}
                                    track={remoteTrack.trackPublication.videoTrack!}
                                    participantIdentity={remoteTrack.participantIdentity}
                                />
                            ) : (
                                <AudioComponent
                                    key={remoteTrack.trackPublication.trackSid}
                                    track={remoteTrack.trackPublication.audioTrack!}
                                />
                            )),
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
