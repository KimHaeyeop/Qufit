import { CameraOffIcon, CrownIcon, MicOffIcon, MicOnIcon } from '@assets/svg/video';
import { useRoomStore } from '@stores/video/roomStore';
import { LocalVideoTrack, Participant, RemoteVideoTrack } from 'livekit-client';
import { useEffect, useRef, useState } from 'react';
import { MouseEvent } from 'react';
interface VideoComponentProps {
    width?: string;
    height?: string;
    track: LocalVideoTrack | RemoteVideoTrack;
    participateName: string;
    participants?: Participant[];
    local?: boolean;
    isManager: boolean;
}

function VideoComponent({
    track,
    isManager,
    participateName,
    local = false,
    width = '355px',
    height = '260px',
}: VideoComponentProps) {
    const videoElement = useRef<HTMLVideoElement | null>(null);
    const [isMicEnable, setIsMicEnable] = useState(true);
    const [isCameraEnable, setIsCameraEnable] = useState(true);
    const room = useRoomStore((state) => state.room);

    useEffect(() => {
        if (videoElement.current) {
            track.attach(videoElement.current);
        }
        return () => {
            track.detach();
        };
    }, [track, isCameraEnable]);

    const changeCameraEnabled = () => {
        room?.localParticipant.setCameraEnabled(!room?.localParticipant.isCameraEnabled);
        setIsCameraEnable(!room?.localParticipant.isCameraEnabled);
    };

    const changeMicrophoneEnabled = (event: MouseEvent) => {
        event.stopPropagation();
        setIsMicEnable(!room?.localParticipant.isMicrophoneEnabled);
        room?.localParticipant.setMicrophoneEnabled(!room?.localParticipant.isMicrophoneEnabled);
    };

    return (
        <div
            className="relative z-50 flex flex-col justify-between h-full p-4 rounded-xl"
            style={{ width, height }}
            onClick={changeCameraEnabled}
        >
            {isManager && <CrownIcon width={'50px'} />}
            <div className="flex items-center justify-between ">
                <p className="text-lg font-bold text-white ">{participateName + (local ? ' (You)' : '')}</p>

                <div>{isMicEnable ? <MicOnIcon width={'30px'} /> : <MicOffIcon width={'30px'} />}</div>

                <div className="absolute left-0 w-full px-4 pb-3 transition-all duration-1000 group">
                    <button
                        className="invisible w-full bg-white h-14 rounded-xl group-hover:visible "
                        onClick={(event) => changeMicrophoneEnabled(event)}
                    >
                        <div className="flex items-center justify-center gap-1">
                            {isMicEnable ? <MicOffIcon width={'20px'} /> : <MicOnIcon width={'20px'} />}
                            <p className={`text-base  ${isMicEnable && ' text-purple'}`}>
                                {isMicEnable ? '마이크 끄기' : '마이크 켜기'}
                            </p>
                        </div>
                    </button>
                </div>
            </div>
            <div className="absolute top-0 left-0 -z-10">
                {isCameraEnable ? (
                    <video ref={videoElement} className="rounded-xl" style={{ width, height }} />
                ) : (
                    <>
                        <div
                            className="relative flex items-center justify-center bg-white opacity-40 rounded-xl"
                            style={{ width, height }}
                        ></div>
                        <CameraOffIcon
                            width={'10rem'}
                            className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default VideoComponent;
