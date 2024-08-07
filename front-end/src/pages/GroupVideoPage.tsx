import VideoComponent from '@components/video/VideoComponent';
import AudioComponent from '@components/video/AudioComponent';
import EmptyVideo from '@components/video/EmptyVideo';
import { useRoomParticipantsStore } from '@stores/video/roomStore';
import GameStartButton from '@components/video/GameStartButton';

import { GROUP_VIDEO_END_SEC } from '@components/video/VideoConstants';
import { PATH } from '@routers/PathConstants';
import VideoTimer from '@components/video/GroupVideoTimer';
import useRoom from '@hooks/useRoom';
import ParticipantVideo from '@components/video/ParticipantVideo';

function GroupVideoPage() {
    const roomMax = 8;
    let maleIdx = 0;
    let femaleIdx = 0;
    const participants = useRoomParticipantsStore();
    const { hostId, createRoom, joinRoom, leaveRoom } = useRoom();
    const roomId = 214;

    const handleTimerEnd = () => {
        location.href = PATH.PERSONAL_VIDEO(1);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-between w-full h-screen">
                <ParticipantVideo roomMax={roomMax} gender="m" />

                <div>
                    <div className="flex flex-col gap-4">
                        <button onClick={createRoom}>생성하기</button>

                        <button
                            onClick={() => {
                                joinRoom(roomId);
                            }}
                        >
                            입장하기
                        </button>
                        <button onClick={() => leaveRoom(roomId)}>나가기</button>
                    </div>

                    <VideoTimer
                        endSec={50 * 60}
                        afterFunc={() => {
                            handleTimerEnd();
                        }}
                    />
                    <GameStartButton />
                </div>
                <ParticipantVideo roomMax={roomMax} gender="f" />
                {/* <div className="hidden">
                    {participants.map((participant) => (
                        <AudioComponent
                            key={participant.nickname}
                            track={
                                participant.info.audioTrackPublications.values().next().value?.audioTrack || undefined
                            }
                        />
                    ))}
                </div> */}
            </div>
        </>
    );
}

export default GroupVideoPage;
