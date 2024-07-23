import { CrownIcon, MicOffIcon, MicOnIcon } from '@assets/svg/video';
import { useRoomStore } from '@stores/video/roomStore';
import { LocalVideoTrack, Participant, RemoteVideoTrack } from 'livekit-client';
import { useEffect, useRef, useState } from 'react';

interface VideoComponentProps {
    track: LocalVideoTrack | RemoteVideoTrack;
    participantIdentity: string;
    participants?: Participant[];
    local?: boolean;
    isManager: boolean;
}

function VideoComponent({ track, isManager, participantIdentity, local = false }: VideoComponentProps) {
    const videoElement = useRef<HTMLVideoElement | null>(null);
    const [isMicEnable, setIsMicEnable] = useState(true);
    // const [isCameraEnable, setIsCameraEnable] = useState(false);
    const room = useRoomStore((state) => state.room);

    // const test = () => {
    //     room?.localParticipant.setCameraEnabled(!room?.localParticipant.isCameraEnabled);

    //     console.log(track);
    // };

    useEffect(() => {
        if (videoElement.current) {
            track.attach(videoElement.current);
        }
        return () => {
            track.detach();
        };
    }, [track]);

    const handleMicIconClick = () => {
        setIsMicEnable(!room?.localParticipant.isMicrophoneEnabled);
        room?.localParticipant.setMicrophoneEnabled(!room?.localParticipant.isMicrophoneEnabled);
    };
    return (
        <div onClick={test}>
            <div className="relative rounded-xl">
                {isManager && <CrownIcon width={'50px'} className="absolute left-2 top-2" />}

                <video ref={videoElement} className="h-64 p-0 rounded-xl" />
                <div
                    onClick={handleMicIconClick}
                    className="absolute  bottom-4 left-full -translate-x-[calc(100%+1rem)]"
                >
                    {isMicEnable ? <MicOnIcon width={'30px'} /> : <MicOffIcon width={'30px'} />}
                </div>
                <p className="absolute bottom-4 left-4 text-white font-bold text-sm">
                    {participantIdentity + (local ? ' (You)' : '')}
                </p>
            </div>
        </div>
    );
}

export default VideoComponent;
