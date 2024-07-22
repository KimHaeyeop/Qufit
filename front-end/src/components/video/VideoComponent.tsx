import { CrownIcon, MicOffIcon, MicOnIcon } from '@assets/svg/video';
import { LocalVideoTrack, RemoteVideoTrack } from 'livekit-client';
import { useEffect, useRef } from 'react';

interface VideoComponentProps {
    track: LocalVideoTrack | RemoteVideoTrack;
    participantIdentity: string;
    local?: boolean;
}

function VideoComponent({ track, participantIdentity, local = false }: VideoComponentProps) {
    const videoElement = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoElement.current) {
            track.attach(videoElement.current);
        }
        return () => {
            track.detach();
        };
    }, [track]);

    return (
        <div>
            <div></div>
            <div className="relative rounded-xl">
                <CrownIcon width={'50px'} className="absolute left-2 top-2" />

                <video ref={videoElement} className="h-64 p-0 rounded-xl" />
                <MicOffIcon width={'30px'} className="absolute  bottom-4 left-full -translate-x-[calc(100%+1rem)]" />
                <MicOnIcon width={'30px'} className="absolute  bottom-4 left-full -translate-x-[calc(100%+1rem)]" />
                <p className="absolute bottom-4 left-4 text-white font-bold text-sm">
                    {participantIdentity + (local ? ' (You)' : '')}
                </p>
            </div>
        </div>
    );
}

export default VideoComponent;
