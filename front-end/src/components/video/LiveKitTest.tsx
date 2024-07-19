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

    const [audioRemoteTracks, setAudioRemoteTracks] = useState<TrackInfo[]>([]);

    const [participantName, setParticipantName] = useState('Participant' + Math.floor(Math.random() * 100));
    const [roomName, setRoomName] = useState('Test Room');

    const handleTrackUnsubscribed = (track: RemoteTrack, publication: RemoteTrackPublication) => {
        setRemoteTracks((prev) =>
            prev.filter((track) => {
                console.log(track);
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
        setRemoteTracks((prev) => [
            ...prev,
            {
                trackPublication: publication,
                participantIdentity: participant.identity,
            },
        ]);
        track.kind === 'video'
            ? setVideoRemoteTracks((prev) => [
                  ...prev,
                  {
                      trackPublication: publication,
                      participantIdentity: participant.identity,
                  },
              ])
            : setAudioRemoteTracks((prev) => [
                  ...prev,
                  {
                      trackPublication: publication,
                      participantIdentity: participant.identity,
                  },
              ]);
    };
    async function joinRoom() {
        const room = new Room();
        setRoom(room);

        room.on(
            //TrackSubscribed가 오디오할떄도 작동, 비디오할때도 작동이니까 2개가 계속 쌓였던거구나.
            RoomEvent.TrackSubscribed,
            (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
                handleTrackSubscribed(track, publication, participant);
            },
        );

        // On every Track destroyed...
        room.on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack, publication: RemoteTrackPublication) => {
            handleTrackUnsubscribed(track, publication);
        });

        try {
            const token = await getToken(roomName, participantName);
            await room.connect(LIVEKIT_URL, token);
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

            <button onClick={leaveRoom}>Leave Room</button>
            <div className="flex flex-col h-full justify-between">
                <div className="flex gap-4">
                    {localTrack && (
                        <VideoComponent track={localTrack} participantIdentity={participantName} local={true} />
                    )}

                    {videoRemoteTracks.map(
                        (remoteTrack, idx) =>
                            idx % 2 === 1 && (
                                <VideoComponent
                                    key={remoteTrack.trackPublication.trackSid}
                                    track={remoteTrack.trackPublication.videoTrack!}
                                    participantIdentity={remoteTrack.participantIdentity}
                                />
                            ),
                    )}
                </div>
                <div className="flex gap-4">
                    {videoRemoteTracks.map(
                        (remoteTrack, idx) =>
                            idx % 2 === 0 && (
                                <VideoComponent
                                    key={remoteTrack.trackPublication.trackSid}
                                    track={remoteTrack.trackPublication.videoTrack!}
                                    participantIdentity={remoteTrack.participantIdentity}
                                />
                            ),
                    )}
                </div>
                <div>
                    {audioRemoteTracks.map((remoteTrack) => (
                        <AudioComponent
                            key={remoteTrack.trackPublication.trackSid}
                            track={remoteTrack.trackPublication.audioTrack!}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
