import {
    AudioTrack,
    LocalVideoTrack,
    Participant,
    ParticipantEvent,
    RemoteParticipant,
    RemoteTrack,
    RemoteTrackPublication,
    RemoteVideoTrack,
    Room,
    RoomEvent,
    Track,
    TrackPublication,
    VideoTrack,
} from 'livekit-client';
import { useState } from 'react';
import VideoComponent from './VideoComponent';
import AudioComponent from './AudioComponent';
import { getToken } from '@components/video/getToken';

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
    //Participant를 배열에 저장
    //track, publication을 객체에 저장
    const [participants, setParticipants] = useState<IParticipant[]>([]);
    const [localParaticipant, setLocalParticipant] = useState<Participant>();
    const [participantsVideoInfo, setParticipantsVideoInfo] = useState<IParticipantVideoInfo>({});
    const [participantsAudioInfo, setParticipantsAudioInfo] = useState<IParticipantAudioInfo>({});

    const [room, setRoom] = useState<Room | undefined>(undefined);
    const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(undefined);
    const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);

    const [videoRemoteTracks, setVideoRemoteTracks] = useState<TrackInfo[]>([]);

    const [audioRemoteTracks, setAudioRemoteTracks] = useState<TrackInfo[]>([]);

    const [participantName, setParticipantName] = useState('Participant' + Math.floor(Math.random() * 100));
    const [roomName, setRoomName] = useState('Test Room');

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
            //내 입장기준 다른 사람의 Track이 구독되는 시점이구나
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
        console.log(remoteTracks);
        await room?.disconnect();
        setRoom(undefined);
        setLocalTrack(undefined);
        setRemoteTracks([]);
        console.log(getManagerSid());
    }

    return (
        <>
            <form
                onSubmit={(e) => {
                    joinRoom();
                    e.preventDefault();
                }}
            >
                <label className="flex gap-4" onClick={() => console.log(participants)}>
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
                        <VideoComponent
                            track={localTrack}
                            isManager={getManagerSid() === localParaticipant?.sid}
                            participantIdentity={participantName}
                            local={true}
                            // participants={participants}
                        />
                    )}

                    {/* {videoRemoteTracks.map(
                        (remoteTrack, idx) =>
                            idx % 2 === 1 && (
                                <VideoComponent
                                    // participants={participants}
                                    key={remoteTrack.trackPublication.trackSid}
                                    track={remoteTrack.trackPublication.videoTrack!}
                                    isManager={getManagerSid() === remoteTrack.trackPublication.videoTrack?.sid}
                                    participantIdentity={remoteTrack.participantIdentity}
                                />
                            ),
                    )} */}
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

export default LiveKitTest;
