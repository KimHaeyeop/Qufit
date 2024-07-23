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

    const changeMicrophoneEnabled = () => {
        setIsMicEnable(!room?.localParticipant.isMicrophoneEnabled);
        room?.localParticipant.setMicrophoneEnabled(!room?.localParticipant.isMicrophoneEnabled);
    };
    return (
        // <div onClick={test}>
        <div>
            <div className="relative rounded-xl w-full">
                <div className="absolute h-64  w-full rounded-xl p-4 flex flex-col justify-between z-50 ">
                    {isManager && <CrownIcon width={'50px'} className="left-2 top-2" />}

                    <div className="flex justify-between items-center ">
                        <p className="text-white font-bold text-sm">{participantIdentity + (local ? ' (You)' : '')}</p>

                        <div>{isMicEnable ? <MicOnIcon width={'30px'} /> : <MicOffIcon width={'30px'} />}</div>

                        <div className="absolute w-full left-0 px-4 pb-3 transition-all duration-1000 group">
                            <button
                                className="w-full h-14 bg-white rounded-xl invisible group-hover:visible "
                                onClick={changeMicrophoneEnabled}
                            >
                                <div className="flex justify-center items-center gap-1">
                                    {isMicEnable ? <MicOffIcon width={'30px'} /> : <MicOnIcon width={'30px'} />}
                                    <p className={`text-lg  ${isMicEnable && ' text-purple'}`}>
                                        {isMicEnable ? '마이크 끄기' : '마이크 켜기'}
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <video ref={videoElement} className="h-64 p-0 rounded-xl "></video>
            </div>
        </div>
    );
}

export default VideoComponent;
